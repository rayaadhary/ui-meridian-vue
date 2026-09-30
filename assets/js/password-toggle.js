// Reveal/hide for password fields: the toggle carries aria-controls pointing at
// its input, so this stays markup-driven and works for any auth form.
document.addEventListener("click", function (event) {
  var toggle = event.target.closest("[data-password-toggle]");
  if (!toggle) return;
  var input = document.getElementById(toggle.getAttribute("aria-controls"));
  if (!input) return;
  var reveal = input.type === "password";
  input.type = reveal ? "text" : "password";
  toggle.setAttribute("aria-pressed", String(reveal));
});
