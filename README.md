# dc-astro

---

# Delhi Concierge Website

High-performance, SEO-first travel website built with **Astro**.
Focused on helping travelers reduce **sensory overload** and achieve **cognitive relief** when navigating Delhi.

---

## 🚀 Tech Stack

* [Astro](https://astro.build/) — static site generator (performance-first)
* MDX — content system for blogs
* Firebase Hosting — deployment
* TypeScript — type safety
* Image optimization — Astro assets pipeline

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
npm install
```

---

## 🧪 Development

Run the local dev server:

```bash
npm run dev
```

* Default: http://localhost:4321
* Hot reload enabled

---

## 🏗️ Build

Generate production build:

```bash
npm run build
```

Output will be in:

```
/dist
```

---

## 🔥 Deployment (Firebase Hosting Only)

### Automated GitHub deployment

GitHub Actions runs an Astro production build for pull requests and pushes to
`main`. Pull requests receive a temporary Firebase Hosting preview at a
`pr-<number>` channel that expires after seven days. Pushes to `main` deploy to
the live Firebase Hosting channel.

Firebase authentication is provided through the repository secret
`FIREBASE_SERVICE_ACCOUNT_BASE64`. The secret must contain the Firebase service
account JSON encoded as a single-line Base64 value. Credentials are decoded only
inside the temporary GitHub Actions runner and are never committed to the
repository.

The workflow can also be started manually from the GitHub Actions page.

### Manual deployment

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login

```bash
firebase login
```

### 3. Initialize (if not already done)

```bash
firebase init
```

Select:

* Hosting
* Set `dist` as public directory
* Configure as SPA: **No**
* Overwrite index.html: **No**

### 4. Deploy

```bash
firebase deploy --only hosting
```

---

## 📁 Project Structure

```
.
├── public/
├── src/
│   ├── assets/              # Images & static assets
│   ├── components/          # Reusable components
│   ├── content/             # MDX collections
│   │   └── blog/            # Blog content
│   ├── layouts/             # Page layouts
│   ├── pages/               # Routes
│   ├── styles/              # Global styles
│   └── utils/               # Helpers
├── dist/                    # Production build output
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

> ⚠️ `node_modules/` is intentionally ignored

---

## 🌳 Tree View (Ignoring node_modules)

To inspect project structure:

```bash
tree -I "node_modules"
```

---

## ⚙️ Available Scripts

| Command                        | Description                       |
| ------------------------------ | --------------------------------- |
| npm run dev                    | Start development server          |
| npm run build                  | Build production site             |
| firebase deploy                | Deploy to Firebase (all services) |
| firebase deploy --only hosting | Deploy only hosting               |

---

## 🧠 Content System (MDX)

All blogs are stored in:

```
src/content/blog/
```

Each blog must include:

```md
---
title:
description:
pubDate:
author:
category:
heroImage:
seoTitle:
seoDescription:
---
```

### Content Rules

* SEO-first titles (query-based)
* Strong introduction (answer first)
* Internal linking to related blogs
* Include FAQ section (for AI search)
* Use consistent tone: clarity → cognitive relief

---

## 🔗 Internal Linking Strategy

Every blog should:

* Link to **3–5 related blogs**
* Link to **service page**
* Be included in at least one **cluster**

Example clusters:

* Safety in Delhi
* Transport in Delhi
* Cost & budgeting
* Food & hygiene

---

## 🔍 SEO Strategy

### Core Focus:

* Long-tail keywords
* Search intent matching
* Topical authority

### Must-Have:

* Sitemap (auto-generated)
* Meta tags (seoTitle, seoDescription)
* Clean URLs
* Internal linking

### Future Enhancements:

* FAQ Schema
* Article Schema
* LocalBusiness Schema

---

## ⚡ Performance Strategy

* Astro = minimal JS by default
* Optimized images (responsive + compressed)
* Lazy loading where needed
* Avoid unnecessary hydration

### Targets:

* LCP < 2.5s
* CLS < 0.1
* INP < 200ms

---

## 📱 UX Principles

* Mobile-first design
* Low cognitive load
* Fast navigation
* Clear CTA (conversion-focused)

---

## 📍 Local SEO (Important)

To be implemented:

* Google Business Profile
* Consistent NAP (Name, Address, Phone)
* Reviews integration

---

## 🤖 AI Search Optimization (GEO)

To improve visibility in AI summaries:

* Use structured content (FAQs, lists)
* Direct answers early in content
* Clear headings hierarchy
* Schema markup (planned)

---

## 📊 Analytics (Recommended)

* Google Search Console
* Google Analytics
* Heatmaps (optional)

---

## 🧩 Future Improvements

* Dynamic sitemap freshness
* Automated internal linking
* Content clustering system
* Blog recommendation engine
* Conversion tracking
* A/B testing

---

## 🚨 Known Considerations

* SEO takes time (4–8 weeks minimum impact)
* Authority requires backlinks
* Content depth > quantity

---

## 📄 License

Private project — Delhi Concierge

---

## 👤 Author

Shaw
