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
     Contact form. Submits to the configured endpoint over fetch so the page
     never navigates away and, more to the point, so the destination address
     never appears anywhere in the page: not in the source, not in a mailto,
     not after a click. The endpoint holds it.
     ---------------------------------------------------------------------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("contact-status");
    var button = form.querySelector("button[type=submit]");

    var setStatus = function (message, state) {
      if (!status) return;
      status.textContent = message;
      status.className = "form-status" + (state ? " form-status--" + state : "");
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var endpoint = form.getAttribute("action");
      if (!endpoint) {
        setStatus(
          "This form isn't connected yet. Reach me on LinkedIn in the meantime.",
          "error"
        );
        return;
      }

      if (form.elements._gotcha && form.elements._gotcha.value) return; // bot

      button.disabled = true;
      setStatus("Sending…");

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error(response.status);
          form.reset();
          setStatus("Thanks, that reached me. I'll get back to you.", "ok");
        })
        .catch(function () {
          setStatus(
            "That didn't send. Try again, or reach me on LinkedIn.",
            "error"
          );
        })
        .then(function () {
          button.disabled = false;
        });
    });
  }

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
