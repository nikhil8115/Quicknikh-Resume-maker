# QUICKNIKH RESUME 🐼👒
> Instant, Professional, ATS-Friendly Single-Page Resume Builder.

![QUICKNIKH RESUME](assets/panda-logo.svg)

## 🚀 Live Demo & Features

- 🐼 **Cute Mascot**: Featuring a cartoon panda wearing a straw hat.
- 🎯 **6 Resume Archetypes**: Tech & Engineering, Fresher / Graduate, Executive, ATS Clean Scan, Creative, and Academic.
- ⚡ **1-Click Basic Office & Everyday Skills**: Quick-select MS Excel, Tally ERP, MS Word, MS PowerPoint, Data Entry, and Accounting.
- 🤖 **Auto-Fill A4 Precision**: Fills a standard A4 page (210mm × 297mm) dynamically without oversized voids.
- ✨ **Glorified Lines & Graphic Gauges**: Visual skill proficiency progress bars, timeline rails, dual-tone header accents, and decorative section tracks.
- 🖨️ **1-Click PDF Export**: Direct print / download standard A4 PDF.

---

## 📂 Project Structure

```text
quicknikh-resume/
├── index.html           # Main application markup
├── style.css            # Stylesheet, design tokens, and A4 print styling
├── app.js               # Application state, wizard flow, and template renderer
├── assets/
│   └── panda-logo.svg   # Vector mascot logo
├── .gitignore
└── README.md
```

---

## 🌐 How to Deploy to GitHub Pages (Step-by-Step)

### Option A: Using Git Command Line (Recommended)

1. Open your terminal in this folder (`quicknikh-resume`):
   ```bash
   cd quicknikh-resume
   ```

2. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: QUICKNIKH RESUME"
   ```

3. Create a new repository on [GitHub](https://github.com/new) named `quicknikh-resume`.

4. Link and push to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/quicknikh-resume.git
   git push -u origin main
   ```

5. Enable **GitHub Pages**:
   - Go to your GitHub Repository **Settings** -> **Pages** (on left sidebar).
   - Under **Build and deployment** -> **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.
   - Your website will be live in ~30 seconds at: `https://YOUR_USERNAME.github.io/quicknikh-resume/` 🎉

---

### Option B: Upload via GitHub Web Interface

1. Go to [GitHub.com](https://github.com/new) and create a repository named `quicknikh-resume`.
2. Click **"uploading an existing file"**.
3. Drag and drop all files (`index.html`, `style.css`, `app.js`, `README.md`, and the `assets` folder).
4. Click **Commit changes**.
5. Go to **Settings** -> **Pages**, select `main` branch, and click **Save**.

---

## 🛠️ Local Development

Simply open `index.html` in any web browser, or run a local lightweight server:
```bash
# Python
python -m http.server 3000

# Node.js
npx serve .
```
