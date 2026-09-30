<template>
  <div class="toggle-group mt-4 md:mt-0" role="radiogroup" :aria-label="label">
    <button
      v-for="option in options"
      :key="option"
      type="button"
      class="toggle"
      role="radio"
      :aria-checked="filter === option"
      :data-state="filter === option ? 'active' : undefined"
      @click="setFilter(option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { LIST } from "../composables/useListQuery";

defineProps({
  options: { type: Array, required: true },
  label: { type: String, default: "Filter" },
});

const { filter, setFilter } = inject(LIST);
</script>
