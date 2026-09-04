/* ============================================================
   FOR THE PLOT — EVENTS DATA
   This is the only file the shop edits to update the calendar.
   Both the month grid and the list below it read from here.

   HOW TO ADD AN EVENT
   -------------------
   Add an object to FTP_EVENTS. Every event needs a title, a kind,
   a time, and a rule. Everything else is optional.

   RULE TYPES
   ----------
   { type:"weekly",      weekday:3 }             every Wednesday
   { type:"nth-weekday", nth:2, weekday:4 }      2nd Thursday of the month
   { type:"last-weekday", weekday:5 }            last Friday of the month
   { type:"monthly-date", day:15 }               the 15th, every month
   { type:"once",        date:"2026-09-20" }     one specific day

   weekday: 0 = Sunday ... 6 = Saturday
   Add "from" and/or "until" ("YYYY-MM-DD") to any rule to limit the
   range a recurring event shows up in.

   kind: controls the pip colour and the label.
     "signature"  crimson pip, the shop's flagship nights
     "regular"    brass pip, everything else

   NOTE ON DATES: the recurring days below are placeholders. The event
   TYPES are the real ones the shop runs. Swap the rules for the real
   nights before launch and the calendar fills itself in every month.
   ============================================================ */

window.FTP_EVENTS = [
  {
    title: "Bookish Trivia Night",
    kind: "signature",
    time: "7:00 PM",
    detail: "Free to play, teams of four",
    blurb: "Put your shelf-knowledge to the test. Classic literature, tropes and the latest viral hits, played for bragging rights and shop prizes.",
    rule: { type: "nth-weekday", nth: 2, weekday: 4 }
  },
  {
    title: "Book to Movie Screening",
    kind: "signature",
    time: "6:30 PM",
    detail: "Feature adaptations and premiere nights",
    blurb: "Ever argued the book was better? Prove it. Full length adaptations, plus premiere nights for the first episodes of new book based series.",
    rule: { type: "last-weekday", weekday: 5 }
  },
  {
    title: "Book Club",
    kind: "signature",
    time: "6:30 PM",
    detail: "Current pick is at the counter",
    blurb: "One title, one evening, one room of people arguing about the ending. Pick up the current book in store and read at your own pace.",
    rule: { type: "nth-weekday", nth: 3, weekday: 3 }
  },
  {
    title: "Writer Workshop",
    kind: "regular",
    time: "11:00 AM",
    detail: "Seats limited, sign up in store",
    blurb: "A working session for people who are actually writing. Bring pages, a laptop and a drink order.",
    rule: { type: "nth-weekday", nth: 1, weekday: 6 }
  },
  {
    title: "Signed Book Box Release",
    kind: "signature",
    time: "10:00 AM",
    detail: "Limited run, first come",
    blurb: "The month's signed box goes on sale in store and online. Subscribers are held a copy until closing.",
    rule: { type: "monthly-date", day: 1 }
  },
  {
    title: "Limited Edition Flight Drop",
    kind: "regular",
    time: "All day",
    detail: "While it lasts",
    blurb: "A new four pour coffee flight built around this month's titles. It runs until the syrup does.",
    rule: { type: "monthly-date", day: 15 }
  },
  {
    title: "Community Collab Table",
    kind: "regular",
    time: "12:00 PM to 5:00 PM",
    detail: "A different local maker each time",
    blurb: "A local creator or artisan takes the front table for the day. Apply through the Vendors form to take a turn.",
    rule: { type: "nth-weekday", nth: 3, weekday: 6 }
  },
  {
    title: "Author Signing",
    kind: "regular",
    time: "2:00 PM",
    detail: "Author announced on Instagram",
    blurb: "Local and touring authors sign in store. Authors can request a date through the Authors form.",
    rule: { type: "nth-weekday", nth: 4, weekday: 0 }
  }
];
