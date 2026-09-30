<template>
<div class="page content">
  <div class="content__container">
    <header class="page__header">
      <div class="page__headline">
        <h1 class="page__title">Products</h1>
        <p class="page__description">Your catalog of 10 products across four categories.</p>
      </div>
      <div class="page__action">
        <button type="button" class="button button--neutral">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15M12 3v13m0 0l4-4.375M12 16l-4-4.375"
            />
          </svg>
          Export
        </button>
        <RouterLink class="button button--primary" to="/products/new"><svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10" />
              <path stroke-linecap="round" d="M15 12h-3m0 0H9m3 0V9m0 3v3" />
            </g>
          </svg>
          Add product</RouterLink>
      </div>
    </header>

    <div class="page__body">
      <section class="page__section">
        <div class="card" data-table-select>
          <div class="card__header flex-wrap">
            <ListPills :options="productFilters" label="Filter by category" />
            <ListSearch placeholder="Search productsâ€¦" label="Search products" />
          </div>

          <div class="card__header card__header--alt flex-wrap" data-bulkbar :hidden="selectedCount === 0">
            <span><strong data-select-count>{{ selectedCount }}</strong> selected</span>
            <div class="flex flex-wrap items-center gap-2 ms-auto">
              <button
                type="button"
                class="button button--sm button--outline button--neutral"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g fill="none" stroke="currentColor" stroke-width="1.5">
                    <path
                      d="M9 12c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.54c.184-.077.417-.077.883-.077h3c.466 0 .699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883s0 .699-.076.883a1 1 0 0 1-.541.54c-.184.077-.417.077-.883.077h-3c-.466 0-.699 0-.883-.076a1 1 0 0 1-.54-.541C9 12.699 9 12.466 9 12Z"
                    />
                    <path
                      stroke-linecap="round"
                      d="M20.5 7v6c0 3.771 0 5.657-1.172 6.828S16.271 21 12.5 21h-1c-3.771 0-5.657 0-6.828-1.172S3.5 16.771 3.5 13V7"
                    />
                    <path
                      d="M2 5c0-.943 0-1.414.293-1.707S3.057 3 4 3h16c.943 0 1.414 0 1.707.293S22 4.057 22 5s0 1.414-.293 1.707S20.943 7 20 7H4c-.943 0-1.414 0-1.707-.293S2 5.943 2 5Z"
                    />
                  </g>
                </svg>
                Archive
              </button>
              <button
                type="button"
                class="button button--sm button--danger"
                data-stisla-dialog-trigger="deleteConfirm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g fill="none" stroke="currentColor" stroke-width="1.5">
                    <path
                      stroke-linecap="round"
                      d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79s-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5"
                    />
                    <path
                      d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.034-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6"
                    />
                  </g>
                </svg>
                Delete
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table--hover table--align-middle">
              <thead class="table__head--alt">
                <tr>
                  <th scope="col">
                    <input
                      class="checkbox"
                      type="checkbox"
                      data-select-all
                      aria-label="Select all products on this page"
                      :checked="allChecked"
                      @change="toggleAll"
                    />
                  </th>
                  <ListSortHead sort-key="name">Product</ListSortHead>
                  <ListSortHead sort-key="category">Category</ListSortHead>
                  <ListSortHead sort-key="price" end>Price</ListSortHead>
                  <ListSortHead sort-key="stock" end>Stock</ListSortHead>
                  <th scope="col">Status</th>
                  <th scope="col" class="text-end"><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in rows"
                  :key="row.sku"
                  :data-state="selected.includes(row.sku) ? 'active' : undefined">
                  <td>
                    <input
                      class="checkbox"
                      type="checkbox"
                      data-select-row
                      :checked="selected.includes(row.sku)"
                      @change="toggleRow(row.sku)"
                      :aria-label="'Select ' + row.name"
                    />
                  </td>
                  <th scope="row">
                    <div class="flex items-center gap-3">
                      <img
                        class="shrink-0 rounded-sm object-cover"
                        :src="row.image"
                        alt=""
                        width="40"
                        height="40"
                        loading="lazy"
                      />
                      <div>
                        <RouterLink class="font-medium" to="/products/new">{{ row.name }}</RouterLink>
                        <div class="text-xs text-muted-foreground">SKU {{ row.sku }}</div>
                      </div>
                    </div>
                  </th>
                  <td>{{ row.category }}</td>
                  <td class="text-end"><span class="font-semibold">${{ row.price }}</span></td>
                  <td class="text-end">{{ row.stock }}</td>
                  <td><span class="badge badge--soft" :class="row.tone && 'badge--' + row.tone">{{ row.status }}</span></td>
                  <td class="text-end">
                    <div class="flex justify-end gap-1">
                      <RouterLink class="button button--ghost button--neutral button--icon-only button--sm" :aria-label="'Edit ' + row.name" to="/products/new"><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            d="m14.36 4.079l.927-.927a3.932 3.932 0 0 1 5.561 5.561l-.927.927m-5.56-5.561s.115 1.97 1.853 3.707C17.952 9.524 19.92 9.64 19.92 9.64m-5.56-5.561l-8.522 8.52c-.577.578-.866.867-1.114 1.185a6.6 6.6 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.094 3.281m17.6-10.162L11.4 18.16c-.577.577-.866.866-1.184 1.114a6.6 6.6 0 0 1-1.211.749c-.364.173-.751.302-1.526.56l-3.281 1.094m0 0l-.802.268a1.06 1.06 0 0 1-1.342-1.342l.268-.802m1.876 1.876l-1.876-1.876"
                          /></svg
                      ></RouterLink>
                      <button
                        type="button"
                        class="button button--ghost button--danger button--icon-only button--sm"
                        data-stisla-dialog-trigger="deleteProduct"
                        @click="deleteTarget = row.name"
                        :aria-label="'Delete ' + row.name"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <g fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              stroke-linecap="round"
                              d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79s-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5"
                            />
                            <path
                              d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.034-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6"
                            />
                          </g>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <ListPagination label="Products pages" />
        </div>
      </section>
    </div>
  </div>
</div>

<div
  class="dialog dialog--sm"
  id="deleteProduct"
  data-stisla-dialog
  data-state="closed"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="deleteProductLabel"
  aria-describedby="deleteProductDesc"
  aria-hidden="true"
  tabindex="-1"
>
  <div class="dialog__backdrop" data-stisla-dialog-dismiss></div>
  <div class="dialog__panel">
    <div class="dialog__content">
      <button
        type="button"
        class="dialog__close"
        data-stisla-dialog-dismiss
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div class="dialog__body text-center pt-6">
        <span class="icon-box icon-box--danger icon-box--circle icon-box--lg mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path
                stroke-linecap="round"
                d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79s-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5"
              />
              <path
                d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.034-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6"
              />
            </g>
          </svg>
        </span>
        <h3 class="dialog__title mb-1" id="deleteProductLabel">
          Delete {{ deleteTarget }}?
        </h3>
        <p class="text-muted-foreground" id="deleteProductDesc">
          This removes the product from your catalog. This can't be undone.
        </p>
      </div>
      <div class="dialog__footer justify-center">
        <button
          type="button"
          class="button button--ghost button--neutral"
          data-stisla-dialog-dismiss
        >
          Cancel
        </button>
        <button type="button" class="button button--danger" data-stisla-dialog-dismiss>
          Delete product
        </button>
      </div>
    </div>
  </div>
</div>

<div
  class="dialog dialog--sm"
  id="deleteConfirm"
  data-stisla-dialog
  data-state="closed"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="delProdLabel"
  aria-describedby="delProdDesc"
  aria-hidden="true"
  tabindex="-1"
>
  <div class="dialog__backdrop" data-stisla-dialog-dismiss></div>
  <div class="dialog__panel">
    <div class="dialog__content">
      <button
        type="button"
        class="dialog__close"
        data-stisla-dialog-dismiss
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div class="dialog__body text-center pt-6">
        <span class="icon-box icon-box--danger icon-box--circle icon-box--lg mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path
                stroke-linecap="round"
                d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79s-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5"
              />
              <path
                d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.034-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6"
              />
            </g>
          </svg>
        </span>
        <h3 class="dialog__title mb-1" id="delProdLabel">
          Delete {{ selectedCount }} products?
        </h3>
        <p class="text-muted-foreground" id="delProdDesc">
          The selected products are permanently removed. This can't be undone.
        </p>
      </div>
      <div class="dialog__footer justify-center">
        <button
          type="button"
          class="button button--ghost button--neutral"
          data-stisla-dialog-dismiss
        >
          Cancel
        </button>
        <button type="button" class="button button--danger" data-stisla-dialog-dismiss>
          Delete products
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";
import ListPagination from "../components/ListPagination.vue";
import ListPills from "../components/ListPills.vue";
import ListSearch from "../components/ListSearch.vue";
import ListSortHead from "../components/ListSortHead.vue";
import { useListQuery } from "../composables/useListQuery";
import { products } from "../data/products.js";

const productFilters = ["All", "Coffee", "Equipment", "Supplies", "Gifts"];
const money = (value) => Number(String(value).replace(/,/g, ""));

const { rows, selected, selectedCount, allChecked, toggleAll, toggleRow } = useListQuery(products, {
  filterKey: "category",
  searchKeys: ["name", "sku", "category"],
  sorters: {
    name: (r) => r.name,
    category: (r) => r.category,
    price: (r) => money(r.price),
    stock: (r) => r.stock,
  },
});

const deleteTarget = ref("");
</script>
