/**
 * QUICKNIKH RESUME — Fast, Simple & Streamlined Multi-Platform Engine
 * Optimized for Android Chrome & Desktop
 */

// Basic & Essential Office / Computer Skills
const BASIC_OFFICE_SKILLS = [
  { name: "MS Excel", icon: "📊" },
  { name: "Tally ERP / Prime", icon: "📑" },
  { name: "MS Word", icon: "📝" },
  { name: "MS PowerPoint", icon: "📽️" },
  { name: "Data Entry & Office", icon: "🗃️" },
  { name: "Accounting & GST", icon: "🧮" },
  { name: "Client Communication", icon: "📧" },
  { name: "Fast Typing (50+ WPM)", icon: "⌨️" }
];

// Bio Presets
const BIO_PRESETS = {
  fresher: "Motivated and detail-oriented graduate with strong foundational problem-solving skills, academic excellence, and a passion to contribute to innovative projects.",
  tech: "Results-driven Software Engineer with deep expertise in architecting robust applications, modern frameworks, and scalable cloud solutions.",
  executive: "Strategic leader with a proven record of driving operational excellence, cross-functional collaboration, and delivering high-impact business outcomes.",
  creative: "User-centric designer passionate about crafting intuitive digital experiences, modern aesthetic interfaces, and effective visual branding.",
  results: "Proactive, analytical professional skilled in workflow optimization, task execution, and delivering measurable results in fast-paced teams."
};

// Skill Percentage Helper for Progress Gauge Tracks
function getSkillPercentage(level) {
  switch ((level || "").toLowerCase()) {
    case "expert": return "95%";
    case "advanced": return "80%";
    case "proficient": return "65%";
    case "familiar": return "50%";
    default: return "70%";
  }
}

// Initial Default State
const defaultState = {
  activeView: "wizard",  // "wizard", "content", "style"
  viewMode: "auto",      // "auto", "desktop", "android"
  mobilePreviewActive: false,
  zoomFit: true,
  wizardStep: 1,         // 1..5
  resumeType: "tech",    // "tech", "fresher", "executive", "ats", "creative", "academic"
  density: "auto",       // "auto", "spacious", "balanced", "compact"
  personal: {
    name: "Ramu",
    headline: "Senior Full-Stack Engineer",
    dob: "15 April 1997",
    location: "Kanpur",
    email: "ramu@email.com",
    phone: "+91 98765 43210",
    summary: BIO_PRESETS.tech
  },
  qualifications: [
    {
      id: "q-1",
      degree: "B.S. in Computer Science & Engineering",
      institution: "Indian Institute of Technology (IIT) Kanpur",
      year: "2015 – 2019",
      score: "GPA: 3.85 / 4.0 (First Class with Distinction)"
    }
  ],
  skills: [], // User selects basic office or suggested chips
  experience: [
    {
      id: "e-1",
      title: "Lead Software Engineer",
      company: "Nexus Technologies",
      period: "2021 – Present",
      description: "• Architected distributed web applications serving 1.5M+ active users with 99.9% uptime.\n• Spearheaded the migration to modern micro-frontend architecture.\n• Mentored junior engineers and established high-efficiency CI/CD deployment pipelines."
    },
    {
      id: "e-2",
      title: "Software Developer",
      company: "Apex Cloud Solutions",
      period: "2019 – 2021",
      description: "• Built real-time telemetry dashboards and API endpoints, improving query speed by 40%.\n• Designed responsive, accessible UI components used across core web products."
    }
  ],
  customization: {
    template: "modern",
    color: "#2563eb",
    font: "'Plus Jakarta Sans', sans-serif"
  }
};

// Demo Skills for "Sample Data"
const SAMPLE_DEMO_SKILLS = [
  { id: "s-1", name: "MS Excel", level: "Expert" },
  { id: "s-2", name: "JavaScript / TypeScript", level: "Expert" },
  { id: "s-3", name: "React & Node.js", level: "Expert" },
  { id: "s-4", name: "Python & SQL", level: "Advanced" },
  { id: "s-5", name: "Git & DevOps", level: "Proficient" }
];

// Type Configurations
const TYPE_CONFIGS = {
  tech: {
    name: "Tech & Software",
    template: "modern",
    color: "#2563eb",
    font: "'Plus Jakarta Sans', sans-serif",
    defaultBioKey: "tech",
    suggestedSkills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL & Databases", "Docker & K8s", "Git & CI/CD", "System Design", "Cloud & DevOps"]
  },
  fresher: {
    name: "Fresher / Graduate",
    template: "fresher",
    color: "#059669",
    font: "'Outfit', sans-serif",
    defaultBioKey: "fresher",
    suggestedSkills: ["MS Excel", "MS Word", "Python", "Java", "Web Development", "Data Structures", "Problem Solving", "Team Collaboration", "Communication"]
  },
  executive: {
    name: "Executive & Leadership",
    template: "executive",
    color: "#0f172a",
    font: "'Plus Jakarta Sans', sans-serif",
    defaultBioKey: "executive",
    suggestedSkills: ["Strategic Planning", "Team Leadership", "Budgeting", "Cross-Functional Alignment", "MS PowerPoint", "Stakeholder Engagement", "Product Strategy"]
  },
  ats: {
    name: "ATS Clean Scan",
    template: "ats",
    color: "#0f172a",
    font: "'Inter', sans-serif",
    defaultBioKey: "results",
    suggestedSkills: ["MS Excel", "Project Management", "Data Analysis", "Technical Analysis", "Communication", "Problem Solving", "Quality Assurance"]
  },
  creative: {
    name: "Creative & Designer",
    template: "creative",
    color: "#7c3aed",
    font: "'Outfit', sans-serif",
    defaultBioKey: "creative",
    suggestedSkills: ["UI/UX Design", "Figma", "Design Systems", "Prototyping", "User Research", "Visual Branding", "HTML/CSS", "Wireframing"]
  },
  academic: {
    name: "Academic & Research",
    template: "executive",
    color: "#e11d48",
    font: "'Playfair Display', serif",
    defaultBioKey: "results",
    suggestedSkills: ["Research Methodology", "Statistical Analysis", "Data Modeling", "Scientific Writing", "MS Word", "MS Excel", "Public Speaking"]
  }
};

const WIZARD_STEP_TITLES = [
  "1. Name & Professional Title",
  "2. Date of Birth (DOB) & Contact",
  "3. Qualifications & Education",
  "4. Skills & Competencies",
  "5. Work Experience / Projects"
];

let appState = JSON.parse(JSON.stringify(defaultState));
const STORAGE_KEY = "quicknikh_resume_state_v5";
let deferredInstallPrompt = null;

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  initServiceWorker();
  initPwaInstallPrompt();
  bindViewModeSwitcher();
  bindNavTabs();
  bindResumeTypeCards();
  bindHeadlineOptions();
  bindBioOptions();
  bindDensityControls();
  bindWizardControls();
  bindFormInputs();
  bindThemeCustomizers();
  bindHeaderActions();
  bindMobileNavigation();
  bindZoomFit();

  // Initial Renders
  renderBasicSkillSuggestionChips();
  renderQualificationsList();
  renderSkillsChips();
  renderExperienceList();
  updateAgeBadge();
  applyActiveType(appState.resumeType || "tech", false);
  setDensity(appState.density || "auto", false);
  setWizardStep(appState.wizardStep || 1);
  setViewMode(appState.viewMode || "auto", false);
  switchView(appState.activeView || "wizard");
  applyZoomFit(appState.zoomFit !== false);
});

// ==========================================================================
// Service Worker & Android PWA Installation
// ==========================================================================
function initServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then((reg) => console.log("QUICKNIKH PWA Worker registered:", reg.scope))
        .catch((err) => console.warn("PWA registration failed:", err));
    });
  }
}

function initPwaInstallPrompt() {
  const banner = document.getElementById("pwa-install-banner");
  const installBtn = document.getElementById("btn-install-pwa");
  const dismissBtn = document.getElementById("btn-dismiss-pwa");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (banner && !sessionStorage.getItem("pwa_dismissed")) {
      banner.classList.remove("hidden");
    }
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        if (outcome === "accepted") {
          showToast("App installed successfully! 🎉", "success");
        }
        deferredInstallPrompt = null;
        if (banner) banner.classList.add("hidden");
      }
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      if (banner) banner.classList.add("hidden");
      sessionStorage.setItem("pwa_dismissed", "1");
    });
  }
}

// ==========================================================================
// View Mode Switcher (Auto / Desktop / Mobile)
// ==========================================================================
function bindViewModeSwitcher() {
  const modePills = document.querySelectorAll(".mode-pill");
  modePills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const mode = pill.getAttribute("data-mode");
      setViewMode(mode, true);
    });
  });
}

function setViewMode(mode, triggerToast = true) {
  appState.viewMode = mode;
  saveToStorage();

  document.body.classList.remove("mode-auto", "mode-desktop", "mode-android");
  document.body.classList.add(`mode-${mode}`);

  document.querySelectorAll(".mode-pill").forEach((pill) => {
    pill.classList.toggle("active", pill.getAttribute("data-mode") === mode);
  });

  if (triggerToast) {
    let modeText = "🔄 Auto Responsive Mode";
    if (mode === "desktop") modeText = "💻 Desktop Split Mode";
    if (mode === "android") modeText = "📱 Mobile App Mode";
    showToast(modeText, "info");
  }

  applyZoomFit(appState.zoomFit !== false);
}

// ==========================================================================
// Storage Helpers (With Auto Migration)
// ==========================================================================
function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error("Failed to save state to localStorage", e);
  }
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      appState = { ...defaultState, ...parsed };
      if (!appState.personal.name || appState.personal.name === "Alex Morgan") {
        appState.personal.name = "Ramu";
      }
      if (!appState.personal.location || appState.personal.location === "San Francisco, CA") {
        appState.personal.location = "Kanpur";
      }
      if (appState.personal.email === "alex.morgan@email.com" || appState.personal.email === "alex@example.com") {
        appState.personal.email = "ramu@email.com";
      }
      if (appState.personal.dob === "1997-04-15") {
        appState.personal.dob = "15 April 1997";
      }
    }
  } catch (e) {
    console.error("Failed to parse localStorage state", e);
    appState = JSON.parse(JSON.stringify(defaultState));
  }
}

// ==========================================================================
// A4 Auto-Fill Calculation
// ==========================================================================
function calculateA4FillScale() {
  const { density, personal, qualifications, skills, experience } = appState;

  if (density && density !== "auto") {
    if (density === "spacious") return "scale-roomy";
    if (density === "compact") return "scale-compact";
    return "scale-balanced";
  }

  let score = 0;
  if (personal.summary) score += Math.min(3, Math.ceil(personal.summary.length / 90));
  score += qualifications.length * 1.5;
  score += Math.ceil(skills.length / 3);
  experience.forEach((exp) => {
    score += 2;
    if (exp.description) score += Math.min(2.5, Math.ceil(exp.description.length / 100));
  });

  if (score <= 6.5) return "scale-roomy";
  if (score <= 12) return "scale-balanced";
  return "scale-compact";
}

// ==========================================================================
// Density & Page Fill Controls
// ==========================================================================
function bindDensityControls() {
  const densityBtns = document.querySelectorAll(".density-pill");
  densityBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-density");
      setDensity(val, true);
    });
  });
}

function setDensity(densityVal, triggerToast = true) {
  appState.density = densityVal;
  document.querySelectorAll(".density-pill").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-density") === densityVal);
  });
  onStateChange();
  if (triggerToast) {
    const label = densityVal === "auto" ? "✨ Auto-Fill A4 (Smart Scaling)" : densityVal.toUpperCase();
    showToast(`Page Density: ${label}`, "info");
  }
}

// ==========================================================================
// Headline / Title Options Picker
// ==========================================================================
function bindHeadlineOptions() {
  const titleButtons = document.querySelectorAll(".title-chip-btn");
  titleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const titleText = btn.getAttribute("data-title");
      if (titleText) {
        appState.personal.headline = titleText;
        const wHeadline = document.getElementById("w-input-headline");
        const fullHeadline = document.getElementById("input-headline");
        if (wHeadline) wHeadline.value = titleText;
        if (fullHeadline) fullHeadline.value = titleText;
        onStateChange();
        showToast(`Selected: "${titleText}"`, "success");
      }
    });
  });
}

// ==========================================================================
// Bio Options Picker
// ==========================================================================
function bindBioOptions() {
  const bioButtons = document.querySelectorAll(".bio-chip-btn");
  bioButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-bio-key");
      const bioText = BIO_PRESETS[key];
      if (bioText) {
        appState.personal.summary = bioText;
        const wSummary = document.getElementById("w-input-summary");
        const fullSummary = document.getElementById("input-summary");
        if (wSummary) wSummary.value = bioText;
        if (fullSummary) fullSummary.value = bioText;
        onStateChange();
        showToast("Applied bio summary!", "success");
      }
    });
  });
}

// ==========================================================================
// Basic Office Skills Suggestions
// ==========================================================================
function renderBasicSkillSuggestionChips() {
  const containers = [
    document.getElementById("basic-chips-container"),
    document.getElementById("w-basic-chips-container")
  ];

  containers.forEach((container) => {
    if (!container) return;
    container.innerHTML = "";

    BASIC_OFFICE_SKILLS.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip-suggestion chip-basic-skill";
      btn.setAttribute("data-skill-name", item.name);
      btn.innerHTML = `<span>${item.icon}</span> <span>${item.name}</span>`;

      btn.addEventListener("click", () => {
        toggleSkillSelection(item.name, "Proficient");
      });

      container.appendChild(btn);
    });
  });
}

function toggleSkillSelection(skillName, defaultLevel = "Proficient") {
  const existingIdx = appState.skills.findIndex((s) => s.name.toLowerCase() === skillName.toLowerCase());

  if (existingIdx >= 0) {
    appState.skills.splice(existingIdx, 1);
    showToast(`Removed "${skillName}"`, "info");
  } else {
    appState.skills.push({
      id: "s-" + Date.now(),
      name: skillName,
      level: defaultLevel
    });
    showToast(`Added: "${skillName}"`, "success");
  }

  renderSkillsChips();
  onStateChange();
}

// ==========================================================================
// Navigation & Views
// ==========================================================================
function bindNavTabs() {
  const navBtns = document.querySelectorAll(".nav-tab-btn");
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.getAttribute("data-view");
      switchView(view);
    });
  });
}

function switchView(viewName) {
  appState.activeView = viewName;
  setMobilePreviewActive(false);
  saveToStorage();

  document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-view") === viewName);
  });

  document.querySelectorAll(".mobile-nav-item").forEach((item) => {
    const target = item.getAttribute("data-target-view");
    item.classList.toggle("active", target === viewName);
  });

  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `view-${viewName}`);
  });
}

function setMobilePreviewActive(active) {
  appState.mobilePreviewActive = active;
  document.body.classList.toggle("mobile-preview-active", active);

  const previewNavBtn = document.getElementById("btn-mobile-nav-preview");
  if (previewNavBtn) {
    previewNavBtn.classList.toggle("active", active);
  }

  if (active) {
    // Scroll preview to top
    const wrapper = document.getElementById("resume-sheet-wrapper");
    if (wrapper) wrapper.scrollTop = 0;
  }
}

// ==========================================================================
// Resume Type Selection
// ==========================================================================
function bindResumeTypeCards() {
  const cards = document.querySelectorAll(".type-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const typeKey = card.getAttribute("data-type");
      applyActiveType(typeKey, true);
      showToast(`Selected "${TYPE_CONFIGS[typeKey].name}" archetype!`, "success");
    });
  });
}

function applyActiveType(typeKey, triggerToast = true) {
  const cfg = TYPE_CONFIGS[typeKey] || TYPE_CONFIGS.tech;
  appState.resumeType = typeKey;
  appState.customization.template = cfg.template;
  appState.customization.color = cfg.color;
  appState.customization.font = cfg.font;

  document.querySelectorAll(".type-card").forEach((card) => {
    card.classList.toggle("selected", card.getAttribute("data-type") === typeKey);
  });

  updateRoleSkillSuggestions(cfg.suggestedSkills);
  syncStyleControls();
  onStateChange();
}

function updateRoleSkillSuggestions(skills) {
  const containers = [
    document.getElementById("quick-chips-container"),
    document.getElementById("w-quick-chips-container")
  ];

  if (!skills) return;

  containers.forEach((container) => {
    if (!container) return;
    container.innerHTML = "";
    skills.forEach((skill) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip-suggestion";
      btn.setAttribute("data-skill-name", skill);
      btn.textContent = skill;
      btn.addEventListener("click", () => {
        toggleSkillSelection(skill, "Proficient");
      });
      container.appendChild(btn);
    });
  });

  syncSuggestionChipHighlightStates();
}

function syncSuggestionChipHighlightStates() {
  const activeSkillNames = appState.skills.map((s) => s.name.toLowerCase());
  document.querySelectorAll(".chip-suggestion").forEach((btn) => {
    const name = btn.getAttribute("data-skill-name");
    if (name) {
      btn.classList.toggle("is-added", activeSkillNames.includes(name.toLowerCase()));
    }
  });
}

// ==========================================================================
// Wizard Controls (Step 1 to 5)
// ==========================================================================
function bindWizardControls() {
  const prevBtn = document.getElementById("btn-w-prev");
  const nextBtn = document.getElementById("btn-w-next");
  const skipBtn = document.getElementById("btn-w-skip");

  document.querySelectorAll(".wizard-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const step = parseInt(dot.getAttribute("data-step"), 10);
      setWizardStep(step);
    });
  });

  prevBtn.addEventListener("click", () => {
    if (appState.wizardStep > 1) {
      setWizardStep(appState.wizardStep - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (appState.wizardStep < 5) {
      setWizardStep(appState.wizardStep + 1);
    } else {
      showToast("All questions complete! Here is your resume 🎉", "success");
      // On mobile, show preview automatically
      if (window.innerWidth <= 1024) {
        setMobilePreviewActive(true);
      } else {
        switchView("content");
      }
    }
  });

  skipBtn.addEventListener("click", () => {
    if (appState.wizardStep < 5) {
      setWizardStep(appState.wizardStep + 1);
    } else {
      if (window.innerWidth <= 1024) {
        setMobilePreviewActive(true);
      } else {
        switchView("content");
      }
    }
  });

  document.getElementById("btn-w-add-qualification").addEventListener("click", () => {
    appState.qualifications.push({
      id: "q-" + Date.now(),
      degree: "",
      institution: "",
      year: "",
      score: ""
    });
    renderQualificationsList();
    onStateChange();
  });

  document.getElementById("btn-w-add-experience").addEventListener("click", () => {
    appState.experience.push({
      id: "e-" + Date.now(),
      title: "",
      company: "",
      period: "",
      description: ""
    });
    renderExperienceList();
    onStateChange();
  });

  const wSkillInput = document.getElementById("w-input-skill");
  const wSkillSelect = document.getElementById("w-select-skill-level");
  const wAddSkillBtn = document.getElementById("btn-w-add-skill");

  function addWSkill() {
    const val = wSkillInput.value.trim();
    if (!val) return;
    appState.skills.push({
      id: "s-" + Date.now(),
      name: val,
      level: wSkillSelect.value
    });
    wSkillInput.value = "";
    renderSkillsChips();
    onStateChange();
  }

  wAddSkillBtn.addEventListener("click", addWSkill);
  wSkillInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addWSkill();
    }
  });
}

function setWizardStep(step) {
  appState.wizardStep = Math.max(1, Math.min(5, step));
  saveToStorage();

  const badge = document.getElementById("wizard-step-badge");
  const title = document.getElementById("wizard-step-title");
  const fill = document.getElementById("wizard-progress-fill");

  if (badge) badge.textContent = `Question ${appState.wizardStep} of 5`;
  if (title) title.textContent = WIZARD_STEP_TITLES[appState.wizardStep - 1] || "";
  if (fill) fill.style.width = `${appState.wizardStep * 20}%`;

  document.querySelectorAll(".wizard-dot").forEach((dot) => {
    const dotStep = parseInt(dot.getAttribute("data-step"), 10);
    dot.classList.toggle("active", dotStep === appState.wizardStep);
    dot.classList.toggle("completed", dotStep < appState.wizardStep);
  });

  document.querySelectorAll(".wizard-step-card").forEach((card) => {
    const idx = parseInt(card.getAttribute("data-step-index"), 10);
    card.classList.toggle("active", idx === appState.wizardStep);
  });

  const prevBtn = document.getElementById("btn-w-prev");
  const nextBtnText = document.getElementById("w-next-btn-text");

  if (prevBtn) {
    prevBtn.style.visibility = appState.wizardStep === 1 ? "hidden" : "visible";
  }

  if (nextBtnText) {
    nextBtnText.textContent = appState.wizardStep === 5 ? "Finish & Preview 🎉" : "Next Question →";
  }
}

// ==========================================================================
// Form Input Syncing
// ==========================================================================
function bindFormInputs() {
  const fields = [
    { key: "name", inputId: "input-name", wInputId: "w-input-name" },
    { key: "headline", inputId: "input-headline", wInputId: "w-input-headline" },
    { key: "dob", inputId: "input-dob", wInputId: "w-input-dob" },
    { key: "location", inputId: "input-location", wInputId: "w-input-location" },
    { key: "email", inputId: "input-email", wInputId: "w-input-email" },
    { key: "phone", inputId: "input-phone", wInputId: "w-input-phone" },
    { key: "summary", inputId: "input-summary", wInputId: "w-input-summary" }
  ];

  fields.forEach(({ key, inputId, wInputId }) => {
    const el = document.getElementById(inputId);
    const wEl = document.getElementById(wInputId);

    if (el) el.value = appState.personal[key] || "";
    if (wEl) wEl.value = appState.personal[key] || "";

    if (el) {
      el.addEventListener("input", (e) => {
        appState.personal[key] = e.target.value;
        if (wEl) wEl.value = e.target.value;
        if (key === "dob") updateAgeBadge();
        onStateChange();
      });
    }

    if (wEl) {
      wEl.addEventListener("input", (e) => {
        appState.personal[key] = e.target.value;
        if (el) el.value = e.target.value;
        if (key === "dob") updateAgeBadge();
        onStateChange();
      });
    }
  });

  document.getElementById("btn-add-qualification").addEventListener("click", () => {
    appState.qualifications.push({
      id: "q-" + Date.now(),
      degree: "",
      institution: "",
      year: "",
      score: ""
    });
    renderQualificationsList();
    onStateChange();
  });

  document.getElementById("btn-add-experience").addEventListener("click", () => {
    appState.experience.push({
      id: "e-" + Date.now(),
      title: "",
      company: "",
      period: "",
      description: ""
    });
    renderExperienceList();
    onStateChange();
  });

  const skillInput = document.getElementById("input-skill");
  const skillLevelSelect = document.getElementById("select-skill-level");
  const addSkillBtn = document.getElementById("btn-add-skill");

  function addSkillFromInput() {
    const val = skillInput.value.trim();
    if (!val) return;
    appState.skills.push({
      id: "s-" + Date.now(),
      name: val,
      level: skillLevelSelect.value
    });
    skillInput.value = "";
    renderSkillsChips();
    onStateChange();
  }

  addSkillBtn.addEventListener("click", addSkillFromInput);
  skillInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkillFromInput();
    }
  });
}

// ==========================================================================
// Flexible Typed Date Parser & Age Calculation
// ==========================================================================
function parseDateFlexible(str) {
  if (!str || typeof str !== "string") return null;
  const trimmed = str.trim();
  if (!trimmed) return null;

  // Pattern 1: DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime()) && d.getDate() === day && d.getMonth() === month) {
      return d;
    }
  }

  // Pattern 2: YYYY-MM-DD or YYYY/MM/DD
  const ymdMatch = trimmed.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  // Pattern 3: Natural language dates (e.g. "15 April 1997", "15th Aug 1998")
  const cleanStr = trimmed.replace(/(\d+)(st|nd|rd|th)/gi, "$1");
  const parsed = new Date(cleanStr);
  if (!isNaN(parsed.getTime()) && parsed.getFullYear() >= 1900 && parsed.getFullYear() <= new Date().getFullYear()) {
    return parsed;
  }

  return null;
}

function calculateAge(dobString) {
  if (!dobString) return null;
  const dob = parseDateFlexible(dobString);
  if (!dob) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return (age >= 0 && age <= 120) ? age : null;
}

function formatDate(dobString) {
  if (!dobString) return "";
  const dob = parseDateFlexible(dobString);
  if (dob) {
    return dob.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }
  return dobString.trim();
}

function updateAgeBadge() {
  const badges = [
    document.getElementById("age-badge"),
    document.getElementById("w-age-badge")
  ];
  const age = calculateAge(appState.personal.dob);

  badges.forEach((badge) => {
    if (!badge) return;
    if (age !== null) {
      badge.textContent = `Age: ${age} yrs`;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });
}

// ==========================================================================
// Dynamic Item Renderers (Qualifications, Skills, Experience)
// ==========================================================================
function renderQualificationsList() {
  const containers = [
    document.getElementById("qualifications-list"),
    document.getElementById("w-qualifications-list")
  ];

  containers.forEach((container) => {
    if (!container) return;
    container.innerHTML = "";

    if (appState.qualifications.length === 0) {
      container.innerHTML = `<span style="font-size: 0.78rem; color: #64748b; padding: 4px;">No qualifications added. Tap + Add Qualification below or Skip.</span>`;
      return;
    }

    appState.qualifications.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "dynamic-item-card";
      card.innerHTML = `
        <div class="card-top-bar">
          <span class="item-index-badge">#${index + 1} Qualification</span>
          <button type="button" class="btn-danger-icon" title="Remove" data-remove-q="${item.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
        <div class="form-grid">
          <div class="form-group full-width">
            <label>Degree / Certificate</label>
            <input type="text" class="form-input" placeholder="e.g. B.S. in Computer Science" value="${escapeHtml(item.degree)}" data-field="degree" data-id="${item.id}">
          </div>
          <div class="form-group full-width">
            <label>College / University / School</label>
            <input type="text" class="form-input" placeholder="e.g. IIT Kanpur" value="${escapeHtml(item.institution)}" data-field="institution" data-id="${item.id}">
          </div>
          <div class="form-group">
            <label>Year / Duration</label>
            <input type="text" class="form-input" placeholder="e.g. 2015 – 2019" value="${escapeHtml(item.year)}" data-field="year" data-id="${item.id}">
          </div>
          <div class="form-group">
            <label>Grade / Score</label>
            <input type="text" class="form-input" placeholder="e.g. GPA 3.85 / First Class" value="${escapeHtml(item.score)}" data-field="score" data-id="${item.id}">
          </div>
        </div>
      `;

      card.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", (e) => {
          const field = e.target.getAttribute("data-field");
          const targetItem = appState.qualifications.find((q) => q.id === item.id);
          if (targetItem) {
            targetItem[field] = e.target.value;
            document.querySelectorAll(`input[data-field="${field}"][data-id="${item.id}"]`).forEach((other) => {
              if (other !== e.target) other.value = e.target.value;
            });
            onStateChange();
          }
        });
      });

      card.querySelector(`[data-remove-q="${item.id}"]`).addEventListener("click", () => {
        appState.qualifications = appState.qualifications.filter((q) => q.id !== item.id);
        renderQualificationsList();
        onStateChange();
      });

      container.appendChild(card);
    });
  });
}

function renderSkillsChips() {
  const containers = [
    document.getElementById("skills-container"),
    document.getElementById("w-skills-container")
  ];

  const countLabels = [
    document.getElementById("skills-count"),
    document.getElementById("w-skills-count")
  ];

  const count = appState.skills.length;
  countLabels.forEach((lbl) => {
    if (lbl) lbl.textContent = `${count} skill${count === 1 ? "" : "s"}`;
  });

  containers.forEach((container) => {
    if (!container) return;
    container.innerHTML = "";

    if (count === 0) {
      container.innerHTML = `<span style="font-size: 0.76rem; color: #64748b; padding: 4px;">No skills added yet. Tap any skill button above!</span>`;
      return;
    }

    appState.skills.forEach((skill) => {
      const tag = document.createElement("div");
      tag.className = "skill-tag";
      tag.innerHTML = `
        <span>${escapeHtml(skill.name)}</span>
        <span class="skill-level-tag">${escapeHtml(skill.level)}</span>
        <button type="button" class="btn-remove-skill" title="Remove" data-remove-skill="${skill.id}">×</button>
      `;

      tag.querySelector(`[data-remove-skill="${skill.id}"]`).addEventListener("click", () => {
        appState.skills = appState.skills.filter((s) => s.id !== skill.id);
        renderSkillsChips();
        onStateChange();
      });

      container.appendChild(tag);
    });
  });

  syncSuggestionChipHighlightStates();
}

function renderExperienceList() {
  const containers = [
    document.getElementById("experience-list"),
    document.getElementById("w-experience-list")
  ];

  containers.forEach((container) => {
    if (!container) return;
    container.innerHTML = "";

    if (appState.experience.length === 0) {
      container.innerHTML = `<span style="font-size: 0.78rem; color: #64748b; padding: 4px;">No experience added. Tap + Add Experience below or Skip.</span>`;
      return;
    }

    appState.experience.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "dynamic-item-card";
      card.innerHTML = `
        <div class="card-top-bar">
          <span class="item-index-badge">#${index + 1} Role / Project</span>
          <button type="button" class="btn-danger-icon" title="Remove" data-remove-e="${item.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
        <div class="form-grid">
          <div class="form-group full-width">
            <label>Job Title / Role / Project Name</label>
            <input type="text" class="form-input" placeholder="e.g. Lead Software Engineer" value="${escapeHtml(item.title)}" data-field="title" data-id="${item.id}">
          </div>
          <div class="form-group">
            <label>Company / Organization</label>
            <input type="text" class="form-input" placeholder="e.g. Nexus Tech" value="${escapeHtml(item.company)}" data-field="company" data-id="${item.id}">
          </div>
          <div class="form-group">
            <label>Period / Duration</label>
            <input type="text" class="form-input" placeholder="e.g. 2021 – Present" value="${escapeHtml(item.period)}" data-field="period" data-id="${item.id}">
          </div>
          <div class="form-group full-width">
            <label>Description & Achievements</label>
            <textarea rows="3" class="form-input form-textarea" placeholder="• Key contributions and accomplishments..." data-field="description" data-id="${item.id}">${escapeHtml(item.description)}</textarea>
          </div>
        </div>
      `;

      card.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("input", (e) => {
          const field = e.target.getAttribute("data-field");
          const targetItem = appState.experience.find((ex) => ex.id === item.id);
          if (targetItem) {
            targetItem[field] = e.target.value;
            document.querySelectorAll(`[data-field="${field}"][data-id="${item.id}"]`).forEach((other) => {
              if (other !== e.target) other.value = e.target.value;
            });
            onStateChange();
          }
        });
      });

      card.querySelector(`[data-remove-e="${item.id}"]`).addEventListener("click", () => {
        appState.experience = appState.experience.filter((ex) => ex.id !== item.id);
        renderExperienceList();
        onStateChange();
      });

      container.appendChild(card);
    });
  });
}

// ==========================================================================
// Theme Customizers
// ==========================================================================
function bindThemeCustomizers() {
  const colorDots = document.querySelectorAll(".color-dot");
  colorDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setColor(dot.getAttribute("data-color"));
    });
  });

  const largeDots = document.querySelectorAll(".color-dot-large");
  largeDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setColor(dot.getAttribute("data-color"));
    });
  });

  const fontSelect = document.getElementById("font-select");
  fontSelect.addEventListener("change", (e) => {
    setFont(e.target.value);
  });

  const fontBtns = document.querySelectorAll(".font-option-btn");
  fontBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setFont(btn.getAttribute("data-font"));
    });
  });
}

function setColor(color) {
  appState.customization.color = color;
  syncStyleControls();
  onStateChange();
}

function setFont(font) {
  appState.customization.font = font;
  syncStyleControls();
  onStateChange();
}

function syncStyleControls() {
  const currentClr = appState.customization.color || "#2563eb";
  const currentFont = appState.customization.font || "'Plus Jakarta Sans', sans-serif";

  document.querySelectorAll(".color-dot").forEach((dot) => {
    dot.classList.toggle("active", dot.getAttribute("data-color") === currentClr);
  });

  document.querySelectorAll(".color-dot-large").forEach((dot) => {
    dot.classList.toggle("active", dot.getAttribute("data-color") === currentClr);
  });

  const fontSelect = document.getElementById("font-select");
  if (fontSelect) fontSelect.value = currentFont;

  document.querySelectorAll(".font-option-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-font") === currentFont);
  });
}

// ==========================================================================
// Zoom & Auto-Fit Preview Container
// ==========================================================================
function bindZoomFit() {
  const zoomBtn = document.getElementById("btn-zoom-fit");
  if (zoomBtn) {
    zoomBtn.addEventListener("click", () => {
      applyZoomFit(!appState.zoomFit);
    });
  }
}

function applyZoomFit(fit) {
  appState.zoomFit = fit;
  saveToStorage();

  const container = document.getElementById("a4-sheet-container");
  const zoomBtn = document.getElementById("btn-zoom-fit");

  if (container) {
    container.classList.toggle("fit-mobile", fit);
  }

  if (zoomBtn) {
    zoomBtn.textContent = fit ? "🔍 100% Zoom" : "🔍 Fit Screen";
  }
}

// ==========================================================================
// Mobile Navigation & Sticky Action Bar
// ==========================================================================
function bindMobileNavigation() {
  const previewNavBtn = document.getElementById("btn-mobile-nav-preview");
  const mobilePreviewEditBtn = document.getElementById("btn-mobile-preview-edit");
  const mobilePreviewDownloadBtn = document.getElementById("btn-mobile-preview-download");

  // Mobile Bottom Nav Items
  document.querySelectorAll(".mobile-nav-item[data-target-view]").forEach((item) => {
    item.addEventListener("click", () => {
      const targetView = item.getAttribute("data-target-view");
      if (targetView) {
        switchView(targetView);
      }
    });
  });

  if (previewNavBtn) {
    previewNavBtn.addEventListener("click", () => {
      setMobilePreviewActive(true);
    });
  }

  if (mobilePreviewEditBtn) {
    mobilePreviewEditBtn.addEventListener("click", () => {
      setMobilePreviewActive(false);
    });
  }

  if (mobilePreviewDownloadBtn) {
    mobilePreviewDownloadBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

// ==========================================================================
// Header Actions (Sample, Clear, PDF Print)
// ==========================================================================
function bindHeaderActions() {
  document.getElementById("btn-sample").addEventListener("click", () => {
    appState = JSON.parse(JSON.stringify(defaultState));
    appState.skills = JSON.parse(JSON.stringify(SAMPLE_DEMO_SKILLS));
    syncAllInputsWithState();
    renderQualificationsList();
    renderSkillsChips();
    renderExperienceList();
    updateAgeBadge();
    applyActiveType("tech", false);
    setDensity("auto", false);
    setWizardStep(1);
    onStateChange();
    showToast("Sample data loaded! 🎉", "success");
  });

  document.getElementById("btn-clear").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all resume fields?")) {
      appState.personal = {
        name: "",
        headline: "",
        dob: "",
        location: "",
        email: "",
        phone: "",
        summary: ""
      };
      appState.qualifications = [];
      appState.skills = [];
      appState.experience = [];
      syncAllInputsWithState();
      renderQualificationsList();
      renderSkillsChips();
      renderExperienceList();
      updateAgeBadge();
      onStateChange();
      showToast("All fields cleared", "info");
    }
  });

  document.getElementById("btn-print").addEventListener("click", () => {
    window.print();
  });
}

function syncAllInputsWithState() {
  const p = appState.personal;
  const map = [
    ["input-name", "w-input-name", p.name],
    ["input-headline", "w-input-headline", p.headline],
    ["input-dob", "w-input-dob", p.dob],
    ["input-location", "w-input-location", p.location],
    ["input-email", "w-input-email", p.email],
    ["input-phone", "w-input-phone", p.phone],
    ["input-summary", "w-input-summary", p.summary]
  ];

  map.forEach(([id1, id2, val]) => {
    const el1 = document.getElementById(id1);
    const el2 = document.getElementById(id2);
    if (el1) el1.value = val || "";
    if (el2) el2.value = val || "";
  });
}

// ==========================================================================
// State Change Trigger
// ==========================================================================
function onStateChange() {
  saveToStorage();
  renderResumeCanvas();
}

// ==========================================================================
// Glorified Section Bar & Decorative Elements Generator
// ==========================================================================
function createSectionBar(title) {
  return `
    <div class="r-glorified-section-bar">
      <h3 class="r-section-title">${escapeHtml(title)}</h3>
      <div class="r-bar-track"></div>
    </div>
  `;
}

function createSkillGaugeHtml(skills) {
  if (!skills || skills.length === 0) return "";
  return `
    <div class="r-skill-gauge-grid">
      ${skills.map((s) => `
        <div class="r-skill-gauge-item">
          <div class="r-skill-gauge-header">
            <span>${escapeHtml(s.name)}</span>
            <span class="r-skill-level-text">${escapeHtml(s.level)}</span>
          </div>
          <div class="r-skill-gauge-track">
            <div class="r-skill-gauge-fill" style="width: ${getSkillPercentage(s.level)};"></div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// ==========================================================================
// LIVE RESUME CANVAS RENDERER
// ==========================================================================
function renderResumeCanvas() {
  const canvas = document.getElementById("resume-canvas");
  const { personal, qualifications, skills, experience, customization } = appState;
  const t = customization.template || "modern";
  const accent = customization.color || "#2563eb";
  const font = customization.font || "'Plus Jakarta Sans', sans-serif";
  const fillScaleClass = calculateA4FillScale();

  canvas.style.setProperty("--accent-color", accent);
  canvas.style.fontFamily = font;
  canvas.className = `resume-sheet template-${t} ${fillScaleClass}`;

  const age = calculateAge(personal.dob);
  const formattedDob = formatDate(personal.dob);

  let metaParts = [];
  if (formattedDob) {
    metaParts.push(`<span><strong>DOB:</strong> ${formattedDob}${age !== null ? ` (Age ${age})` : ""}</span>`);
  }
  if (personal.location) metaParts.push(`<span>📍 ${escapeHtml(personal.location)}</span>`);
  if (personal.email) metaParts.push(`<span>✉️ ${escapeHtml(personal.email)}</span>`);
  if (personal.phone) metaParts.push(`<span>📞 ${escapeHtml(personal.phone)}</span>`);

  const metaHtml = metaParts.length > 0 ? metaParts.join(" &bull; ") : "";

  const footerHtml = `
    <footer class="r-glorified-footer">
      <span>Curriculum Vitae &bull; ${escapeHtml(personal.name || "Resume")}</span>
      <div class="r-footer-ornament">
        <span></span>
        <i></i>
        <span></span>
      </div>
      <span>Standard A4 Output</span>
    </footer>
  `;

  switch (t) {
    case "fresher":
      canvas.innerHTML = generateFresherTemplate(personal, qualifications, skills, experience, metaHtml) + footerHtml;
      break;
    case "executive":
      canvas.innerHTML = generateExecutiveTemplate(personal, qualifications, skills, experience, metaHtml) + footerHtml;
      break;
    case "creative":
      canvas.innerHTML = generateCreativeTemplate(personal, qualifications, skills, experience, formattedDob, age);
      break;
    case "ats":
      canvas.innerHTML = generateAtsTemplate(personal, qualifications, skills, experience, metaParts) + footerHtml;
      break;
    case "modern":
    default:
      canvas.innerHTML = generateModernTemplate(personal, qualifications, skills, experience, metaHtml) + footerHtml;
      break;
  }
}

// --------------------------------------------------------------------------
// Template 1: Modern Tech
// --------------------------------------------------------------------------
function generateModernTemplate(personal, qualifications, skills, experience, metaHtml) {
  const nameDisplay = personal.name ? escapeHtml(personal.name) : `<span style="color:#94a3b8; font-style:italic;">Your Name</span>`;
  const headlineDisplay = personal.headline ? `<div style="font-size: 1rem; font-weight: 600; color: var(--accent-color); margin-top: 2px;">${escapeHtml(personal.headline)}</div>` : "";
  const summaryDisplay = personal.summary ? `<div class="r-summary-callout">${escapeHtml(personal.summary)}</div>` : "";

  let expHtml = "";
  if (experience && experience.length > 0) {
    expHtml = `
      <section style="margin-bottom: 10px;">
        ${createSectionBar("Work Experience")}
        ${experience.map((e) => `
          <div class="r-timeline-rail">
            <div class="r-timeline-header">
              <span class="r-timeline-title">${escapeHtml(e.title || "Job Title")}</span>
              <span class="r-timeline-date">${escapeHtml(e.period || "")}</span>
            </div>
            <div class="r-timeline-org">${escapeHtml(e.company || "")}</div>
            ${e.description ? `<div class="r-timeline-desc">${escapeHtml(e.description)}</div>` : ""}
          </div>
        `).join("")}
      </section>
    `;
  }

  let qualHtml = "";
  if (qualifications && qualifications.length > 0) {
    qualHtml = `
      <section style="margin-bottom: 10px;">
        ${createSectionBar("Qualifications")}
        ${qualifications.map((q) => `
          <div class="r-qual-frame">
            <div class="r-qual-header">
              <strong class="r-qual-degree">${escapeHtml(q.degree || "Degree")}</strong>
              <span style="font-size: 0.78rem; font-weight: 600; color: #64748b;">${escapeHtml(q.year || "")}</span>
            </div>
            <div class="r-qual-inst">${escapeHtml(q.institution || "")}</div>
            ${q.score ? `<div class="r-qual-score"><strong>Score:</strong> ${escapeHtml(q.score)}</div>` : ""}
          </div>
        `).join("")}
      </section>
    `;
  }

  let skillsHtml = "";
  if (skills && skills.length > 0) {
    skillsHtml = `
      <section style="margin-bottom: 6px;">
        ${createSectionBar("Skills & Competencies")}
        ${createSkillGaugeHtml(skills)}
      </section>
    `;
  }

  return `
    <div style="flex: 1; display: flex; flex-direction: column;">
      <header style="margin-bottom: 8px;">
        <h1 class="r-name" style="font-weight: 800; color: #0f172a; line-height: 1.1;">${nameDisplay}</h1>
        ${headlineDisplay}
        <div class="r-glorified-header-line">
          <div class="g-line-thick"></div>
          <div class="g-diamond-node"></div>
          <div class="g-line-thin"></div>
        </div>
        ${metaHtml ? `<div style="font-size: 0.78rem; color: #475569; margin-top: 4px;">${metaHtml}</div>` : ""}
      </header>

      ${summaryDisplay}
      ${expHtml}
      ${qualHtml}
      ${skillsHtml}
    </div>
  `;
}

// --------------------------------------------------------------------------
// Template 2: Fresher
// --------------------------------------------------------------------------
function generateFresherTemplate(personal, qualifications, skills, experience, metaHtml) {
  const nameDisplay = personal.name ? escapeHtml(personal.name) : `<span style="color:#94a3b8; font-style:italic;">Your Name</span>`;
  const headlineDisplay = personal.headline ? `<div style="font-size: 1rem; font-weight: 600; color: var(--accent-color); margin-top: 2px;">${escapeHtml(personal.headline)}</div>` : "";
  const summaryDisplay = personal.summary ? `<div class="r-summary-callout">${escapeHtml(personal.summary)}</div>` : "";

  let qualHtml = "";
  if (qualifications && qualifications.length > 0) {
    qualHtml = `
      <section style="margin-bottom: 10px;">
        ${createSectionBar("Education & Qualifications")}
        ${qualifications.map((q) => `
          <div class="r-qual-frame">
            <div class="r-qual-header">
              <strong class="r-qual-degree">${escapeHtml(q.degree || "Degree")}</strong>
              <span style="font-size: 0.78rem; font-weight: 600; color: #64748b;">${escapeHtml(q.year || "")}</span>
            </div>
            <div class="r-qual-inst">${escapeHtml(q.institution || "")}</div>
            ${q.score ? `<div class="r-qual-score"><strong>Performance:</strong> ${escapeHtml(q.score)}</div>` : ""}
          </div>
        `).join("")}
      </section>
    `;
  }

  let skillsHtml = "";
  if (skills && skills.length > 0) {
    skillsHtml = `
      <section style="margin-bottom: 10px;">
        ${createSectionBar("Skills & Proficiency Gauges")}
        ${createSkillGaugeHtml(skills)}
      </section>
    `;
  }

  let expHtml = "";
  if (experience && experience.length > 0) {
    expHtml = `
      <section style="margin-bottom: 6px;">
        ${createSectionBar("Projects, Internships & Experience")}
        ${experience.map((e) => `
          <div class="r-timeline-rail">
            <div class="r-timeline-header">
              <span class="r-timeline-title">${escapeHtml(e.title || "Project")}</span>
              <span class="r-timeline-date">${escapeHtml(e.period || "")}</span>
            </div>
            <div class="r-timeline-org">${escapeHtml(e.company || "")}</div>
            ${e.description ? `<div class="r-timeline-desc">${escapeHtml(e.description)}</div>` : ""}
          </div>
        `).join("")}
      </section>
    `;
  }

  return `
    <div style="flex: 1; display: flex; flex-direction: column;">
      <header style="margin-bottom: 8px;">
        <h1 class="r-name" style="font-weight: 800; color: #0f172a; line-height: 1.1;">${nameDisplay}</h1>
        ${headlineDisplay}
        <div class="r-glorified-header-line">
          <div class="g-line-thick"></div>
          <div class="g-diamond-node"></div>
          <div class="g-line-thin"></div>
        </div>
        ${metaHtml ? `<div style="font-size: 0.78rem; color: #475569; margin-top: 4px;">${metaHtml}</div>` : ""}
      </header>

      ${summaryDisplay}
      ${qualHtml}
      ${skillsHtml}
      ${expHtml}
    </div>
  `;
}

// --------------------------------------------------------------------------
// Template 3: Executive Leadership
// --------------------------------------------------------------------------
function generateExecutiveTemplate(personal, qualifications, skills, experience, metaHtml) {
  const nameDisplay = personal.name ? escapeHtml(personal.name) : `<span style="color:#94a3b8; font-style:italic;">Your Name</span>`;
  const headlineDisplay = personal.headline ? `<div style="font-size: 1rem; font-weight: 600; color: var(--accent-color); letter-spacing: 0.04em;">${escapeHtml(personal.headline)}</div>` : "";
  const summaryDisplay = personal.summary ? `<div class="r-summary-callout" style="border-left-width: 4px;">${escapeHtml(personal.summary)}</div>` : "";

  let expHtml = "";
  if (experience && experience.length > 0) {
    expHtml = `
      <section style="margin-bottom: 10px;">
        ${createSectionBar("Executive Leadership & Experience")}
        ${experience.map((e) => `
          <div class="r-timeline-rail">
            <div class="r-timeline-header">
              <span class="r-timeline-title">${escapeHtml(e.title || "Job Title")}</span>
              <span class="r-timeline-date">${escapeHtml(e.period || "")}</span>
            </div>
            <div class="r-timeline-org">${escapeHtml(e.company || "")}</div>
            ${e.description ? `<div class="r-timeline-desc">${escapeHtml(e.description)}</div>` : ""}
          </div>
        `).join("")}
      </section>
    `;
  }

  let qualHtml = "";
  if (qualifications && qualifications.length > 0) {
    qualHtml = `
      <section style="margin-bottom: 10px;">
        ${createSectionBar("Credentials & Qualifications")}
        ${qualifications.map((q) => `
          <div class="r-qual-frame">
            <div class="r-qual-header">
              <strong class="r-qual-degree">${escapeHtml(q.degree || "Degree")}</strong>
              <span style="font-size: 0.78rem; font-weight: 600; color: #64748b;">${escapeHtml(q.year || "")}</span>
            </div>
            <div class="r-qual-inst">${escapeHtml(q.institution || "")} ${q.score ? `&bull; ${escapeHtml(q.score)}` : ""}</div>
          </div>
        `).join("")}
      </section>
    `;
  }

  let skillsHtml = "";
  if (skills && skills.length > 0) {
    skillsHtml = `
      <section style="margin-bottom: 6px;">
        ${createSectionBar("Core Leadership Competencies")}
        ${createSkillGaugeHtml(skills)}
      </section>
    `;
  }

  return `
    <div style="flex: 1; display: flex; flex-direction: column;">
      <header style="text-align: center; margin-bottom: 10px;">
        <h1 class="r-name" style="font-weight: 800; color: #0f172a; letter-spacing: 0.05em; text-transform: uppercase;">${nameDisplay}</h1>
        ${headlineDisplay}
        <div class="r-glorified-header-line" style="justify-content: center; max-width: 280px; margin: 6px auto 4px auto;">
          <div class="g-line-thin"></div>
          <div class="g-diamond-node"></div>
          <div class="g-line-thick"></div>
          <div class="g-diamond-node"></div>
          <div class="g-line-thin"></div>
        </div>
        ${metaHtml ? `<div style="font-size: 0.78rem; color: #475569;">${metaHtml}</div>` : ""}
      </header>

      ${summaryDisplay}
      ${expHtml}
      ${qualHtml}
      ${skillsHtml}
    </div>
  `;
}

// --------------------------------------------------------------------------
// Template 4: Creative Sidebar
// --------------------------------------------------------------------------
function generateCreativeTemplate(personal, qualifications, skills, experience, formattedDob, age) {
  const nameDisplay = personal.name ? escapeHtml(personal.name) : `<span style="color:#94a3b8; font-style:italic;">Your Name</span>`;
  const initials = personal.name ? personal.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : "CV";
  const headlineDisplay = personal.headline ? `<div style="font-size: 0.98rem; font-weight: 600; color: var(--accent-color); margin-top: 2px;">${escapeHtml(personal.headline)}</div>` : "";
  const summaryDisplay = personal.summary ? `<div class="r-summary-callout">${escapeHtml(personal.summary)}</div>` : "";

  return `
    <aside class="r-sidebar">
      <div class="r-sidebar-avatar">${initials}</div>

      <div>
        <h4 style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--accent-color); border-bottom: 1.5px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 6px;">
          Contact
        </h4>
        ${formattedDob ? `<div class="r-sidebar-item"><strong>DOB</strong>${formattedDob} ${age !== null ? `(${age} yrs)` : ""}</div>` : ""}
        ${personal.location ? `<div class="r-sidebar-item"><strong>Location</strong>${escapeHtml(personal.location)}</div>` : ""}
        ${personal.email ? `<div class="r-sidebar-item"><strong>Email</strong>${escapeHtml(personal.email)}</div>` : ""}
        ${personal.phone ? `<div class="r-sidebar-item"><strong>Phone</strong>${escapeHtml(personal.phone)}</div>` : ""}
      </div>

      ${skills && skills.length > 0 ? `
        <div>
          <h4 style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--accent-color); border-bottom: 1.5px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 6px;">
            Skills
          </h4>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${skills.map((s) => `
              <div style="display: flex; flex-direction: column; gap: 1px;">
                <div style="font-size: 0.74rem; font-weight: 600; color: #1e293b; display: flex; justify-content: space-between;">
                  <span>${escapeHtml(s.name)}</span>
                  <span style="font-size: 0.65rem; color: #64748b;">${escapeHtml(s.level)}</span>
                </div>
                <div class="r-skill-gauge-track" style="height: 4px;">
                  <div class="r-skill-gauge-fill" style="width: ${getSkillPercentage(s.level)};"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${qualifications && qualifications.length > 0 ? `
        <div>
          <h4 style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--accent-color); border-bottom: 1.5px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 6px;">
            Education
          </h4>
          ${qualifications.map((q) => `
            <div style="margin-bottom: 6px; font-size: 0.76rem; background: #fff; padding: 4px 6px; border-radius: 4px; border: 1px solid #e2e8f0;">
              <strong style="color:#0f172a; display: block;">${escapeHtml(q.degree || "Degree")}</strong>
              <div style="color: #475569;">${escapeHtml(q.institution || "")}</div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      <div style="margin-top: auto; font-size: 0.68rem; color: #94a3b8; text-transform: uppercase;">
        Standard A4 Format
      </div>
    </aside>

    <main class="r-content">
      <div>
        <h1 class="r-name" style="font-weight: 800; color: #0f172a; line-height: 1.1;">${nameDisplay}</h1>
        ${headlineDisplay}
        <div class="r-glorified-header-line">
          <div class="g-line-thick"></div>
          <div class="g-diamond-node"></div>
          <div class="g-line-thin"></div>
        </div>
      </div>

      ${summaryDisplay}

      ${experience && experience.length > 0 ? `
        <section style="flex: 1;">
          ${createSectionBar("Experience & Key Projects")}
          ${experience.map((e) => `
            <div class="r-timeline-rail">
              <div class="r-timeline-header">
                <span class="r-timeline-title">${escapeHtml(e.title || "Job Title")}</span>
                <span class="r-timeline-date">${escapeHtml(e.period || "")}</span>
              </div>
              <div class="r-timeline-org">${escapeHtml(e.company || "")}</div>
              ${e.description ? `<div class="r-timeline-desc">${escapeHtml(e.description)}</div>` : ""}
            </div>
          `).join("")}
        </section>
      ` : ""}

      <footer class="r-glorified-footer" style="margin-top: auto;">
        <span>${escapeHtml(personal.name || "Resume")}</span>
        <div class="r-footer-ornament"><span></span><i></i><span></span></div>
        <span>Standard A4</span>
      </footer>
    </main>
  `;
}

// --------------------------------------------------------------------------
// Template 5: ATS Clean Scan
// --------------------------------------------------------------------------
function generateAtsTemplate(personal, qualifications, skills, experience, metaParts) {
  const nameDisplay = personal.name ? escapeHtml(personal.name) : `<span style="color:#94a3b8; font-style:italic;">Your Name</span>`;
  const summaryDisplay = personal.summary ? `
    <div style="margin-bottom: 10px;">
      <h3 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; border-bottom: 1.5px solid #334155; padding-bottom: 2px; margin-bottom: 4px;">Summary</h3>
      <p style="font-size: 0.83rem; color: #1e293b; line-height: 1.5;">${escapeHtml(personal.summary)}</p>
    </div>
  ` : "";

  return `
    <div style="flex: 1; display: flex; flex-direction: column;">
      <header style="border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin-bottom: 10px;">
        <h1 class="r-name" style="font-weight: 700; color: #000;">${nameDisplay}</h1>
        ${personal.headline ? `<div style="font-size: 0.92rem; font-weight: 600; color: #334155; margin-top: 2px;">${escapeHtml(personal.headline)}</div>` : ""}
        ${metaParts.length > 0 ? `<div style="font-size: 0.78rem; color: #475569; margin-top: 3px;">${metaParts.join(" | ")}</div>` : ""}
      </header>

      ${summaryDisplay}

      ${skills && skills.length > 0 ? `
        <div style="margin-bottom: 10px;">
          <h3 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; border-bottom: 1.5px solid #334155; padding-bottom: 2px; margin-bottom: 4px;">Key Skills & Competencies</h3>
          ${createSkillGaugeHtml(skills)}
        </div>
      ` : ""}

      ${experience && experience.length > 0 ? `
        <div style="margin-bottom: 10px;">
          <h3 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; border-bottom: 1.5px solid #334155; padding-bottom: 2px; margin-bottom: 4px;">Work Experience</h3>
          ${experience.map((e) => `
            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <strong style="font-size: 0.9rem; color: #000;">${escapeHtml(e.title || "Job Title")} — ${escapeHtml(e.company || "")}</strong>
                <span style="font-size: 0.76rem; color: #475569;">${escapeHtml(e.period || "")}</span>
              </div>
              ${e.description ? `<div style="font-size: 0.8rem; color: #1e293b; margin-top: 2px; white-space: pre-line;">${escapeHtml(e.description)}</div>` : ""}
            </div>
          `).join("")}
        </div>
      ` : ""}

      ${qualifications && qualifications.length > 0 ? `
        <div style="margin-bottom: 10px;">
          <h3 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; border-bottom: 1.5px solid #334155; padding-bottom: 2px; margin-bottom: 4px;">Education</h3>
          ${qualifications.map((q) => `
            <div style="margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <strong style="font-size: 0.88rem; color: #000;">${escapeHtml(q.degree || "Degree")} — ${escapeHtml(q.institution || "")}</strong>
                <span style="font-size: 0.76rem; color: #475569;">${escapeHtml(q.year || "")}</span>
              </div>
              ${q.score ? `<div style="font-size: 0.76rem; color: #475569;">${escapeHtml(q.score)}</div>` : ""}
            </div>
          `).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

// ==========================================================================
// Toast Notification System
// ==========================================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === "success" 
        ? '<polyline points="20 6 9 17 4 12"></polyline>' 
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
    </svg>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 200);
  }, 2200);
}

// ==========================================================================
// Utility: HTML Escaping
// ==========================================================================
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
