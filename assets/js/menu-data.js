/* ============================================================
   FOR THE PLOT — COFFEE SHOP MENU DATA
   This is the only file the shop edits to update the drinks menu.
   The Coffee Shop page builds itself from what is in here.

   This is the shop's real menu, transcribed from the printed
   Library Card. Titles are the bookish names in the TITLE column,
   descriptions are the drink itself from the SUBJECT column, and
   prices are the DUE column.

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

     name   the title it goes by. Required.
     desc   what the drink actually is. Optional.
     price  a single price, as a string with no dollar sign: "6.75"
     sizes  use INSTEAD of price when one line carries two prices:
              sizes: [ { label:"Kombucha", price:"5.00" },
                       { label:"La Croix", price:"3.50" } ]
     tags   small labels beside the name, e.g. ["Hot","Iced"]
     flag   set to "signature" to mark it with the brass seal.

   Prices are written WITHOUT the dollar sign. The page adds it.

   STAGING A MENU CHANGE
   ---------------------
   Set FTP_MENU_DRAFT to true while a menu is half entered. The page
   then shows a visible notice saying the prices are not final, so a
   part finished menu can never quietly pass for a real one. Set it
   back to false when the new menu is complete.
   ============================================================ */

window.FTP_MENU_DRAFT = false;

window.FTP_MENU = [
  {
    id: "regular",
    num: "I",
    name: "Regular",
    blurb: "The non fiction menu. The espresso bar, straight down the line.",
    items: [
      { name: "The First Edition", desc: "Double Shot of Espresso", price: "4.50" },
      { name: "The Daily Read",    desc: "Americano",               price: "4.50" },
      { name: "The Short Story",   desc: "Cappuccino",              price: "4.75" },
      { name: "The Poem",          desc: "Macchiato",               price: "4.75" },
      { name: "The Mass Market",   desc: "Latte",                   price: "5.25" },
      { name: "The Novel",         desc: "Cold Brew",               price: "5.25" },
      { name: "The Anthology",     desc: "Chai Latte",              price: "5.75" },
      { name: "The Trilogy",       desc: "Dirty Chai Latte",        price: "6.25" },
      { name: "The Picture Book",  desc: "Hot Chocolate",           price: "3.50" }
    ]
  },

  {
    id: "specialty",
    num: "II",
    name: "Specialty",
    blurb: "Specialty lattes come with toppings and cold foam, if iced.",
    items: [
      { name: "Found Family",        desc: "Snickerdoodle Latte",                              price: "6.75" },
      { name: "Dark Academia",       desc: "Biscoff Cookie Latte",                             price: "6.75" },
      { name: "Slow Burn",           desc: "Tiramisu Latte",                                   price: "6.75" },
      { name: "Plot Twist",          desc: "Cookies & Cream Latte",                            price: "6.75" },
      { name: "Unreliable Narrator", desc: "Salted Toffee Latte",                              price: "6.75" },
      { name: "Second Chance",       desc: "French Toast Latte",                               price: "6.75" },
      { name: "Time Loop",           desc: "Dulce de Leche Latte",                             price: "6.75" },
      { name: "Secret Life",         desc: "Cinnamon Roll Latte",                              price: "6.75" },
      { name: "Small Town",          desc: "S'mores Latte",                                    price: "6.75" },
      { name: "Chosen One",          desc: "Matcha Latte + Flavor of Your Choice",             price: "6.75" },
      { name: "Fairytale",           desc: "Lemonade, Sparkling or Flat + Flavor of Your Choice", price: "4.75" },
      { name: "Retelling",           desc: "Pressed Juice",                                    price: "6.00" },
      {
        name: "Secret Heir",
        desc: "Kombucha or La Croix",
        sizes: [ { label: "Kombucha", price: "5.00" }, { label: "La Croix", price: "3.50" } ]
      }
    ]
  },

  {
    id: "extras",
    num: "III",
    name: "Make It Yours",
    blurb: "Every drink can be built the way you take it.",
    note: "Whip cream available upon request. Ask about seasonal flavors.",
    items: [
      {
        name: "Alternative milks",
        desc: "Coconut, oat, almond."
      },
      {
        name: "Additional shot of espresso",
        price: "1.00"
      },
      {
        name: "Cold foam",
        desc: "Iced drinks only. Vanilla sweet cream, salted caramel, white chocolate, marshmallow. Ask about seasonal flavors.",
        price: "1.25"
      },
      {
        name: "Toppings",
        desc: "Biscoff, graham cracker, Oreo, sprinkles, seasonal.",
        price: "0.50"
      },
      {
        name: "Flavors",
        desc: "Salted caramel, hazelnut, vanilla, caramel, cinnamon, coconut, toasted marshmallow, macadamia nut, maple spice, brown butter toffee, banana, strawberry, cookie butter, almond, butter pecan, English toffee, lavender, blue raspberry, raspberry, mocha, white mocha.",
        price: "0.25"
      },
      {
        name: "Sugar free flavors",
        desc: "Vanilla, caramel, hazelnut, English toffee.",
        price: "0.25"
      }
    ]
  }
];
