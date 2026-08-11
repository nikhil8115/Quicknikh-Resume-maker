# QUICKNIKH RESUME 🐼👒
> Instant, Professional, ATS-Friendly Single-Page Resume Builder for **Android** & **Desktop**.

![QUICKNIKH RESUME](assets/panda-logo.svg)

## 🚀 Features & Multi-Platform Modes

- 📱 **Android & Mobile App (PWA)**:
  - Installable directly to home screen via 1-tap install prompt (`manifest.json` + `sw.js`).
  - Offline capable with Service Worker caching.
  - Native thumb-friendly bottom navigation bar (Questions, Types, All Form, Theme, PDF Export).
  - Floating Action Button (FAB) for instant `[ 👁️ Live Preview ]` toggling.
  - Touch targets sized ≥ 44px with virtual keypad optimization.
- 💻 **Desktop Split Mode**:
  - Side-by-side split screen view with full-scale live A4 preview canvas.
- 🔄 **3-Way View Mode Switcher**:
  - `[ 🔄 Auto | 💻 Desktop | 📱 Android ]` toggle in the top bar to easily switch layouts on any device.
- 🐼 **Mascot Logo**: Cute cartoon panda wearing a straw hat.
- 🎯 **6 Resume Archetypes**: Tech, Fresher / Graduate, Executive, ATS Clean Scan, Creative, and Academic.
- ⚡ **1-Click Basic Office Skills**: MS Excel, Tally ERP, MS Word, MS PowerPoint, Fast Typing, Accounting, etc.
- 📐 **Auto-Fill A4 Precision**: Fills the entire standard A4 page (210mm × 297mm) dynamically.
- ✨ **Glorified Lines & Graphic Gauges**: Visual skill proficiency bars, timeline rails, dual-tone header accents.
- 🖨️ **1-Click PDF Export**: Direct print / download standard A4 PDF.

---

## 📂 Project Structure

```text
quicknikh-resume/
├── index.html           # Main application markup (with PWA meta tags & bottom nav)
├── style.css            # Responsive styles, Android/Desktop mode classes, A4 print rules
├── app.js               # Core app logic, Service Worker registration, mode switcher
├── manifest.json        # PWA Web App Manifest for Android installation
├── sw.js                # Service Worker for offline PWA caching
├── assets/
│   └── panda-logo.svg   # Vector mascot logo & app icon
├── .gitignore
└── README.md
```

---

## 🌐 How to Deploy to GitHub Pages

1. Open your terminal in `quicknikh-resume`:
   ```bash
   cd quicknikh-resume
   git init
   git add .
   git commit -m "Launch Android PWA & Desktop Mode for QUICKNIKH RESUME 🐼"
   ```

2. Create a repository on [GitHub](https://github.com/new) named `quicknikh-resume`.

3. Push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/quicknikh-resume.git
   git push -u origin main
   ```

4. Go to **Settings** -> **Pages**, choose `main` branch, and click **Save**.
5. Your web app is live at: `https://YOUR_USERNAME.github.io/quicknikh-resume/` 🎉
