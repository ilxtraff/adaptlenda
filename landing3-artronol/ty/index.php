<?php
// Подхватываем данные из POST (если юзер редактировал) или из GET (редирект с лендинга)
$name = $_POST['name'] ?? $_GET['name'] ?? '';
$phone = $_POST['phone'] ?? $_GET['phone'] ?? '';
$pixel = $_POST['pixel'] ?? $_GET['pixel'] ?? '';
$utm_source = $_POST['utm_source'] ?? $_GET['utm_source'] ?? '';
$country = $_POST['country'] ?? $_GET['country'] ?? '';

$subid = $_POST['subid'] ?? $_GET['subid'] ?? '';
$clickid = $_POST['clickid'] ?? $_GET['clickid'] ?? '';
?>

<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Thank you</title>
	<link rel="stylesheet" href="success.css">

	<!-- Экспортируем PHP-переменные в JavaScript -->
	<script>
		window.landingData = {
			name: <?= json_encode($name) ?>,
			phone: <?= json_encode($phone) ?>,
			pixel: <?= json_encode($pixel) ?>,
			utm_source: <?= json_encode($utm_source) ?>,
			country: <?= json_encode($country) ?>,

			subid: <?= json_encode($subid) ?>,
			clickid: <?= json_encode($clickid) ?>,
			event_id: <?= json_encode($subid) ?>
		};

		const country = window.landingData.country;
	</script>

	<!-- Facebook Pixel Code -->
	<script>
		!function (f, b, e, v, n, t, s) {
			if (f.fbq) return; n = f.fbq = function () {
				n.callMethod ?
				n.callMethod.apply(n, arguments) : n.queue.push(arguments)
			}; if (!f._fbq) f._fbq = n;
			n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
			t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
		}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

		if (window.landingData.pixel) {
			fbq('init', window.landingData.pixel);
			var _eid = window.landingData.event_id || window.landingData.subid || undefined;
			if (_eid) {
				fbq('track', 'Lead', {}, { eventID: _eid });
			} else {
				fbq('track', 'Lead');
			}
		}
	</script>
	<!-- End Facebook Pixel Code -->
	<?php if (!empty($pixel) && preg_match('/^\d+$/', $pixel)): ?>
		<noscript>
			<img height="1" width="1" style="display:none"
				src="https://www.facebook.com/tr?id=<?= htmlspecialchars($pixel) ?>&ev=Lead&noscript=1" />
		</noscript>
	<?php endif; ?>
	<style>
		#closes {
			width: 172px;
			margin: 0 auto;
			text-align: center;
			padding: 11px 0 12px 0;
			background-image: url('bg_btn.png');
			margin-bottom: 10px;
			border-radius: 15px;
			background-repeat: no-repeat;
			color: white;
			font-size: 20px;
			font-weight: bold;
		}
		#closes:hover {
			cursor: pointer;
		}
		#title_text {
			font-size: 20px;
		}
		@media screen and (max-width: 500px) {
			.button { margin-top: 0 !important; }
			.email input { width: 100% !important; }
			.header__title h3 { font-size: 20px !important; }
			#title_text { font-size: 16px !important; }
			.user-info__item { font-size: 14px !important; }
			.user-info_block { flex-direction: column !important; }
		}
		.cards span {
			font-size: 0.7em;
			bottom: 5px;
		}
	</style>

</head>

<body>

	<div class="page-wrapper">
		<div class="main">
			<div class="header">



			</div>
			<div class="user_text">
				<div class="user_text_content" id="subtitle"></div>
			</div>
			<form method="post">
				<div class="user-info">
					<div class="user-info_block">
						<div>
							<div class="user-info__item">
								<p class="icon_svg_p">
									<span id="name"></span> <span class="user-info__name"></span>
								</p>
							</div>
							<div class="user-info__item">
								<span id="phone"></span> <span class="user-info__phone"></span></p>
							</div>
						</div>
						<div class="user-info__item button">
							<p><span id="edit" class="edit">Edit</span></p>
						</div>
					</div>

				</div>
				<span class="user-info__email"></span>
				<input type="hidden" name="edit" value="1">
				<?php
				// foreach ($_POST as $key => $value) {
				// 	if (!in_array($key, array('name', 'phone')))
				// 		echo "<input type=\"hidden\" name=\"$key\" value=\"$value\">\n";
				// }
				echo '<input type="hidden" name="name"  value="' . htmlspecialchars($name) . '">';
				echo '<input type="hidden" name="phone" value="' . htmlspecialchars($phone) . '">';
				$params = ['pixel', 'utm_source'];
				foreach ($params as $key) {
					$val = $$key;
					echo '<input type="hidden" name="' . $key . '" value="' . htmlspecialchars($val) . '">' . "\n";
				}
				?>
			</form>


			<div class="order-steps">
				<div class="order-steps__item">
					<div class="order-steps__img">
						<img src="img/tp-step-1.png" alt="">
					</div>
					<div class="order-steps__title">
						<p id="step1">Check your contact details</p>
					</div>
				</div>
				<div class="order-steps__item">
					<div class="order-steps__img">
						<img src="img/tp-step-2.png" alt="">
					</div>
					<div class="order-steps__title">
						<p id="step2">Call may come from unknown number</p>
					</div>
				</div>
				<div class="order-steps__item">
					<div class="order-steps__img">
						<img src="img/tp-step-3.png" alt="">
					</div>
					<div class="order-steps__title">
						<p id="step3">Payment on delivery</p>
					</div>
				</div>
			</div>




			<?php if (empty($_POST['email'])) { ?>
				<div class="email">
					<h3 id="email_header">Unique offer!</h3>
					<p id="email_text">Get your personal list of treatment recommendations right now!<br />To do this, leave
						your <b>e-mail</b> in the form below.</p>
					<div><input id="email" name="email" type="email" placeholder="email@mail.com" /><span
							id="get">Get</span></div>
				</div>
			<?php } ?>

			<div class="reviews"></div>

		</div>
	</div>

	<script src="default-js/jquery.min.js"></script>
	<script src="translations.js"></script>
	<script>
		$(document).ready(function () {

			$('img').each(function () {
				if ($(this).attr('alt')) {
					$(this).parent().append('<span>' + $(this).attr('alt') + '</span>');
				}
			});


			let text = getTranslated(country)
			let keys = ['#title', '#subtitle', '#name', '#phone', '#step1', '#step2', '#step3', '#edit', '#email_header', '#email_text', '#get']
			for (i = 0; i < text.length; ++i) {
				$(keys[i]).html(text[i])
			}
			$('.user-info__name').html(window.landingData.name);
			$('.user-info__phone').html(window.landingData.phone);
			let names = text[11].split(',')
			let msg = text.slice(12)
			var lang = document.documentElement.lang ?? 'default';
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			for (i = 0; i < 3; ++i) {
				let cname = names[Math.floor(Math.random() * (names.length - 1))]
				let cmsg = msg[Math.floor(Math.random() * (msg.length - 1))]
				let ccolor = Math.floor(Math.random() * 5)
				let date = new Date();
				date.setDate(date.getDate() - (i > 1 ? 1 : 0));
				date = date.toLocaleDateString(lang, options)
				let c = `<div class="reviews__item">
	<div class="reviews__avatar">
		<div class="avatar-circle bg-color-`+ ccolor + `">
			<span class="symbol">`+ cname.charAt(0) + `</span>
		</div>
	</div>
	<div class="reviews__body">
		<div class="reviews__info">
			<span class="reviews__name">`+ cname + `</span>
			<div class="reviews__stars"></div>
			<span class="reviews__date"><span>`+ date + `</span></span>
		</div>
		<div class="reviews__text">
			<p>`+ cmsg + `</p>
		</div>
	</div>
</div>`
				$('.reviews').append(c)
			}
			$('#get').click(function (e) {
				if ($('#email').val()) {
					$('.user-info__name').html('<input name="name" value="' + window.landingData.name + '">')
					$('.user-info__phone').html('<input name="phone" value="' + window.landingData.phone + '">')
					$('.user-info__email').html('<input name="email" type="hidden" value="' + $('#email').val() + '">')
					$('form').submit()
				}
			});
			$('#edit').click(function (e) {
				e.preventDefault()
				$('.user-info__name').html('<input name="name" value="' + window.landingData.name + '">')
				$('.user-info__phone').html('<input name="phone" value="' + window.landingData.phone + '">')
				$('#edit').off('click').on('click', function (e) {
					if ($('.user-info__phone input').val() != window.landingData.phone) {
						$('form').submit()
					}
				});
			});
		})
	</script>
</body>