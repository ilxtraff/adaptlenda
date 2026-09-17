var htmlLang = document.documentElement.lang.split('-');
var lang = htmlLang[0];
var country = htmlLang[1];

$('input[name="name"]').attr("autocomplete", "name").attr("required", "required").attr("minlength", "3");
$('input[name="phone"]').attr("autocomplete", "tel").attr("required", "required").attr("type", "tel");
$('input[name="phone"]').each(function() {
	var iti = window.intlTelInput(this, {
		initialCountry: country,
		allowDropdown: false,
		nationalMode: true,
		separateDialCode: true,
		autoPlaceholder: 'polite',
		formatOnDisplay: true,
		hiddenInput: 'full_phone',
		utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.min.js'
	});
	this.addEventListener('input', ()=> {
		this.setCustomValidity('');
		if (!iti.isValidNumber()) this.setCustomValidity('Número de teléfono no válido');
	});
	var iso2 = iti.getSelectedCountryData().iso2;
	this.addEventListener('countrychange', ()=> {
		iti.setCountry(iso2);
	});
});
