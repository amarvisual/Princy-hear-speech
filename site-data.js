/**
 * Princy Hear & Speech Rehab - Comprehensive Site Data & Hydration Bridge
 * Powers 100% Admin Panel synchronization for all texts, images, and settings.
 */

(function () {
  const STORAGE_KEY = 'princy_site_data_v1';

  // Comprehensive default site data representing every editable element
  const defaultSiteData = {
    general: {
      name: "Princy Hear & Speech Rehab",
      subName: "Rehab Clinic · Bhubaneswar",
      phone: "+91 82499 64216",
      phoneRaw: "918249964216",
      whatsapp: "918249964216",
      whatsappMsg: "Hi, I want to book an appointment",
      email: "contact@princyhearandspeech.in",
      addressShort: "Nandan Vihar, Patia, Bhubaneswar 751024",
      addressFull: "Meena Bhawan, 285-AB, Nandan Vihar, near Med Plus Lane & Hanuman Mandir, Patia, Bhubaneswar, Odisha 751024",
      hoursWeekday: "Mon – Fri: 9 AM – 8 PM",
      hoursWeekend: "Saturday: 9 AM – 2 PM · Sunday: Closed",
      mapEmbedUrl: "https://maps.google.com/maps?q=Meena+Bhawan+285-AB+Nandan+Vihar+Patia+Bhubaneswar+Odisha+751024&output=embed&z=16",
      socialInstagram: "https://www.instagram.com/princy_hear_and_speech",
      socialFacebook: "https://www.facebook.com",
      copyright: "© 2026 Princy Hear and Speech Rehab. All rights reserved.",
      footerNote: "Made with ❤️ for Bhubaneswar families"
    },

    hero: {
      badge: "5.0 ★ Rated Clinic in Bhubaneswar",
      title: "Transforming Speech & Hearing",
      titleTyped: "Every Single Day.",
      description: "Compassionate, certified rehabilitation for children and adults. We help you and your loved ones communicate with clarity and confidence.",
      statRating: "5.0★",
      statPatients: "500+",
      statServices: "6+",
      statDays: "6 Days/Wk"
    },

    doctorHero: {
      id: "doctorHero",
      name: "Dr. Sornajali Srichandan",
      degree: "M.Sc. (SLP)",
      designation: "Audiologist & Speech and Language Pathologist",
      locationTag: "🏥 Patia, Bhubaneswar",
      ratingTag: "★ 5.0 Rated Specialist",
      src: "doctor.jpg",
      alt: "Dr. Sornajali Srichandan – Audiologist & Speech Therapist",
      dimensions: "600 x 800 px (3:4 ratio)",
      aspectRatio: "3:4"
    },

    images: {
      logo: {
        id: "logo",
        title: "Main Website Logo",
        category: "branding",
        dimensions: "280 x 70 px",
        aspectRatio: "4:1",
        src: "logo.png",
        alt: "Princy Hear and Speech Rehab Logo"
      },
      favicon: {
        id: "favicon",
        title: "Browser Favicon",
        category: "branding",
        dimensions: "64 x 64 px",
        aspectRatio: "1:1",
        src: "favicon.ico",
        alt: "Princy Favicon"
      },
      team1: {
        id: "team1",
        title: "Speech Therapist (Anjali Mam)",
        category: "team",
        dimensions: "500 x 500 px",
        aspectRatio: "1:1",
        src: "team-anjali.jpg",
        alt: "Anjali Mam, Speech-Language Pathologist"
      },
      team2: {
        id: "team2",
        title: "Lead Audiologist (Dr. Sornajali)",
        category: "team",
        dimensions: "500 x 500 px",
        aspectRatio: "1:1",
        src: "team-swaranjali.jpg",
        alt: "Dr. Sornajali Srichandan, Audiologist"
      },
      team3: {
        id: "team3",
        title: "Patient Care Support Team",
        category: "team",
        dimensions: "500 x 500 px",
        aspectRatio: "1:1",
        src: "",
        alt: "Support Care Team"
      },
      serviceSpeech: {
        id: "serviceSpeech",
        title: "Service: Speech Therapy",
        category: "services",
        dimensions: "600 x 400 px",
        aspectRatio: "3:2",
        src: "",
        alt: "Speech Therapy Interventions"
      },
      serviceAdult: {
        id: "serviceAdult",
        title: "Service: Adult Rehabilitation",
        category: "services",
        dimensions: "600 x 400 px",
        aspectRatio: "3:2",
        src: "",
        alt: "Adult Speech & Stroke Rehabilitation"
      },
      serviceHearing: {
        id: "serviceHearing",
        title: "Service: Hearing Care & Audiometry",
        category: "services",
        dimensions: "600 x 400 px",
        aspectRatio: "3:2",
        src: "",
        alt: "Audiometric Assessments"
      },
      serviceAids: {
        id: "serviceAids",
        title: "Service: Digital Hearing Aids",
        category: "services",
        dimensions: "600 x 400 px",
        aspectRatio: "3:2",
        src: "",
        alt: "Hearing Aid Devices"
      },
      servicePediatric: {
        id: "servicePediatric",
        title: "Service: Pediatric Therapy",
        category: "services",
        dimensions: "600 x 400 px",
        aspectRatio: "3:2",
        src: "",
        alt: "Early Childhood Speech Development"
      },
      serviceHome: {
        id: "serviceHome",
        title: "Service: Home Therapy",
        category: "services",
        dimensions: "600 x 400 px",
        aspectRatio: "3:2",
        src: "",
        alt: "Home Therapy Sessions"
      },
      facilityClinic: {
        id: "facilityClinic",
        title: "Clinic Facility & Treatment Rooms",
        category: "facility",
        dimensions: "800 x 500 px",
        aspectRatio: "16:10",
        src: "",
        alt: "Princy Clinic Facility at Patia Bhubaneswar"
      }
    },

    team: [
      {
        id: "team1",
        name: "Anjali Mam",
        role: "Speech-Language Pathologist",
        bio: "A certified speech therapist specializing in pediatric speech delays, stammering, and articulation disorders. Known for her warm, patient-centered approach.",
        imageKey: "team1"
      },
      {
        id: "team2",
        name: "Dr. Sornajali Srichandan, M.Sc.(SLP)",
        role: "Audiologist & Speech-Language Pathologist",
        bio: "A qualified audiologist with expertise in hearing diagnostics, hearing aid fitting, and hearing rehabilitation for adults and children.",
        imageKey: "team2"
      },
      {
        id: "team3",
        name: "Support Team",
        role: "Patient Care & Coordination",
        bio: "Our friendly front-desk and support staff ensure every visit is smooth, comfortable, and stress-free for patients and families.",
        imageKey: "team3"
      }
    ],

    services: [
      {
        id: "speech",
        title: "Speech Therapy",
        desc: "Our pediatric speech therapists provide evidence-based interventions for children struggling with stammering, articulation disorders, language delays, and phonological difficulties.",
        tags: ["Stammering", "Articulation", "Language Delay", "Voice Disorders"],
        icon: "🗣️",
        imageKey: "serviceSpeech"
      },
      {
        id: "adult",
        title: "Adult Rehabilitation",
        desc: "We offer compassionate, comprehensive speech rehabilitation for adults including post-stroke recovery, aphasia management, dysarthria therapy, and voice therapy programs.",
        tags: ["Post-Stroke", "Aphasia", "Dysarthria", "Voice Therapy"],
        icon: "🧠",
        imageKey: "serviceAdult"
      },
      {
        id: "hearing",
        title: "Hearing Care",
        desc: "Comprehensive diagnostic hearing assessments including pure tone audiometry, speech audiometry, and impedance audiometry. We provide accurate evaluation and counseling.",
        tags: ["Pure Tone Audiometry", "Tympanometry", "Hearing Counseling"],
        icon: "👂",
        imageKey: "serviceHearing"
      },
      {
        id: "aids",
        title: "Hearing Aids",
        desc: "We dispense and fit the latest digital hearing aids from trusted brands, with custom ear molds and ongoing programming and maintenance support.",
        tags: ["Digital Devices", "Custom Fitting", "Long-Term Support"],
        icon: "🔊",
        imageKey: "serviceAids"
      },
      {
        id: "pediatric",
        title: "Pediatric Therapy",
        desc: "Fun, engaging therapy sessions specifically designed for toddlers and young children with play-based techniques to achieve maximum developmental progress.",
        tags: ["Early Intervention", "Play-Based", "Toddlers", "Child-Friendly"],
        icon: "👶",
        imageKey: "servicePediatric"
      },
      {
        id: "home",
        title: "Home Therapy",
        desc: "Can't visit the clinic? Our certified therapists come to you for convenient, comfortable at-home therapy sessions.",
        tags: ["At-Home Sessions", "All Ages", "Convenient"],
        icon: "🏡",
        imageKey: "serviceHome"
      }
    ],

    aboutStory: {
      mission: "At Princy Hear and Speech Rehab, our mission is simple: to help every person communicate with confidence and live life to the fullest.",
      vision: "Our vision is to be the most trusted speech and hearing clinic in Odisha — a place where every family finds hope, progress, and lasting results.",
      history: "Founded with a deep commitment to clinical excellence and genuine compassion, our clinic serves children and adults across Bhubaneswar with personalized, evidence-based speech and hearing rehabilitation."
    },

    testimonials: [
      {
        name: "Priyanka Mishra",
        rating: 5,
        relation: "Mother of 4-year-old patient",
        text: "The progress my son made within 3 months of speech therapy here is unbelievable. The doctor is so gentle and patient. Highly recommend Princy clinic in Bhubaneswar!"
      },
      {
        name: "Debabrata Mohapatra",
        rating: 5,
        relation: "Adult Rehab Patient",
        text: "Excellent diagnosis for hearing issues and genuine guidance. Very professional and caring approach. Best speech and hearing clinic in Patia."
      },
      {
        name: "Rashmi Ranjan Das",
        rating: 5,
        relation: "Patient Family",
        text: "Warm environment, highly skilled specialists, and affordable care. They took the time to answer all our questions and gave us realistic timelines."
      }
    ]
  };

  // Helper to deep merge objects
  function deepMerge(target, source) {
    for (const key in source) {
      if (source[key] instanceof Object && key in target) {
        Object.assign(source[key], deepMerge(target[key], source[key]));
      }
    }
    Object.assign(target || {}, source);
    return target;
  }

  // Get active site data (stored or fallback)
  window.getPrincySiteData = function () {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return deepMerge(JSON.parse(JSON.stringify(defaultSiteData)), parsed);
      }
    } catch (e) {
      console.warn('Error loading Princy site data:', e);
    }
    return JSON.parse(JSON.stringify(defaultSiteData));
  };

  // Save site data
  window.savePrincySiteData = function (newData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return true;
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      return false;
    }
  };

  // Reset to default
  window.resetPrincySiteData = function () {
    localStorage.removeItem(STORAGE_KEY);
    return JSON.parse(JSON.stringify(defaultSiteData));
  };

  // SVG Placeholder Generator
  window.generatePrincyPlaceholderSvg = function (options = {}) {
    const {
      width = 400,
      height = 300,
      text = "Princy Clinic Image",
      subtext = `${width} × ${height}`,
      icon = "🏥",
      bgColor1 = "#0A2540",
      bgColor2 = "#1B6EA8",
      textColor = "#FFFFFF"
    } = options;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="g_${Math.abs(width - height)}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bgColor1}"/>
            <stop offset="100%" stop-color="${bgColor2}"/>
          </linearGradient>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#g_${Math.abs(width - height)})" />
        <rect width="${width}" height="${height}" fill="url(#grid)" />
        
        <circle cx="${width / 2}" cy="${height / 2 - 25}" r="38" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
        <text x="${width / 2}" y="${height / 2 - 14}" font-family="system-ui, -apple-system, sans-serif" font-size="28" text-anchor="middle">${icon}</text>
        
        <text x="${width / 2}" y="${height / 2 + 35}" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="15" fill="${textColor}" text-anchor="middle" letter-spacing="0.5">${text}</text>
        <text x="${width / 2}" y="${height / 2 + 58}" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="12" fill="rgba(255,255,255,0.75)" text-anchor="middle">${subtext}</text>
      </svg>
    `.trim();

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  // Hydrate DOM on any page
  function hydratePublicPage() {
    const data = window.getPrincySiteData();
    if (!data) return;

    // 1. Hydrate Images (data-ph-img="key")
    document.querySelectorAll('[data-ph-img]').forEach(el => {
      const key = el.getAttribute('data-ph-img');
      let src = null;
      let alt = null;

      if (key === 'doctorHero' && data.doctorHero) {
        src = data.doctorHero.src;
        alt = data.doctorHero.alt;
      } else if (data.images && data.images[key]) {
        src = data.images[key].src;
        alt = data.images[key].alt;
      }

      if (src) {
        if (el.tagName === 'IMG') {
          el.src = src;
          if (alt) el.alt = alt;
        } else {
          el.style.backgroundImage = `url("${src}")`;
        }
      }
    });

    // 2. Hydrate Text (data-ph-text="path.to.property")
    document.querySelectorAll('[data-ph-text]').forEach(el => {
      const path = el.getAttribute('data-ph-text').split('.');
      let val = data;
      for (const p of path) {
        if (val && val[p] !== undefined) {
          val = val[p];
        } else {
          val = null;
          break;
        }
      }
      if (val !== null && typeof val === 'string') {
        el.textContent = val;
      }
    });

    // 3. Hydrate Dynamic Links (phone, WhatsApp, email)
    document.querySelectorAll('[data-ph-link]').forEach(el => {
      const type = el.getAttribute('data-ph-link');
      if (type === 'phone') {
        el.href = `tel:+${data.general.phoneRaw || '918249964216'}`;
      } else if (type === 'whatsapp') {
        el.href = `https://wa.me/${data.general.whatsapp || '918249964216'}`;
      } else if (type === 'whatsapp-msg') {
        const msg = el.getAttribute('data-ph-msg') || data.general.whatsappMsg || 'Hi, I want to book an appointment';
        el.href = `https://wa.me/${data.general.whatsapp || '918249964216'}?text=${encodeURIComponent(msg)}`;
      } else if (type === 'email') {
        el.href = `mailto:${data.general.email || 'contact@princyhearandspeech.in'}`;
      } else if (type === 'instagram') {
        el.href = data.general.socialInstagram || 'https://www.instagram.com';
      } else if (type === 'facebook') {
        el.href = data.general.socialFacebook || 'https://www.facebook.com';
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydratePublicPage);
  } else {
    hydratePublicPage();
  }
})();
