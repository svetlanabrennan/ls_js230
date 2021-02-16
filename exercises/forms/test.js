var App = {
  $form: $('form'),
  $input: $('input'),

  handleValueAbsence: function ($control) {
    var labelText = $('label[for=' + $control.attr('name') + ']').text();
    var $errorMessage = $control.siblings('.error_message');
    var errorMessage = labelText + ' is a required field.';

    $control.addClass('invalid_field');
    $errorMessage.text(errorMessage);
  },

  handlePatternMismatch: function ($control) {
    var labelText = $('label[for=' + $control.attr('name') + ']').text();
    var $errorMessage = $control.siblings('.error_message');
    var errorMessage = 'Please Enter a valid ' + labelText + '.';

    $control.addClass('invalid_field');
    $errorMessage.text(errorMessage);
    console.log($errorMessage);
    if ($control.attr('name') === 'password') {
      $errorMessage.text('Password must be at least 10 characters long.');
    }
  },

  validateControl: function ($control) {
    if ($control[0].validity.valueMissing) {
      this.handleValueAbsence($control);
      return false;
    } else if ($control[0].validity.patternMismatch) {
      this.handlePatternMismatch($control);
      return false;
    }

    return true;
  },

  handleFormSubmit: function () {
    if ($('form')[0].checkValidity()) {
      $('.form_errors').text('');
    } else {
      $('.form_errors').text('Form cannot be submitted until errors are corrected.');
      this.validateFormInputs();
      return false;
    }
  },

  validateFormInputs: function () {
    var self = this;
    this.$input.each(function () {
      self.validateControl($(this));
    });
  },

  handleBlur: function (e) {
    var $control = $(e.target);

    if ($('form')[0].checkValidity()) {
      $('.form_errors').text('');
    }
    this.validateControl($control);
  },

  handleFocus: function (e) {
    var $control = $(e.target);
    $control.siblings('.error_message').text('');
    $control.removeClass('invalid_field');
  },

  blockNonAlpha: function (e) {
    if (!e.key.match(/[a-zA-Z\s']/)) {
      e.preventDefault();
    }
  },

  blockNonNumeric: function (e) {
    if (!e.key.match(/[0-9]/)) {
      e.preventDefault();
    }
  },

  tabForward: function (e) {
    var $input = $(e.target);
    var valLength = $input.val().length;

    if ($input[0].checkValidity()) {
      console.log($input)
      $input.nextAll('input')[0].focus();
    }
  },

  init: function () {
    this.$input.on('blur', this.handleBlur.bind(this));
    this.$input.on('focus', this.handleFocus.bind(this));
    this.$form.on('submit', this.handleFormSubmit.bind(this));
    $('#first_name, #last_name').on('keypress', this.blockNonAlpha.bind(this));
    $('#phone, #cd1, #cd2, #cd3, #cd4').on('keypress', this.blockNonNumeric.bind(this));
    $('#cd1, #cd2, #cd3').on('keyup', this.tabForward.bind(this));
  }
};


App.init();