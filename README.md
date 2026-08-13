# Princy Hear & Speech Rehab — Official Project Documentation

> **Live Website (Vercel)**: [https://princy-hear-speech.vercel.app/](https://princy-hear-speech.vercel.app/)  
> **Live Admin Panel (Vercel)**: [https://princy-hear-speech.vercel.app/admin.html](https://princy-hear-speech.vercel.app/admin.html)  
> **Repository**: [https://github.com/amarvisual/Princy-hear-speech](https://github.com/amarvisual/Princy-hear-speech)  
> **Clinic**: Princy Hear and Speech Rehab  
> **Location**: Nandan Vihar, Patia, Bhubaneswar, Odisha 751024  
> **Last Updated**: 2026-08-13  

---

## 📌 Project Overview

**Princy Hear & Speech Rehab** is a modern, responsive website and content management system for a speech therapy and audiology rehabilitation clinic in Bhubaneswar, India.

The project features a **100% static, zero-backend architecture** powered by client-side persistence (`localStorage`), an intuitive **Admin Control Panel** for non-technical users, and instant real-time synchronization across all public website pages.

---

## 📂 Complete File Structure

```text
d:\Website project\
├── index.html            # Main Homepage (Hero, Doctor Box, Why Us, Services Preview, Testimonials)
├── about.html            # About Us Page (Clinic Mission, Vision, Story, Specialist Staff Grid)
├── services.html         # Services Page (All 6 Therapy Programs & FAQ)
├── contact.html          # Contact Page (Phone, WhatsApp, Timings, Google Maps Embed)
├── style.css             # Main Website Stylesheet (Design tokens, animations, responsive layout)
├── admin.html            # Beginner-Friendly Admin Control Panel
├── admin.css             # Admin Dashboard Stylesheet (Modern dark UI, cards, modal, responsive)
├── admin.js              # Admin Logic (Photo upload, placeholder generator, JSON backup/restore)
├── site-data.js          # Shared Bridge Script (Central data schema & automatic DOM hydration)
├── serve.ps1             # Local testing HTTP server script (PowerShell)
├── README.md             # This comprehensive project documentation and changelog
├── .agents/
│   └── AGENTS.md         # AI Pair-Programming Rules (Mandatory README sync rule)
├── doctor.jpg            # Lead Specialist Photo (Dr. Sornajali Srichandan)
├── team-anjali.jpg       # Specialist 1 Photo (Anjali Mam)
├── team-swaranjali.jpg   # Specialist 2 Photo (Dr. Sornajali)
├── logo.png              # Clinic Logo (Primary transparent PNG)
├── logo.jpg              # Clinic Logo (JPEG fallback)
├── favicon.ico           # Browser Tab Favicon
├── robots.txt            # Search engine crawler instructions
└── sitemap.xml           # SEO Sitemap for Google indexing
```

---

## 🛠️ Technology Stack & Architecture

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Fonts**: Google Fonts (`Outfit` for bold modern headings, `Inter` for clean body typography).
- **State Management & Persistence**: `localStorage` via key `princy_site_data_v1`.
- **Image Processing**: Native browser `FileReader` for local Base64 conversion + inline SVG generator.
- **Hosting Compatibility**: 100% compatible with GitHub Pages, Cloudflare Pages, Netlify, Vercel, or traditional Apache/Nginx web hosting.

---

## 🖥️ How the Admin Panel & Data Bridge Works

### 1. Central Data Store (`site-data.js`)
`site-data.js` contains the complete default schema for:
- **General Info**: Clinic name, phone numbers, WhatsApp link, email, addresses, weekday/weekend hours, social links.
- **Hero & Content**: Headings, glowing subtitle, statistics (5.0★ rating, 500+ patients, 6+ services, 6 days/week).
- **Lead Doctor Card**: Doctor name, degree qualifications (`M.Sc. SLP`), designation, location tag, rating tag, and photo.
- **13 Image Slots**: Logo, favicon, hero doctor photo, team staff photos, 6 service visuals, and clinic facility pictures.
- **6 Therapy Services**: Speech Therapy, Pediatric Therapy, Hearing Care, Digital Hearing Aids, Adult Rehabilitation, Home Therapy.
- **Staff Team**: Doctors, Speech-Language Pathologists, and Patient Care Support.
- **Testimonials**: Patient names, relations, reviews, and 5-star ratings.

### 2. Automatic DOM Hydration
Every public page (`index.html`, `about.html`, `services.html`, `contact.html`) includes `site-data.js`. When a page loads:
1. `data-ph-img="key"` elements automatically update their `src` attribute.
2. `data-ph-text="path.to.key"` elements automatically inject custom text.
3. `data-ph-link="type"` elements automatically construct active `tel:`, `mailto:`, and `https://wa.me/` WhatsApp chat links.

### 3. Non-Technical Admin Dashboard (`admin.html`)
- **🔒 Password Protection**: Protected with passcode authentication (`Ashish@2026`), session management, and a one-click Log Out button.
- **No Coding Needed**: Designed with large buttons, plain English explanations, and helpful hints under every field.
- **1-Click Photo Upload**: Click `📁 Upload Photo from Computer` on any photo card to pick an image from your device.
- **Graphic Generator**: Click `✨ Create Graphic` to generate a branded SVG placeholder with custom clinic icons (🩺, 🗣️, 👂, 👶, 🧠, 🔊, 🏡).
- **Instant Save**: Clicking `💾 Save Changes` writes the state to persistent storage, instantly updating the live site.
- **Safety**: `🔄 Reset to Defaults` button allows reverting back to factory default content at any time.
- **Backup & Restore**: `📥 Download Backup File (.json)` exports the complete configuration so you can move or restore it anywhere.

---

## 🚀 How to Deploy to GitHub

### Option A: 1-Click Web Upload (Easiest - 30 Seconds)
1. Open your repository: [https://github.com/amarvisual/Princy-hear-speech](https://github.com/amarvisual/Princy-hear-speech)
2. Click **"Add file"** (top right) ➔ **"Upload files"**.
3. Drag & drop the updated files from `d:\Website project\`:
   - `admin.html`, `admin.css`, `admin.js`
   - `site-data.js`
   - `index.html`, `about.html`, `services.html`, `contact.html`
   - `README.md`
4. Click **"Commit changes"**.

### Option B: Enabling GitHub Pages (Free Hosting)
1. In your GitHub repository, click **Settings** ➔ **Pages** (left sidebar).
2. Under **Build and deployment** ➔ **Source**, select `Deploy from a branch`.
3. Choose `main` (or `master`) branch and `/ (root)` folder ➔ Click **Save**.
4. Your website will be live globally at `https://amarvisual.github.io/Princy-hear-speech/`!

---

## 🚀 How to Run and Test Locally

### Method 1: Direct File Opening
Double-click [`admin.html`](file:///d:/Website%20project/admin.html) or [`index.html`](file:///d:/Website%20project/index.html) in Windows File Explorer to open directly in Google Chrome, Microsoft Edge, or Firefox.

### Method 2: Local HTTP Server (PowerShell)
Run the included PowerShell server:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```
Then visit:
- **Website**: `http://localhost:8080/index.html`
- **Admin Panel**: `http://localhost:8080/admin.html`

---

## 🔒 Mandatory Project Maintenance Rule

> **CRITICAL RULE FOR AI ASSISTANTS & DEVELOPERS:**  
> Whenever any code, layout, data attribute, script, or configuration changes are made to this project in future sessions, **this `README.md` file MUST be updated immediately** to reflect the exact changes, new files, modified features, and updated changelog. This ensures the project can be moved or cloned anywhere with complete historical context preserved.

---

## 📝 Changelog & History

### Version 1.1.0 (2026-08-13)
- **Security & Access Control**: Added password protection lock screen to [`admin.html`](file:///d:/Website%20project/admin.html) requiring passcode (`Ashish@2026`), with show/hide password toggle, error shake animation, session storage authentication, and a sidebar Log Out button.
- **Deployment**: Live synchronization configured for Vercel at `https://princy-hear-speech.vercel.app/admin.html`.

### Version 1.0.0 (2026-08-13)
- **Repository Setup**: Retrieved and organized project files from GitHub repository `amarvisual/Princy-hear-speech`.
- **Admin Panel Development**: Created [`admin.html`](file:///d:/Website%20project/admin.html), [`admin.css`](file:///d:/Website%20project/admin.css), and [`admin.js`](file:///d:/Website%20project/admin.js) with 1-click uploads, clinic graphic generator, and plain-English non-technical interface.
- **Real-Time Data Bridge**: Built [`site-data.js`](file:///d:/Website%20project/site-data.js) providing automatic DOM hydration and synchronization.
- **Public Pages Integration**: Connected [`index.html`](file:///d:/Website%20project/index.html), [`about.html`](file:///d:/Website%20project/about.html), [`services.html`](file:///d:/Website%20project/services.html), and [`contact.html`](file:///d:/Website%20project/contact.html) with dynamic attributes and added an unobtrusive `🔒 Admin Panel` link in all footers.
- **Backup System**: Added JSON export/import and reset tools.
- **Documentation**: Created `README.md` and `.agents/AGENTS.md` with persistent synchronization rules.
