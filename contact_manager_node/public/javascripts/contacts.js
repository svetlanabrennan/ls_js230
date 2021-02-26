$(function () {
  class HandleEvents {
    handleSearch() {
      let searchedName = this.value.toLowerCase();

      // input field contains a value
      if (searchedName.length > 0) {
        let foundContacts = contactsList.filter(contact => {
          let name = contact.full_name.toLowerCase();
          return name.includes(searchedName);
        });

        // searched value exists in contains
        if (foundContacts.length > 0) {
          contactsAPI.checkContactList(foundContacts);
        } else {
          $('#contactsContainer').hide();
          $('#no-contacts-found').show();
          templatesAPI.noContactsFoundTemplate(searchedName);
        }
        // input field is empty
      } else {
        $('#no-contacts-found').hide();
        $('#contactsContainer').show();
        contactsAPI.displayAllContacts();
      }
    }

    handleTagClick() {
      let tagName = event.target.textContent.trim().toLowerCase();

      let foundContactsByTag = contactsList.filter(contact => {
        let tags = contact.tags;
        if (typeof tags === "object") {
          tags = tags.map(tag => tag.toLowerCase());
        } else {
          tags = tags.toLowerCase()
        }
        return tags.includes(tagName);
      });

      contactsAPI.checkContactList(foundContactsByTag);
    }

    handleFormSubmit() {
      event.preventDefault();
      contactsAPI.addContact();
      $('.create-contact-form')[0].reset();
      $('.create-contact').hide();
      $('#contactsContainer').show();
      contactsAPI.displayAllContacts();
    }

    handleFormUpdate() {
      event.preventDefault();
      let $form = $('.update-contact-form');
      let formData = new FormData($form[0]);
      let id = formData.get("id");

      let jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
      fetch('http://localhost:3000/api/contacts/' + id, {
        method: 'PUT',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      $('.update-contact-form')[0].reset();
      $('.create-contact-form')[0].reset();
      $('.update-contact').hide();
      $('#contactsContainer').show();
      contactsAPI.displayAllContacts();
    }

    cancelForm() {
      event.preventDefault();
      $('.create-contact-form')[0].reset();
      $('.update-contact-form')[0].reset();
      $('.create-contact').hide();
      $('.update-contact').hide();
      $('#contactsContainer').show();
      contactsAPI.displayAllContacts();
    }

    deleteContact() {
      let answer = confirm("Do you want to delete the contact?");

      if (answer) {
        let id = $(event.target).parent().attr("id");
        fetch('http://localhost:3000/api/contacts/' + id, {
          method: 'DELETE',
        });
        contactsAPI.displayAllContacts();
      } else {
        return false;
      }
    }

    editForm() {
      event.preventDefault();
      let id = $(event.target).parent().attr("id");
      let data;

      fetch('http://localhost:3000/api/contacts/' + id)
        .then(response => response.json())
        .then(json => {
          data = json;
          $('#contactsContainer').hide();
          $('.update-contact').show();
          $('input[name="full_name"]').val(data["full_name"]);
          $('input[name="email"]').val(data["email"]);
          $('input[name="phone_number"]').val(data["phone_number"]);
          $('input[name="tags"]').val(data["tags"]);
          $('input[name="id"]').val(id);
        });
    }

    resetFilters() {
      event.preventDefault();
      contactsAPI.displayAllContacts();
    }
  }

  class ManageContacts {
    displayAllContacts() {
      fetch('http://localhost:3000/api/contacts')
        .then(response => response.json())
        .then(json => {
          contactsList = json;
          this.checkContactList(contactsList)
        });
    }

    checkContactList(list) {
      if (list.length > 0) {
        this.splitTags(list);
        templatesAPI.createContactTemplate(list);
      } else {
        $('#contactsContainer').hide();
        $('#no-contacts').show();
      }
    }

    addCreateContactForm() {
      $('#no-contacts').hide();
      $('.create-contact').show();
      $('#contactsContainer').hide();
    }

    addContact() {
      let $form = $('form');
      let url = $form[0].action;

      let formData = new FormData($form[0]);
      let jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

      fetch(url, {
        method: "POST",
        body: jsonData,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

    splitTags(list) {
      list = list.map(contact => {
        if (contact.tags && (typeof contact.tags === "string")) {
          contact.tags = contact.tags.split(",").map(item => item.trim());
          return contact;
        } else if (contact.tag && Array.isArray(contact.tag)) {
          return contact;
        } else {
          return contact;
        }
      });
    }
  }

  class ManageTemplates {
    noContactsFoundTemplate(searchedName) {
      let noContactsTemplate = Handlebars.compile($('#noContactsTemplate').html());
      let $noContactsContainer = $('#no-contacts-found');

      $noContactsContainer.html(noContactsTemplate({ name: searchedName }));
    }

    createContactTemplate(contacts) {
      let contactList = Handlebars.compile($('#contactList').html());
      Handlebars.registerPartial('contactTemplate', $('#contactTemplate').html());

      let $contactsContainer = $('#contactsContainer');
      $contactsContainer.html(contactList({ lists: contacts }));
    }
  }

  let contactsAPI = new ManageContacts();
  let eventsAPI = new HandleEvents();
  let templatesAPI = new ManageTemplates();

  let contactsList;
  contactsAPI.displayAllContacts();

  let $contactsContainer = $("#contactsContainer");
  $contactsContainer.on("click", "button.deleteBtn", eventsAPI.deleteContact);
  $contactsContainer.on("click", "button.editBtn", eventsAPI.editForm);

  $('.add-contact').on("click", contactsAPI.addCreateContactForm);
  $('.cancelBtn').on("click", eventsAPI.cancelForm);

  $('.create-contact-form').on("submit", eventsAPI.handleFormSubmit);
  $('.update-contact-form').on("submit", eventsAPI.handleFormUpdate);

  $contactsContainer.on("click", "button.tag", eventsAPI.handleTagClick);
  $('#search').on("keyup", eventsAPI.handleSearch);
  $('#clearFilters').on("click", eventsAPI.resetFilters);
});