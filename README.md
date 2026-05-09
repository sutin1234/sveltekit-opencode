<div align="center">
  <br/>
  <a href="https://svelte.dev">
    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg" width="120" height="140" alt="Svelte Logo"/>
  </a>
  
  <br/>
  
  <h1 align="center">
    <b>✨ SvelteKit GitHub Explorer ✨</b>
  </h1>

  <p align="center">
    <b>แอปพลิเคชันสำรวจ Repository ของ Svelte บน GitHub</b>
    <br/>
    สร้างด้วย <b>Svelte 5 Runes</b> + <b>SvelteKit 2</b> + <b>Tailwind CSS v4</b>
    <br/>
    <i>Modern • Reactive • Type-safe</i>
  </p>

  <br/>

  <p>
    <img src="https://img.shields.io/badge/SvelteKit-2.57-ff3e00?style=for-the-badge&logo=svelte" alt="SvelteKit"/>
    <img src="https://img.shields.io/badge/Svelte-5.55-ff3e00?style=for-the-badge&logo=svelte" alt="Svelte 5"/>
    <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS"/>
    <img src="https://img.shields.io/badge/bun-1.2-F9F9F9?style=for-the-badge&logo=bun" alt="bun"/>
    <br/>
    <img src="https://img.shields.io/badge/✓_Unit_Tests-49-10b981?style=for-the-badge" alt="49 unit tests"/>
    <img src="https://img.shields.io/badge/✓_E2E_Tests-13-10b981?style=for-the-badge" alt="13 e2e tests"/>
    <img src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions" alt="CI"/>
  </p>

  <br/>
</div>

---

## 📖 เกี่ยวกับโปรเจกต์

**SvelteKit GitHub Explorer** เป็นเว็บแอปพลิเคชันที่ใช้แสดงรายการ **Repository** จากองค์กร **Svelte** บน GitHub แบบมีระบบ **ค้นหา**, **กรอง**, และ **แบ่งหน้า** ที่พัฒนาโดยใช้สถาปัตยกรรม **Custom Hook Pattern** แบบใหม่ของ Svelte 5

> โปรเจกต์นี้เป็นตัวอย่างการประยุกต์ใช้ **Svelte 5 Runes** (`$state`, `$derived`, `$effect`, `$props`, `$bindable`) ร่วมกับ **SvelteKit** เพื่อสร้างแอปพลิเคชันที่มีประสิทธิภาพ พร้อมระบบทดสอบครอบคลุมทั้ง **Unit Tests** (Vitest) และ **E2E Tests** (Playwright)

---

## ✨ คุณสมบัติเด่น

<table>
  <tr>
    <td align="center" width="33%">
      <b>🔍 ค้นหาแบบ Real-time</b><br/>
      <sub>ค้นหาตามชื่อ, คำอธิบาย, หรือ Topic</sub>
    </td>
    <td align="center" width="33%">
      <b>🏷️ กรองตามภาษา</b><br/>
      <sub>กรอง Repository ตามภาษาที่ใช้</sub>
    </td>
    <td align="center" width="33%">
      <b>📄 แบ่งหน้าอัตโนมัติ</b><br/>
      <sub>แบ่งหน้าผ่าน GitHub API Link Header</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <b>🎨 Dark Theme</b><br/>
      <sub>ดีไซน์มืดทันสมัยด้วย Tailwind CSS v4</sub>
    </td>
    <td align="center" width="33%">
      <b>⚡ Reactive</b><br/>
      <sub>ใช้ Svelte 5 Runes เพื่อความ reactive สูงสุด</sub>
    </td>
    <td align="center" width="33%">
      <b>🔒 Type-safe</b><br/>
      <sub>TypeScript Strict Mode ตลอดทั้งโปรเจกต์</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <b>🧪 ครอบคลุมด้วย Tests</b><br/>
      <sub>49 Unit Tests + 13 E2E Tests</sub>
    </td>
    <td align="center" width="33%">
      <b>🚀 SSR + SPA</b><br/>
      <sub>Universal load function สำหรับทั้ง Server และ Client</sub>
    </td>
    <td align="center" width="33%">
      <b>🔄 CI/CD</b><br/>
      <sub>GitHub Actions: type-check, test, build อัตโนมัติ</sub>
    </td>
  </tr>
</table>

---

## 🛠️ เทคโนโลยีที่ใช้

<table>
  <tr>
    <th>หมวด</th>
    <th>เทคโนโลยี</th>
  </tr>
  <tr>
    <td><b>Framework</b></td>
    <td>SvelteKit 2 + Svelte 5 (Runes Mode)</td>
  </tr>
  <tr>
    <td><b>ภาษา</b></td>
    <td>TypeScript (Strict Mode)</td>
  </tr>
  <tr>
    <td><b>Styling</b></td>
    <td>Tailwind CSS v4 — Dark Theme (`bg-zinc-950` / `indigo-500` accent)</td>
  </tr>
  <tr>
    <td><b>Package Manager</b></td>
    <td>bun</td>
  </tr>
  <tr>
    <td><b>Unit Tests</b></td>
    <td>Vitest + @testing-library/svelte + jsdom</td>
  </tr>
  <tr>
    <td><b>E2E Tests</b></td>
    <td>Playwright — SSR mocking ด้วย `VITE_MOCK_API` env var</td>
  </tr>
  <tr>
    <td><b>CI/CD</b></td>
    <td>GitHub Actions — type-check, test, build</td>
  </tr>
</table>

---

## 🚀 เริ่มต้นใช้งาน

### ความต้องการเบื้องต้น

- [bun](https://bun.sh) v1.2 หรือสูงกว่า

### ขั้นตอนการติดตั้ง

```bash
# 1. โคลนโปรเจกต์
git clone https://github.com/sutin1234/sveltekit-opencode.git
cd sveltekit-opencode/my-app

# 2. ติดตั้ง dependencies
bun install

# 3. รันเซิร์ฟเวอร์สำหรับพัฒนา
bun run dev
```

เปิด `http://localhost:5173/github` ในเบราว์เซอร์เพื่อดูหน้า GitHub Repos

> **หมายเหตุ**: หากต้องการทดสอบ E2E ควรใช้ `bun run test:e2e` ซึ่งจะตั้งค่า `VITE_MOCK_API` อัตโนมัติเพื่อหลีกเลี่ยง GitHub API rate limit

---

## 📁 โครงสร้างโปรเจกต์

```
my-app/
├── src/
│   ├── lib/
│   │   ├── useRepos.svelte.ts       # Custom Hook (logic ทั้งหมด)
│   │   ├── RepoCard.svelte          # Component แสดง Repository Cards
│   │   ├── Pagination.svelte        # Component สำหรับแบ่งหน้า
│   │   ├── SearchInput.svelte       # Component ช่องค้นหา
│   │   ├── LanguageFilter.svelte    # Component กรองตามภาษา
│   │   ├── LoadingOverlay.svelte    # Component แสดงสถานะโหลด
│   │   ├── types.ts                 # Shared TypeScript types
│   │   └── __tests__/               # Unit tests สำหรับ components
│   ├── routes/
│   │   ├── +layout.svelte           # Root layout
│   │   ├── +page.svelte             # Home page
│   │   └── github/
│   │       ├── +page.ts             # Universal load function (data fetching)
│   │       └── +page.svelte         # GitHub Repos page component
│   ├── hooks.server.ts              # Server hooks (Link header config)
│   ├── test-mocks/                  # Mock modules สำหรับ Vitest
│   ├── test-setup.ts                # jest-dom matchers setup
│   └── test-stores.ts               # Shared mock stores
├── e2e/
│   └── github.spec.ts               # Playwright E2E tests (13 tests)
├── playwright.config.ts             # Playwright configuration
├── vitest.config.ts                 # Vitest configuration
└── .github/workflows/
    └── ci.yml                       # GitHub Actions CI/CD pipeline
```

### 🧠 สถาปัตยกรรม: Custom Hook Pattern

โปรเจกต์นี้ใช้ **Custom Hook Pattern** ของ Svelte 5 โดยแยก **Logic** ออกจาก **UI** อย่างชัดเจน:

```
┌─────────────────────────────────────────────────┐
│               +page.svelte (UI)                  │
│  • จัดการ Layout และ การแสดงผล                   │
│  • เรียก useRepos hook เพื่อรับ state + actions   │
│  • bind:value กับ child components               │
└────────────────────┬────────────────────────────┘
                     │ ใช้ getter closures
                     ▼
┌─────────────────────────────────────────────────┐
│          useRepos.svelte.ts (Logic)               │
│  • $state() — searchQuery, selectedLanguage      │
│  • $derived() — filteredRepos, languages, pages   │
│  • $effect() — reset ไป page 1 เมื่อ filter เปลี่ยน  │
│  • formatDate(), goToPage()                       │
│  • return { getter/setter pairs } ← รองรับ bind: │
└────────────────────┬────────────────────────────┘
                     │ $derived(getData())
                     ▼
┌─────────────────────────────────────────────────┐
│            +page.ts (Data Fetching)               │
│  • Universal load function                       │
│  • SSR + Client ได้ทั้งสองฝั่ง                     │
│  • VITE_MOCK_API สำหรับ E2E mocking              │
└─────────────────────────────────────────────────┘
```

**ข้อดีของ Custom Hook Pattern:**
- ✅ Logic ไม่พึ่งพา UI — ทดสอบแยกได้ง่าย
- ✅ ใช้ Runes (`$state`, `$derived`, `$effect`) ใน `.svelte.ts` ได้
- ✅ Getter/Setter pairs รองรับ `bind:value` กับ Components
- ✅ Lifecycle ผูกกับ Component ที่เรียกใช้

---

## 📟 คำสั่งที่ใช้

```bash
# Development
bun run dev              # เริ่มเซิร์ฟเวอร์สำหรับพัฒนา (http://localhost:5173)
bun run build            # Build สำหรับ Production
bun run preview          # ดู Production build

# Type Checking
bun run check            # Type-check (svelte-check)
bun run check:watch      # Type-check แบบ watch

# Testing
bun run test             # Unit tests (Vitest - 49 tests)
bun run test:watch       # Unit tests แบบ watch
bun run test:e2e         # E2E tests (Playwright - 13 tests)
```

---

## 🧪 การทดสอบ

### Unit Tests (49 tests)
```bash
bun run test
```
ใช้ Vitest + `@testing-library/svelte` + jsdom สำหรับทดสอบ Components และ Hooks

### E2E Tests (13 tests)
```bash
bun run test:e2e
```
ใช้ Playwright สำหรับทดสอบ end-to-end ครอบคลุม:
- การแสดงผล Components ทั้งหมด
- การค้นหา (ชื่อ, คำอธิบาย, Topic)
- การกรองตามภาษา
- สถานะเมื่อไม่มีผลลัพธ์
- การแบ่งหน้า (Previous, Next, Click page)
- แอตทริบิวต์ของ Cards

> **E2E Testing Strategy**: SSR ใช้ `VITE_MOCK_API` env var เพื่อส่ง Mock Data แทนการเรียก GitHub API จริง ป้องกัน Rate Limiting ส่วน Client-side Navigation ใช้ `page.route()` ของ Playwright

---

## 🔄 CI/CD Pipeline (GitHub Actions)

เมื่อมีการ Push หรือเปิด PR ไปยัง `main` branch:

| ขั้นตอน | คำสั่ง | รายละเอียด |
|---------|--------|------------|
| 1 | `bun install` | ติดตั้ง dependencies |
| 2 | `bun run prepare` | svelte-kit sync |
| 3 | `bun run check` | Type-check (svelte-check) |
| 4 | `bun run test` | Unit tests 49 ตัว |
| 5 | `npx playwright install` | ติดตั้ง Chromium สำหรับ E2E |
| 6 | `bun run test:e2e` | E2E tests 13 ตัว |
| 7 | `bun run build` | Production build |

---

## 📝 แผนพัฒนาในอนาคต

- [ ] **Dark/Light Mode Toggle** — สลับธีมได้
- [ ] **Skeleton Loading** — แทน LoadingOverlay
- [ ] **Repository Detail Page** — หน้าแสดงรายละเอียด
- [ ] **User Authentication** — เชื่อมต่อ GitHub OAuth
- [ ] **Keyboard Shortcuts** — ปุ่มลัดสำหรับค้นหา

---

<div align="center">
  <br/>
  <p>
    <sub>Built with ❤️ using</sub>
    <br/>
    <a href="https://svelte.dev">
      <img src="https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white" alt="Svelte 5"/>
    </a>
    <a href="https://kit.svelte.dev">
      <img src="https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white" alt="SvelteKit 2"/>
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4"/>
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6"/>
    </a>
  </p>
  <br/>
</div>
