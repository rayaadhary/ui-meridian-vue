# Meridian dashboard template

A self-contained admin starter built on Stisla, ported to **Vue 3 + Vue Router**
with **Tailwind v4**. The markup, icons, and styling are the original Meridian
template; the port adds routing, reactive list pages, and nothing else. It drops
into any backend by pointing the router at your API.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve dist/
npm test         # node --test, covers the list query logic
npm run smoke    # SSR-renders every page/layout, catches broken templates
```

## Layout

```
index.html                 SPA shell: #app + CDN scripts (ApexCharts, @stisla/vanilla)
src/main.js                createApp -> router ready -> mount, then app-shell.js
src/router/index.js        history mode, one route per original page
src/layouts/               AppLayout (sidebar/topbar), AuthLayout, ErrorLayout
src/pages/                 one SFC per page
src/components/            ThemeToggle, ListPills, ListSearch, ListSortHead, ListPagination
src/composables/           useListQuery (filters, search, sort, paging, selection)
src/data/                  sample rows for the three list pages - swap for your API
assets/css/app.css         the single Tailwind compile unit
assets/css/meridian/       template styles (the Tailwind v4 dialect)
assets/js/                 app-shell.js, charts.js, password-toggle.js
```

## List pages

Orders, Products, and Customers keep their state in the query string
(`?filter=&q=&sort=&dir=&page=`), so a filtered view is a shareable URL.
`useListQuery` owns filtering, search, sorting, and paging over the sample rows
in `src/data/`; the row markup stays in the page SFC as a `v-for`. Swap the data
import for a `fetch` and the same binding works.

The four list components inject that state through a provide/inject key, so the
page templates stay declarative:

```html
<ListPills :options="orderFilters" label="Filter by status" />
<ListSearch placeholder="Search orders…" label="Search orders" />
<ListSortHead sort-key="date">Date</ListSortHead>
<ListPagination label="Orders pages" />
```

Row selection is local (not in the URL): checkboxes toggle `selected`, the bulk
bar and confirm dialogs read `selectedCount`.

## Stisla behavior

`@stisla/vanilla` loads precompiled from the CDN as a dependency you consume,
the same as ApexCharts. It auto-initializes once, then the router re-runs
`Stisla.init()` after every navigation so newly mounted markup (dialogs,
tooltips, sidebars) registers. Its DOM writes stay stable across re-renders
because Vue only patches attributes it knows about — never bind state that
Stisla owns (`aria-expanded` on its toggles, dialog `data-state`).

Theme switching lives in `ThemeToggle.vue`, which dispatches
`stisla:themechange`; the charts re-theme off that event.

## Icons

Icons are [Solar](https://icon-sets.iconify.design/solar/) by 480 Design,
licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and
baked into the markup as inline `<svg>`. There is no icon font, no CDN, and no
runtime library to load. An icon is just markup you can copy. The attribution
travels with the template in the `NOTICE` file — keep it when you redistribute.

### Swapping or adding an icon

1. Open [icon-sets.iconify.design/solar](https://icon-sets.iconify.design/solar/)
   and find an icon.
2. Click "SVG" to copy its markup.
3. Paste it where you want the icon. Drop it inside an `.icon-box` or a `.badge`
   and the existing CSS sizes it, or set `width`/`height` yourself.

```html
<span class="icon-box icon-box--primary">
  <svg width="1em" height="1em" viewBox="0 0 24 24"><!-- paste body --></svg>
</span>
```

Keep `fill="currentColor"` (or `stroke="currentColor"`) on the SVG so the icon
tracks the surrounding text color and theme.

## Styling

`assets/css/app.css` is the single compile unit. It pulls in the framework theme
and components from `@stisla/style`, the template styles under
`assets/css/meridian/`, and the Tailwind utilities the markup uses; Vite
compiles it during `npm run dev` and `npm run build`.

One edit is mandatory if you move this CSS into your own project: the `@source`
lines in `app.css` tell Tailwind which files to scan for class names. Repoint
them at wherever your views live. Skip it and your markup renders unstyled,
because the utilities it uses are never generated.
