$(function () {
  let contactsList;
  let $deleteBtn;

  fetch('http://localhost:3000/api/contacts')
    .then(response => response.json())
    .then(json => {
      contactsList = json;
      displayAllContacts();
    });

  let $deleteBtn = $('.deleteBtn');
  $deleteBtn.on("click", deleteContact);

  function displayAllContacts() {

    if (contactsList.length > 0) {
      splitTags();
      createContactTemplate(contactsList);
    } else {
      // add code for empty list of contacts
    }
  }

  function splitTags() {
    contactsList = contactsList.map(contact => {
      if (contact.tags) {
        contact.tags = contact.tags.split(",");
        return contact;
      } else {
        return contact;
      }
    });
  }

  function createContactTemplate(contacts) {
    let contactTemplate = Handlebars.compile($('#contactTemplate').html());
    let contactList = Handlebars.compile($('#contactList').html());

    Handlebars.registerPartial('contactTemplate', $('#contactTemplate').html());
    let $contactsContainer = $('#contactsContainer');

    $contactsContainer.html(contactList({ lists: contacts }));
  }

  function deleteContact() {
    console.log(event);
  }
});