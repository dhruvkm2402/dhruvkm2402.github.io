/* Site behaviour. Loaded directly (not part of the npm uglify bundle). */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Click-to-play video. Sources stay in data-src so nothing downloads
     until the visitor asks for it.
     ---------------------------------------------------------------------- */
  document.querySelectorAll(".vplay").forEach(function (button) {
    button.addEventListener("click", function () {
      var video = button.parentNode.querySelector("video");
      if (!video) return;

      if (!video.src) {
        video.src = video.getAttribute("data-src");
      }
      video.controls = true;
      button.remove();
      video.play();
    });
  });

  /* ----------------------------------------------------------------------
     Email link. The address is base64 in the markup so it is not sitting in
     the page source as plain text for scrapers.
     ---------------------------------------------------------------------- */
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    var reveal = function (event) {
      var address = atob(el.getAttribute("data-mail"));
      el.setAttribute("href", "mailto:" + address);
      var label = el.querySelector("[data-mail-label]");
      if (label) label.textContent = address;
      el.removeEventListener("mouseenter", reveal);
      el.removeEventListener("focus", reveal);
      if (event && event.type === "click") {
        window.location.href = "mailto:" + address;
      }
    };
    el.addEventListener("mouseenter", reveal);
    el.addEventListener("focus", reveal);
    el.addEventListener("click", reveal);
  });

  /* ----------------------------------------------------------------------
     BibTeX disclosure + copy.
     ---------------------------------------------------------------------- */
  document.querySelectorAll("[data-bibtex-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.getAttribute("data-bibtex-toggle"));
      if (!target) return;
      var hidden = target.hasAttribute("hidden");
      if (hidden) {
        target.removeAttribute("hidden");
      } else {
        target.setAttribute("hidden", "");
      }
      button.setAttribute("aria-expanded", hidden ? "true" : "false");
    });
  });

  document.querySelectorAll("[data-bibtex-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.getAttribute("data-bibtex-copy"));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.textContent.trim()).then(function () {
        var original = button.textContent;
        button.textContent = "Copied";
        setTimeout(function () { button.textContent = original; }, 1600);
      });
    });
  });
})();
