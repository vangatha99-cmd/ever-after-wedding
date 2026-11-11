/**
 * ============================================================================
 * EVER AFTER — DIGITAL WEDDING INVITATION JAVASCRIPT
 * Modern, Elegant, Interactive & Responsive
 * ============================================================================
 */

// ============================================================================
// 1. WEDDING CONFIGURATION (EASY TO CUSTOMIZE)
// ============================================================================
const WEDDING_CONFIG = {
  // Couple Names & Monogram
  groom: {
    fullName: "Raditya Pratama, S.T.",
    nickName: "Radit",
    father: "Ir. Bambang Suryo",
    mother: "Ratna Dewi",
    instagram: "@radityapratama",
    instagramUrl: "https://instagram.com"
  },
  bride: {
    fullName: "Amanda Putri Kirana, S.I.Kom.",
    nickName: "Amanda",
    father: "Dr. Hendra Gunawan",
    mother: "Siti Aminah",
    instagram: "@amandakirana",
    instagramUrl: "https://instagram.com"
  },

  // Wedding Date & Time
  // Format: YYYY-MM-DDTHH:mm:ss
  targetDate: "2026-12-12T08:00:00+07:00",
  dateDisplay: "Sabtu, 12 Desember 2026",

  // Events
  events: {
    akad: {
      title: "Akad Nikah",
      date: "Sabtu, 12 Desember 2026",
      time: "08.00 - 10.00 WIB",
      venue: "Masjid Agung Al-Ikhlas",
      address: "Jl. Dharmawangsa Raya No. 6, Kebayoran Baru, Jakarta Selatan",
      mapsUrl: "https://maps.google.com/?q=Plataran+Dharmawangsa+Jakarta"
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      date: "Sabtu, 12 Desember 2026",
      time: "18.30 - 21.30 WIB",
      venue: "Grand Aster Ballroom, The Ritz Heritage Hotel",
      address: "Jl. Jendral Sudirman Kav. 21, Senayan, Jakarta Pusat",
      mapsUrl: "https://maps.google.com/?q=The+Ritz-Carlton+Jakarta+Pacific+Place"
    }
  },

  // Bank & Gift Information
  gifts: {
    bca: {
      bank: "BCA",
      accountNumber: "8720192831",
      accountHolder: "RADITYA PRATAMA"
    },
    mandiri: {
      bank: "MANDIRI",
      accountNumber: "1370019283719",
      accountHolder: "AMANDA PUTRI KIRANA"
    },
    physical: {
      recipient: "Raditya & Amanda",
      phone: "+62 812-3456-7890",
      address: "Jl. Cempaka Putih No. 15, RT 04 / RW 08, Menteng Dalam, Tebet, Jakarta Selatan, DKI Jakarta 12870"
    }
  },

  // Pre-seeded Heartwarming Wishes
  initialWishes: [
    {
      id: "seed-1",
      name: "Dimas Arya & Pasangan",
      attendance: "Hadir",
      message: "Selamat untuk Radit dan Amanda! Semoga senantiasa dipenuhi keberkahan, sakinah, mawaddah, warahmah dalam mengarungi bahtera rumah tangga. See you on the big day!",
      timestamp: "2026-11-10T14:20:00.000Z"
    },
    {
      id: "seed-2",
      name: "dr. Nabila Shakira",
      attendance: "Hadir",
      message: "Masya Allah Amanda sayang, terharu banget dari zaman kuliah sampai sekarang akhirnya melangkah ke jenjang pernikahan. Bahagia selalu berdua sampai maut memisahkan yaa!",
      timestamp: "2026-11-09T09:15:00.000Z"
    },
    {
      id: "seed-3",
      name: "Keluarga Besar Bpk. Hendarto",
      attendance: "Hadir",
      message: "Selamat menempuh hidup baru untuk ananda Raditya dan ananda Amanda. Semoga menjadi keluarga yang rukun, saling mengasihi, dan senantiasa dalam lindungan Tuhan.",
      timestamp: "2026-11-08T18:45:00.000Z"
    },
    {
      id: "seed-4",
      name: "Reza Farhan",
      attendance: "Tidak Hadir",
      message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khair Dit & Amanda! Mohon maaf belum bisa hadir langsung karena dinas luar kota, titip doa tulus dari jauh.",
      timestamp: "2026-11-07T11:00:00.000Z"
    }
  ]
};

// ============================================================================
// 2. DOM CONTENT LOADED & INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons if loaded
  initLucideIcons();

  // Handle URL Guest Name (?to=...)
  handleGuestName();

  // Initialize Opening Envelope Interaction
  initEnvelope();

  // Initialize Audio & Music Player
  initMusicPlayer();

  // Initialize Real-Time Wedding Countdown
  initCountdown();

  // Initialize Gallery Lightbox
  initGalleryLightbox();

  // Initialize RSVP Form & Wishes Storage
  initRSVPAndWishes();

  // Initialize Clipboard Copying & Toasts
  initClipboardButtons();

  // Initialize Scroll Reveal Animations & Navigation Dock
  initScrollInteractions();
});

// Helper for Lucide Icons
function initLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    try {
      window.lucide.createIcons();
    } catch (e) {
      console.warn("Lucide icons initialized with fallback:", e);
    }
  }
}

// ============================================================================
// 3. GUEST NAME EXTRACTION FROM URL
// ============================================================================
function handleGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get("to") || urlParams.get("u") || urlParams.get("guest");
  
  const guestDisplay = document.getElementById("envelope-guest-name");
  const rsvpNameInput = document.getElementById("rsvp-name");

  if (guestParam && guestParam.trim() !== "") {
    // Decode URI component and clean up
    const cleanGuestName = decodeURIComponent(guestParam.replace(/\+/g, " ")).trim();
    if (guestDisplay) {
      guestDisplay.textContent = cleanGuestName;
    }
    // Auto-fill RSVP name for a seamless experience
    if (rsvpNameInput) {
      rsvpNameInput.value = cleanGuestName;
    }
  } else {
    if (guestDisplay) {
      guestDisplay.textContent = "Tamu Undangan";
    }
  }
}

// ============================================================================
// 4. OPENING ENVELOPE INTERACTION & MUSIC TRIGGER
// ============================================================================
function initEnvelope() {
  const openBtn = document.getElementById("btn-open-invitation");
  const envelopeScreen = document.getElementById("envelope-screen");
  const envelopeBox = document.getElementById("envelope-box");
  const body = document.body;

  if (!openBtn || !envelopeScreen) return;

  openBtn.addEventListener("click", () => {
    // 1. Play audio immediately within user interaction context
    playWeddingMusic();

    // 2. Trigger envelope unfolding animation
    if (envelopeBox) {
      envelopeBox.classList.add("opening");
    }

    // 3. Smooth transition to main website
    setTimeout(() => {
      envelopeScreen.classList.add("dismissed");
      body.classList.remove("locked");

      // Re-trigger scroll reveal for hero elements
      triggerHeroReveal();
    }, 1100);
  });
}

function triggerHeroReveal() {
  const heroElements = document.querySelectorAll(".hero-content-wrapper .animate-fade-in");
  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.25}s`;
  });
}

// ============================================================================
// 5. AUDIO & FLOATING MUSIC PLAYER
// ============================================================================
let audioContext = null;
let synthInterval = null;
let isMusicPlaying = false;

function initMusicPlayer() {
  const audioEl = document.getElementById("wedding-audio");
  const musicToggleBtn = document.getElementById("music-toggle-btn");
  const discVinyl = document.getElementById("disc-vinyl");
  const musicTooltip = document.getElementById("music-tooltip");

  if (!musicToggleBtn) return;

  // Music toggle button interaction
  musicToggleBtn.addEventListener("click", () => {
    if (isMusicPlaying) {
      pauseWeddingMusic();
    } else {
      playWeddingMusic();
    }
  });

  // Handle audio state synchronization
  if (audioEl) {
    audioEl.addEventListener("play", () => {
      isMusicPlaying = true;
      if (discVinyl) discVinyl.classList.add("spinning");
      if (musicTooltip) musicTooltip.textContent = "Jeda Musik";
    });

    audioEl.addEventListener("pause", () => {
      isMusicPlaying = false;
      if (discVinyl) discVinyl.classList.remove("spinning");
      if (musicTooltip) musicTooltip.textContent = "Putar Musik";
    });

    // In case audio source fails or is blocked, seamlessly start synthesized romantic piano
    audioEl.addEventListener("error", () => {
      console.info("Audio source loading failed, engaging Web Audio API romantic melody fallback.");
      startProceduralPianoAudio();
    });
  }
}

function playWeddingMusic() {
  const audioEl = document.getElementById("wedding-audio");
  const discVinyl = document.getElementById("disc-vinyl");
  const musicTooltip = document.getElementById("music-tooltip");

  if (audioEl) {
    audioEl.volume = 0.65;
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isMusicPlaying = true;
          if (discVinyl) discVinyl.classList.add("spinning");
          if (musicTooltip) musicTooltip.textContent = "Jeda Musik";
        })
        .catch((err) => {
          console.warn("HTML5 audio playback restricted, starting Web Audio fallback:", err);
          startProceduralPianoAudio();
        });
    }
  } else {
    startProceduralPianoAudio();
  }
}

function pauseWeddingMusic() {
  const audioEl = document.getElementById("wedding-audio");
  const discVinyl = document.getElementById("disc-vinyl");
  const musicTooltip = document.getElementById("music-tooltip");

  if (audioEl) {
    audioEl.pause();
  }

  // Also stop synth fallback if active
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }

  isMusicPlaying = false;
  if (discVinyl) discVinyl.classList.remove("spinning");
  if (musicTooltip) musicTooltip.textContent = "Putar Musik";
}

/**
 * Web Audio API Fallback: Plays a romantic, peaceful piano/music-box melody
 * Ensures music works even offline, in file:// protocol, or without external network!
 */
function startProceduralPianoAudio() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioContext) {
      audioContext = new AudioCtx();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const discVinyl = document.getElementById("disc-vinyl");
    const musicTooltip = document.getElementById("music-tooltip");
    isMusicPlaying = true;
    if (discVinyl) discVinyl.classList.add("spinning");
    if (musicTooltip) musicTooltip.textContent = "Jeda Musik";

    // Romantic chord arpeggio: D - A - Bm - F#m - G - D - G - A
    const notes = [
      293.66, 369.99, 440.00, 587.33,
      220.00, 277.18, 329.63, 440.00,
      246.94, 293.66, 369.99, 493.88,
      185.00, 220.00, 277.18, 369.99,
      196.00, 246.94, 293.66, 392.00,
      220.00, 293.66, 369.99, 440.00,
      196.00, 246.94, 293.66, 392.00,
      220.00, 277.18, 329.63, 440.00
    ];

    let noteIndex = 0;
    if (synthInterval) clearInterval(synthInterval);

    synthInterval = setInterval(() => {
      if (!isMusicPlaying || !audioContext) return;
      playSoftPianoTone(notes[noteIndex]);
      noteIndex = (noteIndex + 1) % notes.length;
    }, 420);

  } catch (e) {
    console.warn("Web Audio API not supported:", e);
  }
}

function playSoftPianoTone(freq) {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, audioContext.currentTime);

  gain.gain.setValueAtTime(0.08, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2);

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start();
  osc.stop(audioContext.currentTime + 1.25);
}

// ============================================================================
// 6. REAL-TIME WEDDING COUNTDOWN TIMER
// ============================================================================
function initCountdown() {
  const targetDate = new Date(WEDDING_CONFIG.targetDate).getTime();
  const daysEl = document.getElementById("timer-days");
  const hoursEl = document.getElementById("timer-hours");
  const minutesEl = document.getElementById("timer-minutes");
  const secondsEl = document.getElementById("timer-seconds");
  const timerGrid = document.getElementById("wedding-countdown-timer");
  const expiredMsg = document.getElementById("countdown-expired-msg");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (timerGrid) timerGrid.classList.add("hidden");
      if (expiredMsg) expiredMsg.classList.remove("hidden");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ============================================================================
// 7. GALLERY & LIGHTBOX MODAL
// ============================================================================
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("lightbox-modal");
  const activeImg = document.getElementById("lightbox-active-img");
  const captionEl = document.getElementById("lightbox-caption");
  const counterEl = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const backdrop = document.getElementById("lightbox-backdrop");
  const prevBtn = document.getElementById("lightbox-prev-btn");
  const nextBtn = document.getElementById("lightbox-next-btn");

  if (!modal || galleryItems.length === 0) return;

  const galleryData = Array.from(galleryItems).map((item) => ({
    src: item.getAttribute("data-src") || item.querySelector("img")?.src,
    caption: item.getAttribute("data-caption") || ""
  }));

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateLightboxContent() {
    const item = galleryData[currentIndex];
    if (!item) return;

    if (activeImg) {
      activeImg.style.opacity = "0";
      setTimeout(() => {
        activeImg.src = item.src;
        activeImg.alt = item.caption;
        activeImg.style.opacity = "1";
      }, 150);
    }

    if (captionEl) {
      captionEl.textContent = item.caption;
    }

    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${galleryData.length}`;
    }
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  // Click on gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  // Lightbox controls
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", showNextImage);
  if (prevBtn) prevBtn.addEventListener("click", showPrevImage);

  // Keyboard Navigation
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
  });

  // Touch swipe support on mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      showNextImage();
    } else if (touchEndX > touchStartX + threshold) {
      showPrevImage();
    }
  }
}

// ============================================================================
// 8. RSVP FORM, LOCALSTORAGE & WEDDING WISHES STREAM
// ============================================================================
const RSVP_STORAGE_KEY = "ever_after_wedding_rsvp_entries";

function initRSVPAndWishes() {
  const form = document.getElementById("rsvp-form");
  const wishesStream = document.getElementById("wishes-stream");
  const totalCountEl = document.getElementById("wishes-total-count");
  const successBanner = document.getElementById("rsvp-success-banner");
  const submitBtn = document.getElementById("rsvp-submit-btn");
  const spinner = document.getElementById("rsvp-spinner");
  const sendIcon = document.getElementById("rsvp-send-icon");

  // Load existing wishes from LocalStorage or seed data
  let wishesList = getStoredWishes();

  // Render Initial Wishes
  renderWishes(wishesList, wishesStream, totalCountEl);

  if (!form) return;

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validation
    const nameInput = document.getElementById("rsvp-name");
    const paxSelect = document.getElementById("rsvp-pax");
    const attendanceRadio = form.querySelector('input[name="attendance"]:checked');
    const messageInput = document.getElementById("rsvp-message");

    let isValid = true;

    // Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : "";
    const nameGroup = nameInput ? nameInput.closest(".form-group") : null;
    if (!nameVal) {
      if (nameGroup) nameGroup.classList.add("has-error");
      isValid = false;
    } else {
      if (nameGroup) nameGroup.classList.remove("has-error");
    }

    // Validate Pax
    const paxVal = paxSelect ? paxSelect.value : "";
    const paxGroup = paxSelect ? paxSelect.closest(".form-group") : null;
    if (!paxVal) {
      if (paxGroup) paxGroup.classList.add("has-error");
      isValid = false;
    } else {
      if (paxGroup) paxGroup.classList.remove("has-error");
    }

    // Attendance
    const attendanceVal = attendanceRadio ? attendanceRadio.value : "Hadir";

    if (!isValid) {
      showToast("Mohon lengkapi kolom yang wajib diisi (*)", "error");
      return;
    }

    // Show button loading state
    if (submitBtn) submitBtn.disabled = true;
    if (spinner) spinner.classList.remove("hidden");
    if (sendIcon) sendIcon.classList.add("hidden");

    // Construct RSVP Entry Object
    const newEntry = {
      id: "rsvp-" + Date.now(),
      name: nameVal,
      pax: paxVal,
      attendance: attendanceVal,
      message: messageInput ? messageInput.value.trim() : "",
      timestamp: new Date().toISOString()
    };

    // Simulate clean network request / persistence
    setTimeout(() => {
      // 1. Save to LocalStorage
      wishesList.unshift(newEntry);
      saveWishesToStorage(wishesList);

      // 2. Re-render wishes stream
      renderWishes(wishesList, wishesStream, totalCountEl);

      // 3. Reset button loading state
      if (submitBtn) submitBtn.disabled = false;
      if (spinner) spinner.classList.add("hidden");
      if (sendIcon) sendIcon.classList.remove("hidden");

      // 4. Show success banner
      if (successBanner) {
        successBanner.classList.remove("hidden");
        setTimeout(() => {
          successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }

      // 5. Toast Feedback
      showToast("Konfirmasi kehadiran dan ucapan berhasil dikirim!");

      // 6. Reset message field (keep name for user convenience)
      if (messageInput) messageInput.value = "";

      // 7. Optional external webhook triggers (Google Sheets / Firebase)
      syncToExternalSpreadsheet(newEntry);
    }, 600);
  });
}

function getStoredWishes() {
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Error reading RSVP localStorage:", err);
  }
  // Fallback to initial seeds
  return [...WEDDING_CONFIG.initialWishes];
}

function saveWishesToStorage(list) {
  try {
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("Error saving RSVP localStorage:", err);
  }
}

function renderWishes(list, container, countEl) {
  if (!container) return;

  if (countEl) {
    countEl.innerHTML = `Total Ucapan: <strong>${list.length}</strong>`;
  }

  container.innerHTML = "";

  list.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "wish-item";

    const initial = entry.name ? entry.name.charAt(0).toUpperCase() : "G";
    const statusClass = entry.attendance === "Hadir" ? "hadir" : "tidak-hadir";
    const statusBadgeText = entry.attendance === "Hadir" ? "Hadir" : "Belum Bisa Hadir";
    const formattedDate = formatRelativeTime(entry.timestamp);

    card.innerHTML = `
      <div class="wish-item-header">
        <div class="wish-sender-info">
          <div class="wish-avatar">${initial}</div>
          <h4 class="wish-sender-name">${escapeHTML(entry.name)}</h4>
        </div>
        <span class="wish-status-badge ${statusClass}">
          ${statusBadgeText}
        </span>
      </div>
      <p class="wish-content-text">${escapeHTML(entry.message || "Selamat berbahagia dan semoga selalu dalam limpahan cinta!")}</p>
      <span class="wish-timestamp">${formattedDate}</span>
    `;

    container.appendChild(card);
  });

  initLucideIcons();
}

function formatRelativeTime(isoString) {
  if (!isoString) return "Baru saja";
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);

    if (diffSec < 60) return "Baru saja";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} menit yang lalu`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} jam yang lalu`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)} hari yang lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch (e) {
    return "Baru saja";
  }
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, 
    (tag) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }[tag] || tag)
  );
}

/**
 * Placeholder for Google Sheets or Firebase Integration
 * Simply plug in your Apps Script URL or Firebase Firestore addDoc() here.
 */
function syncToExternalSpreadsheet(entry) {
  /*
  const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL";
  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  }).catch(err => console.log("External sync error:", err));
  */
}

// ============================================================================
// 9. CLIPBOARD COPYING & TOAST NOTIFICATION
// ============================================================================
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll("[data-copy]");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      const label = btn.getAttribute("data-label") || "Nomor rekening";

      if (!textToCopy) return;

      copyTextToClipboard(textToCopy)
        .then(() => {
          showToast(`✓ ${label} berhasil disalin ke clipboard!`);
        })
        .catch(() => {
          // Fallback feedback
          showToast(`✓ Berhasil disalin: ${textToCopy}`);
        });
    });
  });
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers or insecure origins
    return new Promise((resolve, reject) => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful) {
          resolve();
        } else {
          reject(new Error("Copy command failed"));
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}

let toastTimer = null;
function showToast(message, type = "success") {
  const toast = document.getElementById("toast-notification");
  const toastText = document.getElementById("toast-text");

  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add("active");

  if (toastTimer) clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("active");
  }, 3200);
}

// ============================================================================
// 10. SCROLL REVEAL ANIMATIONS & NAVIGATION DOCK TRACKING
// ============================================================================
function initScrollInteractions() {
  // 1. Reveal on scroll using IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add("revealed"));
  }

  // 2. Navigation Dock Active State on Scroll
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link[data-nav]");
  const backToTopBtn = document.getElementById("btn-back-to-top");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    // Show/hide back to top button
    if (backToTopBtn) {
      if (scrollY > 450) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // Determine current active section
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("data-nav") === currentSectionId) {
          link.classList.add("active");
        }
      });
    }
  }, { passive: true });

  // 3. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}
