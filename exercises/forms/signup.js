$(function () {
  $("input").on("focus", function (event) {
    event.preventDefault();

    let $itemClicked = $(event.target);
    $itemClicked.next(".error_message").text("");
    $itemClicked.removeClass("invalid");
    $itemClicked.addClass("valid");
  });

  $("input").on("blur", function (event) {
    event.preventDefault();

    let $itemClicked = $(event.target);
    if ($itemClicked[0].checkValidity()) {
      $itemClicked.next(".error_message").text("");
      $itemClicked.removeClass("valid");
    } else {
      $itemClicked.removeClass("valid");
      $itemClicked.addClass("invalid");
      showError($itemClicked);
    }
  });

  $("form").on("submit", function (event) {
    event.preventDefault();
    if ($(event.target)[0].checkValidity()) {
      let $allInputs = $(this).find("input");
      let encodedFinalUrl = serializeData($allInputs);

      let p = document.createElement("p");
      p.textContent = encodedFinalUrl.join("&");
      $("#serialized").append(p);
    } else {
      let $formMessage = $(".form_errors")[0];
      $formMessage.textContent = "Form can't be submitted until errors are corrected.";
      validateFormInputs();
    }
  });

  $("#first_name, #last_name").on("keypress", function (event) {
    if (event.key.match(/[0-9]/)) {
      event.preventDefault();
    }
  });

  $("#phone, #cc1, #cc2, #cc3, #cc4").on("keypress", function (event) {
    if (event.key.match(/[a-zA-Z]/)) {
      event.preventDefault();
    }
  });

  $("#cc1, #cc2, #cc3").on("input", function (event) {
    let $creditBox = $(event.target);
    let $inputLen = $creditBox.val().length;

    if ($inputLen === $creditBox[0].maxLength) {
      $creditBox.nextAll("input")[0].focus();
    }
  });
});

function serializeData($inputs) {
  let attributes = {};

  $inputs.each(function () {
    let $item = $(this);
    let name = $item.attr("name");
    let value = $item.val();

    attributes[name] = attributes[name] || "";
    attributes[name] += value;
  });

  return (encodeURL(attributes));
}

function encodeURL(attrObj) {
  let attrArray = [];

  Object.keys(attrObj).forEach(key => {
    attrArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(attrObj[key]));
  });
  return attrArray;
}

function validateFormInputs() {
  $("input").each(function () {
    let $item = $("#" + this.id)
    showError($item);
  });
}

function showError($field) {
  let $message = $field.next(".error_message").text("");
  let $itemName = $field[0].closest("label").textContent.trim();

  if ($field[0].validity.valueMissing) {
    $message.text(`${$itemName} is a required field.`);
  } else if ($field[0].validity.patternMismatch && $field[0].id === 'password') {
    $message.text("Password must be at least 10 characters long.");
  } else if ($field[0].validity.patternMismatch) {
    $message.text(`Please enter a valid ${$itemName}.`);
  }
}