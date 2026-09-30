import { createApp, nextTick } from "vue";

import App from "./App.vue";
import router from "./router";
import "../assets/css/app.css";
import "../assets/js/password-toggle.js";

const app = createApp(App);
app.use(router);

router.isReady().then(() => {
  app.mount("#app");
  // app-shell.js scans for its triggers at load, so it has to load after the shell exists.
  import("../assets/js/app-shell.js").then(() => nextTick(() => window.Stisla?.init()));
});
