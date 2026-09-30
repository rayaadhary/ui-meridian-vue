<template>
<main class="error-page">
  <ThemeToggle class="button button--ghost button--neutral button--icon-only error-page__toggle" />

  <RouterLink class="error-page__brand" to="/">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1.5l3.4 7.1 7.1 3.4-7.1 3.4-3.4 7.1-3.4-7.1L1.5 12l7.1-3.4z" opacity=".45" />
      <path d="M12 1.5l3.4 7.1L12 12 8.6 8.6z" />
    </svg>
    <span>Meridian</span>
  </RouterLink>

  <RouterView />
</main>
</template>

<script setup>
import ThemeToggle from "../components/ThemeToggle.vue";
</script>
