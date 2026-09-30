<template>
<main class="auth">
  <section class="auth__panel">
    <ThemeToggle class="button button--ghost button--neutral button--icon-only auth__toggle" />
    <div class="auth__form">
      <RouterView />
    </div>
  </section>

  <aside class="auth__aside">
    <RouterLink class="auth__brand" to="/">
      <span class="auth__brand-mark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M12 1.5l3.4 7.1 7.1 3.4-7.1 3.4-3.4 7.1-3.4-7.1L1.5 12l7.1-3.4z"
            opacity=".45"
          />
          <path d="M12 1.5l3.4 7.1L12 12 8.6 8.6z" />
        </svg>
      </span>
      <span class="auth__brand-text">
        <span class="auth__brand-name">Meridian</span>
      </span>
    </RouterLink>
    <div class="auth__pitch">
      <h2 class="auth__pitch-title">Run your <span>commerce, calmly.</span></h2>
      <p class="auth__pitch-lede">
        Orders, revenue, and customer intelligence â€” the whole store observed from one calm
        dashboard.
      </p>
    </div>
  </aside>
</main>
</template>

<script setup>
import ThemeToggle from "../components/ThemeToggle.vue";
</script>
