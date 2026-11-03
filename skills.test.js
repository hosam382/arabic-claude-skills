// شغّلها بـ: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, parseSkill, skillDirs, readSkills, renderData } from './build.js';
import { SKILLS } from './skills-data.js';

const dirs = skillDirs();
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

test('فيه 4 مهارات بالضبط', () => {
  assert.deepEqual(dirs, ['arabic-rtl-web', 'arabic-writing-review', 'hijri-dates', 'saudi-school-reports']);
});

for (const dir of dirs) {
  test(`${dir}: رأس SKILL.md سليم`, () => {
    const text = readFileSync(join(ROOT, dir, 'SKILL.md'), 'utf8');
    const parsed = parseSkill(text);
    assert.ok(parsed, 'frontmatter between --- lines is required');
    const { name, description } = parsed.meta;

    assert.equal(name, dir, 'name must match the folder name');
    assert.match(name, KEBAB, 'name must be kebab-case');
    assert.ok(name.length <= 64, 'name is at most 64 characters');
    assert.doesNotMatch(name, /anthropic|claude/, 'reserved words are not allowed in a skill name');

    assert.equal(typeof description, 'string');
    assert.ok(description.length >= 40 && description.length <= 1024, `description length ${description.length} must be 40 to 1024`);
    assert.match(description, /\bUse when\b/, 'description should say when to use the skill');
    assert.doesNotMatch(description, /<[^>]+>/, 'no XML tags in the description');
    // قيمة YAML بدون علامات تنصيص: ما تبدأ برمز خاص ولا فيها ": " أو " #"
    assert.doesNotMatch(description, /^[-?:,[\]{}#&*!|>'"%@`]|: | #/, 'description must stay a valid plain YAML scalar');
  });

  test(`${dir}: طول الملف بين 60 و150 سطرًا`, () => {
    const lines = readFileSync(join(ROOT, dir, 'SKILL.md'), 'utf8').trimEnd().split('\n').length;
    assert.ok(lines >= 60 && lines <= 150, `${lines} lines`);
  });
}

test('skills-data.js مطابق لناتج build.js', () => {
  const onDisk = readFileSync(join(ROOT, 'skills-data.js'), 'utf8').replace(/\r\n/g, '\n');
  assert.equal(onDisk, renderData(readSkills()), 'run `node build.js` and commit skills-data.js');
});

test('الصفحة تقدر تعيد بناء SKILL.md كامل من البيانات', () => {
  for (const s of SKILLS) {
    const rebuilt = `---\nname: ${s.name}\ndescription: ${s.description}\n---\n\n${s.body}`;
    const original = readFileSync(join(ROOT, s.name, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
    assert.equal(rebuilt, original);
  }
});

test('لا إيموجي ولا نقطة وسطى جنب الأرقام الهندية في الملفات المنشورة', () => {
  const files = ['index.html', 'style.css', 'app.js', 'README.md', ...dirs.map((d) => join(d, 'SKILL.md'))];
  for (const f of files) {
    const text = readFileSync(join(ROOT, f), 'utf8');
    assert.doesNotMatch(text, /\p{Extended_Pictographic}/u, `${f} contains an emoji`);
    assert.doesNotMatch(text, /[٠-٩]\s*·|·\s*[٠-٩]/, `${f} has a middle dot next to Arabic-Indic digits`);
  }
});

test('أسماء الملفات المنشورة ASCII فقط، والمجلدات هي مجلدات المهارات بس', () => {
  const entries = readdirSync(ROOT, { withFileTypes: true }).filter((e) => !e.name.startsWith('_') && !e.name.startsWith('.') && e.name !== 'node_modules');
  for (const e of entries) assert.match(e.name, /^[A-Za-z0-9._-]+$/, e.name);
  assert.deepEqual(entries.filter((e) => e.isDirectory()).map((e) => e.name).sort(), dirs);
});
