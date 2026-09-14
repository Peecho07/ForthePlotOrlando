/* ============================================================
   FOR THE PLOT — COFFEE SHOP MENU
   Builds the drinks menu, and the index above it, from the
   single list in assets/js/menu-data.js. Nothing to edit here
   when the menu changes — edit the data file.
   ============================================================ */
(function () {
  var sections = window.FTP_MENU;
  var index = document.getElementById("menuIndex");
  var board = document.getElementById("menuBoard");
  if (!board || !sections || !sections.length) return;

  /* ---- Prices ----
     The data file writes plain numbers as strings. Everything the
     reader sees is assembled here, so a price is formatted one way
     across the whole board. */
  function money(value) {
    var n = parseFloat(value);
    if (isNaN(n)) return String(value);
    if (n === 0) return "No charge";
    var amount = "$" + Math.abs(n).toFixed(2);
    return n < 0 ? amount + " off" : amount;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* The price cell: one figure sits on the leader line, several
     stack under each other with their size beside them. */
  function priceCell(item) {
    var cell = el("div", "menu__price");
    if (item.sizes && item.sizes.length) {
      item.sizes.forEach(function (size) {
        var row = el("span", "menu__size");
        row.appendChild(el("span", "menu__size-label", size.label));
        row.appendChild(el("span", "menu__figure", money(size.price)));
        cell.appendChild(row);
      });
    } else if (item.price != null) {
      cell.appendChild(el("span", "menu__figure", money(item.price)));
    }
    return cell;
  }

  function drink(item) {
    var li = el("li", "menu__item");
    if (item.flag === "signature") li.setAttribute("data-signature", "true");

    var line = el("div", "menu__line");

    var head = el("div", "menu__head");
    head.appendChild(el("h3", "menu__name", item.name));
    if (item.tags && item.tags.length) {
      var tags = el("ul", "menu__tags");
      item.tags.forEach(function (tag) { tags.appendChild(el("li", null, tag)); });
      head.appendChild(tags);
    }

    line.appendChild(head);
    line.appendChild(el("span", "menu__leader"));
    line.appendChild(priceCell(item));
    li.appendChild(line);

    if (item.desc) li.appendChild(el("p", "menu__desc", item.desc));
    return li;
  }

  function block(section) {
    var wrap = el("section", "menu__section");
    wrap.id = section.id;
    wrap.setAttribute("aria-labelledby", section.id + "-h");

    var head = el("header", "menu__section-head");
    if (section.num) head.appendChild(el("p", "volume", "Volume " + section.num));
    head.appendChild(el("h2", "h-sub", section.name)).id = section.id + "-h";
    if (section.blurb) head.appendChild(el("p", "dim menu__blurb", section.blurb));
    wrap.appendChild(head);

    var list = el("ul", "menu");
    section.items.forEach(function (item) { list.appendChild(drink(item)); });
    wrap.appendChild(list);

    if (section.note) wrap.appendChild(el("p", "note menu__note", section.note));
    return wrap;
  }

  /* ---- Index ---- */
  if (index) {
    sections.forEach(function (section) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + section.id;

      a.appendChild(el("span", "num", section.num || ""))
        .setAttribute("aria-hidden", "true");
      a.appendChild(el("span", "name", section.name));
      a.appendChild(el("span", "leader")).setAttribute("aria-hidden", "true");
      a.appendChild(el("span", "desc", section.items.length + " to choose from"));

      li.appendChild(a);
      index.appendChild(li);
    });
  }

  /* ---- Board ---- */
  sections.forEach(function (section) { board.appendChild(block(section)); });

  /* ---- Draft notice ----
     Shown while the menu in the data file is still the placeholder
     one. Set FTP_MENU_DRAFT to false there once the real drinks and
     prices are in and this disappears. */
  var draft = document.getElementById("menuDraft");
  if (draft && window.FTP_MENU_DRAFT !== true) draft.remove();
})();
