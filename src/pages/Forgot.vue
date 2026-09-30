<template>
<div>
  <h1 class="text-2xl">Reset password</h1>
  <p class="text-muted-foreground mt-1">Enter your email and we'll send a reset link.</p>
</div>

<form class="flex flex-col gap-4">
  <div class="field">
    <label for="forgotEmail" class="field__label">Email</label>
    <div class="input-group input-group--lg">
      <span class="input-group__text"
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
      ></span>
      <input
        type="email"
        class="input"
        id="forgotEmail"
        placeholder="you@meridian.com"
        autocomplete="email"
      />
    </div>
  </div>

  <button type="button" class="button button--primary button--block button--lg">
    Send reset link
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
        d="M4 12h16m0 0l-6-6m6 6l-6 6"
      />
    </svg>
  </button>
</form>

<p class="text-center">
  <RouterLink class="button button--ghost button--neutral button--sm" to="/login"><svg
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
        d="M20 12H4m0 0l6-6m-6 6l6 6"
      />
    </svg>
    Back to sign in</RouterLink>
</p>
</template>
