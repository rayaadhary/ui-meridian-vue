import { createRouter, createWebHistory } from "vue-router";

import AppLayout from "../layouts/AppLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import ErrorLayout from "../layouts/ErrorLayout.vue";
import Dashboard from "../pages/Dashboard.vue";
import Orders from "../pages/Orders.vue";
import OrderNew from "../pages/OrderNew.vue";
import OrderDetail from "../pages/OrderDetail.vue";
import Products from "../pages/Products.vue";
import ProductNew from "../pages/ProductNew.vue";
import Customers from "../pages/Customers.vue";
import Reports from "../pages/Reports.vue";
import Settings from "../pages/Settings.vue";
import Profile from "../pages/Profile.vue";
import Blank from "../pages/Blank.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Forgot from "../pages/Forgot.vue";
import Error403 from "../pages/403Error.vue";
import Error404 from "../pages/404Error.vue";
import Error500 from "../pages/500Error.vue";

// Static imports keep the first render synchronous with main.js, which is what
// makes Stisla's own DOM scan (it runs right after its module loads) see the app.
const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      { path: "", name: "dashboard", component: Dashboard, meta: { title: "Dashboard" } },
      { path: "orders", name: "orders", component: Orders, meta: { title: "Orders" } },
      { path: "orders/new", name: "order-new", component: OrderNew, meta: { title: "New order" } },
      {
        path: "orders/:id",
        name: "order-detail",
        component: OrderDetail,
        meta: { title: (r) => `Order #${r.params.id}` },
      },
      { path: "products", name: "products", component: Products, meta: { title: "Products" } },
      { path: "products/new", name: "product-new", component: ProductNew, meta: { title: "New product" } },
      { path: "customers", name: "customers", component: Customers, meta: { title: "Customers" } },
      { path: "reports", name: "reports", component: Reports, meta: { title: "Reports" } },
      { path: "settings", name: "settings", component: Settings, meta: { title: "Settings" } },
      { path: "profile", name: "profile", component: Profile, meta: { title: "Profile" } },
      { path: "blank", name: "blank", component: Blank, meta: { title: "Blank page" } },
    ],
  },
  {
    path: "/",
    component: AuthLayout,
    children: [
      { path: "login", name: "login", component: Login, meta: { title: "Sign in" } },
      { path: "register", name: "register", component: Register, meta: { title: "Create account" } },
      { path: "forgot", name: "forgot", component: Forgot, meta: { title: "Reset password" } },
    ],
  },
  {
    path: "/",
    component: ErrorLayout,
    children: [
      { path: "403", component: Error403, meta: { title: "403" } },
      { path: "404", component: Error404, meta: { title: "404" } },
      { path: "500", component: Error500, meta: { title: "500" } },
      { path: ":pathMatch(.*)*", component: Error404, meta: { title: "404" } },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
  const title = to.meta.title;
  const page = typeof title === "function" ? title(to) : title;
  document.title = page ? `${page} · Meridian` : "Meridian";

  // Stisla only initialises elements that exist when it scans, so rescan once
  // the new route has painted (init skips components it already owns).
  queueMicrotask(() => window.Stisla?.init());
});

export default router;
