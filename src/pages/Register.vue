<template>
<div>
  <h1 class="text-2xl">Create your account</h1>
  <p class="text-muted-foreground mt-1">Start selling on Meridian in minutes.</p>
</div>

<form class="flex flex-col gap-4">
  <div class="field">
    <label for="regName" class="field__label">Full name</label>
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
            <circle cx="12" cy="6" r="4" />
            <path
              d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"
            />
          </g></svg
      ></span>
      <input
        type="text"
        class="input"
        id="regName"
        placeholder="Jane Doe"
        autocomplete="name"
      />
    </div>
  </div>

  <div class="field">
    <label for="regEmail" class="field__label">Email</label>
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
        id="regEmail"
        placeholder="you@meridian.com"
        autocomplete="email"
      />
    </div>
  </div>

  <div class="field">
    <label for="regPassword" class="field__label">Password</label>
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
              d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z"
            />
            <circle cx="12" cy="16" r="2" />
            <path stroke-linecap="round" d="M6 10V8a6 6 0 1 1 12 0v2" />
          </g></svg
      ></span>
      <input
        type="password"
        class="input"
        id="regPassword"
        placeholder="••••••••••"
        autocomplete="new-password"
      />
      <button
        type="button"
        class="input-group__text"
        data-password-toggle
        aria-controls="regPassword"
        aria-label="Show password"
        aria-pressed="false"
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
              d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"
            />
            <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
          </g>
        </svg>
      </button>
    </div>
    <p class="field__description">At least 8 characters.</p>
  </div>

  <div class="field__item">
    <input class="checkbox" type="checkbox" id="regTerms" />
    <label class="field__label" for="regTerms"
      >I agree to the Terms and Privacy Policy</label
    >
  </div>

  <RouterLink class="button button--primary button--block button--lg" to="/">Create account
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
      /></svg
  ></RouterLink>
</form>

<p class="text-center text-sm text-muted-foreground">
  Already have an account? <RouterLink class="link" to="/login">Sign in</RouterLink>
</p>
</template>
