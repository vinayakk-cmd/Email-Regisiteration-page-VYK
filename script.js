// ─────────────────────────────────────────
//  script.js — VYK EDITZ Landing Page
// ─────────────────────────────────────────

(function () {
  "use strict";

  /* ── DOM refs ── */
  const emailInput = document.getElementById("emailInput");
  const joinBtn    = document.getElementById("joinBtn");
  const toast      = document.getElementById("toast");
  const formRow    = joinBtn.closest(".form-row");
  const formError  = document.getElementById("formError");

  // BUG FIX: guard — if any element is missing, bail gracefully
  if (!emailInput || !joinBtn || !toast || !formRow || !formError) {
    console.warn("VYK: One or more required DOM elements are missing.");
    return;
  }

  /* ── State ── */
  let toastTimer   = null;
  let resetTimer   = null;
  let isSubmitting = false;   // BUG FIX: prevent double-clicks

  /* ── Email validation ── */
  function isValidEmail(val) {
    // Slightly stricter than the original — requires a TLD of at least 2 chars
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  }

  /* ── Show inline error ── */
  function showError(msg) {
    msg = msg || "Please enter a valid email address.";
    formRow.classList.add("error");
    formError.textContent = msg;
    emailInput.focus();
  }

  /* ── Clear error ── */
  function clearError() {
    formRow.classList.remove("error");
    formError.textContent = "";
  }

  /* ── Show toast ── */
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    // BUG FIX: clear any existing timer so rapid calls don't break the hide
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  /* ── Reset button state ── */
  function resetButton() {
    joinBtn.textContent         = "Register";
    joinBtn.style.background    = "";
    joinBtn.disabled            = false;
    isSubmitting                = false;
  }

  /* ── Handle submit ── */
  function handleJoin() {
    // BUG FIX: ignore while already submitting
    if (isSubmitting) return;

    const val = emailInput.value.trim();

    if (!val) {
      showError("Email cannot be empty.");
      return;
    }

    if (!isValidEmail(val)) {
      showError("Please enter a valid email address.");
      return;
    }

    clearError();
    isSubmitting     = true;
    joinBtn.disabled = true;

    // Simulate async register (replace with real fetch if needed)
    setTimeout(function () {
      /* ── Success state ── */
      joinBtn.textContent      = "✓ Registered!";
      joinBtn.style.background = "#16a34a";
      emailInput.value         = "";

      showToast("🎉 You're on the waitlist!");

      // BUG FIX: clear old reset timer before setting a new one
      clearTimeout(resetTimer);
      resetTimer = setTimeout(resetButton, 3000);
    }, 400); // small delay makes it feel async / real
  }

  /* ── Event listeners ── */
  joinBtn.addEventListener("click", handleJoin);

  emailInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") handleJoin();
  });

  // Clear error as user types
  emailInput.addEventListener("input", function () {
    if (formRow.classList.contains("error")) clearError();
  });

})();