# For The Plot — Orlando

Marketing site for For The Plot, a bookstore and café at 3885 Avalon Park E Blvd,
Downtown Avalon Park, Orlando FL.

Static HTML, CSS and vanilla JavaScript. No build step, no dependencies, no
framework. Every file here is what the browser gets.

## Run it locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Open it through a server rather than
double-clicking a file — the pages load their JS as separate files.

## The pages

| File | What it is |
| --- | --- |
| `index.html` | Home: the story, the café, the shelves, hours |
| `events.html` | Self-filling month calendar plus the recurring nights |
| `book-box.html` | Monthly signed book box, tiers and waitlist |
| `partners.html` | Tabbed intake forms for authors, publishers and vendors |
| `contact.html` | Address, hours, map, message form |
| `404.html` | Not-found page (served automatically by GitHub Pages) |

## Editing the calendar

`assets/js/events-data.js` is the only file to touch. Add an object to
`FTP_EVENTS` with a title, kind, time and a recurrence rule; both the month grid
and the list underneath read from it and fill themselves in every month.

```js
{
  title: "Bookish Trivia Night",
  kind: "signature",              // "signature" = crimson pip, "regular" = brass
  time: "7:00 PM",
  detail: "Free to play, teams of four",
  blurb: "One or two sentences shown in the list.",
  rule: { type: "nth-weekday", nth: 2, weekday: 4 }   // 2nd Thursday
}
```

Rule types: `weekly`, `nth-weekday`, `last-weekday`, `monthly-date`, `once`.
Weekday is 0 for Sunday through 6 for Saturday. Any rule takes optional `from`
and `until` (`"YYYY-MM-DD"`) to limit the range it appears in.

The dates currently in the file are placeholders — the event *types* are the
real ones the shop runs. Swap in the real nights before launch.

## Before launch — two things still open

1. **Forms need an endpoint.** The delivery code is written and tested; it is
   waiting on one credential. Open `assets/js/forms.js`, set `ENDPOINT` and
   `PROVIDER` at the top, and all six forms go live. See *Forms* below.
2. **Photographs.** Three `<img>` tags are commented out in `index.html` and
   `book-box.html`, with a drawn placeholder plate in their place. Drop
   `latte-flight.jpg`, `shelves.jpg` and `book-box.jpg` into `assets/images/`,
   uncomment the `<img>`, and delete the `.plate__slot` div above it.

## Forms

All six forms — contact, book box waitlist, event list signup, and the author,
publisher and vendor intake forms — post through `assets/js/forms.js`. Adding a
form to a page needs no JavaScript: give the `<form>` a `data-form` name, a
`data-success` message, and a `<p class="form__status">`, and it is picked up.

**To make them deliver,** set two values at the top of that file:

| Service | `PROVIDER` | `ENDPOINT` |
| --- | --- | --- |
| [Formspree](https://formspree.io) — free to 50/month | `"formspree"` | the form ID, e.g. `"xdorwkgz"` |
| [Web3Forms](https://web3forms.com) — free, no account | `"web3forms"` | the access key they email you |
| Anything else (Power Automate, Zapier) | `"custom"` | the full URL to POST to |

A custom endpoint receives JSON: the form's named fields, plus `_form` (which
form it was) and `_page` (the page title).

**While `ENDPOINT` is empty the forms run in demo mode.** They behave exactly as
they will in production — the pause, the disabled button, the success message —
but nothing is transmitted. The site can be shown to someone in this state. It
must not be launched in it, so the browser console logs a warning on every page
load as a reminder.

Each form also carries a hidden honeypot field. Bots fill every input they find;
a submission that fills this one is dropped silently rather than delivered.

## Deploying

GitHub Pages serves this repository directly, set under **Settings → Pages →
Build and deployment** to *Deploy from a branch*, branch `main`, folder `/`.
GitHub's own builder publishes every push to `main` — there is no workflow to
maintain, and `.nojekyll` keeps it from running the files through Jekyll.

The live site is https://peecho07.github.io/ForthePlotOrlando/.

For the custom domain, add a `CNAME` file containing `fortheplotorlando.com`,
then point the DNS at GitHub Pages (four `A` records for the apex, or a `CNAME`
for `www`). `sitemap.xml` and `robots.txt` already reference that hostname.
