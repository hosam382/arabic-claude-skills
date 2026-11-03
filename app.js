// يعرض المهارات من skills-data.js (يولّدها build.js) ويجهّز أمر التثبيت لكل نظام
import { SKILLS } from './skills-data.js';

const RAW = 'https://raw.githubusercontent.com/hosam382/arabic-claude-skills/main';
const COMMANDS = {
  unix: (n) => `mkdir -p ~/.claude/skills/${n} && curl -fsSL ${RAW}/${n}/SKILL.md -o ~/.claude/skills/${n}/SKILL.md`,
  win: (n) => `New-Item -ItemType Directory -Force "$HOME\\.claude\\skills\\${n}" | Out-Null; Invoke-WebRequest ${RAW}/${n}/SKILL.md -OutFile "$HOME\\.claude\\skills\\${n}\\SKILL.md"`,
};
const OS_NAMES = { unix: 'macOS و Linux', win: 'Windows PowerShell' };

// الوصف العربي لكل مهارة. ترتيب المفاتيح هو ترتيب البطاقات في الصفحة
const AR = {
  'arabic-rtl-web': {
    title: 'صفحات ويب عربية صحيحة',
    summary: 'يخلّي Claude يبني صفحات عربية من اليمين لليسار صح من أول مرة: خصائص CSS المنطقية بدل يمين ويسار، خط عربي محفوظ داخل الموقع، عزل أرقام الجوال والروابط وسط الكلام العربي، نظام أرقام واحد في الصفحة، وقراءة الأرقام العربية اللي يكتبها المستخدم في النماذج.',
    tries: ['سوّ لي صفحة هبوط عربية لمتجري', 'ليش رقم الجوال ينقلب في الصفحة؟'],
  },
  'arabic-writing-review': {
    title: 'مراجعة الكتابة العربية',
    summary: 'يدقق النص الفصيح ويطلع لك جدول واضح: الخطأ، الصواب، السبب. يغطي همزات الوصل والقطع، والتاء المربوطة، والألف المقصورة، وتنوين النصب، والترقيم والمسافات، واللهجة في النص الرسمي. وإذا ما كان متأكد يعلّم على الكلمة بدل ما يغيّرها.',
    tries: ['دقق هذا النص قبل ما أنشره', 'صحح الهمزات في هذا التقرير'],
  },
  'saudi-school-reports': {
    title: 'تقارير النشاط المدرسي',
    summary: 'يكتب تقرير برنامج أو نشاط مدرسي بالأقسام المعروفة: البيانات والتاريخ بالهجري والميلادي، المنفذ، المستفيدون، الأهداف، الإجراءات، النتائج، التوصيات، والشواهد. ما يخترع أرقام أبدًا، يحافظ على خصوصية الطلاب، ويعطيك نسخة صفحة واحدة ونسخة مفصلة.',
    tries: ['اكتب تقرير عن برنامج اليوم العالمي للغة العربية', 'حوّل ملاحظاتي هذي لتقرير صفحة واحدة'],
  },
  'hijri-dates': {
    title: 'التاريخ الهجري في الكود',
    summary: 'يتعامل مع تقويم أم القرى في JavaScript و Python: عرض التاريخ الهجري، والتحويل بين الهجري والميلادي في الاتجاهين، والتأكد من وجود اليوم في الشهر، وأشهر الأخطاء مثل فرق اليوم بين التقاويم وتأثير المنطقة الزمنية.',
    tries: ['اعرض تاريخ اليوم بالهجري في موقعي', 'حوّل 1 رمضان 1447 للميلادي في Python'],
  },
};

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const fullFile = (s) => `---\nname: ${s.name}\ndescription: ${s.description}\n---\n\n${s.body}`;

// «127 سطرًا»، «5 أسطر»: تمييز العدد حسب قواعده
function linesLabel(n) {
  const r = n % 100;
  if (r >= 3 && r <= 10) return `${n} أسطر`;
  if (r >= 11) return `${n} سطرًا`;
  return `${n} سطر`;
}

const order = Object.keys(AR);
const skills = [...SKILLS].sort((a, b) => {
  const ia = order.indexOf(a.name), ib = order.indexOf(b.name);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
});

function card(s, i) {
  const ar = AR[s.name] ?? { title: s.name, summary: '', tries: [] };
  const file = fullFile(s);
  const lines = file.trimEnd().split('\n').length;
  return `
  <article class="card skill" id="skill-${s.name}" aria-labelledby="title-${s.name}">
    <div class="skill-head">
      <span class="num" aria-hidden="true">${i + 1}</span>
      <div class="skill-titles">
        <h2 id="title-${s.name}">${esc(ar.title)}</h2>
        <code class="slug" dir="ltr">${esc(s.name)}</code>
      </div>
    </div>
    ${ar.summary ? `<p class="summary">${esc(ar.summary)}</p>` : ''}
    ${ar.tries.length ? `<ul class="tries" aria-label="جرّب تطلب">${ar.tries.map((t) => `<li>«${esc(t)}»</li>`).join('')}</ul>` : ''}
    <div class="desc">
      <span class="label">الوصف اللي يقرأه Claude عشان يعرف متى يستخدمها</span>
      <p lang="en" dir="ltr">${esc(s.description)}</p>
    </div>
    <div class="install">
      <span class="label">أمر التثبيت على <bdi class="os-name">${OS_NAMES.unix}</bdi></span>
      <code class="cmd" id="cmd-${s.name}" dir="ltr" data-name="${s.name}"></code>
      <button type="button" class="copy" id="copy-${s.name}" data-name="${s.name}" aria-describedby="title-${s.name}">انسخ أمر التثبيت</button>
    </div>
    <details class="file" id="file-${s.name}">
      <summary><span>اعرض ملف SKILL.md كامل (${linesLabel(lines)})</span></summary>
      <pre dir="ltr" lang="en" tabindex="0" aria-label="محتوى ملف SKILL.md لمهارة ${esc(ar.title)}">${esc(file)}</pre>
    </details>
  </article>`;
}

let os = 'unix';

function setOs(next, announce = false) {
  os = next === 'win' ? 'win' : 'unix';
  for (const b of document.querySelectorAll('.os button')) b.setAttribute('aria-pressed', String(b.dataset.os === os));
  for (const el of document.querySelectorAll('.cmd')) el.textContent = COMMANDS[os](el.dataset.name);
  for (const el of document.querySelectorAll('.os-name')) el.textContent = OS_NAMES[os];
  if (announce) $('os-status').textContent = `صارت أوامر التثبيت على ${OS_NAMES[os]}`;
  try { localStorage.setItem('os', os); } catch { /* المتصفح مانع التخزين، عادي */ }
}

function initialOs() {
  const fromUrl = new URLSearchParams(location.search).get('os');
  if (fromUrl === 'win' || fromUrl === 'unix') return fromUrl;
  try { const saved = localStorage.getItem('os'); if (saved) return saved; } catch { /* تجاهل */ }
  const platform = navigator.userAgentData?.platform || navigator.userAgent;
  return /win/i.test(platform) ? 'win' : 'unix';
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* نجرب الطريقة القديمة */ }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;inset-block-start:0;opacity:0';
  document.body.append(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove();
  return ok;
}

function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { t.hidden = true; }, 2400);
}

$('skills').innerHTML = skills.map(card).join('');
setOs(initialOs());

for (const b of document.querySelectorAll('.os button')) b.addEventListener('click', () => setOs(b.dataset.os, true));

$('skills').addEventListener('click', async (e) => {
  const btn = e.target.closest('.copy');
  if (!btn) return;
  const code = $('cmd-' + btn.dataset.name);
  if (await copyText(code.textContent)) {
    btn.textContent = 'تم النسخ';
    btn.classList.add('done');
    setTimeout(() => { btn.textContent = 'انسخ أمر التثبيت'; btn.classList.remove('done'); }, 2000);
    toast(os === 'win' ? 'نسخت الأمر، الصقه في PowerShell' : 'نسخت الأمر، الصقه في الطرفية');
  } else {
    getSelection().selectAllChildren(code);
    toast('ما قدرت أنسخ، الأمر محدد: انسخه بنفسك');
  }
});
