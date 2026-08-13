/**
 * Princy Hear & Speech Rehab - Easy Admin Logic (admin.js)
 * Designed for non-technical users: foolproof uploads, friendly graphics generator, and auto-sync.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------- Password Protection ----------------
  const ADMIN_PASSCODE = "Ashish@2026";
  const authOverlay = document.getElementById('admin-auth-overlay');
  const authCard = document.getElementById('auth-card');
  const passInput = document.getElementById('admin-pass-input');
  const authEyeBtn = document.getElementById('auth-eye-btn');
  const authErrorMsg = document.getElementById('auth-error-msg');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const logoutBtn = document.getElementById('admin-logout-btn');

  function checkAuthStatus() {
    const isAuthed = sessionStorage.getItem('princy_admin_auth') === 'true';
    if (isAuthed && authOverlay) {
      authOverlay.classList.add('unlocked');
    } else if (authOverlay) {
      authOverlay.classList.remove('unlocked');
      if (passInput) setTimeout(() => passInput.focus(), 200);
    }
  }

  function handleLogin() {
    if (!passInput) return;
    const entered = passInput.value.trim();
    if (entered === ADMIN_PASSCODE) {
      sessionStorage.setItem('princy_admin_auth', 'true');
      authOverlay.classList.add('unlocked');
      authErrorMsg.classList.remove('show');
      passInput.value = '';
      showToast('🎉 Welcome, Admin! Website Manager unlocked.', 'success');
    } else {
      authErrorMsg.classList.add('show');
      authCard.classList.add('shake');
      setTimeout(() => authCard.classList.remove('shake'), 500);
      passInput.select();
    }
  }

  if (authSubmitBtn) {
    authSubmitBtn.addEventListener('click', handleLogin);
  }

  if (passInput) {
    passInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
  }

  if (authEyeBtn && passInput) {
    authEyeBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      authEyeBtn.textContent = isPass ? '🙈' : '👁️';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('princy_admin_auth');
      authOverlay.classList.remove('unlocked');
      if (passInput) {
        passInput.value = '';
        passInput.focus();
      }
      showToast('🔒 Logged out successfully.', 'success');
    });
  }

  checkAuthStatus();

  // 1. Initialize State
  let siteData = window.getPrincySiteData();
  let currentActiveImageSlot = null;
  let activeCategoryFilter = 'all';

  // DOM Elements
  const tabLinks = document.querySelectorAll('.nav-item[data-tab]');
  const tabSections = document.querySelectorAll('.tab-section');
  const pageTitle = document.getElementById('current-page-title');
  const pageDesc = document.getElementById('current-page-desc');
  const imagesGrid = document.getElementById('images-grid-container');
  const filterPills = document.querySelectorAll('.pill-btn');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('admin-sidebar');
  const saveAllBtn = document.getElementById('save-all-btn');
  const resetDefaultsBtn = document.getElementById('reset-defaults-btn');
  
  // Modal Elements
  const placeholderModal = document.getElementById('placeholder-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-modal-btn');
  const applyPlaceholderBtn = document.getElementById('apply-placeholder-btn');
  const fileInputHidden = document.getElementById('hidden-file-input');

  // Modal Inputs
  const phWidthInput = document.getElementById('ph-width');
  const phHeightInput = document.getElementById('ph-height');
  const phTextInput = document.getElementById('ph-text');
  const phSubtextInput = document.getElementById('ph-subtext');
  const phIconSelect = document.getElementById('ph-icon');
  const phColorPreset = document.getElementById('ph-color-preset');
  const modalLivePreview = document.getElementById('modal-live-svg-preview');

  // Tab Title Metadata (Plain English)
  const tabMetadata = {
    dashboard: { title: "📊 Dashboard", desc: "Easily update your clinic website with simple clicks — no technical knowledge required!" },
    images: { title: "📸 Photos & Logos", desc: "Upload photos from your computer or create clean clinic graphics with 1 click." },
    doctor: { title: "🩺 Lead Doctor Profile", desc: "Update Dr. Sornajali's hero portrait photo, qualifications, and specialties." },
    team: { title: "👥 Staff & Specialists", desc: "Manage clinic therapists, specialists, and support team members." },
    services: { title: "📋 Our 6 Services", desc: "Edit speech therapy, hearing care, and rehabilitation descriptions and bullet points." },
    clinic: { title: "📞 Phone, WhatsApp & Hours", desc: "Change phone numbers, WhatsApp booking link, clinic address, and opening times." },
    heroAbout: { title: "📝 Homepage Text & Story", desc: "Edit your homepage headline, clinic vision, mission, and origin story." },
    testimonials: { title: "⭐ Patient Reviews", desc: "Add real 5-star patient reviews and recommendations." },
    export: { title: "💾 Save Backup File", desc: "Download a backup of all your website texts and photos to your computer." }
  };

  // ---------------- Navigation & Tabs ----------------
  function switchTab(tabId) {
    tabLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-tab') === tabId);
    });

    tabSections.forEach(section => {
      section.classList.toggle('active', section.id === `tab-${tabId}`);
    });

    if (tabMetadata[tabId]) {
      pageTitle.textContent = tabMetadata[tabId].title;
      pageDesc.textContent = tabMetadata[tabId].desc;
    }

    if (window.innerWidth <= 1024) {
      sidebar.classList.remove('open');
    }

    if (tabId === 'images') {
      renderImageGrid();
    }
  }

  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // ---------------- Location Mapping for Photos ----------------
  const locationDescriptions = {
    logo: "📍 Shown in: Top Header & Footer on all pages",
    favicon: "📍 Shown in: Browser tab icon",
    doctorHero: "📍 Shown in: Main Homepage Hero Doctor Box",
    team1: "📍 Shown in: About Us Page (Speech Therapist)",
    team2: "📍 Shown in: About Us Page (Audiologist)",
    team3: "📍 Shown in: About Us Page (Support Care Team)",
    serviceSpeech: "📍 Shown in: Speech Therapy Service Card",
    serviceAdult: "📍 Shown in: Adult Rehabilitation Service Card",
    serviceHearing: "📍 Shown in: Hearing Care Service Card",
    serviceAids: "📍 Shown in: Digital Hearing Aids Service Card",
    servicePediatric: "📍 Shown in: Pediatric Therapy Service Card",
    serviceHome: "📍 Shown in: Home Therapy Service Card",
    facilityClinic: "📍 Shown in: Clinic Building & Therapy Rooms"
  };

  // ---------------- Image Hub Rendering ----------------
  function getAllImageSlots() {
    const list = [];
    // Doctor hero
    list.push({
      ...siteData.doctorHero,
      key: 'doctorHero',
      title: "Lead Doctor Photo (Dr. Sornajali)",
      category: "specialist",
      location: locationDescriptions.doctorHero
    });

    // Other images
    Object.keys(siteData.images).forEach(key => {
      list.push({
        ...siteData.images[key],
        key: key,
        location: locationDescriptions[key] || "📍 Shown on website"
      });
    });
    return list;
  }

  function renderImageGrid() {
    if (!imagesGrid) return;
    imagesGrid.innerHTML = '';

    const allSlots = getAllImageSlots();
    const filtered = activeCategoryFilter === 'all' 
      ? allSlots 
      : allSlots.filter(s => s.category === activeCategoryFilter);

    filtered.forEach(slot => {
      const card = document.createElement('div');
      card.className = 'image-slot-card';
      card.dataset.slotKey = slot.key;

      const hasImage = !!slot.src;
      const isCustom = slot.src && (slot.src.startsWith('data:') || slot.src.startsWith('http'));

      card.innerHTML = `
        <div class="card-top-bar">
          <span class="slot-category-badge">${slot.category || 'photo'}</span>
          <span class="slot-location-tag">${slot.location}</span>
        </div>

        <div class="slot-preview-wrapper" title="Current image preview">
          ${hasImage ? `
            <img src="${slot.src}" alt="${slot.alt || slot.title}" class="slot-preview-img" onerror="this.src='logo.png';" />
          ` : `
            <div style="text-align:center; padding:20px; color:var(--text-muted);">
              <span style="font-size:2.2rem; display:block; margin-bottom:6px;">🖼️</span>
              <span style="font-size:0.85rem; font-weight:600;">No photo selected yet</span>
            </div>
          `}
        </div>

        <div class="card-details-body">
          <h4 class="slot-title">${slot.title}</h4>
          <div class="slot-hint-text">
            ${isCustom ? '✅ Active (Customized)' : 'ℹ️ Using Standard Default'}
          </div>

          <div class="slot-card-actions">
            <button class="btn btn-primary btn-full btn-action-upload" data-key="${slot.key}">
              📁 Upload Photo from Computer
            </button>
            <button class="btn btn-outline btn-action-placeholder" data-key="${slot.key}">
              ✨ Create Graphic
            </button>
            <button class="btn btn-outline btn-action-reset" data-key="${slot.key}">
              🔄 Reset
            </button>
          </div>
        </div>
      `;

      imagesGrid.appendChild(card);
    });

    bindImageCardEvents();
  }

  // Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategoryFilter = pill.getAttribute('data-category');
      renderImageGrid();
    });
  });

  // ---------------- Image Card Actions ----------------
  function bindImageCardEvents() {
    // 1. Upload Button (Triggers native OS file picker)
    document.querySelectorAll('.btn-action-upload').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentActiveImageSlot = btn.getAttribute('data-key');
        fileInputHidden.click();
      });
    });

    // 2. Graphic Placeholder Generator
    document.querySelectorAll('.btn-action-placeholder').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.getAttribute('data-key');
        openPlaceholderModal(key);
      });
    });

    // 3. Reset Button
    document.querySelectorAll('.btn-action-reset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.getAttribute('data-key');
        resetImageSlot(key);
      });
    });
  }

  // Hidden File Input Handler
  fileInputHidden.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !currentActiveImageSlot) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (.jpg, .png, .webp, etc.)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setImageSource(currentActiveImageSlot, base64);
      showToast(`🎉 Photo uploaded successfully! Click "Save Changes" to apply.`, 'success');
      fileInputHidden.value = '';
    };
    reader.readAsDataURL(file);
  });

  function setImageSource(key, src) {
    if (key === 'doctorHero') {
      siteData.doctorHero.src = src;
    } else if (siteData.images[key]) {
      siteData.images[key].src = src;
    }
    window.savePrincySiteData(siteData);
    renderImageGrid();
    populateFormInputs();
  }

  function resetImageSlot(key) {
    const defaults = window.resetPrincySiteData();
    let defaultSrc = "";
    if (key === 'doctorHero') {
      defaultSrc = defaults.doctorHero.src;
      siteData.doctorHero.src = defaultSrc;
    } else if (defaults.images[key]) {
      defaultSrc = defaults.images[key].src;
      siteData.images[key].src = defaultSrc;
    }
    window.savePrincySiteData(siteData);
    renderImageGrid();
    populateFormInputs();
    showToast(`Reset photo to original standard.`, 'success');
  }

  // ---------------- SVG Placeholder Modal ----------------
  function openPlaceholderModal(slotKey) {
    currentActiveImageSlot = slotKey;
    const allSlots = getAllImageSlots();
    const slot = allSlots.find(s => s.key === slotKey);

    if (slot) {
      phTextInput.value = slot.title.replace('Service: ', '') || "Princy Clinic";
      phSubtextInput.value = "Bhubaneswar Clinic";
      
      if (slot.category === 'branding') phIconSelect.value = '🏥';
      else if (slot.category === 'specialist') phIconSelect.value = '🩺';
      else if (slot.category === 'team') phIconSelect.value = '👤';
      else if (slot.category === 'services') phIconSelect.value = '🗣️';
      else phIconSelect.value = '🏥';

      if (slot.aspectRatio === '1:1') {
        phWidthInput.value = 500;
        phHeightInput.value = 500;
      } else if (slot.aspectRatio === '3:4') {
        phWidthInput.value = 600;
        phHeightInput.value = 800;
      } else {
        phWidthInput.value = 600;
        phHeightInput.value = 400;
      }
    }

    updateModalPreview();
    placeholderModal.classList.add('show');
  }

  function closePlaceholderModal() {
    placeholderModal.classList.remove('show');
    currentActiveImageSlot = null;
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closePlaceholderModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closePlaceholderModal);

  function getSelectedPresetColors() {
    const preset = phColorPreset.value;
    switch (preset) {
      case 'rose': return { c1: '#4A1525', c2: '#E05E80' };
      case 'sky': return { c1: '#073352', c2: '#2B89C8' };
      case 'teal': return { c1: '#0B3B3C', c2: '#14B8A6' };
      case 'dark': return { c1: '#0F172A', c2: '#334155' };
      default: return { c1: '#0A2540', c2: '#1B6EA8' };
    }
  }

  function updateModalPreview() {
    const colors = getSelectedPresetColors();
    const svgDataUri = window.generatePrincyPlaceholderSvg({
      width: parseInt(phWidthInput.value) || 600,
      height: parseInt(phHeightInput.value) || 400,
      text: phTextInput.value || "Princy Clinic",
      subtext: phSubtextInput.value || "Bhubaneswar",
      icon: phIconSelect.value || "🩺",
      bgColor1: colors.c1,
      bgColor2: colors.c2,
      textColor: "#FFFFFF"
    });

    if (modalLivePreview) {
      modalLivePreview.src = svgDataUri;
    }
  }

  [phTextInput, phSubtextInput, phIconSelect, phColorPreset].forEach(el => {
    if (el) el.addEventListener('input', updateModalPreview);
  });

  if (applyPlaceholderBtn) {
    applyPlaceholderBtn.addEventListener('click', () => {
      if (!currentActiveImageSlot) return;
      const colors = getSelectedPresetColors();
      const svgDataUri = window.generatePrincyPlaceholderSvg({
        width: parseInt(phWidthInput.value) || 600,
        height: parseInt(phHeightInput.value) || 400,
        text: phTextInput.value || "Princy Clinic",
        subtext: phSubtextInput.value || "Bhubaneswar",
        icon: phIconSelect.value || "🩺",
        bgColor1: colors.c1,
        bgColor2: colors.c2,
        textColor: "#FFFFFF"
      });

      setImageSource(currentActiveImageSlot, svgDataUri);
      showToast(`🎉 Created and applied clinic graphic!`, 'success');
      closePlaceholderModal();
    });
  }

  // ---------------- Populate & Bind Form Inputs ----------------
  function populateFormInputs() {
    // Clinic General
    bindInput('gen-clinic-name', siteData.general.name, v => siteData.general.name = v);
    bindInput('gen-clinic-subname', siteData.general.subName, v => siteData.general.subName = v);
    bindInput('gen-phone', siteData.general.phone, v => {
      siteData.general.phone = v;
      siteData.general.phoneRaw = v.replace(/[^0-9]/g, '');
    });
    bindInput('gen-whatsapp', siteData.general.whatsapp, v => siteData.general.whatsapp = v.replace(/[^0-9]/g, ''));
    bindInput('gen-email', siteData.general.email, v => siteData.general.email = v);
    bindInput('gen-address-short', siteData.general.addressShort, v => siteData.general.addressShort = v);
    bindInput('gen-address-full', siteData.general.addressFull, v => siteData.general.addressFull = v);
    bindInput('gen-hours-weekday', siteData.general.hoursWeekday, v => siteData.general.hoursWeekday = v);
    bindInput('gen-hours-weekend', siteData.general.hoursWeekend, v => siteData.general.hoursWeekend = v);
    bindInput('gen-map-url', siteData.general.mapEmbedUrl, v => siteData.general.mapEmbedUrl = v);
    bindInput('gen-instagram', siteData.general.socialInstagram, v => siteData.general.socialInstagram = v);
    bindInput('gen-facebook', siteData.general.socialFacebook, v => siteData.general.socialFacebook = v);

    // Hero Section
    bindInput('hero-badge', siteData.hero.badge, v => siteData.hero.badge = v);
    bindInput('hero-title', siteData.hero.title, v => siteData.hero.title = v);
    bindInput('hero-title-typed', siteData.hero.titleTyped, v => siteData.hero.titleTyped = v);
    bindInput('hero-desc', siteData.hero.description, v => siteData.hero.description = v);
    bindInput('stat-rating', siteData.hero.statRating, v => siteData.hero.statRating = v);
    bindInput('stat-patients', siteData.hero.statPatients, v => siteData.hero.statPatients = v);
    bindInput('stat-services', siteData.hero.statServices, v => siteData.hero.statServices = v);
    bindInput('stat-days', siteData.hero.statDays, v => siteData.hero.statDays = v);

    // Doctor Hero
    bindInput('doc-name', siteData.doctorHero.name, v => siteData.doctorHero.name = v);
    bindInput('doc-degree', siteData.doctorHero.degree, v => siteData.doctorHero.degree = v);
    bindInput('doc-designation', siteData.doctorHero.designation, v => siteData.doctorHero.designation = v);
    bindInput('doc-location-tag', siteData.doctorHero.locationTag, v => siteData.doctorHero.locationTag = v);
    bindInput('doc-rating-tag', siteData.doctorHero.ratingTag, v => siteData.doctorHero.ratingTag = v);

    // About Us Story
    bindInput('about-mission', siteData.aboutStory.mission, v => siteData.aboutStory.mission = v);
    bindInput('about-vision', siteData.aboutStory.vision, v => siteData.aboutStory.vision = v);
    bindInput('about-history', siteData.aboutStory.history, v => siteData.aboutStory.history = v);

    // Team, Services, Testimonials
    renderTeamEditor();
    renderServicesEditor();
    renderTestimonialsEditor();
  }

  function bindInput(elementId, value, onUpdate) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.value = value || '';
    el.oninput = () => {
      onUpdate(el.value);
    };
  }

  // ---------------- Team Members Editor ----------------
  function renderTeamEditor() {
    const container = document.getElementById('team-members-container');
    if (!container) return;
    container.innerHTML = '';

    siteData.team.forEach((member, idx) => {
      const box = document.createElement('div');
      box.className = 'admin-card-panel';
      box.style.borderLeft = '4px solid var(--p-light)';

      const imgSlot = siteData.images[member.imageKey] || {};

      box.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h4 style="color:#fff; font-size:1.1rem; font-weight:800;">👤 Specialist #${idx + 1}: ${member.name}</h4>
          <span class="slot-category-badge">${member.role || 'Therapist'}</span>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label>Specialist / Doctor Name</label>
            <input type="text" value="${member.name || ''}" data-team-field="name" data-idx="${idx}" />
          </div>
          <div class="form-group">
            <label>Designation &amp; Specialty</label>
            <input type="text" value="${member.role || ''}" data-team-field="role" data-idx="${idx}" />
          </div>
        </div>

        <div class="form-group" style="margin-top:16px;">
          <label>Biography / Description</label>
          <textarea data-team-field="bio" data-idx="${idx}">${member.bio || ''}</textarea>
        </div>

        <div style="margin-top:16px; padding:14px; background:rgba(0,0,0,0.15); border-radius:10px; display:flex; align-items:center; gap:16px;">
          <div style="width:58px; height:58px; border-radius:50%; overflow:hidden; border:2px solid var(--p-light); background:#060e22; flex-shrink:0;">
            <img src="${imgSlot.src || 'logo.png'}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.png';" />
          </div>
          <div style="flex:1;">
            <div style="font-size:0.88rem; color:#fff; font-weight:700;">Specialist Photo: <span>${imgSlot.title || member.name}</span></div>
            <p style="font-size:0.78rem; color:var(--text-sub);">Click below to replace or upload this person's picture.</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.adminJumpToImage('${member.imageKey}')">📸 Change Photo</button>
        </div>
      `;

      container.appendChild(box);
    });

    container.querySelectorAll('[data-team-field]').forEach(input => {
      input.addEventListener('input', () => {
        const idx = parseInt(input.getAttribute('data-idx'));
        const field = input.getAttribute('data-team-field');
        siteData.team[idx][field] = input.value;
      });
    });
  }

  // ---------------- Services Editor ----------------
  function renderServicesEditor() {
    const container = document.getElementById('services-editor-container');
    if (!container) return;
    container.innerHTML = '';

    siteData.services.forEach((svc, idx) => {
      const box = document.createElement('div');
      box.className = 'admin-card-panel';
      box.style.borderLeft = '4px solid var(--acc)';

      box.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h4 style="color:#fff; font-size:1.1rem; font-weight:800;">${svc.icon || '🩺'} Service #${idx + 1}: ${svc.title}</h4>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label>Service Name</label>
            <input type="text" value="${svc.title || ''}" data-svc-field="title" data-idx="${idx}" />
          </div>
          <div class="form-group">
            <label>Icon / Emoji</label>
            <input type="text" value="${svc.icon || ''}" data-svc-field="icon" data-idx="${idx}" />
            <span class="field-help-hint">💡 E.g. 🗣️, 👂, 👶, 🧠, 🔊, 🏡</span>
          </div>
        </div>

        <div class="form-group" style="margin-top:16px;">
          <label>Service Description</label>
          <textarea data-svc-field="desc" data-idx="${idx}">${svc.desc || ''}</textarea>
        </div>

        <div class="form-group" style="margin-top:16px;">
          <label>Feature Bullet Points (Separate with commas)</label>
          <input type="text" value="${(svc.tags || []).join(', ')}" data-svc-field="tags" data-idx="${idx}" />
          <span class="field-help-hint">💡 Example: Stammering, Articulation, Voice Delay</span>
        </div>
      `;

      container.appendChild(box);
    });

    container.querySelectorAll('[data-svc-field]').forEach(input => {
      input.addEventListener('input', () => {
        const idx = parseInt(input.getAttribute('data-idx'));
        const field = input.getAttribute('data-svc-field');
        if (field === 'tags') {
          siteData.services[idx].tags = input.value.split(',').map(s => s.trim()).filter(Boolean);
        } else {
          siteData.services[idx][field] = input.value;
        }
      });
    });
  }

  // ---------------- Testimonials Editor ----------------
  function renderTestimonialsEditor() {
    const container = document.getElementById('testimonials-editor-container');
    if (!container) return;
    container.innerHTML = '';

    siteData.testimonials.forEach((tm, idx) => {
      const box = document.createElement('div');
      box.className = 'admin-card-panel';
      box.style.borderLeft = '4px solid var(--warning)';

      box.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h4 style="color:#fff; font-size:1.05rem; font-weight:800;">⭐ Review from: ${tm.name}</h4>
          <button class="btn btn-outline btn-sm" style="color:var(--danger); border-color:rgba(239,68,68,0.4);" data-remove-tm="${idx}">🗑️ Delete Review</button>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label>Patient / Parent Name</label>
            <input type="text" value="${tm.name || ''}" data-tm-field="name" data-idx="${idx}" />
          </div>
          <div class="form-group">
            <label>Patient Relation / Subtitle</label>
            <input type="text" value="${tm.relation || ''}" data-tm-field="relation" data-idx="${idx}" />
            <span class="field-help-hint">💡 E.g. Mother of 4-year-old child</span>
          </div>
        </div>

        <div class="form-group" style="margin-top:16px;">
          <label>Review Text</label>
          <textarea data-tm-field="text" data-idx="${idx}">${tm.text || ''}</textarea>
        </div>
      `;

      container.appendChild(box);
    });

    // Delete review handlers
    container.querySelectorAll('[data-remove-tm]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-remove-tm'));
        siteData.testimonials.splice(idx, 1);
        renderTestimonialsEditor();
        showToast('Review removed.', 'success');
      });
    });

    container.querySelectorAll('[data-tm-field]').forEach(input => {
      input.addEventListener('input', () => {
        const idx = parseInt(input.getAttribute('data-idx'));
        const field = input.getAttribute('data-tm-field');
        siteData.testimonials[idx][field] = input.value;
      });
    });
  }

  const addReviewBtn = document.getElementById('add-review-btn');
  if (addReviewBtn) {
    addReviewBtn.addEventListener('click', () => {
      siteData.testimonials.push({
        name: "Happy Patient",
        rating: 5,
        relation: "Satisfied Parent",
        text: "The therapy was fantastic and made a huge difference. Highly recommend Princy clinic!"
      });
      renderTestimonialsEditor();
      showToast('Added new review slot! Enter the details and click Save.', 'success');
    });
  }

  window.adminJumpToImage = function (key) {
    switchTab('images');
    setTimeout(() => {
      const card = document.querySelector(`.image-slot-card[data-slot-key="${key}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.borderColor = 'var(--acc)';
        setTimeout(() => card.style.borderColor = '', 2500);
      }
    }, 100);
  };

  // ---------------- Save All Changes ----------------
  function saveAll() {
    const success = window.savePrincySiteData(siteData);
    if (success) {
      showToast('🎉 All changes saved successfully! Your live website is updated.', 'success');
    } else {
      showToast('❌ Failed to save changes.', 'error');
    }
  }

  if (saveAllBtn) saveAllBtn.addEventListener('click', saveAll);

  // ---------------- Reset All to Defaults ----------------
  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset everything back to the original version?')) {
        siteData = window.resetPrincySiteData();
        populateFormInputs();
        renderImageGrid();
        showToast('Reset all website data to original defaults.', 'success');
      }
    });
  }

  // ---------------- Backup JSON ----------------
  const exportJsonBtn = document.getElementById('export-json-btn');
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `princy-website-backup-${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Downloaded safe backup file to your computer!', 'success');
    });
  }

  const importJsonBtn = document.getElementById('import-json-btn');
  const importFileInput = document.getElementById('import-file-input');
  if (importJsonBtn && importFileInput) {
    importJsonBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported && (imported.general || imported.images)) {
            siteData = imported;
            window.savePrincySiteData(siteData);
            populateFormInputs();
            renderImageGrid();
            showToast('Website restored from your backup file!', 'success');
          } else {
            showToast('Invalid backup file.', 'error');
          }
        } catch (err) {
          showToast('Failed to read file.', 'error');
        }
      };
      reader.readAsText(file);
    });
  }

  // ---------------- Toast Notifications ----------------
  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Initial Run
  populateFormInputs();
  renderImageGrid();
});
