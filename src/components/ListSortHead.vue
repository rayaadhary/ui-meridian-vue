<template>
  <th scope="col" :class="end ? 'text-end' : undefined" :aria-sort="ariaSort">
    <a
      class="table__sort"
      :href="`?sort=${sortKey}`"
      :data-state="active ? dir : undefined"
      @click.prevent="setSort(sortKey)"
      ><slot
    /></a>
  </th>
</template>

<script setup>
import { computed, inject } from "vue";
import { LIST } from "../composables/useListQuery";

const props = defineProps({
  sortKey: { type: String, required: true },
  end: { type: Boolean, default: false },
});

const { sort, dir, setSort } = inject(LIST);
const active = computed(() => sort.value === props.sortKey);
const ariaSort = computed(() => (active.value ? (dir.value === "asc" ? "ascending" : "descending") : undefined));
</script>
