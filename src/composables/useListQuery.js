import { computed, provide, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Shared state for the list pages (filters, search, sort, paging, selection).
// Key so ListPills/ListSearch/ListSortHead/ListPagination can find it without prop drilling.
export const LIST = Symbol("list");

const FALLBACK = { filter: "All", q: "", sort: "", dir: "asc", page: 1 };

// Pure part: state -> rows for the current page. Kept free of Vue so it is testable
// with `node --test` (see test/list.test.js).
export function applyQuery(items, state, opts = {}) {
  const { filterKey, searchKeys = [], sorters = {}, pageSize = 10 } = opts;
  const { filter = FALLBACK.filter, q = "", sort = "", dir = FALLBACK.dir, page = FALLBACK.page } = state;

  let out = items;
  if (filterKey && filter && filter !== FALLBACK.filter) out = out.filter((r) => r[filterKey] === filter);

  const needle = q.trim().toLowerCase();
  if (needle) {
    out = out.filter((r) => searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(needle)));
  }

  const keyOf = sorters[sort];
  if (keyOf) {
    out = [...out].sort((a, b) => {
      const av = keyOf(a);
      const bv = keyOf(b);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return dir === "desc" ? -cmp : cmp;
    });
  }

  const total = out.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), pages);
  return {
    rows: out.slice((current - 1) * pageSize, current * pageSize),
    total,
    pages,
    page: current,
    from: total ? (current - 1) * pageSize + 1 : 0,
    to: Math.min(current * pageSize, total),
  };
}

export function useListQuery(items, opts = {}) {
  const route = useRoute();
  const router = useRouter();
  const rowKey = opts.rowKey ?? ((r) => r.id ?? r.sku ?? r.name);

  const state = computed(() => ({
    filter: String(route.query.filter ?? FALLBACK.filter),
    q: String(route.query.q ?? ""),
    sort: String(route.query.sort ?? opts.defaults?.sort ?? ""),
    dir: ["asc", "desc"].includes(route.query.dir) ? route.query.dir : opts.defaults?.dir ?? FALLBACK.dir,
    page: Number(route.query.page) || FALLBACK.page,
  }));

  const result = computed(() => applyQuery(items, state.value, opts));
  const selected = ref([]);

  // Single writer for the query string: drops values equal to their default and
  // resets paging unless the patch is about paging itself.
  function setQuery(patch) {
    const query = { ...route.query };
    for (const [k, v] of Object.entries(patch)) {
      const dflt = k === "filter" ? FALLBACK.filter : k === "page" ? FALLBACK.page : opts.defaults?.[k];
      if (v == null || v === "" || v === dflt) delete query[k];
      else query[k] = String(v);
    }
    if (!("page" in patch)) delete query.page;
    router.replace({ query });
  }

  const api = {
    filter: computed(() => state.value.filter),
    q: computed(() => state.value.q),
    sort: computed(() => state.value.sort),
    dir: computed(() => state.value.dir),
    page: computed(() => result.value.page),
    pages: computed(() => result.value.pages),
    rows: computed(() => result.value.rows),
    total: computed(() => result.value.total),
    from: computed(() => result.value.from),
    to: computed(() => result.value.to),
    selected,
    selectedCount: computed(() => selected.value.length),
    allChecked: computed(() => {
      const rows = result.value.rows;
      return rows.length > 0 && rows.every((r) => selected.value.includes(rowKey(r)));
    }),
    setQuery,
    setFilter: (filter) => setQuery({ filter }),
    setPage: (page) => setQuery({ page }),
    setSort(key) {
      if (state.value.sort === key) setQuery({ sort: key, dir: state.value.dir === "asc" ? "desc" : "asc" });
      else setQuery({ sort: key, dir: "asc" });
    },
    toggleRow(key) {
      selected.value = selected.value.includes(key)
        ? selected.value.filter((k) => k !== key)
        : [...selected.value, key];
    },
    toggleAll() {
      const keys = result.value.rows.map(rowKey);
      const keep = selected.value.filter((k) => !keys.includes(k));
      selected.value = api.allChecked.value ? keep : [...new Set([...keep, ...keys])];
    },
  };

  provide(LIST, api);
  return api;
}
