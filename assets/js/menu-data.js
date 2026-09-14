/* ============================================================
   FOR THE PLOT — COFFEE SHOP MENU DATA
   This is the only file the shop edits to update the drinks menu.
   The Coffee Shop page builds itself from what is in here.

   ------------------------------------------------------------
   READ THIS FIRST — THE MENU BELOW IS A PLACEHOLDER
   ------------------------------------------------------------
   The drinks and prices in this file are stand-ins. They are NOT
   the shop's real menu. Replace every item with the live menu
   before this page is published, then set FTP_MENU_DRAFT to false
   (just below) to clear the draft banner off the page.

   While FTP_MENU_DRAFT is true the page shows a visible notice
   saying the prices are not final, so a half finished menu can
   never quietly pass for a real one.

   HOW TO ADD A SECTION
   --------------------
   Add an object to FTP_MENU. Each section needs an id, a numeral,
   a name and an items array. "blurb" is optional.

     id     the anchor used by the index at the top of the page.
            Lowercase, no spaces.
     num    the roman numeral shown above the section heading.
     name   the heading.
     blurb  one line under the heading. Optional.
     note   a small line under the section's items. Optional.

   HOW TO ADD A DRINK
   ------------------
   Add an object to a section's items array.

     name   the drink. Required.
     desc   what is in it. Optional but worth writing.
     price  a single price, as a string with no dollar sign: "6.25"
     sizes  use INSTEAD of price when a drink is priced by size:
              sizes: [ { label:"12 oz", price:"5.50" },
                       { label:"16 oz", price:"6.25" } ]
     tags   small labels beside the name, e.g. ["Hot","Iced"]
     flag   set to "signature" to mark it with the brass seal.

   Prices are written WITHOUT the dollar sign. The page adds it.
   ============================================================ */

window.FTP_MENU_DRAFT = true;

window.FTP_MENU = [
  {
    id: "flights",
    num: "I",
    name: "The Flights",
    blurb: "Four small pours, each named for a book, on one board. The thing people photograph before they drink it.",
    note: "Flights rotate monthly alongside the book box. Ask what is pouring today.",
    items: [
      {
        name: "The Literary Latte Flight",
        desc: "Four signature lattes at four ounces each, served on a board with the cards that name them.",
        price: "16.00",
        tags: ["Hot", "Iced"],
        flag: "signature"
      },
      {
        name: "The Coffee Flight",
        desc: "Three single origin pours and one cold brew, poured black so you can taste what each one is doing.",
        price: "14.00",
        flag: "signature"
      },
      {
        name: "Build Your Own Flight",
        desc: "Any four signature lattes from the list below, your call.",
        price: "17.00",
        tags: ["Hot", "Iced"]
      }
    ]
  },

  {
    id: "signatures",
    num: "II",
    name: "Signature Lattes",
    blurb: "Named for the books the shop is known for. A few rotate with the season, a few never leave.",
    items: [
      {
        name: "Enemies to Lovers",
        desc: "Espresso, brown sugar and a burnt cinnamon top. Sharp first, sweet after.",
        sizes: [ { label: "12 oz", price: "6.00" }, { label: "16 oz", price: "6.75" } ],
        tags: ["Hot", "Iced"],
        flag: "signature"
      },
      {
        name: "Slow Burn",
        desc: "Honey, vanilla and a long pull of espresso over steamed milk.",
        sizes: [ { label: "12 oz", price: "5.75" }, { label: "16 oz", price: "6.50" } ],
        tags: ["Hot", "Iced"]
      },
      {
        name: "The Dark Academia",
        desc: "Dark chocolate, espresso and a little sea salt.",
        sizes: [ { label: "12 oz", price: "6.25" }, { label: "16 oz", price: "7.00" } ],
        tags: ["Hot", "Iced"]
      },
      {
        name: "Third Act Twist",
        desc: "Pistachio and orange blossom, which should not work and does.",
        sizes: [ { label: "12 oz", price: "6.50" }, { label: "16 oz", price: "7.25" } ],
        tags: ["Hot", "Iced"]
      },
      {
        name: "Cottagecore",
        desc: "Lavender, honey and vanilla over a single shot.",
        sizes: [ { label: "12 oz", price: "6.00" }, { label: "16 oz", price: "6.75" } ],
        tags: ["Hot", "Iced"]
      },
      {
        name: "Happily Ever After",
        desc: "Strawberry, white chocolate and cream. The one the kids order.",
        sizes: [ { label: "12 oz", price: "6.25" }, { label: "16 oz", price: "7.00" } ],
        tags: ["Iced"]
      },
      {
        name: "Chapter One",
        desc: "Toasted marshmallow and graham, for people who say they do not like coffee.",
        sizes: [ { label: "12 oz", price: "6.00" }, { label: "16 oz", price: "6.75" } ],
        tags: ["Hot", "Iced"]
      },
      {
        name: "The Limited Edition",
        desc: "Whatever is new this month. It is on the board by the register and on Instagram.",
        sizes: [ { label: "12 oz", price: "6.50" }, { label: "16 oz", price: "7.25" } ],
        tags: ["Hot", "Iced"]
      }
    ]
  },

  {
    id: "espresso",
    num: "III",
    name: "Espresso & Coffee",
    blurb: "The classics, made properly. House espresso is a seasonal blend, and there is always a single origin on filter.",
    items: [
      { name: "Espresso", desc: "Single or double.", sizes: [ { label: "Single", price: "3.00" }, { label: "Double", price: "3.75" } ], tags: ["Hot"] },
      { name: "Macchiato", desc: "Double shot, marked with foam.", price: "4.00", tags: ["Hot"] },
      { name: "Cortado", desc: "Equal parts espresso and steamed milk.", price: "4.75", tags: ["Hot"] },
      { name: "Cappuccino", desc: "Double shot under a proper cap of foam.", sizes: [ { label: "8 oz", price: "5.00" }, { label: "12 oz", price: "5.50" } ], tags: ["Hot"] },
      { name: "Latte", desc: "House espresso, steamed milk, no syrup unless you ask.", sizes: [ { label: "12 oz", price: "5.50" }, { label: "16 oz", price: "6.25" } ], tags: ["Hot", "Iced"] },
      { name: "Americano", desc: "Espresso and hot water.", sizes: [ { label: "12 oz", price: "4.25" }, { label: "16 oz", price: "4.75" } ], tags: ["Hot", "Iced"] },
      { name: "Mocha", desc: "Dark chocolate, espresso and steamed milk.", sizes: [ { label: "12 oz", price: "6.00" }, { label: "16 oz", price: "6.75" } ], tags: ["Hot", "Iced"] },
      { name: "Drip Coffee", desc: "Today's single origin. Refills are a dollar.", sizes: [ { label: "12 oz", price: "3.25" }, { label: "16 oz", price: "3.75" } ], tags: ["Hot"] },
      { name: "Cold Brew", desc: "Steeped overnight, poured over ice.", sizes: [ { label: "12 oz", price: "5.00" }, { label: "16 oz", price: "5.75" } ], tags: ["Iced"] },
      { name: "Sweet Cream Cold Brew", desc: "Cold brew under a float of vanilla sweet cream.", sizes: [ { label: "12 oz", price: "5.75" }, { label: "16 oz", price: "6.50" } ], tags: ["Iced"] }
    ]
  },

  {
    id: "not-coffee",
    num: "IV",
    name: "Not Coffee",
    blurb: "For the half of the table that does not drink it.",
    items: [
      { name: "Matcha Latte", desc: "Ceremonial grade matcha, whisked to order.", sizes: [ { label: "12 oz", price: "6.00" }, { label: "16 oz", price: "6.75" } ], tags: ["Hot", "Iced"] },
      { name: "Strawberry Matcha", desc: "Matcha over strawberry and milk. The prettiest thing on the menu.", sizes: [ { label: "16 oz", price: "7.00" } ], tags: ["Iced"], flag: "signature" },
      { name: "Chai Latte", desc: "Spiced black tea and steamed milk. Add a shot to make it dirty.", sizes: [ { label: "12 oz", price: "5.75" }, { label: "16 oz", price: "6.50" } ], tags: ["Hot", "Iced"] },
      { name: "London Fog", desc: "Earl Grey, vanilla and steamed milk.", sizes: [ { label: "12 oz", price: "5.50" }, { label: "16 oz", price: "6.25" } ], tags: ["Hot", "Iced"] },
      { name: "Hot Chocolate", desc: "Real dark chocolate, not powder.", sizes: [ { label: "12 oz", price: "4.75" }, { label: "16 oz", price: "5.50" } ], tags: ["Hot"] },
      { name: "Steamed Milk", desc: "Any syrup, any milk. For the smallest readers in the shop.", sizes: [ { label: "8 oz", price: "3.00" } ], tags: ["Hot"] }
    ]
  },

  {
    id: "tea",
    num: "V",
    name: "Tea & Refreshers",
    blurb: "Loose leaf by the pot, and something cold for an Orlando afternoon.",
    items: [
      { name: "Loose Leaf Tea", desc: "Earl Grey, English Breakfast, jasmine green, peppermint or chamomile.", sizes: [ { label: "12 oz", price: "4.00" }, { label: "Pot", price: "6.50" } ], tags: ["Hot"] },
      { name: "Iced Tea", desc: "Black or green, brewed fresh each morning.", sizes: [ { label: "16 oz", price: "3.75" } ], tags: ["Iced"] },
      { name: "Lemonade", desc: "Squeezed in house. Ask for lavender or strawberry in it.", sizes: [ { label: "16 oz", price: "4.50" } ], tags: ["Iced"] },
      { name: "Fruit Refresher", desc: "Green tea, fruit and a little fizz. The flavour changes with the season.", sizes: [ { label: "16 oz", price: "5.50" } ], tags: ["Iced"] },
      { name: "Italian Soda", desc: "Sparkling water and syrup, with cream if you want it.", sizes: [ { label: "16 oz", price: "4.75" } ], tags: ["Iced"] },
      { name: "Bottled Water", price: "2.00" }
    ]
  },

  {
    id: "extras",
    num: "VI",
    name: "Make It Yours",
    blurb: "Every drink can be built the way you take it.",
    note: "Oat, almond and soy are always on. Decaf and half caff cost nothing extra, and never have.",
    items: [
      { name: "Oat, almond or soy milk", price: "0.75" },
      { name: "Extra espresso shot", price: "1.25" },
      { name: "Flavour syrup", desc: "Vanilla, brown sugar, caramel, hazelnut, lavender, honey.", price: "0.75" },
      { name: "Sugar free syrup", desc: "Vanilla or caramel.", price: "0.75" },
      { name: "Cold foam or sweet cream", price: "1.00" },
      { name: "Whipped cream", price: "0.50" },
      { name: "Decaf or half caff", price: "0.00" },
      { name: "Your own cup", desc: "Bring a clean one and take fifty cents off.", price: "-0.50" }
    ]
  }
];
