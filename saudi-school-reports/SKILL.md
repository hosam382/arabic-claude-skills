---
name: saudi-school-reports
description: Writes formal Arabic reports for school activities and programs in the Saudi education context (تقرير نشاط، تقرير برنامج، تقرير تنفيذ، شواهد) with the standard sections, Hijri and Gregorian dates, objectives, procedures, measurable results, recommendations and evidence, in a one-page or a detailed version. Use when a teacher, student or school staff member asks for an activity or program report, or wants to turn notes, a plan or photos into a formal school report.
---

# Saudi School Reports

Produce clear, formal, honest reports that a principal or supervisor can approve without rewriting. Every fact comes from the user; everything missing stays a visible placeholder.

## Hard rules
1. Never invent numbers, names, dates, quotes, survey results, rankings or awards. Missing values become bracketed placeholders: [عدد المستفيدين]، [تاريخ التنفيذ الهجري]، [اسم المنفذ]. List every placeholder at the end so the user can fill them.
2. Privacy: no student full names, faces, ID numbers, grades or health details unless the user confirms written consent from guardians and the school's approval. Prefer group descriptions («طلاب الصف الثاني الثانوي») and evidence photos that show the work, not identifiable faces.
3. Logos and official marks: do not add the Ministry of Education logo, the Vision 2030 logo, or any official seal or letterhead unless the user supplies the file and confirms they are allowed to use it (for example, the school's approved template). Never imitate an official letterhead or sign on anyone's behalf. Leave signature lines empty.
4. Do not state approval, official status or results the user did not give. «اختير مشروعًا تعليميًا» is not «حصل على المركز الأول».
5. Dates: write both calendars, labeled: «الثلاثاء 23 جمادى الأولى 1448هـ الموافق 3 نوفمبر 2026م». If you converted one from the other, use the Umm al-Qura calendar (see the `hijri-dates` skill), check that the weekday matches, and tell the user to verify.

## Collect first
Ask once, in one short list, for whatever is missing:
- Program or activity name and field (علمي، ثقافي، توعوي، اجتماعي، صحي، رياضي، مهني).
- Date or dates, place, and duration.
- Implementer(s) and their role (معلم، رائد نشاط، نادي الطلاب).
- Target group and number of beneficiaries.
- Objectives (or the original plan).
- What was actually done, step by step.
- Results: attendance, participation rate, pre/post test or survey numbers, products made.
- Available evidence (photos, attendance sheet, certificates, links).
- Who receives the report, and whether the school name should appear.

If the user wants a draft immediately, write it with placeholders instead of waiting.

## Tone and language
- Formal Modern Standard Arabic, no dialect, no emoji.
- Short sentences, past tense for what happened: «نُفِّذ البرنامج»، «شارك»، «قُدِّمت».
- Measurable statements instead of praise. Avoid «نجاح منقطع النظير» and «تفاعل غير مسبوق»; write «حضر [العدد] طالبًا، وأجاب [النسبة] منهم إجابة صحيحة في الاختبار البعدي».
- One digit system for the whole report (Latin 0-9 is common in Saudi school forms). Run the `arabic-writing-review` checks before delivering.

## Standard sections (in this order)
1. **بيانات البرنامج**: اسم البرنامج أو النشاط، المجال، اليوم والتاريخ الهجري والميلادي، المكان، المدة.
2. **المنفذ**: الاسم والصفة، والمشاركون في التنفيذ.
3. **المستفيدون وعددهم**: الفئة المستهدفة والعدد.
4. **الأهداف**: 3 to 5 measurable objectives starting with a verb: «أن يتعرّف الطالب على...»، «تنمية مهارة...»، «تعزيز...».
5. **الإجراءات**: numbered steps of what was done, in order.
6. **النتائج والمؤشرات**: numbers first (attendance, rates, test or survey results), then short observations. Each objective should map to at least one indicator.
7. **التوصيات**: 2 to 4 practical, specific recommendations.
8. **الشواهد**: list of evidence with one-line captions.
9. **التوقيعات**: المنفذ، رائد النشاط، مدير المدرسة, with empty lines for name and signature.

Optional: مقدمة، نقاط القوة، الصعوبات وطريقة معالجتها، الشركاء.

## Two versions: always offer both
Write the version the user asked for first, then offer the other in one line.

**One-page version** (fits one A4 page): a data table for sections 1 to 3, then bullets: objectives (3)، procedures (3 to 5)، results (2 or 3)، recommendations (1 or 2)، a grid of 2 to 4 evidence placeholders, and the signature row.

**Detailed version**: a short introduction, every section in full paragraphs, an objectives-to-indicators table, and an evidence appendix with captions.

## One-page template

```markdown
# تقرير تنفيذ برنامج: [اسم البرنامج]

| البند | البيان |
|---|---|
| المجال | [المجال] |
| التاريخ | [اليوم] [التاريخ الهجري]هـ الموافق [التاريخ الميلادي]م |
| المكان | [المكان] |
| المنفذ | [اسم المنفذ] ([الصفة]) |
| المستفيدون | [الفئة المستهدفة] |
| عدد المستفيدين | [عدد المستفيدين] |

**الأهداف**
1. [هدف قابل للقياس]

**الإجراءات**
1. [خطوة نُفِّذت]

**النتائج والمؤشرات**
- حضر [العدد] من أصل [العدد المستهدف] بنسبة [النسبة]٪.

**التوصيات**
- [توصية عملية]

**الشواهد**
- [صورة 1: وصف قصير، بدون وجوه طلاب]
- [كشف الحضور]

| المنفذ | رائد النشاط | مدير المدرسة |
|---|---|---|
| الاسم: ........ | الاسم: ........ | الاسم: ........ |
| التوقيع: ........ | التوقيع: ........ | التوقيع: ........ |
```

## Useful formal phrases
- «انطلاقًا من حرص المدرسة على ...، نُفِّذ برنامج ...»
- «نُفِّذ البرنامج يوم ... الموافق ...، واستهدف ...»
- «أسهم البرنامج في ...، إذ ...»
- «يوصي المنفذ بـ ...»

Link to national goals such as Vision 2030 only when the user relates the program to them.

## Output formats
- Markdown by default. For Word or PDF, use the matching document skill or tool if available.
- For HTML or print: `<html lang="ar" dir="rtl">`، `@page { size: A4; margin: 15mm; }`، a readable Arabic font, and tables with visible borders.

## Before delivering
- [ ] No invented numbers, names, awards or quotes; all gaps are [placeholders]
- [ ] Placeholders listed at the end for the user
- [ ] Both dates present, labeled هـ and م, weekday checked
- [ ] No student names or faces without confirmed consent
- [ ] No official logos unless supplied and authorized
- [ ] Formal فصحى, one digit system, no emoji
- [ ] Offered the other version (one-page or detailed)
