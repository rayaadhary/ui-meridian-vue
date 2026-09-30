<template>
<div class="page content">
  <div class="content__container">
    <header class="page__header">
      <div class="page__headline">
        <h1 class="page__title">Orders</h1>
        <p class="page__description">Track, fulfil, and refund customer orders.</p>
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
        <RouterLink class="button button--primary" to="/orders/new"><svg
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
          New order</RouterLink>
      </div>
    </header>

    <div class="page__body">
      <section class="page__section">
        <div class="card" data-table-select>
          <div class="card__header flex-wrap">
            <ListPills :options="orderFilters" label="Filter by status" />
            <ListSearch placeholder="Search ordersâ€¦" label="Search orders" />
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
                  <g fill="none">
                    <path
                      fill="currentColor"
                      d="M7.506 15.265a.75.75 0 0 0 1.446-.4zm-1.43-7.99l.724-.2zM4.705 5.92l-.2.723zM3.2 4.725a.75.75 0 1 0-.402 1.445zm16.988 11a.75.75 0 1 0-.378-1.451zm-9.991 1.834c.31 1.12-.37 2.303-1.574 2.616L9 21.626c1.977-.513 3.185-2.502 2.643-4.467zm-1.574 2.616c-1.212.315-2.428-.389-2.74-1.519l-1.446.4c.54 1.955 2.594 3.082 4.563 2.57zm-2.74-1.519c-.31-1.12.37-2.303 1.574-2.616l-.377-1.45c-1.977.513-3.186 2.502-2.643 4.467zm1.574-2.616c1.212-.315 2.428.389 2.74 1.519l1.446-.4c-.54-1.955-2.594-3.082-4.563-2.57zm1.494-1.175L6.8 7.075l-1.446.4l2.152 7.79zM4.904 5.197l-1.703-.472l-.402 1.445l1.704.473zM6.8 7.075a2.71 2.71 0 0 0-1.896-1.878l-.4 1.446c.425.118.742.44.85.831zm4.31 11.01l9.079-2.36l-.378-1.451l-9.079 2.36z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      d="M9.565 8.73c-.485-1.755-.727-2.633-.315-3.324c.411-.692 1.316-.927 3.126-1.398l1.92-.498c1.81-.47 2.715-.706 3.428-.307c.713.4.956 1.277 1.44 3.033l.515 1.862c.485 1.755.728 2.633.316 3.325c-.412.691-1.317.927-3.127 1.397l-1.92.499c-1.81.47-2.715.705-3.428.306c-.713-.4-.955-1.277-1.44-3.032z"
                    />
                  </g>
                </svg>
                Mark shipped
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
                      aria-label="Select all orders on this page"
                      :checked="allChecked"
                      @change="toggleAll"
                    />
                  </th>
                  <ListSortHead sort-key="id">Order</ListSortHead>
                  <ListSortHead sort-key="name">Customer</ListSortHead>
                  <ListSortHead sort-key="date">Date</ListSortHead>
                  <ListSortHead sort-key="items" end>Items</ListSortHead>
                  <ListSortHead sort-key="total" end>Total</ListSortHead>
                  <ListSortHead sort-key="status">Status</ListSortHead>
                  <th scope="col" class="text-end"><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in rows"
                  :key="row.id"
                  :data-state="selected.includes(row.id) ? 'active' : undefined">
                  <td>
                    <input
                      class="checkbox"
                      type="checkbox"
                      data-select-row
                      :checked="selected.includes(row.id)"
                      @change="toggleRow(row.id)"
                      :aria-label="'Select order #' + row.id"
                    />
                  </td>
                  <th scope="row">
                    <RouterLink class="link" :to="'/orders/' + row.id"><code>#{{ row.id }}</code></RouterLink>
                  </th>
                  <td>
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
                        <div class="font-medium">{{ row.name }}</div>
                        <div class="text-xs text-muted-foreground">{{ row.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ row.date }}</td>
                  <td class="text-end">{{ row.items }}</td>
                  <td class="text-end"><span class="font-semibold">${{ row.total }}</span></td>
                  <td>
                    <span class="badge badge--soft" :class="row.tone && 'badge--' + row.tone">
                      <svg v-if="row.status === 'Pending'"
                       xmlns="http://www.w3.org/2000/svg"
                       width="1em"
                       height="1em"
                       viewBox="0 0 24 24"
                       aria-hidden="true"
                     >
                       <g fill="none" stroke="currentColor" stroke-width="1.5">
                         <circle cx="12" cy="12" r="10" />
                         <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           d="M12 8v4l2.5 2.5"
                         />
                       </g>
                     </svg>
                      <svg v-else-if="row.status === 'Shipped'"
                       xmlns="http://www.w3.org/2000/svg"
                       width="1em"
                       height="1em"
                       viewBox="0 0 24 24"
                       aria-hidden="true"
                     >
                       <g fill="none">
                         <path
                           fill="currentColor"
                           d="M7.506 15.265a.75.75 0 0 0 1.446-.4zm-1.43-7.99l.724-.2zM4.705 5.92l-.2.723zM3.2 4.725a.75.75 0 1 0-.402 1.445zm16.988 11a.75.75 0 1 0-.378-1.451zm-9.991 1.834c.31 1.12-.37 2.303-1.574 2.616L9 21.626c1.977-.513 3.185-2.502 2.643-4.467zm-1.574 2.616c-1.212.315-2.428-.389-2.74-1.519l-1.446.4c.54 1.955 2.594 3.082 4.563 2.57zm-2.74-1.519c-.31-1.12.37-2.303 1.574-2.616l-.377-1.45c-1.977.513-3.186 2.502-2.643 4.467zm1.574-2.616c1.212-.315 2.428.389 2.74 1.519l1.446-.4c-.54-1.955-2.594-3.082-4.563-2.57zm1.494-1.175L6.8 7.075l-1.446.4l2.152 7.79zM4.904 5.197l-1.703-.472l-.402 1.445l1.704.473zM6.8 7.075a2.71 2.71 0 0 0-1.896-1.878l-.4 1.446c.425.118.742.44.85.831zm4.31 11.01l9.079-2.36l-.378-1.451l-9.079 2.36z"
                         />
                         <path
                           stroke="currentColor"
                           stroke-width="1.5"
                           d="M9.565 8.73c-.485-1.755-.727-2.633-.315-3.324c.411-.692 1.316-.927 3.126-1.398l1.92-.498c1.81-.47 2.715-.706 3.428-.307c.713.4.956 1.277 1.44 3.033l.515 1.862c.485 1.755.728 2.633.316 3.325c-.412.691-1.317.927-3.127 1.397l-1.92.499c-1.81.47-2.715.705-3.428.306c-.713-.4-.955-1.277-1.44-3.032z"
                         />
                       </g>
                     </svg>
                      <svg v-else-if="row.status === 'Completed'"
                       xmlns="http://www.w3.org/2000/svg"
                       width="1em"
                       height="1em"
                       viewBox="0 0 24 24"
                       aria-hidden="true"
                     >
                       <g fill="none" stroke="currentColor" stroke-width="1.5">
                         <circle cx="12" cy="12" r="10" />
                         <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           d="m8.5 12.5l2 2l5-5"
                         />
                       </g>
                     </svg>
                      <svg v-else-if="row.status === 'Refunded'"
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
                         d="m18.364 8.05l-.707-.707a8 8 0 1 0 2.28 4.658m-1.573-3.95h-4.243m4.243 0V3.807"
                       />
                     </svg>
                      <svg v-else-if="row.status === 'Processing'"
                       xmlns="http://www.w3.org/2000/svg"
                       width="1em"
                       height="1em"
                       viewBox="0 0 24 24"
                       aria-hidden="true"
                     >
                       <path
                         fill="currentColor"
                         d="M3.68 11.333h-.75zm0 1.667l-.528.532a.75.75 0 0 0 1.056 0zm2.208-1.134A.75.75 0 1 0 4.83 10.8zM2.528 10.8a.75.75 0 0 0-1.056 1.065zm16.088-3.408a.75.75 0 1 0 1.277-.786zM12.079 2.25c-5.047 0-9.15 4.061-9.15 9.083h1.5c0-4.182 3.42-7.583 7.65-7.583zm-9.15 9.083V13h1.5v-1.667zm1.28 2.2l1.679-1.667L4.83 10.8l-1.68 1.667zm0-1.065L2.528 10.8l-1.057 1.065l1.68 1.666zm15.684-5.86A9.16 9.16 0 0 0 12.08 2.25v1.5a7.66 7.66 0 0 1 6.537 3.643zM20.314 11l.527-.533a.75.75 0 0 0-1.054 0zM18.1 12.133a.75.75 0 0 0 1.055 1.067zm3.373 1.067a.75.75 0 1 0 1.054-1.067zM5.318 16.606a.75.75 0 1 0-1.277.788zm6.565 5.144c5.062 0 9.18-4.058 9.18-9.083h-1.5c0 4.18-3.43 7.583-7.68 7.583zm9.18-9.083V11h-1.5v1.667zm-1.276-2.2L18.1 12.133l1.055 1.067l1.686-1.667zm0 1.066l1.686 1.667l1.054-1.067l-1.686-1.666zM4.04 17.393a9.2 9.2 0 0 0 7.842 4.357v-1.5a7.7 7.7 0 0 1-6.565-3.644z"
                       />
                     </svg>
                      <svg v-else-if="row.status === 'Cancelled'"
                       xmlns="http://www.w3.org/2000/svg"
                       width="1em"
                       height="1em"
                       viewBox="0 0 24 24"
                       aria-hidden="true"
                     >
                       <g fill="none" stroke="currentColor" stroke-width="1.5">
                         <circle cx="12" cy="12" r="10" />
                         <path stroke-linecap="round" d="m14.5 9.5l-5 5m0-5l5 5" />
                       </g>
                     </svg>
                      {{ row.status }}
                    </span>
                  </td>
                  <td class="text-end">
                    <div class="flex justify-end gap-1">
                      <RouterLink class="button button--ghost button--neutral button--icon-only button--sm" :aria-label="'Edit order #' + row.id" to="/orders/new"><svg
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
                        data-stisla-dialog-trigger="refundConfirm"
                        @click="refundTarget = '#' + row.id"
                        :aria-label="'Refund order #' + row.id"
                      >
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
                            d="m18.364 8.05l-.707-.707a8 8 0 1 0 2.28 4.658m-1.573-3.95h-4.243m4.243 0V3.807"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <ListPagination label="Orders pages" />
        </div>
      </section>
    </div>
  </div>
</div>

<div
  class="dialog dialog--sm"
  id="refundConfirm"
  data-stisla-dialog
  data-state="closed"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="refundConfirmLabel"
  aria-describedby="refundConfirmDesc"
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
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m18.364 8.05l-.707-.707a8 8 0 1 0 2.28 4.658m-1.573-3.95h-4.243m4.243 0V3.807"
            />
          </svg>
        </span>
        <h3 class="dialog__title mb-1" id="refundConfirmLabel">
          Refund order {{ refundTarget }}?
        </h3>
        <p class="text-muted-foreground" id="refundConfirmDesc">
          The customer is refunded the full amount. This can't be undone.
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
          Refund order
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
  aria-labelledby="deleteConfirmLabel"
  aria-describedby="deleteConfirmDesc"
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
        <h3 class="dialog__title mb-1" id="deleteConfirmLabel">
          Delete {{ selectedCount }} orders?
        </h3>
        <p class="text-muted-foreground" id="deleteConfirmDesc">
          The selected orders are permanently removed. This can't be undone.
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
          Delete orders
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
import { orders } from "../data/orders.js";

const orderFilters = ["All", "Pending", "Shipped", "Completed", "Refunded"];
const money = (value) => Number(String(value).replace(/,/g, ""));

const { rows, selected, selectedCount, allChecked, toggleAll, toggleRow } = useListQuery(orders, {
  filterKey: "status",
  searchKeys: ["name", "email", "id"],
  sorters: {
    id: (r) => r.id,
    name: (r) => r.name,
    date: (r) => Date.parse(r.date),
    items: (r) => r.items,
    total: (r) => money(r.total),
    status: (r) => r.status,
  },
  defaults: { sort: "date", dir: "desc" },
});

const refundTarget = ref("");
</script>
