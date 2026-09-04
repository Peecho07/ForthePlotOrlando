/* ============================================================
   FOR THE PLOT — shared behaviour on every page
   ============================================================ */
(function () {
  document.documentElement.classList.add("js-ready");

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var panel = document.getElementById("navPanel");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = panel.getAttribute("data-open") === "true";
      panel.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });
    panel.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        panel.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Highlight today's hours ---- */
  var day = new Date().getDay();
  document.querySelectorAll("[data-day]").forEach(function (row) {
    if (row.getAttribute("data-day").split(",").indexOf(String(day)) !== -1) {
      row.setAttribute("data-today", "true");
    }
  });

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach(function (n) {
    n.textContent = new Date().getFullYear();
  });

  /* ---- Tabs (partners page) ---- */
  var tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      history.replaceState(null, "", "#" + tab.getAttribute("aria-controls"));
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var i = tabs.indexOf(tab);
        if (e.key === "ArrowRight") { e.preventDefault(); select(tabs[(i + 1) % tabs.length], true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); select(tabs[(i - 1 + tabs.length) % tabs.length], true); }
        if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });

    var hash = window.location.hash.replace("#", "");
    var fromHash = hash && tabs.filter(function (t) {
      return t.getAttribute("aria-controls") === hash;
    })[0];
    if (fromHash) select(fromHash, false);
  }

  /* ---- Forms ----
     Nothing is wired to a backend yet. Until the shop connects a
     form service, submitting shows a message instead of failing
     silently. Replace this block with the real endpoint at launch. */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    var status = form.querySelector(".form__status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (status) {
        status.textContent = form.getAttribute("data-demo");
        status.setAttribute("data-state", "shown");
        status.focus();
      }
      form.reset();
    });
  });
})();
