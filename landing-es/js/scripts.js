$(function () {

	let timerStarted = false;
	let timerIntervalId = null;
	// =========================
	// helpers
	// =========================
	const getHtmlLang = () => (document.documentElement.lang || "").trim();

	const getLocale = () => {
		const htmlLang = (document.documentElement.lang || "").trim();

		if (!htmlLang) return undefined;

		const lower = htmlLang.toLowerCase();

		// Филиппины: Safari/браузеры иногда лучше понимают tl-PH
		if (lower === "fil-ph" || lower === "fil") return "tl-PH";

		return htmlLang;
	};

	const getLangCountry = () => {
		const htmlLang = getHtmlLang();
		const parts = htmlLang.split("-").filter(Boolean);
		return {
			lang: (parts[0] || "ph").toLowerCase(),
			country: (parts[1] || "").toUpperCase(),
		};
	};

	const pad2 = (n) => String(n).padStart(2, "0");

	// =========================
	// timer
	// =========================
	function startTimer() {
		if (timerStarted) return;
		timerStarted = true;

		const timerEl = $("#timer");
		const minEl = $("#min");
		const secEl = $("#sec");

		if (!timerEl.length) return;

		const [mFromTimer, sFromTimer] = (timerEl.html() || "").split(":");

		const startMinute = Number(minEl.html() ?? mFromTimer ?? 10) || 10;
		const startSecond = Number(secEl.html() ?? sFromTimer ?? 60) || 60;

		let minute = startMinute;
		let second = startSecond;

		if (second >= 60) second = 60;

		// сразу отрисуем старт
		const pad2 = (n) => String(n).padStart(2, "0");
		timerEl.html(`${pad2(minute)}:${pad2(second === 60 ? 0 : second)}`);

		timerIntervalId = setInterval(() => {
			if (second <= 1) {
				second = 60;
				if (minute <= 1) minute = startMinute;
				minute -= 1;
				minEl.html(pad2(minute));
			}

			second -= 1;
			secEl.html(pad2(second));
			timerEl.html(`${pad2(minute)}:${pad2(second)}`);
		}, 1000);
	}

	// чтобы можно было вызвать из другого файла/скрипта
	window.startLeadTimer = startTimer;

	// =========================
	// dateChange (+ js-current-date)
	// =========================
	(function initDates() {
		const pad2 = (n) => String(n).padStart(2, "0");

		const locale = getLocale(); // <-- используем твою функцию выше

		const formatDMY = (date) => {
			const dd = pad2(date.getDate());
			const mm = pad2(date.getMonth() + 1);
			const yyyy = date.getFullYear();

			// pt-PT обычно dd/MM/yyyy
			const useSlash =
				typeof locale === "string" && locale.toLowerCase().startsWith("pt");

			const sep = useSlash ? "/" : ".";
			return `${dd}${sep}${mm}${sep}${yyyy}`;
		};

		// date1/date2
		const d1 = new Date();
		d1.setDate(d1.getDate() - 6);
		$(".date1").html(formatDMY(d1));

		const d2 = new Date();
		$(".date2").html(formatDMY(d2));

		// js-current-date
		$(".js-current-date").html(formatDMY(new Date()));

		// [daysago]
		$("[daysago]").each(function () {
			const days = Number($(this).attr("daysago")) || 0;
			const d = new Date();
			d.setDate(d.getDate() - days);
			$(this).html(formatDMY(d));
		});

		// [d]
		$("[d]").each(function () {
			const delta = Number($(this).attr("d")) || 0;
			const d = new Date();
			d.setDate(d.getDate() + delta);
			$(this).html(formatDMY(d));
		});
	})();

	// =========================
	// monthChange
	// =========================
	(function initMonths() {
		const locale = getLocale();

		const now = new Date();
		const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
		const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);

		const monthFmt = (d) => d.toLocaleString(locale, { month: "long" });

		$(".month1").html(monthFmt(now));
		$(".month2").html(monthFmt(next));
		$(".prev_month").html(monthFmt(prev));

		$(".month").html(monthFmt(now));
		$(".month-next").html(monthFmt(next));
		$(".month-prev").html(monthFmt(prev));
	})();

	// =========================
	// linksScrollForm
	// =========================
	(function initScrollToForm() {
		$(document).on("click", "a", function (e) {
			if ($(this).attr("noprevent")) return;

			e.preventDefault();

			const form = $("#order-now").length
				? $("#order-now")
				: $("#form-wrap").length
					? $("#form-wrap")
					: $("#form");

			if (!form.length) return;

			$("html, body").animate({ scrollTop: form.offset().top - 5 }, 200);
		});
	})();

	// =========================
	// names / doc / product / currency / prices
	// =========================
	(function initContentVars() {
		const names = {
			him: ["रवि कुमार", "अर्जुन यादव", "विशाल मेहता", "करण जोशी", "जय हांडे", "अंकुर सिंघ", "अमित राय", "दीपक गुप्ता", "नवीन यादव", "राज शर्मा"],
			hiw: ["मीरा शर्मा", "दिव्या पाटिल", "अनुष्का जोशी", "रिया मेहता", "सोनी हांडे", "ईशा सिंघ", "अलिया राय", "पलक गुप्ता", "सुहाना यादव", "रोहिणी शर्मा"],
			esm: ["Santiago Rosales", "Mateo Guerrero", "Alejandro Castillo", "Daniel Montes", "Sebastián Morales", "Juan Valdez", "Diego Cabrera", "Nicolás Franco", "Lucas Gómez", "Andrés Paredes"],
			esw: ["Sofía Herrera", "Valentina Escobar", "Isabella Navarro", "Camila Ríos", "Emma Delgado", "Martina Peralta", "Lucía Vega", "Antonella Mendoza", "Victoria Rojas", "Natalia Fuentes"],
			dem: ["Maximilian Schmidt", "Paul Fischer", "Elias Schneider", "Leon Wagner", "Ben Hoffmann", "Luca Keller", "Noah Weber", "Jonas Vogt", "Felix Braun", "Lukas Hartmann"],
			dew: ["Sophia Müller", "Emma Becker", "Hannah Fischer", "Emilia Schneider", "Claudia Henning", "Peggy Adler-Hoppe", "Renata Schütte", "Paula Böhme", "Isolde Heine", "Brigitte Klose"],
			hum: ["Szűcs Bence", "Lukács Áron", "Szekeres Szervác", "Orbán Balázs", "Bálint Kornél", "Vincze Hunor", "Kozma Albert", "Sipos Olivér", "Faragó Patrik", "Tamás Ernő"],
			huw: ["Hegedüs Mihályné", "Kocsis Gizella", "Szekeres Olívia", "Balázs Gitta", "Pásztor Kristófné", "Kelemen Márton", "Lukács Fanni", "Lengyel Marietta", "Fábián Valéria", "Szalai Rebeka"],
			rom: ["Tudor Gheorghiu", "Dorel Pana", "Toma Florescu", "Vasile Cozma", "Nichifor Nica", "Casian Manolache", "Avram Chirila", "Stancu Ignat", "Albert Simon", "Gică Trandafir"],
			row: ["Veta Miron", "Lia Macovei", "Gabriela Stefanescu", "Ramona Zaharia", "Grațiana Radulescu", "Nadia Ardelean", "Petronela Moise", "Tudosia Coman", "Marcheta Muresan", "Astrid Parvu"],
			ptm: ["Isaac Ivo Rodrigues Melo", "Edgar Mendes Ramos", "Afonso Azevedo de Henriques", "Bernardo Cláudio", "Nuno Márcio Lima", "Luís Matheus Coelho", "Filipe Araújo Silva", "Tomás Silva Faria", "Xavier Paulo de Maia", "Rafael Gustavo de Antunes"],
			ptw: ["Madalena Neto Vieira", "Teresa Melissa Ribeiro de Freitas", "Bruna Ramos Macedo", "Jéssica Iris Marques", "Andreia Benedita Nunes", "Carlota Mota", "Viviane Erica Nunes", "Érica Campos Nogueira", "Mafalda Teixeira", "Daniela Ana Soares de Fernandes"],
			trm: ["Ali Akyüz", "Burak Abadan", "Ferid Karaböcek", "Barlas Akyürek", "Ali Solmaz", "Canberk Akman", "Çağan Bakırcıoğlu", "Atakan Eronat", "Cem Beşerler", "Armağan Denkel"],
			trw: ["Ada Alnıaçık", "Ebru Numanoğlu", "Şahnur Tüzün", "Şahnur Akyüz", "Burcu Koç", "Ece Baykam", "Şahnur Erçetin", "Sinem Ayaydın", "Ebru Erginsoy", "Rüya Limoncuoğlu"],
			film: ["Jerrold Bradtke", "Elmo Erdman", "Alexis Pacoch", "Consuelo Ruecker", "Ernest Terry", "Melvin Huel", "Dexter Bogisich", "Dwight Runolfsdottir", "Coty Emard", "Michale Hauck"],
			filw: ["Gina Tillman", "Anjali Marks", "Estefania Mante", "Lauren Kohler", "Rosetta Runolfsdottir", "Maiya Willms", "Angie Ziemann", "Henriette Dickens", "Alberta Von", "Delpha Greenfelder"],
			fam: ["دارا فرج", "عطا میدری", "داتیس قانونی", "مهیمن لنکرانی", "بهنیا مرتضوی", "بختیار واعظ", "سامی صفوی", "هوشان کریمی", "رشید داور", "بهامین قهستانی	"],
			faw: ["آفری منوچهری", "نازو حکیمی", "راشین توسلی", "ملکه جهانی", "رودابه پیوندی", "مونا توکلیان", "نگارین دری", "فروغ قهرمانیان", "سیما میرباقری", "گلشن زرشناس"],
			arm: ["أحمد مراد", "سعيد داود", "باسل رافي", "اسام كامل", "نازك بدواوي", "أبو جهاد", "فوزي منصور", "‏عقيل", "‏جازم", "‏ميمون"],
			arw: ["أيات لاري", "عائشة", "بادية غوزيلا", "غرام فيروزة", "جوري", "‏‏غادة", "سليمة يلدوز", "حمدان عيسى"],
			ZAm: ["Mzwandile Zwazwa", "Philani Ngwenya", "Tommy Lee Sparta", "Maxamed Nuur Afaan Cabdulaahi", "Dries De Wet", "Bullet Manala", "Minhajul Hayat", "Stivo Mothupi", "Nhlanhla Dube", "Annetjie Thythus"],
			ZAw: ["Marilyn Lathwood", "Zandy Mayisela", "Nokuzola Pinky", "Precious Sithole", "Lana Nolte", "Sussanna Lewies", "Clara Dean", "Gail Less", "Beauty Masuku", "Mantsho"],
			KEm: ["Adams Maina", "Semekal Mose", "Mwalimu Ngetich", "Nako Memei", "Jay Jay Okocha", "Moiz Peter", "Ronald Okoth", "Magata Eric", "Davido Kamaa", "Immanuel Mwanzia"],
			KEw: ["Florence Wangeci", "Elizabeth Biwott", "Ivy Njoroge", "Elenwa Wairimu Maina", "Anchelina Mueni", "Cynthia Mudave", "Kamammy Terry", "Shila Chebet", "Bree", "Kiongozi Mayamba"],
			CIm: ["Ïsmãël Fanny", "Robert Sode", "Mermoz Ndri", "Goua Kekre", "Koala Inoussa", "Kone Nanourou", "Blessings Venance", "Noel Jordan", "Bonkoungou Julliette", "Lee Boss Poutine", "Medo le Nabab", "Sam Sam"],
			CIw: ["Mirabelle Moyé", "Gʀâ Kouakou", "Albertine Akpacheme", "Tata José", "Lou Irié Augustine Irié", "Dame N'gbesso", "Dorine Amenan", "Maman Moïse", "Ange Blon", "Ornella Affi", "Barra Djeneba Soro"],
		};

		const { lang: rawLang, country } = getLangCountry();
		let lang = rawLang;

		// legacy-логика из твоего файла
		if (lang === "en" || lang === "fr") lang = country.toLowerCase();

		// fallback на es
		if (!names[lang + "m"]) lang = "es";

		for (let i = 1; i <= 10; i++) {
			$(".m" + i).html(names[lang + "m"][i - 1] || "");
			$(".w" + i).html(names[lang + "w"][i - 1] || "");
		}

		// doc
		if (typeof doc === "undefined") {
			doc = { hi: "डॉ. अविनाश मिश्रा", es: "Dr. Hugo López-Gatell" }[lang];
		}
		if (!doc) doc = "Doctor";
		$(".doc").html(doc);

		// product
		if (typeof product === "undefined" || !product) product = "Product";
		$(".product").html(product);

		// currency
		if (typeof currency === "undefined" || !currency) {
			currency = { IN: "INR", MX: "$" }[country];
		}
		$(".currency").html(currency || "");

		// prices
		if (typeof priceOld !== "undefined") $(".price-old").html(priceOld);
		if (typeof priceNew !== "undefined") $(".price-new").html(priceNew);
	})();
});