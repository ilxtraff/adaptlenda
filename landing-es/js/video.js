$(document).ready(function () {
	window.addEventListener('contextmenu', (event) => { event.preventDefault() });
  
	let showPlay = true;
	let popupsScheduled = false; // чтобы не дублировать планирование
  
	const $video            = $('#video');
	const $container        = $('#container_video');
	const $popup            = $('#popup');
	const $play             = $('#play');
	const $open             = $('#open-video');
	const $close            = $('#close');
	const $order            = $('#order');      // как у тебя в showOrder
	const $title            = $popup.find('.popup-title');
	const titleTpl          = $title.data('pattern') || $title.text();
  
	// ====== КВИЗ (оставил как было) ======
	function toggleQuiz(showTime, hideTime) {
	  setTimeout(() => {
		$('#quiz').css({ display: 'block' });
		$('.quiz__label').off('click').click(() => {
		  $('.quiz__label').css({ 'pointer-events': 'none' });
		});
	  }, showTime);
  
	  setTimeout(() => {
		$('#quiz').css({ display: 'none' });
		$('input').prop('checked', false);
		$('.quiz__label').css({ 'pointer-events': 'auto' });
	  }, hideTime);
	}
  
	const intervals = [
	  { show: 105000, hide: 116000 },
	  { show: 125000, hide: 135000 },
	  { show: 143000, hide: 153000 },
	  { show: 158000, hide: 169000 },
	  { show: 175000, hide: 185000 },
	  { show: 190000, hide: 202000 }
	];
  

	const popupSteps = [
		{ start: start1, duration: duration1, left: 37 }
	];
  
	function applyPopup(step) {
	  $title.text(titleTpl.replace('{left}', step.left));
	}
  
	function schedulePopups() {
	  if (popupsScheduled) return;
	  popupsScheduled = true;
  
	  popupSteps.forEach((step) => {
		// показать
		setTimeout(() => {
		  if (!showPlay) {
			applyPopup(step);
			$popup.fadeIn('fast');
		  }
		}, step.start * 1000);
  
		// скрыть
		setTimeout(() => {
		  $popup.fadeOut('fast');
		}, (step.start + step.duration) * 1000);
	  });
	}
  
	// ====== КНОПКИ/СОБЫТИЯ ======
	document.getElementById('play').addEventListener('click', () => {
	  window.scrollTo(0, 0);
	  $('#play').fadeOut('fast', function () {
		$('#video').prop('muted', false).prop('currentTime', 0).trigger('play');
		$('#container_video').addClass('fullscreen');
		$('body').addClass('noscroll');
		$('#close').fadeIn();
		showPlay = false;
  
		// квизы по таймерам
		intervals.forEach(interval => toggleQuiz(interval.show, interval.hide));
  
		// попапы по таймерам
		schedulePopups();
	  });
	});
  
	document.getElementById('open-video').addEventListener('click', () => {
	  window.scrollTo(0, 0);
	  $('#open-video').fadeOut('fast', function () {
		// без автозапуска звука
		$('#container_video').addClass('fullscreen');
		$('body').addClass('noscroll');
		$('#close').fadeIn();
		showPlay = false;
  
		// квизы и попапы все равно планируем
		intervals.forEach(interval => toggleQuiz(interval.show, interval.hide));
		schedulePopups();
	  });
	});
  
	// если хочешь дополнительно реагировать на окончание видео
	$('#video').on('ended', showOrder);
  
	// клик по попапу ведет к заказу
	$('#popup').on('click', showOrder);
  
	$('#close').on('click', function () {
	  $(this).hide();
	  $container.removeClass('fullscreen');
	  $('body').removeClass('noscroll');
	  $open.fadeIn('fast');
	  $popup.fadeOut('fast');
	});
  
	function showOrder() {
	  $container.removeClass('fullscreen');
	  $('#live').addClass('dop_info'); // оставил как в твоём коде
	  $('body').removeClass('noscroll');
	  $popup.fadeOut();
	  $close.fadeOut();
	  $video.fadeOut('fast', function () {
		$(this).trigger('pause');
		$order.fadeIn('fast', function () {
		  $('html, body').animate({ scrollTop: $order.offset().top - 20 }, 200);
		  if (window.startLeadTimer) window.startLeadTimer();
		});
	  });
	}
  });