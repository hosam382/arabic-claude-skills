---
name: hijri-dates
description: Handles Hijri (Islamic) dates in code with the Umm al-Qura calendar used in Saudi Arabia, including formatting with JavaScript Intl, Gregorian to Hijri and Hijri to Gregorian conversion, Python conversion with hijridate (formerly hijri-converter), validation, storage and labeling. Use when an app, form, report or database needs Hijri dates (التاريخ الهجري، تقويم أم القرى), Islamic month names, date conversion, or Saudi date display.
---

# Hijri Dates (Umm al-Qura)

Saudi Arabia's official Hijri calendar is Umm al-Qura (أم القرى), a calculated calendar. Other "Islamic" calendars use different rules and often land one day apart, so always name the calendar in code and in the UI.

## Rules
1. Store ISO Gregorian dates (`2026-11-03`, a `DATE` column, or a UTC timestamp). Convert to Hijri only for display. When a user enters a Hijri date, convert it to Gregorian on input and store that.
2. Always label which calendar a displayed date uses: «23 جمادى الأولى 1448هـ» and «3 نوفمبر 2026م».
3. Hijri months have 29 or 30 days and a year has 354 or 355. Never use fixed month lengths or "add 30 days" for "next month".
4. A Hijri string such as `1448-05-23` is not ISO 8601. Never pass it to `new Date()`; it would be read as the year 1448 CE.
5. Religious dates (start of Ramadan, Eid) are announced by moon sighting and can differ from the printed Umm al-Qura date. Present computed dates for them as «حسب تقويم أم القرى» or «متوقع», never as certain.

## JavaScript: formatting with Intl

```js
const d = new Date(Date.UTC(2026, 10, 3)); // 3 Nov 2026

new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { dateStyle: 'full', timeZone: 'UTC' }).format(d);
// "الثلاثاء، ٢٣ جمادى الأولى ١٤٤٨ هـ"

new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn',
  { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
// "23 جمادى الأولى 1448 هـ"

new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn',
  { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
// "Jumada I 23, 1448 AH"
```

- Always write `ca-islamic-umalqura` explicitly. Do not rely on `ar-SA` meaning Hijri: in recent ICU/CLDR (Node 24, current Chrome) the default calendar for `ar-SA` is Gregorian.
- Set digits explicitly with `nu-latn` (0-9) or `nu-arab` (٠-٩). Defaults differ by locale and version: `ar-SA` gives ٠-٩, plain `ar` now gives 0-9.
- Exact strings (spacing before «هـ», "AH", "Jumada I" versus "Jumada al-Ula") vary between engines. Never parse formatted text and never snapshot-test it across environments. Use `formatToParts`.
- Time zone decides the day. `new Date('2026-11-03')` is UTC midnight, so format it with `timeZone: 'UTC'`. For "today in Saudi Arabia" use `timeZone: 'Asia/Riyadh'`. The instant `2026-11-03T22:30Z` is already 24 جمادى الأولى in Riyadh.

## Gregorian to Hijri numbers

```js
const hijriParts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC',
});

export function toHijri(date) {
  const p = {};
  for (const { type, value } of hijriParts.formatToParts(date)) p[type] = value;
  return { year: parseInt(p.year, 10), month: parseInt(p.month, 10), day: parseInt(p.day, 10) };
}

toHijri(new Date(Date.UTC(2026, 10, 3))); // { year: 1448, month: 5, day: 23 }
```

## Hijri to Gregorian: scan days
`Intl` cannot parse Hijri dates, so estimate the Gregorian date and scan nearby days until `toHijri` matches.

```js
const DAY = 86400000;

export function hijriToGregorian(y, m, d) {
  // 1 Muharram 1 AH is about 19 July 622 (proleptic Gregorian); mean month 29.530589 days
  const est = Date.UTC(622, 6, 19) + Math.round((y - 1) * 354.36667 + (m - 1) * 29.530589 + (d - 1)) * DAY;
  for (let off = -20; off <= 20; off++) {
    const t = new Date(est + off * DAY);
    const h = toHijri(t);
    if (h.year === y && h.month === m && h.day === d) return t.toISOString().slice(0, 10);
  }
  return null; // no such day, e.g. day 30 of a 29-day month
}

hijriToGregorian(1447, 9, 1);  // "2026-02-18"
hijriToGregorian(1448, 1, 1);  // "2026-06-16"
hijriToGregorian(1448, 1, 30); // null (Muharram 1448 has 29 days)
```

- A `null` result is how you validate user input; show «هذا اليوم غير موجود في هذا الشهر».
- Month length: `hijriToGregorian(y, m, 30) ? 30 : 29`.
- ICU's Umm al-Qura table covers 1300 to 1600 AH. Outside that range engines fall back to the tabular calendar, so results there are not Umm al-Qura.
- Accept Arabic-Indic digits typed by users: convert ٠-٩ to 0-9 before parsing (see `arabic-rtl-web`).

## Python: hijridate

```python
# pip install hijridate   (successor of hijri-converter, same API)
from hijridate import Hijri, Gregorian

h = Gregorian(2026, 11, 3).to_hijri()   # Hijri(1448, 5, 23)
h.isoformat()        # '1448-05-23'
h.dmyformat()        # '23/05/1448'
h.month_name()       # 'Jumada al-Ula'
h.month_name('ar')   # 'جمادى الأولى'
h.day_name('ar')     # 'الثلاثاء'
h.notation('ar')     # 'هـ'
h.month_length()     # 30

g = Hijri(1447, 9, 1).to_gregorian()    # Gregorian(2026, 2, 18), a datetime.date subclass
Hijri.today()
```

- Older code uses `pip install hijri-converter` and `from hijri_converter import Hijri, Gregorian`. It still works but now emits a DeprecationWarning; switch the import to `hijridate`.
- Supported range: 1 Muharram 1343 AH to 30 Dhu al-Hijjah 1500 AH (1924-08-01 to 2077-11-16 CE). Outside it, `OverflowError: date out of range`.
- An impossible day raises `ValueError`, for example `Hijri(1448, 1, 30)`: "day must be in 1..29 for month".
- In .NET, use `UmAlQuraCalendar`, not `HijriCalendar` (which is the tabular Kuwaiti algorithm).

## Month names
1 محرم، 2 صفر، 3 ربيع الأول، 4 ربيع الآخر، 5 جمادى الأولى، 6 جمادى الآخرة، 7 رجب، 8 شعبان، 9 رمضان، 10 شوال، 11 ذو القعدة، 12 ذو الحجة.

Spelling differs between libraries: ICU prints «ربيع الآخر» while hijridate prints «ربيع الثاني»; English varies too ("Rabiʻ II", "Rabi' al-Thani"). For a consistent UI, map month numbers to your own list instead of mixing library strings.

## Pitfalls
- **Wrong calendar.** For 3 Nov 2026, Node 24 gives 23 with `islamic-umalqura`, 22 with `islamic-civil`, and 24 with `islamic`. Excel and the Windows "Hijri" calendar use the Kuwaiti tabular algorithm. Use Umm al-Qura for Saudi dates.
- **Off by one day** from time zones: format in the same zone the date was stored in.
- **Date arithmetic in Hijri.** For "next month", increment the month number, clamp the day to that month's length, then convert. Compute ages and durations in Gregorian.
- **Unlabeled dates.** A bare «1/5/1448» or «5/1» is ambiguous; always add هـ or م.
- **Mixed digits.** Keep one digit system per page.

## Test with known pairs (Umm al-Qura)
| Hijri | Gregorian |
|---|---|
| 1 Ramadan 1447 | 2026-02-18 |
| 1 Muharram 1448 | 2026-06-16 |
| 23 Jumada al-Ula 1448 | 2026-11-03 |
| 10 Dhu al-Hijjah 1446 | 2025-06-06 |
