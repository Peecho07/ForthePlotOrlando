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

1. **Forms are not connected.** All six forms validate, then show a message
   saying nothing was sent. Point them at a real service (Formspree, Netlify
   Forms, a Power Automate endpoint) by replacing the `form[data-demo]` block at
   the bottom of `assets/js/site.js`.
2. **Photographs.** Three `<img>` tags are commented out in `index.html` and
   `book-box.html`, with a drawn placeholder plate in their place. Drop
   `latte-flight.jpg`, `shelves.jpg` and `book-box.jpg` into `assets/images/`,
   uncomment the `<img>`, and delete the `.plate__slot` div above it.

## Deploying

`.github/workflows/pages.yml` publishes the repository root to GitHub Pages on
every push to `main`.

Pages has to be switched on once by hand before the first deploy can succeed:
**Settings → Pages → Build and deployment → Source: GitHub Actions**. The
workflow cannot do this for itself — `configure-pages` has an `enablement: true`
option, but creating a Pages site is a repository-administration call and the
`GITHUB_TOKEN` is refused it (`Resource not accessible by integration`). Once
the setting is on, every later push deploys with no further clicks.

For the custom domain, add a `CNAME` file containing `fortheplotorlando.com`,
then point the DNS at GitHub Pages (four `A` records for the apex, or a `CNAME`
for `www`). `sitemap.xml` and `robots.txt` already reference that hostname.
