# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Dhruv Mehta's personal site (https://dhruvkm2402.github.io), a robotics/physical-AI portfolio.
Built on Jekyll, originally from the [Academic Pages](https://github.com/academicpages/academicpages.github.io)
template (a Minimal Mistakes fork), but the template's demo content has been removed and a custom
design layer sits on top. GitHub Pages builds `master` directly. There is no CI workflow, so
**pushing to `master` publishes the site**.

## Commands

```bash
bundle install
bundle exec jekyll serve -l -H localhost      # preview at localhost:4000
```

**Local Ruby caveat:** the system Ruby here is 2.6, which the current `github-pages` gem set no
longer supports (`ffi`, `concurrent-ruby`, `public_suffix` all require 3.0+). Preview builds have
been done with a scratch Gemfile pinning Ruby-2.6-compatible versions (jekyll 3.9, ffi 1.15,
nokogiri 1.13, public_suffix 5, jemoji dropped) plus a config overlay that drops `jemoji` from
`plugins:`. If you need a preview and hit resolution errors, that's why. The fix is a newer Ruby,
not a change to the repo's Gemfile (which GitHub Pages ignores anyway).

`npm run build:js` regenerates `assets/js/main.min.js` from `assets/js/_main.js` and the vendored
plugins. **`assets/js/site.js` is deliberately outside that bundle**, loaded directly from
`_includes/head/custom.html`, so site behavior can change without running npm.

No tests, no linters.

## Architecture

### Content model

| Where | What |
|---|---|
| `_pages/about.md` | Home. `layout: home`, `permalink: /`. Hero copy lives in front matter (`eyebrow`, `heading`, `lede`, `sub`); the body is the "A bit about me" prose. |
| `_projects/` | One file per project → `/projects/:name/` via `layout: project`. Front matter drives everything structural: `order`, `featured`, `badge`, `video`, `summary`, `lede`, `period`, `where`, `role`, `authors`, `venue`, `stack[]`, `code`, `paper`, `doi`, `results[]`. |
| `_publications/` | One file per paper → `/publications/:name/`. Rendered as a list by `_pages/publications.html`, which reads `authors`, `venue`, `date`, `paperurl`, `preprinturl`, `doi`, `code`, `project`, `bibtex`. |
| `_pages/` | `projects.md`, `publications.html`, `experience.md`, `talks-teaching.md`, `contact.md`, `year-archive.html` (the blog index, at `/blog/`). Most use `layout: wide`. |
| `_posts/` | Blog. The Nvblox post is cross-posted from Medium and sets `canonical_url`. |

Old URLs (`/aprojects/`, `/ptalks/`, `/ateaching/`, `/leadership/`, `/cv/`, `/year-archive/`, …)
are preserved via `redirect_from`, which needs `jekyll-redirect-from` in both `plugins:` and
`whitelist:` in `_config.yml`.

### Layouts and includes

- `_layouts/home.html`: hero, featured projects (`where: featured == true`, sorted by `order`),
  the page body, recent publications.
- `_layouts/project.html`: header with links, `results` callouts, body, sticky `factlist` aside,
  "more projects" strip.
- `_layouts/wide.html`: full-width content page, no author sidebar. Renders `title` + optional `lede`.
- `_includes/video.html`: the click-to-play video figure. **All project video goes through this.**
  It renders `preload="none"` with the source in `data-src` and no `controls`; `site.js` sets the
  source, enables controls and removes the poster overlay on click. Params: `src` (basename in
  `files/media/`, with a matching poster in `files/posters/`), `caption`, `portrait`, `loop`.
- `_includes/project-card.html`: takes `project=<document>`; handles projects with no media.

### Styling

`_sass/_custom.scss` (design tokens as CSS custom properties + all components) and
`_sass/_dark.scss` (a `prefers-color-scheme: dark` block that re-points the tokens and overrides the
upstream selectors that would otherwise stay light). Both are imported at the **end** of
`assets/css/main.scss` so they win over the theme.

Two upstream quirks are patched in `_custom.scss` and should stay: the vendored Font Awesome 6 core
only assigns the icon font-family to `.fa`, so `.fas`/`.fab`/`.far` are aliased explicitly (without
this every icon on the site is a tofu box); and `figcaption` is forced back to the sans stack.

Minimal Mistakes' own colors are Sass variables compiled at build time, so runtime theming is only
possible for the custom layer plus the explicit overrides in `_dark.scss`, so don't expect a token
change to restyle theme internals.

### Media

Videos live in `files/media/` (720p-max H.264, `+faststart`, no audio) with a matching poster JPEG
in `files/posters/`. They were re-encoded from ~260 MB of originals down to ~26 MB with ffmpeg
(`-vf scale, -crf 27 -preset slow`, auto-cropped letterboxing) and posters pulled with
`-frames:v 1`. Keep new video within that budget. The whole point of the click-to-play include is
that a project page costs nothing until a visitor asks for the video.

### Privacy constraints (deliberate, don't undo)

- **No email address in any served HTML.** `author.email` in `_config.yml` is intentionally blank
  (it would render a plaintext `mailto:` in the sidebar). `/contact/` holds the address base64-encoded
  in a `data-mail` attribute and `site.js` assembles the `mailto:` on hover/click.
- **No phone number and no resume PDF anywhere.** `/experience/` is the CV, in HTML.
- Arrive AI work is described only at the level already on the public resume: no media, no product
  or customer specifics.

## Content conventions

- Claims on project pages are traceable to the papers, the resume, or the repo. Measured numbers
  (0.5 m zero-shot error, 98.5% real-world precision, 86% goal success) belong in `results` front
  matter, not invented prose.
- Co-authored projects name every contributor and say plainly where Dhruv wasn't the lead.
- BibTeX uses co-author initials exactly as the resume gives them. Don't expand a name you can't verify.
