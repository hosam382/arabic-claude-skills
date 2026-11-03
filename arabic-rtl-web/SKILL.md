---
name: arabic-rtl-web
description: Builds and reviews Arabic right-to-left (RTL) web pages so they render correctly on phones and desktops. Use when creating or fixing any HTML, CSS or JavaScript UI whose content is Arabic, or when the user mentions RTL, dir="rtl", Arabic web fonts, bidi or mixed Arabic and English text, Arabic-Indic digits, mirrored icons, Arabic number input in forms, or an Arabic layout that looks broken.
---

# Arabic RTL Web

A checklist for Arabic pages that read naturally, lay out correctly at 375px, and never scramble numbers, URLs or English words. Apply every section that touches the task, then run the final checklist.

## 1. Direction and language
- Root element: `<html lang="ar" dir="rtl">`, written in the HTML (not added by JavaScript) so the first paint is already RTL.
- Do not replace `dir` with CSS `direction: rtl`. The attribute also drives bidi, form controls and screen readers.
- An English block inside an Arabic page: `<p lang="en" dir="ltr">`. Text typed by users (names, comments, chat): `dir="auto"`.

## 2. Layout with logical properties
Physical left/right never flip. Use logical properties so one stylesheet works in both directions.

| Avoid | Use |
|---|---|
| `margin-left`, `padding-right` | `margin-inline-start`, `padding-inline-end` |
| `left: 0`, `right: 0` | `inset-inline-start: 0`, `inset-inline-end: 0` |
| `text-align: left` | `text-align: start` |
| `border-left` | `border-inline-start` |
| `border-top-left-radius` | `border-start-start-radius` |
| `float: left` | `float: inline-start` |

- Flexbox and grid already follow `dir`: in RTL, `flex-direction: row` starts on the right. Never add `row-reverse` to "fix" RTL.
- `transform: translateX()`, `background-position` and box-shadow offsets are physical. Flip them with `:dir(rtl)` or `[dir="rtl"]` when needed.
- Tailwind: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, and the `rtl:` / `ltr:` variants.

## 3. Arabic web fonts
- Choose a family designed for Arabic (IBM Plex Sans Arabic, Noto Naskh Arabic, Noto Sans Arabic, Tajawal, Cairo, Almarai, Readex Pro). Keep decorative faces such as Aref Ruqaa for headings only.
- Self-host WOFF2 files: no third-party requests, works offline, nothing leaks to a font CDN. Check the license (OFL allows self-hosting).
- Use `font-display: swap` and split Arabic and Latin files with `unicode-range`, so each page downloads only what it uses:

```css
@font-face { font-family: 'Plex'; font-weight: 400; font-display: swap;
  src: url(plex-400-ar.woff2) format('woff2');
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FEFC; }
@font-face { font-family: 'Plex'; font-weight: 400; font-display: swap;
  src: url(plex-400-lat.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+2000-206F; }
body { font: 400 17px/1.75 'Plex', 'Segoe UI', Tahoma, sans-serif; }
```
- Arabic needs a taller line height (1.6 to 1.8) for diacritics and descenders, and a slightly larger size than Latin text.
- Never use `letter-spacing` on Arabic (it breaks letter joining). No `text-transform`, no fake italics. Avoid `text-align: justify` on narrow columns.
- Do not stretch words with tatweel (U+0640). It breaks search and copy-paste.

## 4. Bidi: numbers, URLs and English inside Arabic
The Unicode bidi algorithm reorders neutral characters next to numbers and Latin text. Two classic bugs in an RTL paragraph:
- Phone `+966 55 123 4567` shows its digit groups in reverse order: `4567 123 55 +966`.
- Time range `10:00 - 12:00` shows as `12:00 - 10:00`.

Fixes:
- `<bdi>` around inserted values of unknown direction: `مرحبًا <bdi>${userName}</bdi>، أهلًا بك`.
- `dir="ltr"` on values that are always LTR: `<span dir="ltr">+966 55 123 4567</span>`, URLs, emails, file paths, IBANs, `<code dir="ltr">`, `<pre dir="ltr">`.
- CSS for repeated patterns: `.num, .code { unicode-bidi: isolate; }`. Note that `<bdi>` isolates by default.
- Inputs for email, URL and phone: `<input type="email" dir="ltr">`.
- Where markup is impossible (document title, notifications, plain strings), wrap with Unicode isolates: FSI U+2068 ... PDI U+2069, or LRI U+2066 ... PDI for known-LTR text.

## 5. Digits: one system per page
- Pick Latin `0-9` or Arabic-Indic `٠-٩` (U+0660 to U+0669) and use it everywhere on the page, including tables, charts and dates.
- Mixing confuses readers (a table with both looks like a mistake), breaks search ("15" does not match "١٥"), sorting and copy-paste into spreadsheets.
- Persian digits `۰-۹` (U+06F0 to U+06F9) are different code points. Do not mix them in.
- `Intl` defaults differ by locale and engine version: in Node 24, `ar-SA` formats with Arabic-Indic digits while plain `ar` gives Latin. Set the numbering system explicitly: `new Intl.NumberFormat('ar-SA-u-nu-latn')` or `'ar-SA-u-nu-arab'`.
- With Arabic-Indic digits, the decimal separator is `٫` (U+066B) and the thousands separator is `٬` (U+066C).
- Real pitfall: a middle dot (U+00B7) used as a separator next to Arabic-Indic digits looks like the Arabic-Indic zero (U+0660), which is also a small dot. "12, separator, 3" then reads as "1203". Separate with the Arabic comma «،», a slash, or extra spacing (CSS `gap`) instead.

## 6. Arabic punctuation
- Use `،` (U+060C), `؛` (U+061B) and `؟` (U+061F), not `,` `;` `?`. The full stop and `!` are shared.
- No space before a punctuation mark, one space after: «كيف حالك؟» not «كيف حالك ؟».
- Pick one quotation style («...» or "...") per page.

## 7. Icons and mirroring
Mirror icons that show direction or sequence: back and next arrows, chevrons in lists and breadcrumbs, steppers and progress direction, "send", text-indent and list icons.

Do not mirror: logos and brand marks, media controls (play, rewind, fast-forward), clocks and timers, check marks, photos, and icons that contain Latin letters or digits.

```css
:dir(rtl) .icon-dir { transform: scaleX(-1); }   /* opt-in class, never global */
```

## 8. Number input from Arabic keyboards
- Prefer `<input inputmode="decimal" autocomplete="off">` over `type="number"`. A number input's value is only valid with ASCII digits, so Arabic-Indic digits can come back as an empty string; it also adds spinners.
- Users type `٠-٩`, the Arabic decimal separator `٫`, and sometimes Persian digits. Normalize before `Number()`:

```js
function parseArabicNumber(raw) {
  const s = String(raw ?? '').trim()
    .replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x0660)
    .replace(/[۰-۹]/g, (d) => d.charCodeAt(0) - 0x06F0)
    .replace(/٫/g, '.')
    .replace(/٬/g, '');
  if (s === '') return null;          // Number('') is 0, so check empty first
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}
parseArabicNumber('٩٥٫٥'); // 95.5
```
- Decide how a typed `,` is treated (decimal mark or thousands separator) and document it.
- Show validation messages in Arabic, set `aria-invalid`, and link the message with `aria-describedby`.
- Sort Arabic names with `new Intl.Collator('ar').compare`. For search, normalize alef forms (أ إ آ to ا), remove tashkeel and tatweel on both the query and the data.

## 9. Testing
- Test at 375px wide (and 320px if possible). Confirm `document.documentElement.scrollWidth <= innerWidth`.
- Test long Arabic words with attached letters, such as «والمستشفيات» or «باستخداماتها», in headings and buttons. Use `overflow-wrap: anywhere` on headings and cards, and `min-width: 0` on flex and grid children.
- Use real Arabic content with mixed English and numbers, not lorem ipsum.
- Check Safari on iOS and Chrome on Android, plus 200% zoom and keyboard focus order (Tab moves right to left).

## 10. The `[hidden]` gotcha
The `hidden` attribute is only a user-agent `display: none`. Any author rule such as `.card { display: flex }` overrides it, so `el.hidden = true` silently stops working. Add this to the base stylesheet:

```css
[hidden] { display: none !important; }
```

## Final checklist
- [ ] `<html lang="ar" dir="rtl">` in the source
- [ ] No physical left/right properties left in new CSS
- [ ] Self-hosted Arabic font, `font-display: swap`, `unicode-range` split
- [ ] Phone numbers, URLs, code and user names isolated
- [ ] One digit system; no middle dot beside Arabic-Indic digits
- [ ] Arabic punctuation, no space before it
- [ ] Only directional icons mirrored
- [ ] Number inputs accept `٠-٩` and `٫`
- [ ] No horizontal scroll at 375px; long words wrap
- [ ] `[hidden] { display: none !important; }` present
