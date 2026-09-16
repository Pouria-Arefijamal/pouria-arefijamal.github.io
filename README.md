# pouria-empire.github.io

Personal academic website of **Pouria Arefijamal** — PhD student, Universidad de Navarra.

Plain static HTML/CSS/JS. No build step, no dependencies, no Jekyll.

## Deploy to GitHub Pages

1. Create a repository named exactly **`Pouria-Empire.github.io`** under
   <https://github.com/Pouria-Empire> (public).
2. From this folder:

   ```bash
   git init -b main
   git add -A
   git commit -m "Personal academic website"
   git remote add origin git@github.com:Pouria-Empire/Pouria-Empire.github.io.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
4. The site goes live at <https://pouria-empire.github.io/> within a minute or two.

Because the repo is named `<username>.github.io`, it is a *user site* and serves from
the root path — no `baseurl` juggling needed.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Before you publish — fill these in

Search the repo for these placeholders and replace them:

| Placeholder | Where | What to put |
|---|---|---|
| `PLACEHOLDER` (Scholar user id) | `index.html` (×4) | The `user=` value from your Google Scholar profile URL |
| `POUR-LINKEDIN-SLUG` | `index.html` (×2) | Your LinkedIn vanity slug, e.g. `pouria-arefijamal` |
| `assets/img/portrait.jpg` | not present yet | Drop in a square photo (≥600×600). Until then the page shows a tasteful "PA" monogram automatically. |
| `assets/cv.pdf` | not present yet | Drop in your CV. Until then the "Curriculum Vitae" button 404s — either add the file or delete that `<a class="btn" href="assets/cv.pdf">` line. |

Quick check that nothing is left:

```bash
grep -rn "PLACEHOLDER\|POUR-LINKEDIN-SLUG" .
```

## Custom domain (pouriaarefi.ir)

Only do this once the domain registration is renewed and active.

1. Create a `CNAME` file in this folder containing one line: `pouriaarefi.ir`
2. At your DNS provider, add A records for the apex domain pointing to:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (and a `www` CNAME → `pouria-empire.github.io` if you want `www` too).
3. Repo **Settings → Pages → Custom domain** → enter `pouriaarefi.ir`, then tick
   **Enforce HTTPS** once the certificate is issued.
4. Update the absolute URLs in `index.html` (`og:url`, `canonical`, JSON-LD),
   `sitemap.xml`, and `robots.txt` to the new domain.

If the domain has lapsed, skip all of this — `pouria-empire.github.io` works on its own.

## Structure

```
index.html          the whole site — one page, five sections
404.html            not-found page
publications.bib    full BibTeX, also linked from the Publications section
assets/css/style.css
assets/js/main.js   theme toggle, BibTeX expand/copy, scroll-spy, reveals
assets/img/         portrait.jpg goes here
sitemap.xml, robots.txt, .nojekyll
```

## Adding a publication

Copy one `<li class="pub">` block in `index.html`, change the fields, and give the
BibTeX `<pre>` a new `id="bib-yourkey"` matching its button's `data-bib="yourkey"`.
Then add the same entry to `publications.bib`.
