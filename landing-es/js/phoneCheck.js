var htmlLang = document.documentElement.lang.split('-');
var lang = htmlLang[0];
var country = htmlLang[1];

$('input[name="name"]').attr("autocomplete", "name").attr("required", "required").attr("minlength", "3");
$('input[name="phone"]').attr("autocomplete", "tel").attr("required", "required").attr("type", "tel");
$('input[name="phone"]').each(function() {
	var input = this;
	var iti = window.intlTelInput(input, {
		initialCountry: country ? country.toLowerCase() : 'auto',
		allowDropdown: false,
		nationalMode: false,
		separateDialCode: true,
		autoPlaceholder: 'polite',
		formatOnDisplay: true,
		hiddenInput: 'full_phone',
		utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.min.js'
	});

	function validate() {
		input.setCustomValidity('');
		if (input.value.trim() && !iti.isValidNumber()) {
			input.setCustomValidity('Número de teléfono no válido');
		}
	}

	input.addEventListener('input', validate);
	input.addEventListener('blur', validate);

	var form = input.closest('form');
	if (form) {
		form.addEventListener('submit', function(e) {
			validate();
			if (input.validationMessage) {
				e.preventDefault();
				input.reportValidity();
			}
		});
	}
});
