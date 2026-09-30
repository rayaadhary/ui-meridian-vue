import test from "node:test";
import assert from "node:assert/strict";
import { applyQuery } from "../src/composables/useListQuery.js";

const items = [
  { id: 3, name: "Beta", status: "Pending", price: "10.00" },
  { id: 1, name: "Alpha", status: "Done", price: "2,490.50" },
  { id: 2, name: "gamma", status: "Pending", price: "5.00" },
];

const opts = {
  filterKey: "status",
  searchKeys: ["name"],
  sorters: { id: (r) => r.id, price: (r) => Number(r.price.replace(/,/g, "")) },
  pageSize: 2,
};

test("filter matches the pill value and All passes everything", () => {
  assert.equal(applyQuery(items, { filter: "All" }, opts).total, 3);
  const pending = applyQuery(items, { filter: "Pending" }, opts);
  assert.equal(pending.total, 2);
  assert.ok(pending.rows.every((r) => r.status === "Pending"));
});

test("search is case-insensitive over searchKeys", () => {
  const hit = applyQuery(items, { q: "ALP" }, opts);
  assert.deepEqual(
    hit.rows.map((r) => r.id),
    [1],
  );
  assert.equal(applyQuery(items, { q: "   " }, opts).total, 3);
});

test("sort orders asc and desc, numbers not lexically", () => {
  const all = { ...opts, pageSize: 10 };
  assert.deepEqual(
    applyQuery(items, { sort: "id", dir: "asc" }, all).rows.map((r) => r.id),
    [1, 2, 3],
  );
  assert.deepEqual(
    applyQuery(items, { sort: "id", dir: "desc" }, all).rows.map((r) => r.id),
    [3, 2, 1],
  );
  // 2490.50 must beat 10.00 as a number, not as a string
  assert.deepEqual(
    applyQuery(items, { sort: "price", dir: "desc" }, all).rows.map((r) => r.id),
    [1, 3, 2],
  );
});

test("paging slices rows and reports the range", () => {
  const first = applyQuery(items, { page: 1 }, opts);
  assert.deepEqual(
    first.rows.map((r) => r.id),
    [3, 1],
  );
  assert.equal(first.pages, 2);
  assert.equal(first.from, 1);
  assert.equal(first.to, 2);

  const second = applyQuery(items, { page: 2 }, opts);
  assert.deepEqual(
    second.rows.map((r) => r.id),
    [2],
  );
  assert.equal(second.from, 3);
  assert.equal(second.to, 3);
});

test("page out of range clamps, empty result reports 0", () => {
  assert.equal(applyQuery(items, { page: 99 }, opts).page, 2);
  assert.equal(applyQuery(items, { page: 0 }, opts).page, 1);

  const none = applyQuery(items, { q: "nope" }, opts);
  assert.equal(none.total, 0);
  assert.equal(none.pages, 1);
  assert.equal(none.from, 0);
  assert.equal(none.to, 0);
  assert.deepEqual(none.rows, []);
});
