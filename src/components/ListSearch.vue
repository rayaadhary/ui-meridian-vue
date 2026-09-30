<template>
  <form class="input-group ms-auto w-full md:w-60 mb-4 md:mb-0" role="search" @submit.prevent>
    <span class="input-group__text"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11.5" cy="11.5" r="9.5" />
          <path stroke-linecap="round" d="M18.5 18.5L22 22" />
        </g></svg
    ></span>
    <input
      type="search"
      name="q"
      class="input"
      :placeholder="placeholder"
      :aria-label="label"
      :value="q"
      @input="setQuery({ q: $event.target.value })"
    />
  </form>
</template>

<script setup>
import { inject } from "vue";
import { LIST } from "../composables/useListQuery";

defineProps({
  placeholder: { type: String, default: "Search…" },
  label: { type: String, default: "Search" },
});

const { q, setQuery } = inject(LIST);
</script>
