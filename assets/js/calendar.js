/* ============================================================
   FOR THE PLOT — CALENDAR
   Expands the rules in events-data.js into real dates for a given
   month, renders the grid and the list. No dependencies.
   ============================================================ */
(function () {
  var grid = document.getElementById("calGrid");
  if (!grid) return;

  var label = document.getElementById("calMonth");
  var list = document.getElementById("eventList");
  var listHead = document.getElementById("eventListHead");
  var prev = document.getElementById("calPrev");
  var next = document.getElementById("calNext");
  var reset = document.getElementById("calReset");

  var MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
  var DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var DOW_FULL = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var view = new Date(today.getFullYear(), today.getMonth(), 1);
  var selected = null;

  function ymd(d) {
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }
  function parse(s) {
    var p = String(s).split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }
  function inRange(rule, date) {
    if (rule.from && date < parse(rule.from)) return false;
    if (rule.until && date > parse(rule.until)) return false;
    return true;
  }

  /* Return every day-of-month an event lands on in the viewed month. */
  function daysFor(rule, year, month) {
    var out = [];
    var last = new Date(year, month + 1, 0).getDate();
    var d, i;

    if (rule.type === "once") {
      d = parse(rule.date);
      if (d.getFullYear() === year && d.getMonth() === month) out.push(d.getDate());

    } else if (rule.type === "monthly-date") {
      if (rule.day <= last) out.push(rule.day);

    } else if (rule.type === "weekly") {
      for (i = 1; i <= last; i++) {
        if (new Date(year, month, i).getDay() === rule.weekday) out.push(i);
      }

    } else if (rule.type === "nth-weekday") {
      var count = 0;
      for (i = 1; i <= last; i++) {
        if (new Date(year, month, i).getDay() === rule.weekday) {
          count++;
          if (count === rule.nth) { out.push(i); break; }
        }
      }

    } else if (rule.type === "last-weekday") {
      for (i = last; i >= 1; i--) {
        if (new Date(year, month, i).getDay() === rule.weekday) { out.push(i); break; }
      }
    }

    return out.filter(function (day) {
      return inRange(rule, new Date(year, month, day));
    });
  }

  /* All occurrences in the viewed month, sorted by date. */
  function monthEvents(year, month) {
    var rows = [];
    (window.FTP_EVENTS || []).forEach(function (ev) {
      daysFor(ev.rule, year, month).forEach(function (day) {
        rows.push({
          day: day,
          date: new Date(year, month, day),
          event: ev
        });
      });
    });
    rows.sort(function (a, b) {
      if (a.day !== b.day) return a.day - b.day;
      return a.event.title.localeCompare(b.event.title);
    });
    return rows;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function render() {
    var year = view.getFullYear();
    var month = view.getMonth();
    var rows = monthEvents(year, month);

    label.textContent = MONTHS[month] + " " + year;
    grid.innerHTML = "";

    DOW.forEach(function (d) {
      var head = el("div", "cal__dow");
      head.setAttribute("aria-hidden", "true");
      head.textContent = d;
      grid.appendChild(head);
    });

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var i;

    for (i = 0; i < firstDay; i++) {
      var pad = el("div", "cal__day cal__day--pad");
      pad.setAttribute("aria-hidden", "true");
      grid.appendChild(pad);
    }

    for (i = 1; i <= daysInMonth; i++) {
      (function (day) {
        var date = new Date(year, month, day);
        var todays = rows.filter(function (r) { return r.day === day; });
        var isToday = date.getTime() === today.getTime();
        var cell;

        if (todays.length) {
          cell = el("button", "cal__day cal__day--has");
          cell.type = "button";
          cell.setAttribute("aria-pressed", selected === day ? "true" : "false");
          cell.setAttribute("aria-label",
            DOW_FULL[date.getDay()] + " " + MONTHS[month] + " " + day + ", " +
            todays.length + (todays.length === 1 ? " event" : " events"));
          cell.addEventListener("click", function () {
            selected = (selected === day) ? null : day;
            render();
            if (selected && listHead) listHead.scrollIntoView({ block: "start" });
          });
        } else {
          cell = el("div", "cal__day");
        }

        if (isToday) cell.classList.add("cal__day--today");
        cell.appendChild(el("span", "cal__date", String(day)));

        if (todays.length) {
          var pips = el("div", "cal__pips");
          todays.forEach(function (r) {
            pips.appendChild(el("span",
              "cal__pip" + (r.event.kind === "signature" ? " cal__pip--crimson" : "")));
          });
          cell.appendChild(pips);
          cell.appendChild(el("span", "cal__tag",
            todays[0].event.title + (todays.length > 1 ? " +" + (todays.length - 1) : "")));
        }

        grid.appendChild(cell);
      })(i);
    }

    var filled = firstDay + daysInMonth;
    var trail = (7 - (filled % 7)) % 7;
    for (i = 0; i < trail; i++) {
      var tail = el("div", "cal__day cal__day--pad");
      tail.setAttribute("aria-hidden", "true");
      grid.appendChild(tail);
    }

    renderList(rows, year, month);
  }

  function renderList(rows, year, month) {
    var shown = selected ? rows.filter(function (r) { return r.day === selected; }) : rows;

    listHead.textContent = selected
      ? MONTHS[month] + " " + selected
      : "Everything in " + MONTHS[month];

    reset.hidden = !selected;
    list.innerHTML = "";

    if (!shown.length) {
      var empty = el("li");
      var box = el("div", "event__empty",
        "No events listed for this month yet. New dates are posted on Instagram first.");
      empty.appendChild(box);
      list.appendChild(empty);
      return;
    }

    shown.forEach(function (r) {
      var ev = r.event;
      var li = el("li");
      var art = el("article", "event");

      var date = el("div", "event__date");
      date.appendChild(el("span", "event__mo", MONTHS[month].slice(0, 3)));
      date.appendChild(el("span", "event__dy", String(r.day)));
      date.appendChild(el("span", "event__wd", DOW[r.date.getDay()]));
      art.appendChild(date);

      var body = el("div");
      body.appendChild(el("h3", null, ev.title));
      body.appendChild(el("p", "event__meta",
        [ev.time, ev.detail].filter(Boolean).join("  \u00B7  ")));
      body.appendChild(el("p", null, ev.blurb));
      art.appendChild(body);

      li.appendChild(art);
      list.appendChild(li);
    });
  }

  prev.addEventListener("click", function () {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    selected = null;
    render();
  });
  next.addEventListener("click", function () {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    selected = null;
    render();
  });
  reset.addEventListener("click", function () {
    selected = null;
    render();
  });

  render();
})();
