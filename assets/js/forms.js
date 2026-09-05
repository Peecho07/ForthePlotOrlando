/* ============================================================
   FOR THE PLOT — FORM DELIVERY

   Every form on the site posts through this file. It works with
   any of the services below without touching the HTML.

   ------------------------------------------------------------
   TO GO LIVE: fill in ENDPOINT and set PROVIDER.
   ------------------------------------------------------------

   Formspree  (formspree.io — free tier, 50 submissions a month)
     1. Sign up, create a form, copy the ID from the URL it gives
        you: https://formspree.io/f/xdorwkgz  ->  "xdorwkgz"
     2. PROVIDER = "formspree"
        ENDPOINT = "xdorwkgz"

   Web3Forms  (web3forms.com — free, unlimited, no account)
     1. Enter the shop's email at web3forms.com, they send an
        access key back.
     2. PROVIDER = "web3forms"
        ENDPOINT = "the-access-key-they-emailed"

   Anything else (a Power Automate flow, a Zapier catch hook, a
   custom script)
        PROVIDER = "custom"
        ENDPOINT = "https://the-full-url-to-post-to"
     Receives a JSON body of the form's fields plus _form and
     _page.

   Leave ENDPOINT empty and the forms run in DEMO MODE: they
   behave exactly as they will in production, including the
   pause and the success message, but nothing is transmitted.
   Good for showing the site to someone. Not good for launch —
   the browser console says so on every page load.
   ============================================================ */

window.FTP_FORMS = {
  PROVIDER: "formspree",
  ENDPOINT: "",

  /* Where to send people if delivery fails. */
  FALLBACK: "https://www.instagram.com/fortheplotorlando/",
  FALLBACK_LABEL: "message the shop on Instagram"
};

(function () {
  var cfg = window.FTP_FORMS;
  var forms = document.querySelectorAll("form[data-form]");
  if (!forms.length) return;

  var live = Boolean(cfg.ENDPOINT);

  if (!live) {
    console.warn(
      "[For The Plot] Forms are in DEMO MODE — submissions are not being " +
      "delivered anywhere. Set ENDPOINT in assets/js/forms.js before launch."
    );
  }

  /* Build the request for whichever service is configured. */
  function request(name, fields) {
    var url, body;

    if (cfg.PROVIDER === "formspree") {
      url = "https://formspree.io/f/" + cfg.ENDPOINT;
      body = fields;

    } else if (cfg.PROVIDER === "web3forms") {
      url = "https://api.web3forms.com/submit";
      body = {};
      Object.keys(fields).forEach(function (k) { body[k] = fields[k]; });
      body.access_key = cfg.ENDPOINT;
      body.subject = "For The Plot — " + name;

    } else {
      url = cfg.ENDPOINT;
      body = fields;
    }

    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body)
    }).then(function (res) {
      if (!res.ok) throw new Error("Delivery failed with status " + res.status);
      return res;
    });
  }

  /* Demo mode: same timing and same outcome, no network. */
  function pretend() {
    return new Promise(function (resolve) { setTimeout(resolve, 700); });
  }

  function collect(form) {
    var out = {};
    var data = new FormData(form);
    data.forEach(function (value, key) {
      if (key.charAt(0) === "_") return;          // honeypot and internals
      out[key] = typeof value === "string" ? value.trim() : value;
    });
    out._form = form.getAttribute("data-form");
    out._page = document.title;
    return out;
  }

  function say(status, text, state) {
    status.textContent = text;
    status.setAttribute("data-state", state);
  }

  forms.forEach(function (form) {
    var name = form.getAttribute("data-form");
    var status = form.querySelector(".form__status");
    var button = form.querySelector('button[type="submit"], button:not([type])');
    var success = form.getAttribute("data-success") ||
                  "Thanks. The shop has your message.";

    /* Spam trap. Bots fill every field they find; people never see this one. */
    var trap = document.createElement("input");
    trap.type = "text";
    trap.name = "_gotcha";
    trap.tabIndex = -1;
    trap.autocomplete = "off";
    trap.className = "form__trap";
    trap.setAttribute("aria-hidden", "true");
    form.appendChild(trap);

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (trap.value) { say(status, success, "ok"); form.reset(); return; }
      if (form.hasAttribute("data-sending")) return;

      var label = button ? button.textContent : "";
      form.setAttribute("data-sending", "true");
      if (button) { button.disabled = true; button.textContent = "Sending…"; }
      say(status, "Sending…", "working");

      var sent = live ? request(name, collect(form)) : pretend();

      sent.then(function () {
        say(status, success, "ok");
        form.reset();
      }).catch(function (err) {
        console.error("[For The Plot] " + name + " form:", err);
        say(
          status,
          "That did not send. Please try again in a moment, or " +
          cfg.FALLBACK_LABEL + ".",
          "error"
        );
      }).then(function () {
        form.removeAttribute("data-sending");
        if (button) { button.disabled = false; button.textContent = label; }
        status.focus();
      });
    });
  });
})();
