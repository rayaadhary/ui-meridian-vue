<template>
  <div class="card__footer">
    <span class="text-xs text-muted-foreground">Showing {{ from }}–{{ to }} of {{ total }}</span>
    <nav class="ms-auto" :aria-label="label">
      <ul class="pagination">
        <li>
          <component
            :is="page > 1 ? 'a' : 'span'"
            class="pagination__button"
            :href="page > 1 ? `?page=${page - 1}` : undefined"
            :aria-disabled="page <= 1 ? 'true' : undefined"
            aria-label="Previous"
            @click.prevent="page > 1 && setPage(page - 1)"
            ><svg
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
                d="m15 5l-6 7l6 7"
              /></svg
          ></component>
        </li>
        <li v-for="n in pages" :key="n">
          <a
            class="pagination__button"
            :href="`?page=${n}`"
            :data-state="n === page ? 'active' : undefined"
            :aria-current="n === page ? 'page' : undefined"
            @click.prevent="setPage(n)"
            >{{ n }}</a
          >
        </li>
        <li>
          <component
            :is="page < pages ? 'a' : 'span'"
            class="pagination__button"
            :href="page < pages ? `?page=${page + 1}` : undefined"
            :aria-disabled="page >= pages ? 'true' : undefined"
            aria-label="Next"
            @click.prevent="page < pages && setPage(page + 1)"
            ><svg
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
                d="m9 5l6 7l-6 7"
              /></svg
          ></component>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { LIST } from "../composables/useListQuery";

defineProps({
  label: { type: String, default: "Pagination" },
});

const { page, pages, from, to, total, setPage } = inject(LIST);
</script>
