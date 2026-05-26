# Analisis Prompt vs Project compro18

## Ringkasan

Prompt yang diberikan **TIDAK sesuai** dengan project di folder `compro18`. Terdapat perbedaan signifikan di banyak area. Berikut analisis lengkapnya beserta prompt yang sudah dikoreksi di bagian akhir.

---

## Daftar Perbedaan

### 1. CMS Tag Suffix: `9` vs `20`

> [!CAUTION]
> Ini adalah perbedaan paling kritis. Prompt menggunakan suffix `9` untuk semua CMS tag, tetapi project compro18 menggunakan suffix `20`.

| Section | Tag di Prompt (❌ salah) | Tag di compro18 (✅ benar) |
|---------|------------------------|--------------------------|
| Hero badge | `home_badge9` | `home_badge20` |
| Hero main | `home_main9` | `home_main20` |
| Hero button daftar | `home_buttonDaftar9` | `home_buttonDaftar20` |
| Hero button konsul | `home_buttonKonsul9` | `home_buttonKonsul20` |
| Hero image title | `home_image_title9` | `home_image_title20` |
| Hero atribut | `home_atribut9` | `home_atribut20` |
| About badge | `about_badge9` | `about_badge20` |
| About main | `about_main9` | `about_main20` |
| About atribut | `about_atribut9` | `about_atribut20` |
| PropertyList badge | `propertyList_badge9` | `propertyList_badge20` |
| PropertyList main | `propertyList_main9` | `propertyList_main20` |
| PropertyList button | `propertyList_button9` | `propertyList_button20` |
| Service badge | `service_badge9` | `service_badge20` |
| Service main | `service_main9` | `service_main20` |
| Service item | `service_item9` | `service_item20` |
| FAQ title | `faq_title9` | `faq_title20` |
| FAQ item | `faq_item9` | `faq_item20` |
| Contact badge | `contact_home_badge9` | `contact_home_badge20` |
| Contact main | `contact_home_main9` | `contact_home_main20` |
| Contact info | `contact_home_info9` | `contact_home_info20` |

**Tags yang hilang dari prompt (tidak didokumentasikan):**
- Testimonials: `testimoni_badge20`, `testimoni_title20`
- Recommend (Featured): **tidak ada di project** — section `FeaturedPropertiesSection.vue` tidak ada di compro18

---

### 2. Project Structure — Perbedaan Component

> [!WARNING]
> Project compro18 **TIDAK memiliki** `FeaturedPropertiesSection.vue` dan `PropertyListSection.vue`. Sebagai gantinya ada `companyListSection.vue`.

| Prompt (❌) | compro18 (✅) |
|------------|-------------|
| `PropertyListSection.vue` | `companyListSection.vue` |
| `FeaturedPropertiesSection.vue` | **TIDAK ADA** |

Section `recommend_badge9`/`recommend_main9`/`recommend_button9` dari prompt **tidak digunakan** di compro18.

---

### 3. Design System — Warna Completely Berbeda

> [!IMPORTANT]
> Warna di prompt 100% salah. Project compro18 menggunakan tema Teal/Marine, bukan Dark Olive/Latte.

| Token | Prompt (❌) | compro18 (✅) |
|-------|-----------|-------------|
| `--color-primary` | `#3F4A3C` (Dark Olive) | `#0f766e` (Teal) |
| `--color-secondary` | `#C7A17A` (Latte) | `#0f172a` (Dark Slate) |
| `--color-accent` | `#EDE6D8` (Milk Foam) | `#f0fdfa` (Mint) |

Tailwind config juga berbeda:

**Prompt:** Hanya mendefinisikan CSS custom properties, tidak ada tailwind extend colors.

**compro18 Actual:** Tailwind config punya full color scale (50-900) dengan `primary: #C63D36`, `secondary: #2C2F3A`, `accent: #F6F7FB` di tailwind.config.js. TAPI CSS file override-nya menggunakan `--color-primary: #0f766e`.

---

### 4. package.json — Missing `requireConfigFile`

| Field | Prompt (❌) | compro18 (✅) |
|-------|-----------|-------------|
| `parserOptions` | Hanya `parser` | `parser` + `"requireConfigFile": false` |

---

### 5. vue.config.js — `publicPath` Berbeda

| Field | Prompt (❌) | compro18 (✅) |
|-------|-----------|-------------|
| `publicPath` | `'/'` | `'/compro18/'` |

---

### 6. index.html — Perbedaan Window Variables

| Variable | Prompt (❌) | compro18 (✅) |
|----------|-----------|-------------|
| `window.PATH_URL` | `'/'` | `'/compro18/'` |
| `window.MENU_GROUP_SLUG` | `'main'` | `'compro16'` |

---

### 7. Router — Missing Blog Route

| Route | Prompt (❌) | compro18 (✅) |
|-------|-----------|-------------|
| `/blog` | **TIDAK ADA** di routes | **ADA**: `{ path: '/blog', name: 'blog', component: () => import('@/views/BlogPage.vue') }` |

---

### 8. main.js — Favicon Logic Missing

Prompt mendeskripsikan main.js hanya dengan `document.title`, tapi compro18 **juga menangani favicon**:
```javascript
// Update favicon if available
if (cachedData.favicon) {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = cachedData.favicon;
  document.getElementsByTagName('head')[0].appendChild(link);
}
```

Default title di prompt: `'Default Title'` → compro18 actual: `'Property Template'`

---

### 9. PageManagement.vue — Perbedaan Signifikan

**Prompt:**
```html
<main class="bg-white text-slate-900">
  <section id="home"><HeroSection /></section>
  <section id="about"><AboutSection /></section>
  <section id="properties"><PropertyListSection /></section>
  <section id="featured"><FeaturedPropertiesSection /></section>
  ...
```

**compro18 Actual:**
```html
<main class="text-slate-900">
  <section id="home" class="ui-band ui-band-hero"><HeroSection :pageData="pageData" /></section>
  <section id="about" class="ui-band ui-band-mint"><AboutSection :pageData="pageData" /></section>
  <section id="properties" class="ui-band ui-band-sand"><CompanyListSection :pageData="pageData" /></section>
  ...
```

Perbedaan:
1. Tidak ada `bg-white` di `<main>` (compro18 hanya `text-slate-900`)
2. Setiap section memiliki class `ui-band ui-band-*` dengan CSS styling terpisah
3. Semua section menerima `:pageData="pageData"` prop — **prompt tidak menunjukkan ini**
4. Tidak ada `FeaturedPropertiesSection` di compro18
5. compro18 menggunakan `CompanyListSection` bukan `PropertyListSection`

---

### 10. Tailwind CSS — Sangat Berbeda

Prompt hanya mendefinisikan 3 btn class sederhana. compro18 memiliki design system yang jauh lebih kaya:

**Missing dari prompt:**
- Google Fonts import (`Manrope`, `Outfit`)
- `@layer base` styling (scroll-behavior, body gradient, heading fonts)
- Component classes: `section-head`, `section-kicker`, `section-title`, `section-subtitle`, `card`, `badge`, `glass-panel`, `page-shell`, `page-hero`, `page-hero-title`, `page-hero-subtitle`, `page-section`, `page-panel`, `surface-input`, `surface-select`, `chip-price`, `page-pagination-btn`, `page-pagination-btn-active`, `icon-orb`, `muted-link`, `bg-gradient-primary`
- Utility classes: `text-gradient`, `mesh-bg`, `grid-overlay`
- Custom scrollbar styling
- Global transition

---

### 11. Tailwind Config — Tidak Didokumentasikan di Prompt

Prompt **tidak menyertakan** `tailwind.config.js` sama sekali. compro18 memiliki full tailwind config dengan extended color palette.

---

### 12. PostCSS Config — Tidak Didokumentasikan

Prompt tidak menyertakan `postcss.config.js`.

---

### 13. Babel Config — Tidak Didokumentasikan

Prompt tidak menyertakan `babel.config.js`.

---

### 14. App.vue — Tidak Didokumentasikan

Prompt hanya menyebut "Root component dengan Navbar, Router View, Footer" tapi tidak menyertakan kode lengkap.

---

### 15. TestimonialsSection — Prompt Salah Total

Prompt menyatakan: "Masih menggunakan props data statis, belum terintegrasi dengan CMS tags."

**Kenyataan di compro18:** TestimonialsSection.vue **SUDAH terintegrasi** dengan:
- CMS tags: `testimoni_badge20`, `testimoni_title20`
- API fetch: `API_ENDPOINTS.testimonials`
- Fallback data statis

---

### 16. NavbarApp.vue — Menu Sorting Logic Missing

Prompt hanya menunjukkan basic menu mapping. compro18 punya **sorting logic** yang mengurutkan berdasarkan `order` lalu `id`:

```javascript
.sort((a, b) => {
  const orderA = Number.isFinite(Number(a?.order)) ? Number(a.order) : Number.MAX_SAFE_INTEGER;
  const orderB = Number.isFinite(Number(b?.order)) ? Number(b.order) : Number.MAX_SAFE_INTEGER;
  if (orderA !== orderB) return orderA - orderB;
  const idA = Number.isFinite(Number(a?.id)) ? Number(a.id) : Number.MAX_SAFE_INTEGER;
  const idB = Number.isFinite(Number(b?.id)) ? Number(b.id) : Number.MAX_SAFE_INTEGER;
  return idA - idB;
})
```

Juga ada tambahan field `open_in_new_tab` → `target` dan `order`.

---

### 17. FooterPage.vue — Tidak Didokumentasikan

Prompt tidak menyertakan kode/pattern untuk FooterPage. compro18 punya:
- Fetch footer menu dari `API_ENDPOINTS.FOOTER_MENU`
- Social media links
- Contact info dari siteInfo settings
- Dynamic site title, description, address, phone, email

---

### 18. Missing Files dari Prompt

| File | Status |
|------|--------|
| `.env.production` | Tidak disebutkan di prompt |
| `.gitignore` | Tidak disebutkan di prompt |
| `babel.config.js` | Tidak disebutkan di prompt |
| `postcss.config.js` | Tidak disebutkan di prompt |
| `tailwind.config.js` | Tidak disebutkan di prompt |

---

### 19. ListingPage.vue — Sorting Logic Tidak Didokumentasikan

compro18 punya sorting yang sophisticated:
- Sort by newest (timestamp-based)
- Sort by impact (getImpactScore dari tag values atau price)
- Sort by duration (getDurationInDays dari custom tag values)
- Helper: `getValueByTags`, `toNumber`, `getImpactScore`, `getDurationInDays`, `getListingTimestamp`

Prompt sama sekali tidak mendokumentasikan ini.

---

### 20. ListingDetailPage.vue — Gallery Logic Tidak Didokumentasikan

compro18 punya `normalizeGallery` function yang handle multiple format (array, JSON string, comma-separated). Ini tidak ada di prompt.

---

### 21. BlogPage.vue — Tidak Didokumentasikan

Prompt hanya menyebut di project structure tapi tidak mendokumentasikan konten/code pattern.

---

### 22. Section Scoped Styles — Tidak Didokumentasikan

Setiap section component di compro18 punya `<style scoped>` yang cukup detail. Prompt hanya menunjukkan template structure tanpa styling.

---

## Prompt yang Sudah Dikoreksi

Berikut adalah prompt yang sudah disesuaikan agar menghasilkan project yang sama persis dengan compro18:

---

# Vue 3 Company Profile Template - Master Generation Prompt

Prompt ini digunakan untuk membuat template website company profile/listing menggunakan Vue 3 CLI dengan arsitektur dan logika yang sama persis dengan template compro18.

---

## 1. Technology Stack

| Technology | Version/Detail |
|------------|----------------|
| Framework | Vue 3 (Vue CLI) |
| CSS Framework | TailwindCSS 3.x |
| Router | Vue Router 4 (Hash History) |
| HTTP Client | Axios |
| Icons | Font Awesome 6 (@fortawesome/fontawesome-free) |
| Fonts | Google Fonts: Manrope (400-800), Outfit (500-800) |
| Build Tool | Vue CLI 5.x |

---

## 2. Project Structure

```
compro18/
├── .env.production
├── .gitignore
├── babel.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vue.config.js
├── public/
│   └── index.html
└── src/
    ├── App.vue
    ├── main.js
    ├── public-path.js
    ├── assets/
    │   └── tailwind.css
    ├── config/
    │   └── api.js
    ├── router/
    │   └── index.js
    ├── components/
    │   ├── NavbarApp.vue
    │   ├── FooterPage.vue
    │   └── sections/
    │       ├── HeroSection.vue
    │       ├── AboutSection.vue
    │       ├── companyListSection.vue      # ⚠️ lowercase 'c'
    │       ├── ServicesSection.vue
    │       ├── TestimonialsSection.vue
    │       ├── FAQSection.vue
    │       └── ContactSection.vue
    └── views/
        ├── PageManagement.vue
        ├── ListingPage.vue
        ├── ListingDetailPage.vue
        ├── BlogPage.vue
        ├── ContactPage.vue
        └── HelpPage.vue
```

> [!IMPORTANT]
> - **TIDAK ADA** `FeaturedPropertiesSection.vue` dan `PropertyListSection.vue`
> - File `companyListSection.vue` menggunakan huruf kecil `c`
> - Semua CMS tag menggunakan suffix `20` (bukan `9`)

---

## 3. Package.json Configuration

```json
{
    "name": "compro18",
    "version": "0.1.0",
    "private": true,
    "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "build:sandbox": "vue-cli-service build --mode sandbox",
        "build:production": "vue-cli-service build --mode production",
        "build:staging": "vue-cli-service build --mode staging",
        "lint": "vue-cli-service lint"
    },
    "dependencies": {
        "@fortawesome/fontawesome-free": "^6.7.2",
        "axios": "^1.10.0",
        "core-js": "^3.8.3",
        "vue": "^3.2.13",
        "vue-router": "^4.5.1"
    },
    "devDependencies": {
        "@babel/core": "^7.12.16",
        "@babel/eslint-parser": "^7.12.16",
        "@vue/cli-plugin-babel": "~5.0.0",
        "@vue/cli-plugin-eslint": "~5.0.0",
        "@vue/cli-service": "~5.0.0",
        "autoprefixer": "^10.4.20",
        "eslint": "^7.32.0",
        "eslint-plugin-vue": "^8.0.3",
        "postcss": "^8.5.3",
        "tailwindcss": "^3.4.17"
    },
    "eslintConfig": {
        "root": true,
        "env": {
            "node": true
        },
        "extends": [
            "plugin:vue/vue3-essential",
            "eslint:recommended"
        ],
        "parserOptions": {
            "parser": "@babel/eslint-parser",
            "requireConfigFile": false
        },
        "rules": {}
    },
    "browserslist": [
        "> 1%",
        "last 2 versions",
        "not dead",
        "not ie 11"
    ]
}
```

> [!NOTE]
> `parserOptions` HARUS menyertakan `"requireConfigFile": false` agar ESLint tidak error saat build.

---

## 4. API Endpoints Configuration

Buat file `src/config/api.js`:

```javascript
// export const API_URL = 'http://localhost:3001';
// export const API_URL = 'https://your-api-host.com';
export const API_URL = window.APIS_URL;

export const API_ENDPOINTS = {
  siteInfo: () => `${API_URL}/apis/public/site-info`,
  customPages: `${API_URL}/apis/custom-pages/frontend`,
  adminCustomPages: `${API_URL}/api/admin/custom-pages`,
  menuListByGroup: (group) => `${API_URL}/apis/menu-list?group=${group}`,
  FOOTER_MENU: `${API_URL}/apis/footer`,
  websiteSchema: (id) => `${API_URL}/api/admin/themes/${id}/active-theme`,
  activeTheme: (websiteId) => `${API_URL}/api/admin/themes/${websiteId}/active-theme`,
  siteSettingsPublic: (id) => `${API_URL}/api/admin/websites/public/${id}/settings`,
  settingLogo: `${API_URL}/api/setting-logo`,
  posts: `${API_URL}/apis/posts`,
  postBySlug: (slug) => `${API_URL}/apis/posts/slug/${slug}`,
  allPosts: () => `${API_URL}/apis/posts`,
  categories: `${API_URL}/apis/categories`,
  pages: `${API_URL}/apis/admin/posts`,
  pageBySlug: (slug) => `${API_URL}/apis/admin/posts/page/${slug}`,
  getCommentsBySlug: (slug) => `${API_URL}/apis/comments/post/${slug}`,
  createComment: `${API_URL}/apis/comments`,

  // Listing endpoints
  listings: `${API_URL}/apis/customer/listing`,
  listingDetail: (postId) => `${API_URL}/apis/customer/listing/${postId}`,
  categoriesByDisplayIn: (displayIn) => `${API_URL}/apis/categories?display_in=${displayIn}`,

  // Testimonials endpoint
  testimonials: `${API_URL}/apis/posts?type=testimonial`,
};

export default API_ENDPOINTS;
```

---

## 5. Router Configuration

Buat file `src/router/index.js`:

```javascript
import { createRouter, createWebHashHistory } from 'vue-router';
import PageManagement from '@/views/PageManagement.vue';

const routes = [
  { path: '/', name: 'home', component: PageManagement },
  { path: '/listing', name: 'listing', component: () => import('@/views/ListingPage.vue') },
  { path: '/listing/:id', name: 'listing-detail', component: () => import('@/views/ListingDetailPage.vue') },
  { path: '/blog', name: 'blog', component: () => import('@/views/BlogPage.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/views/ContactPage.vue') },
  { path: '/help', name: 'help', component: () => import('@/views/HelpPage.vue') },
];

const router = createRouter({
  history: createWebHashHistory(window.PATH_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
});

export default router;
```

> [!IMPORTANT]
> Route `/blog` HARUS disertakan.

---

## 6. CMS Tag Mappings per Section

> **PENTING:** Semua tag menggunakan suffix `20`, BUKAN `9`.

### 6.1 HeroSection.vue

| Element | CMS Tag | Fields |
|---------|---------|--------|
| Badge | `home_badge20` | title, content |
| Title & Subtitle | `home_main20` | title, content, highlight |
| Primary Button | `home_buttonDaftar20` | title, link |
| Secondary Button | `home_buttonKonsul20` | title, link |
| Image Title/Highlight | `home_image_title20` | title, image |
| Attributes | `home_atribut20` | title, content (array) |

**Prompt Struktur:**

**Template:** Full-width hero dengan background image via computed inline style (`heroBackgroundStyle`). Wrapper `section.hero-shell` → container `max-w-7xl` → `.hero-panel` `rounded-[2rem]` dengan overlay layers: `.hero-fade` (gradient overlay) dan `.hero-hills` (radial gradients di bottom, opacity 0.45). Konten centered dalam `max-w-4xl`: badge uppercase (`tracking-[0.24em]`), `h1.hero-title` responsive (4xl→7xl), subtitle paragraph, dua `<router-link>` buttons (`btn-primary` + `btn-secondary`), security badge dengan icon `fa-shield-alt` + label, dan attributes grid 3-kolom (`.hero-attr-chip`) menampilkan `{{ attr.value }} - {{ attr.label }}`.

**Script:** Import `{ ref, watch, onMounted, computed }`. Props: `pageData` Object. `baseSection` defaults: badge, title, highlight, subtitle, primaryButton `{text, link}`, secondaryButton `{text, link}`, image (unsplash URL), imageTitle, attributes `[{value, label}]`. Computed `heroBackgroundStyle` → radial-gradient overlays + `url(image)`, backgroundSize cover. CMS tags mapping: `home_badge20`→badge, `home_main20`→title/highlight/subtitle, `home_buttonDaftar20`→primaryButton, `home_buttonKonsul20`→secondaryButton, `home_image_title20`→image/imageTitle, `home_atribut20`→attributes array. Menggunakan standard section pattern.

**Style scoped:** `.hero-shell` bg transparent. `.hero-panel` bg `#f6efe4`, border teal, deep shadow. `.hero-fade` 3-stop linear-gradient (teal→warm→teal). `.hero-hills` 4× radial-gradient at bottom, opacity 0.45. `.hero-badge` color `#0f766e`. `.hero-title` font Outfit, tracking `-0.03em`. `.hero-security` teal border, white bg 86%. `.hero-attr-chip` teal border, white bg 82%, text-center.

---

### 6.2 AboutSection.vue

| Element | CMS Tag | Fields |
|---------|---------|--------|
| Badge | `about_badge20` | title, content |
| Title & Paragraph | `about_main20` | title, content, image |
| Attributes | `about_atribut20` | title, content (array) |

**Prompt Struktur:**

**Template:** `section.section-container` → `.about-shell` rounded-[2rem] padded. Layout dua kolom (`lg:grid-cols-2`). **Kolom kiri:** `section-kicker` badge + `.about-divider` (garis teal 40px), `h2.about-title` (font serif), paragraph content, `.about-image-wrap` rounded-3xl dengan `img` (h-340/420px), gradient overlay, glass card overlay di bottom (Core Value), lalu stats row grid 3-kolom (`.about-stat-chip` → `attr.value` + `attr.label`). **Kolom kanan:** v-for attributes → `.about-feature-card` (border-left teal) dengan `h4` title + `p` content.

**Script:** `baseSection`: badge, title, content (paragraf panjang), image URL, attributes `[{title, content}]`. CMS tags: `about_badge20`→badge, `about_main20`→title/content/image, `about_atribut20`→attributes `[{title, content}]`. Standard section pattern.

**Style scoped:** `.about-shell` white bg, teal border, shadow. `.about-divider` 40px×2px `#14b8a6`. `.about-title` font Playfair Display serif. `.about-image-wrap` teal border. `.about-stat-chip` mint bg. `.about-stat-val` font Playfair. `.about-feature-card` white bg, border-left 2.5px `#14b8a6`, rounded kanan saja.

---

### 6.3 companyListSection.vue

| Element | CMS Tag | Fields |
|---------|---------|--------|
| Badge | `propertyList_badge20` | title, content |
| Title & Subtitle | `propertyList_main20` | title, content |
| Button | `propertyList_button20` | title, link |

**Prompt Struktur:**

**Template:** `section-head` (kicker + title + subtitle). Category filter pills: v-for categories → button pills (`.category-pill-active`/`.category-pill-idle`), `@click` set `selectedCategory`. Listings grid 3-kolom: v-for `filteredListings.slice(0,6)` → `.card` clickable (`$router.push`). Card: image h-64 hover scale-110, gradient overlay, "Solution" badge kiri-atas, price badge gradient teal kanan-atas, body title (line-clamp-2), excerpt, location icon + kabupaten/provinsi, "Detail" link. Bottom: `router-link` btn-primary ke `sectionState.buttonLink`.

**Script:** Import axios, API_ENDPOINTS. Extra state: `listings`, `categories` (default `[{id:null, name:'Semua'}]`), `selectedCategory`. Constants: `LISTING_TYPE = window.LISTING_TYPE || 1`, `LISTING_DISPLAY_IN = window.LISTING_DISPLAY_IN || 8`. Computed `filteredListings` filter by category. `formatPrice` → Intl IDR. `fetchCategories` → GET listings, extract categories dari `post.categories` where `display_in === LISTING_DISPLAY_IN`. `fetchListings` → GET listings, filter by `listing_type`. CMS tags: `propertyList_badge20`→badge, `propertyList_main20`→title/subtitle, `propertyList_button20`→buttonText/buttonLink. onMounted: applyContent + fetchCategories + fetchListings.

**Style scoped:** `.category-pill` border slate. `.category-pill-active` gradient teal bg, white text, shadow. `.category-pill-idle` white bg, hover teal.

---

### 6.4 ServicesSection.vue

| Element | CMS Tag | Fields |
|---------|---------|--------|
| Badge | `service_badge20` | title, content |
| Title & Subtitle | `service_main20` | title, content |
| Items | `service_item20` | title, content, icon (array) |

**Prompt Struktur:**

**Template:** `section-head` (kicker + title + subtitle). Grid 3-kolom: v-for `sectionState.items` → `.service-card` dengan decorative circle (bg teal, hover scale-125), icon box (gradient teal, rounded-2xl, 14×14), `h3` title, `p` content.

**Script:** `baseSection`: badge, title, subtitle, items `[{icon, title, content}]` (6 items: lightbulb, handshake, diagram-project, chart-line, users-gear, headset). CMS tags: `service_badge20`→badge, `service_main20`→title/subtitle, `service_item20`→items `[{icon, title, content}]`. Standard section pattern.

**Style scoped:** `.service-card` teal border, rounded 1.5rem, dual gradient bg (white→mint + subtle orange).

---

### 6.5 FAQSection.vue

| Element | CMS Tag | Fields |
|---------|---------|--------|
| Badge & Title | `faq_title20` | title (badge), content (title) |
| Items | `faq_item20` | title (question), content (answer) (array) |

**Prompt Struktur:**

**Template:** Layout 2-kolom (`lg:grid-cols-[0.88fr_1.12fr]`). **Kiri** (sticky): `section-kicker` badge, `section-title` left-aligned, deskripsi paragraph. **Kanan:** v-for items → `.faq-item` accordion: button trigger (h3 question + chevron icon dalam circle `.faq-icon-open`/`.faq-icon-closed`), `v-show` answer panel. State: `openFaq` ref (default 0), `toggleFaq(index)` toggle.

**Script:** `baseSection`: badge, title, items `[{question, answer}]` (5 FAQ items). CMS tags: `faq_title20` → badge (dari title) + title (dari content), `faq_item20` → items `[{question←title, answer←content}]`. Standard section pattern + toggleFaq logic.

**Style scoped:** `.faq-item` teal border, rounded 1.25rem, gradient bg. `.faq-item-trigger:hover` mint bg. `.faq-icon-open` gradient teal bg, white text. `.faq-icon-closed` slate border, slate color.

---

### 6.6 ContactSection.vue

| Element | CMS Tag | Fields |
|---------|---------|--------|
| Badge | `contact_home_badge20` | title, content |
| Title & Subtitle | `contact_home_main20` | title, content |
| Contact Info | `contact_home_info20` | title, icon, link/Link (array) |

**Prompt Struktur:**

**Template:** `section.section-container` → `.contact-shell` rounded-[2rem] dengan decorative blobs (blur-3xl teal + orange). Layout 2-kolom (`lg:grid-cols-[1.05fr_1fr]`). **Kiri** (`.contact-main-card`): `section-kicker` badge, h2 title, subtitle paragraph, `router-link` btn-primary "/contact". **Kanan:** v-for `contactInfo` → `.contact-info-card` dengan icon box (gradient teal, rounded-xl), h3 title, conditional: `<a>` jika ada `info.link || info.Link`, else `<p>` content.

**Script:** `baseSection`: badge, title, subtitle, contactInfo `[{icon, title, link/content}]`. CMS tags: `contact_home_badge20`→badge, `contact_home_main20`→title/subtitle, `contact_home_info20`→contactInfo `[{icon, title, link, content}]`. Perhatikan field fallback `info.link || info.Link` (case sensitivity). Standard section pattern.

**Style scoped:** `.contact-shell` sky border, teal shadow. `.contact-main-card` teal border, rounded 1.5rem, white bg 84%, backdrop-blur. `.contact-info-card` slate border, rounded 1.25rem, white bg 88%.

---

### 6.7 TestimonialsSection.vue

| Element | CMS Tag | Fields |
|---------|---------|--------|
| Badge | `testimoni_badge20` | title, content |
| Title & Subtitle | `testimoni_title20` | title, content |

**Prompt Struktur:**

**Template:** `section-head` (kicker + title + subtitle). Grid 3-kolom: v-for `testimonials` → `.testimonial-card` dengan quote icon (teal/20%), 5 stars (yellow), italic content, divider border-t, avatar circle (gradient teal, fallback initials via `getInitials`), name + role.

**Script:** Import axios, API_ENDPOINTS. Extra state: `testimonials`, `isLoading`, `fallbackTestimonials` (3 items statis). Helper: `getInitials(name)` → 2 huruf kapital, `stripHtml(html)` via DOMParser, `formatContent` → wrap dalam tanda kutip. CMS tags header: `testimoni_badge20`→badge, `testimoni_title20`→title/subtitle. `fetchTestimonials` → GET `API_ENDPOINTS.testimonials`, map response ke `{id, name←author_name, role←author_position, avatar←thumbnail_url, content←formatContent}`, fallback ke data statis jika kosong. onMounted: applyContent + fetchTestimonials.

**Style scoped:** `.testimonial-card` sky border, rounded 1.5rem, dual gradient bg (white→sky + subtle teal).


> [!NOTE]
> Testimonials **SUDAH terintegrasi** dengan CMS tags `testimoni_badge20` dan `testimoni_title20`, serta fetch data dari API endpoint `testimonials`.

---

## 7. Section Component Pattern

> **PENTING:** Setiap section component HARUS mengikuti pattern ini, termasuk komentar `/* global defineProps */` untuk menghindari ESLint error saat build production.

```vue
<script setup>
import { ref, onMounted, watch } from 'vue';

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({}),
  },
});

const baseSection = {
  badge: 'Default Badge',
  title: 'Default Title',
  subtitle: 'Default subtitle',
};

const sectionState = ref({ ...baseSection });

const getCachedHomeData = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(HOME_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Failed to read cached home data', error);
    return null;
  }
};

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (err) {
      return null;
    }
  }
  return data;
};

const getItemByTag = (tag, allData) => {
  const section = allData?.[tag];
  if (!section) return [];
  const parseItem = (item) => parse(item) || {};
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)];
};

const applyContentFromProps = () => {
  const cached = getCachedHomeData();
  const source =
    (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) ||
    cached ||
    {};

  const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');

  // Get data from tags — gunakan suffix 20
  const badgeObj = getItemByTag('section_badge20', source)[0] || {};
  const mainObj = getItemByTag('section_main20', source)[0] || {};

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
  };
};

watch(
  () => props.pageData,
  () => applyContentFromProps(),
  { deep: true, immediate: true }
);

onMounted(() => {
  applyContentFromProps();
});
</script>
```

---

## 8. Fetch Categories Listing Pattern

> **PENTING:** Categories untuk listing diextract dari response listings (bukan dari endpoint categories terpisah). Nilai `LISTING_DISPLAY_IN` adalah **number** (contoh: 8), bukan string.

```javascript
const LISTING_TYPE = window.LISTING_TYPE || 1;
const LISTING_DISPLAY_IN = window.LISTING_DISPLAY_IN || 8;

const fetchCategories = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.listings, {
      params: { listing_type: LISTING_TYPE }
    });
    const data = response.data.data || response.data || [];

    const categoriesMap = {};
    data
      .filter(listing => listing.listing_type === LISTING_TYPE)
      .forEach(listing => {
        (listing.post?.categories || []).forEach(cat => {
          if (cat.display_in === LISTING_DISPLAY_IN) {
            categoriesMap[cat.id] = {
              id: cat.id,
              name: cat.name,
              slug: cat.slug
            };
          }
        });
      });

    categories.value = [
      { id: null, name: 'Semua' },
      ...Object.values(categoriesMap)
    ];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
```

### Fetch Listings Pattern

```javascript
const fetchListings = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.listings, {
      params: { listing_type: LISTING_TYPE }
    });
    const data = response?.data?.data || response?.data || [];
    listings.value = data.filter(listing => listing.listing_type === LISTING_TYPE);
  } catch (error) {
    console.warn('Failed to fetch listings', error);
  }
};
```

---

## 9. Main.js Bootstrap Pattern

```javascript
import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { API_ENDPOINTS } from './config/api';
import './assets/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

async function initSiteInfo() {
  const cached = localStorage.getItem('siteInfo');
  if (cached) {
    try {
      const cachedData = JSON.parse(cached);
      document.title = cachedData.site_title || 'Property Template';

      // Update favicon if available
      if (cachedData.favicon) {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = cachedData.favicon;
        document.getElementsByTagName('head')[0].appendChild(link);
      }

      return cachedData;
    } catch (error) {
      console.warn('Failed to parse cached siteInfo', error);
    }
  }

  try {
    const resInfo = await axios.get(API_ENDPOINTS.siteInfo());
    const websiteId = resInfo?.data?.id || resInfo?.data?.website_id;
    const resSettings = await axios.get(API_ENDPOINTS.siteSettingsPublic(websiteId));
    const siteData = resSettings?.data?.settings || resSettings?.data?.data || {};

    document.title = siteData.site_title || 'Property Template';

    // Update favicon if available
    if (siteData.favicon) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = siteData.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    localStorage.setItem('siteInfo', JSON.stringify(siteData));
    return siteData;
  } catch (error) {
    console.error('Failed to load site info', error);
    return {};
  }
}

async function bootstrapApp() {
  const siteData = await initSiteInfo();
  const app = createApp(App);
  app.provide('siteInfo', siteData);
  app.use(router);
  app.mount('#app');
}

bootstrapApp();
```

> [!IMPORTANT]
> Default title: `'Property Template'` (bukan `'Default Title'`). Favicon handling WAJIB disertakan.

---

## 10. App.vue

```vue
<template>
  <div id="app" class="min-h-screen">
    <NavbarApp :settings="siteInfo" :menuItems="menuItems" />
    <router-view :pageData="pageData" />
    <FooterPage :settings="siteInfo" />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import NavbarApp from './components/NavbarApp.vue';
import FooterPage from './components/FooterPage.vue';

const siteInfo = inject('siteInfo', {});
const menuItems = ref([]);
const pageData = ref({});

onMounted(() => {
  // Menu items and page data will be fetched by individual components
  // This provides a central place for shared state if needed
});
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
```

---

## 11. PageManagement.vue (Home Page)

PageManagement.vue adalah komponen utama yang:
- Fetch data dari API: `GET /apis/custom-pages/frontend?isFrontend=true&page=Home`
- Cache data ke localStorage dengan key: `customPageData:Home`
- Render semua section components dengan `:pageData="pageData"` prop
- Menggunakan alternating band styling (`ui-band-hero`, `ui-band-mint`, `ui-band-sand`, `ui-band-sky`)

```vue
<template>
  <main class="text-slate-900">
    <section id="home" class="ui-band ui-band-hero"><HeroSection :pageData="pageData" /></section>
    <section id="about" class="ui-band ui-band-mint"><AboutSection :pageData="pageData" /></section>
    <section id="properties" class="ui-band ui-band-sand"><CompanyListSection :pageData="pageData" /></section>
    <section id="services" class="ui-band ui-band-mint"><ServicesSection :pageData="pageData" /></section>
    <section id="testimonials" class="ui-band ui-band-sky"><TestimonialsSection :pageData="pageData" /></section>
    <section id="faq" class="ui-band ui-band-mint"><FAQSection :pageData="pageData" /></section>
    <section id="contact" class="ui-band ui-band-sand"><ContactSection :pageData="pageData" /></section>
  </main>
</template>
```

> [!IMPORTANT]
> - **TIDAK ADA** `FeaturedPropertiesSection`
> - Semua section WAJIB di-pass `:pageData="pageData"` prop
> - Import menggunakan `CompanyListSection` dari `companyListSection.vue`
> - Scoped styles `ui-band` dengan variant `hero`, `mint`, `sand`, `sky` WAJIB disertakan

---

## 12. vue.config.js

```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: '/compro18/',
  transpileDependencies: true,
});
```

> [!NOTE]
> `publicPath` harus sesuai dengan nama project (`/compro18/`), bukan `/`.

---

## 13. public-path.js

```javascript
/* eslint-disable */
if (window.__THEME_BASE_URL__) {
  __webpack_public_path__ = window.__THEME_BASE_URL__;
}
```

---

## 14. public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>Property Template</title>

    <script>
      // Configuration variables - Update these for your environment
      window.APIS_URL = 'https://apicompro.phisoft.co.id';
      window.PATH_URL = '/compro18/';
      window.MENU_GROUP_SLUG = 'compro16';
      window.LISTING_TYPE = 1;
      window.LISTING_DISPLAY_IN = 8;
    </script>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but this application doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

---

## 15. Tailwind Config

Buat file `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C63D36',
          50: '#FFF4F3',
          100: '#FFE7E5',
          200: '#FFCEC9',
          300: '#F8A7A0',
          400: '#EE766D',
          500: '#DE554B',
          600: '#C63D36',
          700: '#AA312B',
          800: '#7F2722',
          900: '#5B1E1A',
        },
        secondary: {
          DEFAULT: '#2C2F3A',
          50: '#F5F6F8',
          100: '#E9EBEF',
          200: '#D2D7E0',
          300: '#B0B8C6',
          400: '#8A94A8',
          500: '#68748D',
          600: '#4E5970',
          700: '#3A4358',
          800: '#2C2F3A',
          900: '#1E212A',
        },
        accent: {
          DEFAULT: '#F6F7FB',
          50: '#FFFFFF',
          100: '#F9FAFD',
          200: '#F4F6FB',
          300: '#ECEFF7',
          400: '#E2E7F2',
          500: '#D6DDEA',
          600: '#C2CCDE',
          700: '#A9B6CF',
          800: '#8F9EBC',
          900: '#7482A4',
        },
      },
    },
  },
  plugins: [],
}
```

---

## 16. PostCSS Config

Buat file `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 17. Babel Config

Buat file `babel.config.js`:

```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```

---

## 18. .env.production

```
NODE_ENV=production
VUE_APP_ENV=production
```

---

## 19. Design System

### CSS Custom Properties & Full Tailwind CSS

Buat file `src/assets/tailwind.css` — ini adalah design system utama:

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #0f766e;
  --color-secondary: #0f172a;
  --color-accent: #f0fdfa;
  --color-ink: #0f172a;
  --color-muted: #475569;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-slate-50 text-slate-900;
    font-family: 'Manrope', 'Segoe UI', sans-serif;
    background-image:
      radial-gradient(circle at 14% 2%, rgba(13, 148, 136, 0.14), transparent 32%),
      radial-gradient(circle at 86% 14%, rgba(251, 146, 60, 0.12), transparent 34%),
      linear-gradient(180deg, #f8fafc 0%, #ecfeff 100%);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', 'Manrope', sans-serif;
    letter-spacing: -0.02em;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0f766e] to-[#14b8a6] px-6 py-3 font-semibold text-white shadow-lg shadow-teal-900/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl;
  }

  .btn-secondary {
    @apply inline-flex items-center gap-2 rounded-full border-2 border-[#0f766e]/35 bg-white/95 px-6 py-3 font-semibold text-[#0f172a] transition-all duration-300 hover:border-[#0f766e] hover:text-[#0f766e];
  }

  .section-container {
    @apply relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-10;
  }

  .section-head {
    @apply mb-12 text-center;
  }

  .section-kicker {
    @apply inline-flex items-center gap-2 rounded-full border border-[#0f766e]/20 bg-white/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e] shadow-sm;
  }

  .section-title {
    @apply mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl;
  }

  .section-subtitle {
    @apply mx-auto mt-4 max-w-3xl text-base text-slate-600 md:text-lg;
  }

  .card {
    @apply rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-cyan-50/40 to-orange-50/40 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-2xl;
  }

  .badge {
    @apply section-kicker;
  }

  .glass-panel {
    @apply rounded-3xl border border-white/70 bg-white/55 backdrop-blur-md;
  }

  .page-shell {
    @apply min-h-screen bg-transparent;
  }

  .page-hero {
    @apply relative overflow-hidden border-b border-teal-100 bg-white/90 py-16 text-slate-900;
  }

  .page-hero::before {
    content: '';
    @apply pointer-events-none absolute inset-0;
    background-image:
      radial-gradient(circle at 12% 0%, rgba(20, 184, 166, 0.2), transparent 38%),
      radial-gradient(circle at 92% 90%, rgba(251, 146, 60, 0.18), transparent 36%);
  }

  .page-hero-title {
    @apply relative text-4xl font-bold md:text-5xl;
  }

  .page-hero-subtitle {
    @apply relative mt-4 text-lg text-slate-600 md:text-xl;
  }

  .page-section {
    @apply section-container py-12;
  }

  .page-panel {
    @apply card border-teal-100/80 bg-white/95 p-6;
  }

  .surface-input {
    @apply w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none ring-teal-500/20 transition-all placeholder:text-slate-400 focus:border-teal-600 focus:ring-2;
  }

  .surface-select {
    @apply w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none ring-teal-500/20 transition-all focus:border-teal-600 focus:ring-2;
  }

  .chip-price {
    @apply rounded-full bg-gradient-to-r from-[#0f766e] to-[#14b8a6] px-3 py-1 text-sm font-semibold text-white shadow-md;
  }

  .page-pagination-btn {
    @apply rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition-all hover:border-teal-500/30 hover:text-teal-700;
  }

  .page-pagination-btn-active {
    @apply border-teal-700 bg-teal-700 text-white;
  }

  .icon-orb {
    @apply flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700;
  }

  .muted-link {
    @apply text-slate-600 transition-colors hover:text-teal-700;
  }

  .bg-gradient-primary {
    @apply bg-gradient-to-r from-[#0f766e] to-[#14b8a6];
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-[#0f766e] to-[#fb923c] bg-clip-text text-transparent;
  }

  .mesh-bg {
    background-image:
      radial-gradient(circle at 15% 20%, rgba(13, 148, 136, 0.18), transparent 30%),
      radial-gradient(circle at 82% 16%, rgba(251, 146, 60, 0.16), transparent 28%),
      radial-gradient(circle at 50% 90%, rgba(15, 23, 42, 0.08), transparent 34%);
  }

  .grid-overlay {
    background-image:
      linear-gradient(rgba(148, 163, 184, 0.14) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.14) 1px, transparent 1px);
    background-size: 32px 32px;
  }
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #e5e7eb;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--color-primary), #14b8a6);
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #14b8a6, #0f766e);
}

* {
  @apply transition-colors duration-200;
}
```

---

## 20. NavbarApp.vue Pattern

```javascript
import API_ENDPOINTS, { API_URL } from '@/config/api';

/* global defineProps */
const props = defineProps({
  settings: { type: Object, default: () => ({}) },
  menuItems: { type: Array, default: () => [] },
});
```

### Fetch Logo

```javascript
const fetchLogo = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.settingLogo);
    const raw = res?.data?.data || res?.data || {};
    const candidate = raw.logo || raw.icon || raw.value;
    logoError.value = false;
    if (candidate) {
      logo.value = /^https?:\/\//i.test(candidate) ? candidate : joinUrl(API_URL, candidate);
    } else {
      logo.value = '';
    }
  } catch (error) {
    console.warn('Failed to fetch logo, using settings', error);
    logoError.value = false;
    logo.value = props.settings?.logo || '';
  }
};
```

### Fetch Menu (with sort by order then id)

```javascript
const fetchMenu = async () => {
  try {
    const menuGroup = window.MENU_GROUP_SLUG || 'main';
    const response = await axios.get(API_ENDPOINTS.menuListByGroup(menuGroup));
    const items = response?.data?.data || response?.data || [];

    if (items.length > 0) {
      menus.value = [...items]
        .sort((a, b) => {
          const orderA = Number.isFinite(Number(a?.order)) ? Number(a.order) : Number.MAX_SAFE_INTEGER;
          const orderB = Number.isFinite(Number(b?.order)) ? Number(b.order) : Number.MAX_SAFE_INTEGER;
          if (orderA !== orderB) return orderA - orderB;
          const idA = Number.isFinite(Number(a?.id)) ? Number(a.id) : Number.MAX_SAFE_INTEGER;
          const idB = Number.isFinite(Number(b?.id)) ? Number(b.id) : Number.MAX_SAFE_INTEGER;
          return idA - idB;
        })
        .map(item => ({
          id: item.id,
          title: item.title || item.label || item.name || 'Tanpa Judul',
          path: item.path || item.url || item.link || '/',
          target: item.target || (item.open_in_new_tab ? '_blank' : '_self'),
          parent_id: item.parent_id || null,
          order: item.order,
        }));
    } else {
      menus.value = defaultMenuItems;
    }
  } catch (error) {
    console.warn('Failed to fetch menu, using defaults', error);
    menus.value = defaultMenuItems;
  }
};
```

> [!IMPORTANT]
> Menu HARUS di-sort berdasarkan `order` lalu `id`. Tambahkan `open_in_new_tab` support dan `order` field.

---

## 21. FooterPage.vue Pattern

Footer fetches menu dari `API_ENDPOINTS.FOOTER_MENU` dan menampilkan:
- Site title & description dari siteInfo settings
- Social media links (static)
- Footer navigation menu (dynamic)
- Contact info: address, phone, email dari settings
- Copyright year (dynamic)

---

## 22. TestimonialsSection.vue Pattern

Testimonials section sudah terintegrasi dengan:
1. **CMS tags:** `testimoni_badge20`, `testimoni_title20` untuk header
2. **API fetch:** `API_ENDPOINTS.testimonials` untuk data testimonials
3. **Fallback data** jika API gagal atau kosong
4. **stripHtml helper** untuk sanitize HTML content
5. **formatContent** untuk wrapping dalam tanda kutip

---

## 23. ListingPage.vue — Sorting Logic

ListingPage memiliki sophisticated sorting:

```javascript
// Sort options: newest, impact-high, duration-fast

const getValueByTags = (listing, tags) => {
  const values = listing?.values || [];
  const row = values.find(item => tags.includes((item?.tag_name || '').toLowerCase()));
  return row?.value ?? '';
};

const toNumber = (raw) => {
  if (raw === null || raw === undefined) return 0;
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : 0;
  const normalized = String(raw).replace(',', '.');
  const match = normalized.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
};

const getImpactScore = (listing) => {
  const fromTags = getValueByTags(listing, ['impact', 'dampak', 'impact_score', 'dampak_utama', 'hasil']);
  const fromPrice = toNumber(listing?.price);
  return toNumber(fromTags) || fromPrice || 0;
};

const getDurationInDays = (listing) => {
  const durationRaw = getValueByTags(listing, ['durasi', 'duration', 'project_duration', 'lama_proyek']);
  if (!durationRaw) return Number.MAX_SAFE_INTEGER;
  const value = toNumber(durationRaw);
  const text = String(durationRaw).toLowerCase();
  if (!value) return Number.MAX_SAFE_INTEGER;
  if (text.includes('tahun')) return value * 365;
  if (text.includes('minggu')) return value * 7;
  if (text.includes('hari')) return value;
  return value * 30;
};
```

---

## 24. ListingDetailPage.vue — Gallery Logic

```javascript
const normalizeGallery = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.filter(Boolean).map(item => (typeof item === 'string' ? item : item?.url || item?.src || '')).filter(Boolean);
  }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return normalizeGallery(parsed);
    } catch (err) {
      // treat as single URL / comma-separated list
    }
    return raw.split(',').map(v => v.trim()).filter(Boolean);
  }
  return [];
};
```

---

## 25. Window Configuration Variables

```javascript
window.APIS_URL = 'https://apicompro.phisoft.co.id';
window.PATH_URL = '/compro18/';
window.MENU_GROUP_SLUG = 'compro16';
window.LISTING_TYPE = 1;
window.LISTING_DISPLAY_IN = 8;
```

---

## 26. Listing Data Model

```javascript
{
  post_id: number,
  listing_type: number,
  price: string,
  kabupaten: string,
  kecamatan: string,
  provinsi: string,
  created_at: string,
  updated_at: string,
  post: {
    id: number,
    title: string,
    excerpt: string,
    content: string,
    thumbnail_url: string,
    gallery: array|string,
    categories: [{ id, name, slug, display_in }],  // display_in = NUMBER
    created_at: string,
    updated_at: string,
  },
  listingType: { id, name },
  values: [{ tag_name, value }]
}
```

---

## 27. Verifikasi Template

Setelah generate template, verifikasi:

### API Integration
- [ ] Site info fetch, favicon update, dan cache di localStorage
- [ ] Menu dinamis dari API dengan sorting by order lalu id
- [ ] Footer menu dari FOOTER_MENU endpoint
- [ ] Custom pages data untuk sections
- [ ] Testimonials dari API endpoint

### ESLint & Build
- [ ] Semua component dengan `defineProps` memiliki komentar `/* global defineProps */`
- [ ] `"requireConfigFile": false` di eslintConfig parserOptions
- [ ] `npm run build:production` berhasil tanpa error

### CMS Tags
- [ ] Semua section membaca dari tag dengan suffix `20`
- [ ] Fallback ke default values jika tag kosong

### Listing
- [ ] Filter berdasarkan `LISTING_TYPE` (number)
- [ ] Categories filter berdasarkan `LISTING_DISPLAY_IN` (number)
- [ ] Categories diextract dari listings response
- [ ] Sorting: newest, impact-high, duration-fast
- [ ] Pagination dan category filter berfungsi
- [ ] Detail page gallery normalizer berfungsi
- [ ] Detail page menampilkan semua data

### Design System
- [ ] Google Fonts Manrope & Outfit loaded
- [ ] Full component classes tersedia di tailwind.css
- [ ] Tailwind config dengan extended color palette
- [ ] Scoped styles per section component

### Responsive
- [ ] Mobile navigation berfungsi
- [ ] Grid layouts responsive
- [ ] Touch-friendly interactions

---

## 28. Catatan Penting

| Rule | Description |
|------|-------------|
| **CMS Tag Suffix** | Semua tag diakhiri dengan `20` (contoh: `home_badge20`), **BUKAN** `9`. |
| **ESLint Global Comment** | Setiap component yang menggunakan `defineProps` HARUS menambahkan `/* global defineProps */`. |
| **ESLint requireConfigFile** | `"requireConfigFile": false` WAJIB di eslintConfig parserOptions. |
| **LISTING_DISPLAY_IN Type** | Nilai default adalah **number** (contoh: 8), bukan string. |
| **Fetch Categories Logic** | Categories diextract dari response listings, bukan endpoint terpisah. |
| **Storage Keys** | Format `customPageData:{PageName}` untuk cache. |
| **Field Fallback** | Selalu cek `item.link \|\| item.Link` untuk handle casing. |
| **Default Values** | Setiap section HARUS punya `baseSection` untuk fallback. |
| **Watch Pattern** | Gunakan watch dengan `immediate: true` untuk reaktivitas. |
| **Menu Sorting** | Menu HARUS di-sort by `order` lalu `id`. |
| **Favicon** | main.js HARUS handle favicon update. |
| **No FeaturedProperties** | Template TIDAK memiliki FeaturedPropertiesSection. |
| **companyListSection** | Filename menggunakan huruf kecil `c` (`companyListSection.vue`). |
| **Testimonials Integration** | TestimonialsSection SUDAH terintegrasi CMS & API (bukan data statis). |
| **publicPath** | vue.config.js `publicPath` harus sesuai project name (`/compro18/`). |
