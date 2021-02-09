document.addEventListener("DOMContentLoaded", () => {
  let templates = {}; // obj referring to each handlebar script
  let photos; // array of objects for each photo

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(temp => {
    templates[temp["id"]] = Handlebars.compile(temp["innerHTML"]);
  });

  document.querySelectorAll("[data-type='partial']").forEach(temp => {
    Handlebars.registerPartial(temp["id"], temp["innerHTML"]);
  });

  // get the photos data
  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;

      // add the photos data to handlerbars html template and display below slides section
      renderPhotos();

      // hide all photos
      hideOtherPhotos();

      // unhide the first photo
      document.querySelector("#slides figure").classList.remove("hide");
      document.querySelector("#slides figure").classList.add("current");

      // add the first photo and display under slides section
      renderPhotoInformation(photos[0].id);

      // add the comments data to handlebars html template and display below comments
      getComments(photos[0].id)
    });


  let prevAnchor = document.querySelector(".prev");
  let nextAnchor = document.querySelector(".next");

  prevAnchor.addEventListener("click", event => prevSlide());
  nextAnchor.addEventListener("click", event => nextSlide());

  // increment the value of likes and favorites and display value in button
  document.querySelector("section > header").addEventListener("click", event => {
    event.preventDefault();

    let button = event.target;
    let buttonType = button.getAttribute("data-property");

    if (buttonType) {
      let data = button.getAttribute("data-id");
      let href = button.getAttribute("href");
      let text = button.textContent;

      fetch(href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: 'photo_id=' + data
      })
        .then(response => response.json())
        .then(json => {
          button.textContent = text.replace(/\d+/, json.total);
        });
    }
  });

  // submit form with comments and add to comments section
  let form = document.querySelector("form");
  form.addEventListener("submit", event => {
    event.preventDefault();

    let data = new FormData(form);
    let currentSlideId = document.querySelector(".current").getAttribute("data-id");
    data.set("photo_id", currentSlideId);

    fetch("/comments/new", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams([...data])
    })
      .then(response => response.json())
      .then(json => {
        let comments_list = document.querySelector("#comments ul");
        comments_list.insertAdjacentHTML("beforeend", templates.photo_comment(json));
        form.reset();
      });
  });

  // find previous slide and show it
  function prevSlide() {
    let currentPhoto = document.querySelector(".current");
    let prev;

    currentPhoto.classList.add("hide");
    currentPhoto.classList.remove("current");

    if (currentPhoto.previousElementSibling === null) {
      prev = photos[photos.length - 1].id;
    } else {
      prev = currentPhoto.previousElementSibling.getAttribute('data-id');
    }

    handleSlide(prev);
  }

  // find next slide and show it
  function nextSlide() {
    let currentPhoto = document.querySelector(".current");
    let next;

    currentPhoto.classList.add("hide");
    currentPhoto.classList.remove("current");

    if (currentPhoto.nextElementSibling === null) {
      next = photos[0].id;
    } else {
      next = currentPhoto.nextElementSibling.getAttribute('data-id');
    }

    handleSlide(next);
  }

  // remove previous slide html, add current class to new slide and display slide details
  function handleSlide(slideId) {
    document.querySelector("section > header").replaceChildren();
    renderPhotoInformation(slideId);
    addCurrentClass(slideId);

    document.querySelector("#comments ul").replaceChildren();
    getComments(slideId);
  }

  // display comments for selected photo
  function getComments(id) {
    fetch("/comments?photo_id=" + id)
      .then(response => response.json())
      .then(comment_json => {
        let comments_list = document.querySelector("#comments ul");
        comments_list.insertAdjacentHTML("beforeend", templates.photo_comments({ comments: comment_json }));
      });
  }

  // add photos to slides section
  function renderPhotos() {
    let slides = document.querySelector("#slides");
    slides.insertAdjacentHTML("beforeend", templates.photos({ photos: photos }));
  }

  // hide other photos that were not selected
  function hideOtherPhotos() {
    document.querySelectorAll("#slides figure").forEach(fig => {
      fig.classList.add("hide");
    });
  }

  // add current class to selected photo
  function addCurrentClass(idx) {
    document.querySelectorAll("#slides figure").forEach(fig => {
      if (fig.getAttribute('data-id') === String(idx)) {
        fig.classList.add("current");
        fig.classList.remove("hide")
      }
    });
  }

  // add photo details to selected photo
  function renderPhotoInformation(idx) {
    let photo = photos.filter(function (item) {
      return item.id === Number(idx);
    })[0];

    let header = document.querySelector("section > header");
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }
});