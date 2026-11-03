---
name: arabic-writing-review
description: Proofreads Modern Standard Arabic text and returns a correction table (الخطأ، الصواب، السبب) covering hamzat al-wasl and al-qat', ta marbuta versus ha, alef maqsura versus ya, accusative tanween, punctuation and spacing, repeated words, dialect in formal text, and numbers. Use when the user asks to proofread, correct, review or polish Arabic writing (تدقيق، مراجعة لغوية، تصحيح إملائي، صحح النص), or before publishing an Arabic report, post, web page or school document.
---

# Arabic Writing Review

Review Arabic text the way a careful human proofreader would: fix clear errors, explain each fix in one short reason, and flag anything uncertain instead of guessing.

## Ground rules
- Fix errors, not style. Keep the author's meaning, word choice and voice unless asked to rewrite.
- When unsure, flag. If a fix depends on intended meaning, vocalization, or a convention with accepted variants, put it under «يحتاج تأكيد» and leave the text unchanged.
- Never change Quran, hadith, poetry, quotations, proper names, brand names, or dialect that is deliberate (dialogue, casual posts the user wants in dialect).
- Do not add diacritics everywhere. Add them only where a word is ambiguous without them.
- Respect an existing house convention (for example tanween placement, or مسؤول versus مسئول). Only point out inconsistency.

## Workflow
1. Read the whole text first. Note its register: formal (report, letter, website) or casual.
2. Check the categories below in order.
3. Return the output format at the end. Add the fully corrected text if the user asked for it or the text is short.

## 1. همزة الوصل والقطع
Quick test: put «و» before the word. If the hamza is still pronounced (وأرسل) it is قطع; if it disappears in speech (واستخدم) it is وصل.

Hamzat al-wasl, written as a bare «ا»:
- «ال» التعريف، والأسماء: ابن، ابنة، اسم، اثنان، اثنتان، امرؤ، امرأة.
- Past, imperative and masdar of five- and six-letter verbs: انتظر، انتظار، اجتمع، اجتماع، اقترح، اقتراح، استخدم، استخدام.
- Imperative of three-letter verbs: اكتب، اذهب، اجلس.

Hamzat al-qat', written «أ» or «إ»:
- Past, imperative and masdar of four-letter أفعل verbs: أرسل، إرسال، أعلن، إعلان، أنجز، إنجاز.
- First-person present: أكتب، أشارك. Root-initial hamza: أخذ، أكل، أمر، أمل.
- Other nouns and all particles except «ال»: أب، أخ، أستاذ، إنسان، إلى، إذا، إلا، أو، إن، أن.

Frequent fixes: إستخدام ← استخدام، إنتظار ← انتظار، إجتماع ← اجتماع، الإسم ← الاسم، اعلان ← إعلان، الى ← إلى، اذا ← إذا.

إنّ or أنّ:
- «إنّ» at the start of a sentence, after قال and its forms, after «حيث» and «إذ» (حيث إنّ), and after an oath.
- «أنّ» when it and its clause can be replaced by a masdar: «علمت أنّ الاختبار سهل» = «علمت سهولةَ الاختبار».
- «إنْ» means "if" (إن تدرس تنجح). «أنْ» comes before a present verb (أريد أن أتعلم).
- If the clause is ambiguous, flag it.

«ابن» inside a name chain between two names, where the second is the father, drops its alef: محمد بن عبدالله. Keep «ابن» at the start of a line or as an ordinary noun: هو ابن خالي.

## 2. التاء المربوطة والهاء
- Test: join the word to a pronoun or the next word. If you hear «ت» it is «ة» (مدرسة ← مدرستنا). If it stays «ه» it is «ه» (وجه ← وجهنا).
- Frequent fixes: مدرسه ← مدرسة، جامعه ← جامعة، الصلاه ← الصلاة، الحياه ← الحياة.
- Meaning can change: «كتابه» (his book) and «كتابة» (writing). If context does not decide, flag.
- Open ta «ت» stays in feminine plurals and verbs: معلمات، بنت، أخت، كتبت.

## 3. الألف المقصورة والياء
- «ى» without dots is a long "a": على، إلى، حتى، متى، لدى، مستشفى، مبنى، سعى، رأى.
- «ي» with dots is "ee": في، الذي، التي، القاضي، and the name علي.
- Frequent fixes: «علي الطاولة» ← «على الطاولة»، فى ← في، الذى ← الذي، حتي ← حتى، مستشفي ← مستشفى.
- Three-letter words: «ى» if the alef comes from ي (رمى، يرمي)، «ا» if from و (دعا، يدعو). Longer words: «ى» unless a «ي» comes before it (مستشفى، استدعى، but دنيا، قضايا، هدايا).
- These end with «ا»: إذا، لولا، ألا، كلا، هنا.

## 4. تنوين النصب
- The accusative tanween needs an extra alef: كتابًا، شكرًا، جدًّا، شيئًا، جزءًا.
- No extra alef after «ة» (رحلةً)، after hamza that follows an alef (مساءً، بناءً على)، or on «ى» (هدًى).
- No tanween at all on diptotes (الممنوع من الصرف): مساجدَ، صحراءَ، أصدقاءَ.
- Placement: two conventions are both widely seen: on the letter before the alef (كتابًا) and on the alef (كتاباً). Do not convert one into the other. If the text mixes them, report it and unify to the one the text uses most.
- A missing alef is an error (شكرً ← شكرًا). A missing tanween mark alone (شكرا) is acceptable in unvocalized text.

## 5. علامات الترقيم والمسافات
- Use Arabic marks: «،» «؛» «؟» instead of «,» «;» «?».
- No space before a mark, one space after: «مرحبًا ، كيف حالك ؟» ← «مرحبًا، كيف حالك؟».
- Brackets and quotes: no space inside, space outside: «( مثال )» ← «(مثال)».
- One-letter words attach to the next word: «و المعلم» ← «والمعلم»، «ب المدرسة» ← «بالمدرسة»، and «ل» + «ال» becomes «لل»: للمدرسة.
- In formal text, no repeated marks (؟؟ !!!) and no tatweel for decoration (جمـــيل).

## 6. Repetition
- Accidental duplicates are errors: «في في»، «من من»، a sentence pasted twice.
- Redundant pairs such as «كما أيضًا» or many sentences starting with «كما» are style notes, not errors. List them separately.

## 7. Dialect in formal text
In reports, letters and official posts, suggest the فصحى form: وش ← ما/ماذا، ليش ← لماذا، عشان ← لأنّ/لكي، اللي ← الذي/التي/الذين، هذي ← هذه، الحين ← الآن، زي ← مثل، بس ← فقط/لكن، مو ← ليس/غير، يبي ← يريد، كذا ← هكذا، مره حلو ← جميل جدًّا.
Leave dialect in dialogue, quotes, and texts the user wrote in dialect on purpose; mention it once instead.

## 8. Numbers and units
- One digit system per document: Latin 0-9 or Arabic-Indic ٠-٩, never mixed.
- Number agreement: 3 to 10 take the opposite gender of the singular noun (ثلاثة طلاب، ثلاث طالبات). From 11 to 99 the counted noun is singular and accusative (خمسة عشر طالبًا، عشرون طالبةً). When agreement gets complicated, suggest writing the number in digits.
- Keep the number and its unit together (15 كم، 30٪، 200 ريال) and use one unit style throughout.
- In formal text prefer words for ordinals: «المركز الثالث» not «المركز الـ3».
- Label dates with هـ or م: 1448هـ، 2026م.

## 9. Other frequent fixes
إنشاء الله ← إن شاء الله (different meaning)، لاكن ← لكن، هاذا ← هذا، ذالك ← ذلك، شيئ ← شيء، يقراء ← يقرأ، تفائل ← تفاؤل (noun) or تفاءل (verb)، تسائل ← تساؤل or تساءل، بداء ← بدأ (verb) or بدء (noun).
Accepted variants to flag, not fix: مسؤول/مسئول، شؤون/شئون، مئة/مائة، إذًا/إذن.

## Output format
Reply in Arabic. One row per fix, in order of appearance, quoting 2 to 4 words of context so each fix is easy to find. If the same error repeats, use one row and add «(تكرر 3 مرات)».

```markdown
### الأخطاء
| # | الخطأ | الصواب | السبب |
|---|---|---|---|
| 1 | تم إستخدام الأجهزة | تم استخدام الأجهزة | همزة وصل: مصدر الفعل السداسي «استخدم» |
| 2 | في مدرسه الحي | في مدرسة الحي | تاء مربوطة تُنطق تاءً عند الوصل: مدرستنا |
| 3 | علي الطاولة | على الطاولة | حرف الجر «على» بألف مقصورة، و«علي» اسم علم |
| 4 | كيف حالك ؟ | كيف حالك؟ | لا مسافة قبل علامة الترقيم |

### يحتاج تأكيد
| # | النص | الاحتمالات | لماذا لم يُصحَّح |
|---|---|---|---|
| 1 | أعجبني كتابه | كتابُه / كتابة | المعنى غير واضح من السياق |

### اقتراحات أسلوبية (اختيارية)
- ...

### الملخص
عدد الأخطاء: 4 (همزات 1، تاء مربوطة 1، ألف مقصورة 1، ترقيم 1)
```

If there are no errors, say so plainly and list only flags or style notes, if any.
