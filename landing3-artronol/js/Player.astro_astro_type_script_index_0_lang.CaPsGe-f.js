// videoOverlay.readable.js
// Refactor v1 + CTA intervals from index.html (window.startN/window.durationN)

(function attachOverlayController() {
    function initOverlay() {
        // 1) Abort & cleanup from previous init
        try { window.__overlayAbort?.abort?.(); } catch { }
        try { window.__overlayCleanup?.forEach((fn) => { try { fn(); } catch { } }); } catch { }
        window.__overlayCleanup = [];

        const abort = new AbortController();
        window.__overlayAbort = abort;

        const on = (el, event, handler, opts = {}) => {
            if (!el) return;
            el.addEventListener(event, handler, { ...opts, signal: abort.signal });
        };

        const cleanup = (fn) => {
            window.__overlayCleanup.push(fn);
            return fn;
        };

        // remove duplicates if re-init
        document.getElementById("video-pause-btn")?.remove();
        document.getElementById("cta1-btn")?.remove();
        document.getElementById("cta2-btn")?.remove();

        // 2) DOM refs
        const container = document.getElementById("video-container");
        const startBtn = document.getElementById("start-video-btn");
        const overlay = document.getElementById("video-overlay");
        const video = document.getElementById("video-player");
        const closeBtn = document.getElementById("close-fullscreen-btn");
        const formPopup = document.getElementById("form-popup");

        const resumeModal = document.getElementById("resume-modal");
        const continueModalBtn = document.getElementById("continue-modal-btn");
        const restartModalBtn = document.getElementById("restart-modal-btn");
        const resumeContinueBtn = document.getElementById("resume-continue");
        const resumeRestartBtn = document.getElementById("resume-restart");

        const progressBar = document.getElementById("video-progress-bar");
        const returnBanner = document.getElementById("return-banner");
        const returnBannerBtn = document.getElementById("return-banner-btn");
        const formBanner = document.getElementById("form-banner");
        const formBannerBtn = document.getElementById("form-banner-btn");

        const orderForm = document.getElementById("OrderForm2");
        const resumeTimeLabel = document.getElementById("resume-time");
        const resumeOverlay = document.getElementById("resume-overlay");

        // guards
        if (!startBtn || !video || !overlay || !container || !closeBtn || !formPopup) return;

        /* ============================================================
           Helpers: show/hide small UI blocks
        ============================================================ */

        const hideBanner = (el) => {
            if (!el) return;
            el.removeAttribute("data-show");
            el.classList.add("opacity-0", "pointer-events-none");
            el.style.transform = "translateY(-110%)";
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
        };

        const hideBanners = () => {
            hideBanner(returnBanner);
            hideBanner(formBanner);
        };

        const formatMMSS = (sec) => {
            sec = Math.max(0, Math.floor(sec || 0));
            const m = Math.floor(sec / 60);
            const s = sec % 60;
            return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        };

        /* ============================================================
           3) Pause button inside fullscreen
        ============================================================ */

        const pauseBtn = document.createElement("button");
        pauseBtn.id = "video-pause-btn";
        pauseBtn.type = "button";
        pauseBtn.textContent = "⏸";

        Object.assign(pauseBtn.style, {
            position: "absolute",
            right: "12px",
            bottom: "12px",
            top: "auto",
            transform: "none",
            width: "48px",
            height: "48px",
            borderRadius: "9999px",
            border: "2px solid rgba(255,255,255,.6)",
            background: "rgba(0,0,0,.55)",
            color: "#fff",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "40000",
            cursor: "pointer",
            userSelect: "none",
        });

        pauseBtn.style.right = "max(12px, env(safe-area-inset-right))";
        pauseBtn.style.bottom = "max(12px, env(safe-area-inset-bottom))";
        container.appendChild(pauseBtn);

        const syncPauseIcon = () => {
            pauseBtn.textContent = video.paused ? "▶" : "⏸";
        };

        on(pauseBtn, "click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (video.paused) {
                video.muted = false;
                video.play().catch(() => { });
            } else {
                video.pause();
            }
            syncPauseIcon();
        });

        on(video, "play", syncPauseIcon);
        on(video, "pause", syncPauseIcon);
        syncPauseIcon();

        /* ============================================================
           4) Constants (as-is)
        ============================================================ */

        const isTest = new URLSearchParams(window.location.search).has("test");
        const POPUP_DELAY_MS = Number(isTest ? 500 : "1468000");
        const POPUP_SHOW_MS = 30000;
        const START_LABEL_IDLE = "CLICK PENTRU A CONTINUA SĂ VIZIONAȚI";
        const START_LABEL_INIT = "Urmăriți videoclipul acum. Faceți clic pentru a activa audio-ul!";

        const FORM_REVEAL_SECONDS = 600;
        const SAVE_PROGRESS_TTL_MS = 600000;
        const MIN_RESUME_SECONDS = 10;
        const RESUME_COOLDOWN_MS = 7200000;

        const videoKey = video.getAttribute("data-video-id") || video.currentSrc || video.src || "default";
        const LS_PROGRESS = `vodProgress:v2:${videoKey}`;
        const SS_RESUME_ASK = `vodResumeAsk:${videoKey}`;
        const LS_RESUME_COOLDOWN = `vodResumeCooldown:${videoKey}`;
        const LS_STARTED = `vodStarted:v1:${videoKey}`;

        const markStarted = () => { try { localStorage.setItem(LS_STARTED, "1"); } catch { } };
        const wasStarted = () => { try { return localStorage.getItem(LS_STARTED) === "1"; } catch { return false; } };

        /* ============================================================
           5) Start button label + “hand/pulse”
        ============================================================ */

        let activeStartEl = startBtn;
        let startLabelEl = null;
        let startHandEl = null;
        let startPulseEl = null;

        const resolveStartChildren = () => {
            startLabelEl = activeStartEl.querySelector("[data-start-label]") || activeStartEl;
            startHandEl = activeStartEl.querySelector("[data-start-hand]");
            startPulseEl = activeStartEl.querySelector("[data-start-pulse]");
        };
        resolveStartChildren();

        const setStartLabel = (txt) => {
            if (startLabelEl) startLabelEl.textContent = txt ?? "";
        };

        const showStartHandPulse = () => {
            [startHandEl, startPulseEl].forEach((el) => {
                if (!el) return;
                el.classList.remove("opacity-0", "invisible", "hidden");
                el.style.opacity = "1";
                el.style.pointerEvents = "auto";
            });
            activeStartEl.classList.add("animate-pulse-scale");
        };

        const hideStartHandPulse = () => {
            [startHandEl, startPulseEl].forEach((el) => {
                if (!el) return;
                el.classList.add("opacity-0");
                el.style.opacity = "0";
                el.style.pointerEvents = "none";
                setTimeout(() => { try { el.classList.add("hidden"); } catch { } }, 250);
            });
            activeStartEl.classList.remove("animate-pulse-scale");
        };

        setStartLabel(START_LABEL_INIT);
        showStartHandPulse();

        /* ============================================================
           6) Form popup show/hide (keep existing)
        ============================================================ */

        const showFormPopup = () => {
            formPopup.classList.remove("hidden", "opacity-0");
            formPopup.classList.add("opacity-100");
        };

        const hideFormPopup = () => {
            formPopup.classList.remove("opacity-100");
            formPopup.classList.add("opacity-0");
            setTimeout(() => formPopup.classList.add("hidden"), 300);
        };

        // Existing popup state machine
        let popupState = "idle";
        let waitMs = null;
        let showMs = null;
        let waitStart = null;
        let showStart = null;
        let waitTimer = null;
        let showTimer = null;

        const popupReset = () => {
            try { waitTimer && clearTimeout(waitTimer); } catch { }
            try { showTimer && clearTimeout(showTimer); } catch { }
            waitTimer = null;
            showTimer = null;
            waitStart = null;
            showStart = null;
            popupState = "idle";
            waitMs = null;
            showMs = null;
        };

        const popupSchedule = (delay) => {
            popupState = "waiting";
            waitMs = Math.max(0, delay);
            waitStart = performance.now();
            clearTimeout(waitTimer);

            waitTimer = setTimeout(() => {
                waitTimer = null;
                waitStart = null;

                showFormPopup();
                popupState = "shown";
                showMs = POPUP_SHOW_MS;
                showStart = performance.now();

                clearTimeout(showTimer);
                showTimer = setTimeout(() => {
                    showTimer = null;
                    showStart = null;
                    hideFormPopup();
                    popupState = "idle";
                }, showMs);
            }, waitMs);
        };

        const popupStart = () => {
            popupReset();
            hideFormPopup();
            popupState = "waiting";
            waitMs = POPUP_DELAY_MS;
            showMs = POPUP_SHOW_MS;
            popupSchedule(waitMs);
        };

        const popupPauseTimers = () => {
            const now = performance.now();

            if (popupState === "waiting" && waitStart != null) {
                const dt = Math.max(0, now - waitStart);
                waitMs = Math.max(0, (waitMs ?? 0) - dt);
                clearTimeout(waitTimer);
                waitTimer = null;
                waitStart = null;
            }

            if (popupState === "shown" && showStart != null) {
                const dt = Math.max(0, now - showStart);
                showMs = Math.max(0, (showMs ?? 0) - dt);
                clearTimeout(showTimer);
                showTimer = null;
                showStart = null;
            }
        };

        const popupResumeTimers = () => {
            if (!isFullscreen) return;

            if (popupState === "waiting" && waitTimer == null && waitMs != null) {
                popupSchedule(waitMs);
                return;
            }

            if (popupState === "shown" && showTimer == null && showMs != null) {
                showStart = performance.now();
                showTimer = setTimeout(() => {
                    showTimer = null;
                    showStart = null;
                    hideFormPopup();
                    popupState = "idle";
                }, showMs);
            }
        };

        /* ============================================================
           6.1) CTA intervals (from window.startN/window.durationN)
        ============================================================ */

        const readIntervalsFromWindow = () => {
            const out = [];
            for (let i = 1; i <= 50; i++) {
                const s = window[`start${i}`];
                const d = window[`duration${i}`];
                if (!Number.isFinite(Number(s)) || !Number.isFinite(Number(d))) continue;
                const start = Math.max(0, Number(s));
                const dur = Math.max(0, Number(d));
                if (dur <= 0) continue;
                out.push({ i, start, end: start + dur });
            }
            out.sort((a, b) => a.start - b.start);
            return out;
        };

        const ctaIntervals = readIntervalsFromWindow();
        const hasIntervals = ctaIntervals.length > 0;

        const chooseCtaTypeForInterval = (intervalIndex) => {
            if (ctaIntervals.length <= 1) return "cta2";
            const isLast = intervalIndex === ctaIntervals.length - 1;
            return isLast ? "cta2" : "cta1";
        };

        const makeCtaBtn = (id, text) => {
            const btn = document.createElement("button");
            btn.id = id;
            btn.type = "button";
            btn.textContent = text;

            Object.assign(btn.style, {
                position: "absolute",
                left: "50%",
                bottom: "16px",
                transform: "translateX(-50%)",
                width: "16rem",
                height: "16rem",
                maxWidth: "80vw",
                maxHeight: "80vw",
                borderRadius: "9999px",
                background: "rgb(253,224,71)",
                border: "4px solid rgb(220,38,38)",
                boxShadow: "rgba(0,0,0,0.25) 0px 10px 25px",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "18px",
                zIndex: "30000",
                textTransform: "uppercase",
                lineHeight: "1.2",
                fontWeight: "700",
                cursor: "pointer",
                userSelect: "none",
                whiteSpace: "pre-line",
            });

            return btn;
        };

        // Texts from DOM fallback
        const htmlCta1 = document.getElementById("cta1-btn");
        const htmlCta2 = document.getElementById("cta2-btn");
        const CTA1_TEXT = (htmlCta1?.textContent || "").trim() ||
            "Dacă sunteți gata să începeți tratamentul imediat, faceți clic pe buton.";
        const CTA2_TEXT = (htmlCta2?.textContent || "").trim() ||
            "În 14 minute, stocul Artronol va fi epuizat.\nFaceți clic pe buton pentru a plasa comanda la timp.";

        const cta1 = makeCtaBtn("cta1-btn", CTA1_TEXT);
        const cta2 = makeCtaBtn("cta2-btn", CTA2_TEXT);
        container.appendChild(cta1);
        container.appendChild(cta2);

        const hideCtas = () => {
            cta1.style.display = "none";
            cta2.style.display = "none";
        };

        const showCta = (type) => {
            if (!isFullscreen) return;
            if (type === "cta1") {
                cta2.style.display = "none";
                cta1.style.display = "flex";
            } else if (type === "cta2") {
                cta1.style.display = "none";
                cta2.style.display = "flex";
            } else {
                hideCtas();
            }
        };

        const getActiveIntervalIndex = (t) => {
            for (let idx = 0; idx < ctaIntervals.length; idx++) {
                const it = ctaIntervals[idx];
                if (t >= it.start && t <= it.end) return idx;
            }
            return -1;
        };

        let currentCtaMode = "none"; // "none" | "cta1" | "cta2"

        const syncCtaByVideoTime = () => {
            if (!isFullscreen || !hasIntervals) {
                if (currentCtaMode !== "none") {
                    currentCtaMode = "none";
                    hideCtas();
                }
                return;
            }

            const t = Number(video.currentTime || 0);
            const idx = getActiveIntervalIndex(t);
            if (idx === -1) {
                if (currentCtaMode !== "none") {
                    currentCtaMode = "none";
                    hideCtas();
                }
                return;
            }

            const desired = chooseCtaTypeForInterval(idx);
            if (desired !== currentCtaMode) {
                currentCtaMode = desired;
                showCta(desired);
            }
        };

        /* ============================================================
           7) Progress bar “smooth advance” (as-is)
        ============================================================ */

        const SHOW_FORM_PROGRESS_AT = 30;
        const EASE_T0 = 0.18;
        const EASE_T1 = 0.06;
        const STEP_T0 = 0.02;
        const STEP_T1 = 0.01;
        const EASE_SECONDS = 4;
        const EXTRA_BOOST = 6;

        let progressRaf = null;
        let progressStarted = false;
        let progressStartTs = null;
        let currentPct = 0;

        const ensureProgressCss = () => {
            if (!progressBar) return;
            Object.assign(progressBar.style, {
                position: "absolute",
                left: "0",
                right: "0",
                bottom: "0",
                height: "4px",
                background: "#dc2626",
                transition: "none",
            });
        };

        const setProgressPct = (pct) => {
            currentPct = Math.max(0, Math.min(100, pct));
            if (progressBar) progressBar.style.width = currentPct + "%";
        };

        const hasDuration = () => Number.isFinite(video?.duration) && video.duration > 0;
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        const computeTargetPct = () => {
            if (!hasDuration()) return currentPct;
            const base = (video.currentTime / video.duration) * 100;
            const dt = progressStartTs ? (performance.now() - progressStartTs) / 1000 : 0;
            const s = Math.min(Math.max(dt / EASE_SECONDS, 0), 1);
            const boost = (1 - easeOutCubic(s)) * EXTRA_BOOST;
            return base + boost;
        };

        const tickProgress = () => {
            const t = computeTargetPct();
            const passedThreshold = currentPct >= SHOW_FORM_PROGRESS_AT;

            const ease = passedThreshold ? EASE_T1 : EASE_T0;
            const step = passedThreshold ? STEP_T1 : STEP_T0;

            const next = t <= currentPct ? currentPct + step : currentPct + (t - currentPct) * ease;
            setProgressPct(next);

            progressRaf = requestAnimationFrame(tickProgress);
        };

        const progressStart = () => {
            if (progressStarted) return;
            ensureProgressCss();
            if (!progressStartTs) progressStartTs = performance.now();
            progressStarted = true;
            progressRaf = requestAnimationFrame(tickProgress);
        };

        const progressStop = () => {
            if (!progressStarted) return;
            if (progressRaf) cancelAnimationFrame(progressRaf);
            progressRaf = null;
            progressStarted = false;
        };

        const showProgress = () => {
            if (!progressBar) return;
            progressBar.classList.remove("hidden");
            progressBar.style.display = "block";
        };

        const hideProgress = () => {
            if (!progressBar) return;
            progressBar.classList.add("hidden");
            progressBar.style.display = "none";
        };

        /* ============================================================
           8) Form reveal timer by watched seconds (as-is)
        ============================================================ */

        let watchedSec = 0;
        let lastTickTime = null;
        let formRevealed = false;

        const tickWatch = () => {
            if (lastTickTime == null) return;
            const now = video.currentTime || 0;
            const delta = Math.max(0, now - lastTickTime);
            if (delta > 0) {
                watchedSec += delta;
                lastTickTime = now;
                maybeRevealForm();
            }
        };

        const watchStart = () => { lastTickTime = video.currentTime || 0; };
        const watchStop = () => { lastTickTime = null; };
        const watchReset = () => { watchedSec = 0; lastTickTime = null; };

        const maybeRevealForm = () => {
            if (formRevealed) return;
            if (watchedSec >= FORM_REVEAL_SECONDS) {
                formRevealed = true;
                orderForm?.classList.remove("hidden", "opacity-0", "translate-y-2");
            }
        };

        on(video, "timeupdate", tickWatch);
        on(video, "pause", tickWatch);
        on(video, "seeking", tickWatch);

        // CTA sync by video time
        on(video, "timeupdate", syncCtaByVideoTime);
        on(video, "seeking", syncCtaByVideoTime);

        /* ============================================================
           9) Save / Load resume progress (as-is)
        ============================================================ */

        const saveProgress = (sec) => {
            try {
                localStorage.setItem(
                    LS_PROGRESS,
                    JSON.stringify({ t: Math.floor(sec || 0), exp: Date.now() + SAVE_PROGRESS_TTL_MS })
                );
                sessionStorage.removeItem(SS_RESUME_ASK);
            } catch { }
        };

        const loadProgress = () => {
            try {
                const raw = localStorage.getItem(LS_PROGRESS);
                if (!raw) return null;
                const data = JSON.parse(raw);
                if (!data || typeof data.t !== "number" || typeof data.exp !== "number") return null;
                if (Date.now() > data.exp) {
                    localStorage.removeItem(LS_PROGRESS);
                    return null;
                }
                return data.t;
            } catch {
                return null;
            }
        };

        const clearProgress = () => { try { localStorage.removeItem(LS_PROGRESS); } catch { } };

        /* ============================================================
           10) Cooldown resume ask (as-is)
        ============================================================ */

        const getCooldownUntil = () => {
            try {
                const raw = localStorage.getItem(LS_RESUME_COOLDOWN);
                if (!raw) return 0;
                const obj = JSON.parse(raw);
                return Number(obj?.until) || 0;
            } catch {
                return 0;
            }
        };

        const setCooldown = () => {
            try {
                localStorage.setItem(LS_RESUME_COOLDOWN, JSON.stringify({ until: Date.now() + RESUME_COOLDOWN_MS }));
            } catch { }
        };

        /* ============================================================
           11) Timers in form (as-is)
        ============================================================ */

        function makeTimer(el, fallback = "07:00") {
            if (!el) return null;

            let interval = null;
            let startVal = 0;
            let left = 0;

            const parseStart = () => {
                const raw = (el.dataset.start || el.textContent || fallback).trim();
                const m = raw.match(/^(\d{1,2}):(\d{2})$/);
                if (m) return Math.max(0, parseInt(m[1], 10) * 60 + parseInt(m[2], 10));
                const n = Number(raw);
                return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
            };

            const render = (sec) =>
                `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

            const reset = () => {
                startVal = parseStart();
                left = startVal;
                el.textContent = render(left);
            };

            const stop = () => {
                if (interval) clearInterval(interval);
                interval = null;
            };

            const start = () => {
                stop();
                if (!startVal) reset();
                interval = setInterval(() => {
                    left = Math.max(0, left - 1);
                    el.textContent = render(left);
                    if (left === 0) stop();
                }, 1000);
            };

            reset();
            return { start, stop, reset };
        }

        const timer1 = makeTimer(document.getElementById("timer"), "07:00");
        const timer2 = makeTimer(document.getElementById("timer2"), "07:00");
        const timer3 = makeTimer(document.getElementById("timer3"), "07:00");

        const startFormTimers = () => {
            timer1?.reset(); timer1?.start();
            timer2?.reset(); timer2?.start();
            timer3?.reset(); timer3?.start();

            if (window.__dealTimer) {
                window.__dealTimer.reset?.();
                window.__dealTimer.start?.();
            } else {
                window.__startDealTimer?.();
            }
        };

        const stopFormTimers = () => {
            timer1?.stop();
            timer2?.stop();
            timer3?.stop();
            window.__dealTimer?.stop?.();
        };

        /* ============================================================
           12) Show order form (as-is)
        ============================================================ */

        function showForm({ scroll = true } = {}) {
            if (!orderForm) return;

            orderForm.classList.remove("hidden", "opacity-0", "translate-y-2");
            startFormTimers();

            if (scroll) {
                requestAnimationFrame(() => {
                    try {
                        orderForm.scrollIntoView({ behavior: "smooth", block: "start" });
                    } catch {
                        const top = window.pageYOffset + orderForm.getBoundingClientRect().top - 80;
                        window.scrollTo({ top, behavior: "smooth" });
                    }
                });
            }
        }

        /* ============================================================
           13) FULLSCREEN enter/exit + close button logic
        ============================================================ */

        let isFullscreen = false;
        let resumeAskShown = false;
        let resumeTime = null;
        let firstStart = true;

        async function enterFullscreen() {
            showVideoBlock();
            markStarted();

            // UI: hide modals / start button etc
            hideResumeModal();
            hideStartButton();
            showProgress();
            hideStartHandPulse();

            isFullscreen = true;
            pauseBtn.style.display = "flex";
            container.classList.remove("hidden");
            overlay.classList.add("opacity-0", "pointer-events-none");
            container.classList.add("video-fullscreen");
            progressStart();
            hideBanners();
            watchStart();

            // start formPopup timing (existing logic)
            popupStart();

            // CTA: start hidden; will appear when currentTime enters interval
            currentCtaMode = "none";
            hideCtas();
            syncCtaByVideoTime();

            // jump to resume if needed
            if (firstStart) {
                const t = resumeTime ?? 0;
                try { video.currentTime = Math.max(0, t); } catch { }
                try { video.muted = false; } catch { }
                try { video.volume = 1; } catch { }
                try { await video.play(); } catch { }
                firstStart = false;
            } else {
                try { video.muted = false; } catch { }
                try { video.volume = 1; } catch { }
                try { await video.play(); } catch { }
            }

            closeBtn.classList.remove("hidden");
        }

        function exitFullscreen() {
            tickWatch();
            isFullscreen = false;

            hideProgress();
            showStartButton();
            pauseBtn.style.display = "none";
            container.classList.remove("video-fullscreen");
            overlay.classList.remove("opacity-0", "pointer-events-none");
            closeBtn.classList.add("hidden");

            progressStop();
            watchStop();

            // reset popups / ctas
            popupReset();
            hideFormPopup();
            hideCtas();
            currentCtaMode = "none";

            setStartLabel(START_LABEL_IDLE);
            hideStartHandPulse();
            showResumeModal();
            hideBanners();

            showVideoBlock();
        }
        // helper: hide/show video container in page flow
        function hideVideoBlock() {
            if (!container) return;
            if (!container.dataset.prevDisplay) {
                container.dataset.prevDisplay = container.style.display || "";
            }
            container.style.display = "none";        // <- главное
        }

        function showVideoBlock() {
            if (!container) return;
            container.style.display = container.dataset.prevDisplay || "";
            delete container.dataset.prevDisplay;
        }
        // ✅ PATCH: exit to form (NO resume modal)
        function exitToForm() {
            try { tickWatch(); } catch { }
            try { video.pause(); } catch { }

            isFullscreen = false;

            hideProgress();
            pauseBtn.style.display = "none";
            closeBtn.classList.add("hidden");
            container.classList.remove("video-fullscreen");

            overlay.classList.add("opacity-0", "pointer-events-none");
            if (resumeModal) {
                resumeModal.classList.add("hidden");
                resumeModal.classList.remove("opacity-100");
            }

            popupReset();
            hideFormPopup();
            hideCtas();
            currentCtaMode = "none";

            progressStop();
            watchStop();

            // ✅ ВОТ ЭТО — чтобы сверху не оставалось видео/пустого контейнера
            hideVideoBlock();
        }

        function scrollToVideo() {
            requestAnimationFrame(() => {
                try {
                    const top = window.pageYOffset + container.getBoundingClientRect().top - 80;
                    window.scrollTo({ top, behavior: "smooth" });
                } catch {
                    container.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        }

        on(closeBtn, "click", (e) => {
            e.preventDefault();
            exitFullscreen();
            scrollToVideo();
        });

        /* ============================================================
           14) Resume overlay (as-is)
        ============================================================ */

        const showResumeOverlay = (sec) => {
            if (!resumeOverlay) return;
            if (resumeTimeLabel) resumeTimeLabel.textContent = formatMMSS(sec);
            resumeOverlay.classList.remove("hidden");
            resumeOverlay.classList.add("flex");
        };

        const hideResumeOverlay = () => {
            if (!resumeOverlay) return;
            resumeOverlay.classList.add("hidden");
            resumeOverlay.classList.remove("flex");
        };

        const shouldAskResume = ({ ignoreCooldown = false } = {}) => {
            if (!wasStarted()) return false;
            if (isFullscreen) return false;
            if (resumeAskShown) return false;
            if (sessionStorage.getItem(SS_RESUME_ASK)) return false;

            if (!ignoreCooldown) {
                const until = getCooldownUntil();
                if (Date.now() < until) return false;
            }

            const t = loadProgress();
            if (t && t >= MIN_RESUME_SECONDS) {
                resumeTime = t;
                resumeAskShown = true;
                showResumeOverlay(t);
                return true;
            }
            return false;
        };

        /* ============================================================
           15) Resume modal show/hide (as-is)
        ============================================================ */

        function showResumeModal() {
            if (!resumeModal) return;
            overlay.classList.remove("opacity-0", "pointer-events-none");
            resumeModal.classList.remove("hidden");
            resumeModal.classList.add("opacity-100");
        }

        function hideResumeModal() {
            if (!resumeModal) return;
            resumeModal.classList.add("hidden");
            resumeModal.classList.remove("opacity-100");
        }

        /* ============================================================
           16) Start button show/hide (as-is)
        ============================================================ */

        function hideStartButton() {
            activeStartEl?.classList.add("hidden");
            if (activeStartEl) activeStartEl.style.display = "none";
        }
        function showStartButton() {
            activeStartEl?.classList.remove("hidden");
            if (activeStartEl) activeStartEl.style.display = "";
        }

        /* ============================================================
           17) Events: visibility / pageshow / pause/play sync
        ============================================================ */

        let lastSaveTs = 0;
        const saveProgressThrottled = () => {
            if (!wasStarted()) return;
            const now = Date.now();
            if (now - lastSaveTs >= 3000) {
                saveProgress(video.currentTime || 0);
                lastSaveTs = now;
            }
        };

        on(video, "timeupdate", () => {
            if (!isFullscreen) return;
            saveProgressThrottled();
        });

        on(document, "visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                saveProgressThrottled();
                popupPauseTimers();
            } else {
                popupResumeTimers();
                syncCtaByVideoTime();
            }
        });

        on(window, "pagehide", () => {
            saveProgressThrottled();
            popupPauseTimers();
        }, { capture: true });

        on(window, "beforeunload", saveProgressThrottled);

        on(video, "pause", () => {
            if (isFullscreen) {
                progressStop();
                popupPauseTimers();
                hideCtas();
                currentCtaMode = "none";
            }
        });

        on(video, "play", () => {
            if (isFullscreen) {
                progressStart();
                popupResumeTimers();
                syncCtaByVideoTime();
            }
        });

        /* ============================================================
           18) Start click logic (as-is)
        ============================================================ */

        on(activeStartEl, "click", (e) => {
            if (shouldAskResume({ ignoreCooldown: true })) {
                e.preventDefault();
                return;
            }
            hideResumeOverlay();
            enterFullscreen();
        });

        /* ============================================================
           19) Resume overlay buttons (as-is)
        ============================================================ */

        const resumeContinue = () => {
            sessionStorage.setItem(SS_RESUME_ASK, "1");
            setCooldown();
            resumeTime = Math.max(0, resumeTime || loadProgress() || 0);
            watchReset();
            hideResumeOverlay();
            enterFullscreen();
        };

        const resumeRestart = () => {
            sessionStorage.setItem(SS_RESUME_ASK, "1");
            setCooldown();
            clearProgress();
            resumeTime = 0;
            watchReset();
            hideBanners();
            hideResumeOverlay();
            enterFullscreen();
        };

        on(continueModalBtn, "click", (e) => { e.preventDefault(); resumeContinue(); });
        on(resumeContinueBtn, "click", (e) => { e.preventDefault(); resumeContinue(); });

        on(restartModalBtn, "click", (e) => { e.preventDefault(); resumeRestart(); });
        on(resumeRestartBtn, "click", (e) => { e.preventDefault(); resumeRestart(); });

        /* ============================================================
           20) CTA click => exit fullscreen UI + show form  ✅ PATCHED
        ============================================================ */

        const onCtaClick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            exitToForm();
            showForm({ scroll: true });
        };
        on(cta1, "click", onCtaClick);
        on(cta2, "click", onCtaClick);

        /* ============================================================
           20.1) formPopup click => exit fullscreen UI + show form ✅ PATCHED
        ============================================================ */

        on(formPopup, "click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            exitToForm();
            showForm({ scroll: true });
        });

        /* ============================================================
           21) Ended => exit + show form (as-is)
        ============================================================ */
        on(video, "ended", () => {
            setProgressPct(100);
            clearProgress();
            watchReset();
          
            exitToForm();           // ✅ без resume modal + прячет видео
            showForm({ scroll: true });
          });

        /* ============================================================
           22) Try resume ask on pageshow/metadata (as-is)
        ============================================================ */
        on(window, "pageshow", () => { shouldAskResume({ ignoreCooldown: true }); });
        on(video, "loadedmetadata", () => { shouldAskResume({ ignoreCooldown: true }); });

        /* ============================================================
           23) keep popup mode class sync with fullscreen (as-is)
        ============================================================ */
        const syncPopupModeClass = () => {
            if (container.classList.contains("video-fullscreen")) {
                formPopup.classList.remove("minimized-popup");
                formPopup.classList.add("fullscreen-popup");
            } else {
                formPopup.classList.remove("fullscreen-popup");
                formPopup.classList.add("minimized-popup");
            }
        };

        const mo = new MutationObserver((muts) => {
            if (muts.some((m) => m.attributeName === "class")) syncPopupModeClass();
        });
        mo.observe(container, { attributes: true, attributeFilter: ["class"] });
        cleanup(() => mo.disconnect());
        syncPopupModeClass();
    }

    const boot = () => requestAnimationFrame(initOverlay);

    document.addEventListener("DOMContentLoaded", boot);
    document.addEventListener("astro:page-load", boot);
    document.addEventListener("astro:after-swap", boot);
})();