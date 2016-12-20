$(function() {
	$('input:not(.button)').blur(function() {
		if (validation.isFieldValid(this.id, $(this).val())) {
			$('.error').text('').hide();
		} else {
			$('.error').text(validation.form[this.id].errorMessage).show();
		}
	});
});
