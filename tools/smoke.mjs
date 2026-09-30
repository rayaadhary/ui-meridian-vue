// One-off SSR smoke render: catches unresolved components, missing provide,
// blank layouts, and sidebar state regressions without needing a browser.
// Run: node tools/smoke.mjs  (npm run smoke)
import { createServer } from "vite";
import { createSSRApp, h } from "vue";
import { createRouter, createMemoryHistory, RouterView } from "vue-router";
import { renderToString } from "@vue/server-renderer";

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

const Stub = { name: "Stub", render: () => null };

// ThemeToggle reads the initial theme off <html data-theme> at setup; give it a stand-in DOM.
globalThis.document = { documentElement: { dataset: {} } };

const problems = [];
const warn = (...args) => problems.push(args.join(" "));
const original = { warn: console.warn, error: console.error };
console.warn = warn;
console.error = warn;

const text = (s) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// Same shape as App.vue: a root <RouterView /> at depth 0, so a layout placed on
// the "/" record renders once and its own RouterView picks up the child at depth 1.
const render = async (routes, path = "/") => {
  const router = createRouter({ history: createMemoryHistory(), routes });
  const app = createSSRApp({ render: () => h(RouterView) });
  app.use(router);
  await router.push(path);
  await router.isReady();
  return await renderToString(app);
};

const targets = [
  ["src/layouts/AppLayout.vue", "/"],
  ["src/layouts/AuthLayout.vue", "/login"],
  ["src/layouts/ErrorLayout.vue", "/404"],
  ["src/pages/Dashboard.vue", "/"],
  ["src/pages/Orders.vue", "/orders"],
  ["src/pages/OrderNew.vue", "/orders/new"],
  ["src/pages/OrderDetail.vue", "/orders/10428"],
  ["src/pages/Products.vue", "/products"],
  ["src/pages/ProductNew.vue", "/products/new"],
  ["src/pages/Customers.vue", "/customers"],
  ["src/pages/Reports.vue", "/reports"],
  ["src/pages/Settings.vue", "/settings"],
  ["src/pages/Profile.vue", "/profile"],
  ["src/pages/Blank.vue", "/blank"],
  ["src/pages/Login.vue", "/login"],
  ["src/pages/Register.vue", "/register"],
  ["src/pages/Forgot.vue", "/forgot"],
  ["src/pages/403Error.vue", "/403"],
  ["src/pages/404Error.vue", "/404"],
  ["src/pages/500Error.vue", "/500"],
];

for (const [file, path] of targets) {
  try {
    const { default: Page } = await vite.ssrLoadModule("/" + file);
    const html = await render(
      [{ path: "/", component: Page, children: [{ path: ":rest*", component: Stub }] }],
      path,
    );
    if (!html || html.length < 50) problems.push(`${file}: rendered ${html.length} bytes`);
    else console.log(`ok ${file} (${html.length} bytes)`);
  } catch (error) {
    problems.push(`${file}: ${error.message}`);
  }
}

// Layouts must render their route child: nested routes do not pass through
// <slot/>, so a layout that renders a slot instead of <RouterView /> shows blank.
const layouts = [
  ["src/layouts/AppLayout.vue", "src/pages/Dashboard.vue"],
  ["src/layouts/AuthLayout.vue", "src/pages/Login.vue"],
  ["src/layouts/ErrorLayout.vue", "src/pages/404Error.vue"],
];

for (const [layoutFile, childFile] of layouts) {
  try {
    const { default: Layout } = await vite.ssrLoadModule("/" + layoutFile);
    const { default: Child } = await vite.ssrLoadModule("/" + childFile);
    const child = text(await render([{ path: "/:rest*", component: Child }]));
    const both = text(
      await render([
        {
          path: "/",
          component: Layout,
          children: [{ path: "", component: Child }, { path: ":rest*", component: Child }],
        },
      ]),
    );
    if (!child || !both.includes(child)) problems.push(`${layoutFile}: does not render ${childFile}`);
    else console.log(`ok ${layoutFile} + child (${both.length} chars)`);
  } catch (error) {
    problems.push(`${layoutFile}+child: ${error.message}`);
  }
}

// Exactly one sidebar link may carry aria-current="page" on /reports: Vue Router
// marks every exact-active RouterLink, and the three submenu links all point at
// /reports — without suppression they all light up as active.
try {
  const { default: Layout } = await vite.ssrLoadModule("/src/layouts/AppLayout.vue");
  const { default: Reports } = await vite.ssrLoadModule("/src/pages/Reports.vue");
  const html = await render(
    [
      {
        path: "/",
        component: Layout,
        children: [{ path: "reports", component: Reports }, { path: ":rest*", component: Reports }],
      },
    ],
    "/reports",
  );
  const noCrumbs = html.replace(/<nav aria-label="breadcrumb">[\s\S]*?<\/nav>/g, "");
  const active = (noCrumbs.match(/aria-current="page"/g) || []).length;
  if (active !== 1)
    problems.push(
      `AppLayout @/reports: ${active} active sidebar links, want 1 :: aside=${
        (html.match(/<aside/g) || []).length
      } :: ` +
        [...noCrumbs.matchAll(/aria-current="page"/g)]
          .map((m) => m.index + ": ..." + noCrumbs.slice(m.index - 80, m.index + 30) + "...")
          .join("\n   | "),
    );
  else console.log("ok AppLayout @/reports active sidebar link (1)");
} catch (error) {
  problems.push(`AppLayout@/reports: ${error.message}`);
}

console.warn = original.warn;
console.error = original.error;
await vite.close();

if (problems.length) {
  console.error("\nPROBLEMS:");
  for (const p of problems) console.error(" - " + p);
  process.exit(1);
}
console.log("\nall render");
