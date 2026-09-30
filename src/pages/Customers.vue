<template>
<div class="page content">
  <div class="content__container">
    <header class="page__header">
      <div class="page__headline">
        <h1 class="page__title">Customers</h1>
        <p class="page__description">Everyone who's placed an order with Meridian.</p>
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
        <button
          type="button"
          class="button button--primary"
          data-stisla-dialog-trigger="addCustomer"
        >
          <svg
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
          Add customer
        </button>
      </div>
    </header>

    <div class="page__body">
      <section class="page__section">
        <div class="card" data-table-select>
          <div class="card__header flex-wrap">
            <ListPills :options="customerFilters" label="Filter by status" />
            <ListSearch placeholder="Search customersâ€¦" label="Search customers" />
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
                      d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z"
                    />
                    <path
                      stroke-linecap="round"
                      d="m6 8l2.159 1.8c1.837 1.53 2.755 2.295 3.841 2.295s2.005-.765 3.841-2.296L18 8"
                    />
                  </g>
                </svg>
                Email
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
                      aria-label="Select all customers on this page"
                      :checked="allChecked"
                      @change="toggleAll"
                    />
                  </th>
                  <ListSortHead sort-key="name">Customer</ListSortHead>
                  <ListSortHead sort-key="location">Location</ListSortHead>
                  <ListSortHead sort-key="orders" end>Orders</ListSortHead>
                  <ListSortHead sort-key="spent" end>Spent</ListSortHead>
                  <ListSortHead sort-key="status">Status</ListSortHead>
                  <th scope="col" class="text-end"><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in rows"
                  :key="row.name"
                  :data-state="selected.includes(row.name) ? 'active' : undefined">
                  <td>
                    <input
                      class="checkbox"
                      type="checkbox"
                      data-select-row
                      :checked="selected.includes(row.name)"
                      @change="toggleRow(row.name)"
                      :aria-label="'Select ' + row.name"
                    />
                  </td>
                  <th scope="row">
                    <div class="flex items-center gap-3">
                      <span class="avatar avatar--sm avatar--circle" data-stisla-avatar>
                        <img
                          class="avatar__image"
                          :src="'https://i.pravatar.cc/64?img=' + row.img"
                          alt=""
                        />
                        <span class="avatar__fallback">{{ row.initials }}</span>
                      </span>
                      <div>
                        <RouterLink class="font-medium" to="/profile">{{ row.name }}</RouterLink>
                        <div class="text-xs text-muted-foreground">{{ row.email }}</div>
                      </div>
                    </div>
                  </th>
                  <td>{{ row.location }}</td>
                  <td class="text-end">{{ row.orders }}</td>
                  <td class="text-end"><span class="font-semibold">${{ row.spent }}</span></td>
                  <td><span class="badge badge--soft" :class="row.tone && 'badge--' + row.tone">{{ row.status }}</span></td>
                  <td class="text-end">
                    <div class="flex justify-end gap-1">
                      <a
                        :href="'mailto:' + row.email"
                        class="button button--ghost button--neutral button--icon-only button--sm"
                        :aria-label="'Email ' + row.name"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <g fill="none" stroke="currentColor" stroke-width="1.5">
                            <path
                              d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z"
                            />
                            <path
                              stroke-linecap="round"
                              d="m6 8l2.159 1.8c1.837 1.53 2.755 2.295 3.841 2.295s2.005-.765 3.841-2.296L18 8"
                            />
                          </g></svg
                      ></a>
                      <button
                        type="button"
                        class="button button--ghost button--danger button--icon-only button--sm"
                        data-stisla-dialog-trigger="deleteCustomer"
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

          <ListPagination label="Customers pages" />
        </div>
      </section>
    </div>
  </div>
</div>

<div
  class="dialog"
  id="addCustomer"
  data-stisla-dialog
  data-state="closed"
  role="dialog"
  aria-modal="true"
  aria-labelledby="addCustomerLabel"
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
      <div class="dialog__header">
        <h3 class="dialog__title" id="addCustomerLabel">Add customer</h3>
      </div>
      <div class="dialog__body flex flex-col gap-4">
        <div class="field">
          <label for="newCustName" class="field__label">Name</label>
          <input
            type="text"
            class="input"
            id="newCustName"
            placeholder="Jane Doe"
            autofocus
          />
        </div>
        <div class="field">
          <label for="newCustEmail" class="field__label">Email</label>
          <input
            type="email"
            class="input"
            id="newCustEmail"
            placeholder="jane@example.com"
          />
        </div>
      </div>
      <div class="dialog__footer">
        <button
          type="button"
          class="button button--ghost button--neutral"
          data-stisla-dialog-dismiss
        >
          Cancel
        </button>
        <button type="button" class="button button--primary" data-stisla-dialog-dismiss>
          Add customer
        </button>
      </div>
    </div>
  </div>
</div>

<div
  class="dialog dialog--sm"
  id="deleteCustomer"
  data-stisla-dialog
  data-state="closed"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="deleteCustomerLabel"
  aria-describedby="deleteCustomerDesc"
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
        <h3 class="dialog__title mb-1" id="deleteCustomerLabel">
          Delete {{ deleteTarget }}?
        </h3>
        <p class="text-muted-foreground" id="deleteCustomerDesc">
          This removes the customer and their history. This can't be undone.
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
          Delete customer
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
  aria-labelledby="delCustLabel"
  aria-describedby="delCustDesc"
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
        <h3 class="dialog__title mb-1" id="delCustLabel">
          Delete {{ selectedCount }} customers?
        </h3>
        <p class="text-muted-foreground" id="delCustDesc">
          The selected customers are permanently removed. This can't be undone.
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
          Delete customers
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
import { customers } from "../data/customers.js";

const customerFilters = ["All", "Active", "New", "VIP", "Churned"];
const money = (value) => Number(String(value).replace(/,/g, ""));

const { rows, selected, selectedCount, allChecked, toggleAll, toggleRow } = useListQuery(customers, {
  filterKey: "status",
  searchKeys: ["name", "email", "location"],
  sorters: {
    name: (r) => r.name,
    location: (r) => r.location,
    orders: (r) => r.orders,
    spent: (r) => money(r.spent),
    status: (r) => r.status,
  },
});

const deleteTarget = ref("");
</script>
