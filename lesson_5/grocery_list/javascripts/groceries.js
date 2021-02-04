$(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();

    let $name = $(this).find("#name").val();
    let $value = $(this).find("#quantity").val() || "1";

    let $list = $("#grocery-list");
    $list.append('<li></li>');
    $('li').last().text($value + " " + $name);
    $('form')[0].reset();
  });
});