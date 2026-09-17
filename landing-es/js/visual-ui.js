(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var heroVideo = document.querySelector('.hero-video');
    var heroVideoPlayer = document.querySelector('.video');
    var modal = document.querySelector('.video-modal');
    var modalVideo = document.querySelector('.video-modal__player');
    var closeButton = document.querySelector('.video-modal__close');
    var closeImg = closeButton && closeButton.querySelector('img');
    var progressBar = document.querySelector('#video-progress-bar');
    var popup = document.querySelector('.video-cta-popup[data-popup="order"]');
    var orderAnchor = document.querySelector('#order');
    var offerBlock = document.querySelector('#offer-timer');
    var offerWhite = document.querySelector('.offer-white');
    var productBlocks = document.querySelectorAll('.product-block');
    var featuresBlocks = document.querySelectorAll('.features-block');
    var formTimer = document.querySelector('#timer');
    var offerTimerCount = document.querySelector('.offer-timer__count');

    if (!heroVideo || !heroVideoPlayer || !modal || !modalVideo || !closeButton) return;

    var popupStart = (typeof window.start1 === 'number') ? window.start1 : (10 * 60 + 5);
    var popupDuration = (typeof window.duration1 === 'number') ? window.duration1 : 51;
    var formShown = false;
    var timerStarted = false;

    function trackViewContent() {
      if (typeof window.fbq !== 'function') return;
      try { window.fbq('track', 'ViewContent'); } catch (e) {}
    }

    function setPopupVisible(visible) {
      if (!popup || formShown) return;
      popup.classList.toggle('is-visible', visible);
      popup.setAttribute('aria-hidden', visible ? 'false' : 'true');
    }

    function hidePopup() {
      if (!popup) return;
      popup.classList.remove('is-visible');
      popup.setAttribute('aria-hidden', 'true');
    }

    function currentPlaybackTime() {
      if (modal.classList.contains('is-open')) return modalVideo.currentTime || 0;
      return heroVideoPlayer.currentTime || 0;
    }

    function updatePopup() {
      if (formShown) return hidePopup();
      var t = currentPlaybackTime();
      setPopupVisible(t >= popupStart && t <= popupStart + popupDuration);
    }

    function updateProgress() {
      if (!progressBar || !modalVideo.duration) return;
      var duration = modalVideo.duration;
      var current = modalVideo.currentTime;
      var accelSeconds = 30;
      var percent = 0;

      if (duration <= accelSeconds) {
        percent = (current / duration) * 100;
      } else if (current <= accelSeconds) {
        percent = (current / accelSeconds) * 50;
      } else {
        var remaining = duration - accelSeconds;
        var after = Math.min(current - accelSeconds, remaining);
        percent = 50 + (after / remaining) * 50;
      }

      progressBar.style.width = Math.max(0, Math.min(100, percent)) + '%';
    }

    function playHeroWithSound() {
      heroVideoPlayer.muted = false;
      heroVideoPlayer.play().catch(function () {
        heroVideoPlayer.muted = true;
        heroVideoPlayer.play().catch(function () {});
      });
    }

    function openModal() {
      trackViewContent();
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('video-modal-open');

      modalVideo.muted = false;
      modalVideo.currentTime = heroVideoPlayer.currentTime || 0;
      heroVideoPlayer.pause();
      if (progressBar) progressBar.style.width = '0%';
      modalVideo.play().catch(function () {});
      updateProgress();
      updatePopup();
    }

    function closeModal(resumeHero) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('video-modal-open');

      modalVideo.pause();
      modalVideo.muted = true;
      heroVideoPlayer.currentTime = modalVideo.currentTime || heroVideoPlayer.currentTime || 0;

      if (resumeHero) {
        playHeroWithSound();
        var currentButton = heroVideo.querySelector('.video-cta');
        if (currentButton) {
          currentButton.innerHTML = '<span class="cta-ring" aria-hidden="true"></span><span class="cta-inner"><span class="cta-text">Haz clic<br>para continuar</span></span>';
          currentButton.setAttribute('aria-label', 'Continuar vídeo');
        }
      } else {
        heroVideoPlayer.pause();
        heroVideoPlayer.muted = true;
      }

      hidePopup();
    }

    function startFallbackTimer() {
      if (timerStarted || (!formTimer && !offerTimerCount)) return;
      timerStarted = true;
      var sourceTimer = formTimer || offerTimerCount;
      var text = (sourceTimer.textContent || '08:10').trim();
      var parts = text.split(':');
      var total = ((parseInt(parts[0], 10) || 8) * 60) + (parseInt(parts[1], 10) || 10);
      setInterval(function () {
        total = Math.max(0, total - 1);
        var m = Math.floor(total / 60);
        var s = total % 60;
        var value = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
        if (formTimer) formTimer.textContent = value;
        if (offerTimerCount) offerTimerCount.textContent = value;
      }, 1000);
    }

    function showOfferBlocks() {
      var blocks = [offerBlock, offerWhite].filter(Boolean);
      productBlocks.forEach(function (block) { blocks.push(block); });
      featuresBlocks.forEach(function (block) { blocks.push(block); });
      blocks.forEach(function (block) {
        block.classList.add('is-visible');
        block.setAttribute('aria-hidden', 'false');
        block.style.display = 'block';
      });
    }

    function hideHero() {
      var heroSection = document.querySelector('.screen-hero');
      var heroTitle = document.querySelector('.hero-title');
      if (heroSection) heroSection.classList.add('is-hidden');
      if (heroVideo) heroVideo.classList.add('is-hidden');
      if (heroTitle) heroTitle.classList.add('is-hidden');
    }

    function showFormNow() {
      if (formShown) return;
      formShown = true;
      hidePopup();
      if (modal.classList.contains('is-open')) closeModal(false);
      modalVideo.pause();
      heroVideoPlayer.pause();
      hideHero();
      showOfferBlocks();
      startFallbackTimer();
      if (orderAnchor) {
        setTimeout(function () {
          orderAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }

    document.addEventListener('click', function (event) {
      var target = event.target.closest('.video-cta');
      if (!target) return;
      event.preventDefault();
      openModal();
    });

    closeButton.addEventListener('click', function () { closeModal(true); });

    if (closeImg) {
      closeImg.addEventListener('error', function () {
        closeButton.classList.add('is-fallback');
        closeImg.style.display = 'none';
      });
    }

    if (popup) {
      popup.addEventListener('click', showFormNow);
    }

    modalVideo.addEventListener('timeupdate', function () {
      updateProgress();
      updatePopup();
    });
    heroVideoPlayer.addEventListener('timeupdate', updatePopup);

    modalVideo.addEventListener('ended', showFormNow);
    heroVideoPlayer.addEventListener('ended', showFormNow);
  });
})();
