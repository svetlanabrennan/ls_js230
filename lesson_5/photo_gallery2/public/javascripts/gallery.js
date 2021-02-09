document.addEventListener("DOMContentLoaded", () => {
  let templates = {}; // obj referring to each handlebar script
  let photos; // array of objects for each photo

  // don't know how LS got to this solution/code
  document.querySelectorAll("script[type='text/x-handlebars']").forEach(temp => {
    templates[temp["id"]] = Handlebars.compile(temp["innerHTML"]);
  });

  // don't know how LS got to this solution/code
  document.querySelectorAll("[data-type='partial']").forEach(temp => {
    Handlebars.registerPartial(temp["id"], temp["innerHTML"]);
  });

  // this is getting the photos info from the api
  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      // this assigned the photos variable the response (json object)
      photos = json;
      // firstPhoto = photos[0].id

      // add the photos data to handlerbars html template and display below slides section
      renderPhotos();

      hideOtherPhotos();
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



  // document.addEventListener("click", event => {
  //   if (event.target.className === "prev") {
  //     console.log(photos)

  //     currentPhoto = document.querySelector(".current");
  //     let prev;

  //     document.querySelector(".current").classList.remove("current");

  //     if (currentPhoto.previousElementSibling === null) {
  //       prev = photos[photos.length - 1].id;
  //     } else {
  //       prev = currentPhoto.previousElementSibling.getAttribute('data-id');
  //     }

  //     document.querySelector("section > header").replaceChildren();
  //     renderPhotoInformation(prev);
  //     addCurrentClass(prev);

  //     document.querySelector("#comments ul").replaceChildren();
  //     getComments(prev);
  //   }

  //   if (event.target.className === "next") {
  //     currentPhoto = document.querySelector(".current");
  //     console.log(currentPhoto);
  //     let next;

  //     document.querySelector(".current").classList.add("hide");
  //     document.querySelector(".current").classList.remove("current");

  //     if (currentPhoto.nextElementSibling === null) {
  //       next = photos[0].id;
  //     } else {
  //       next = currentPhoto.nextElementSibling.getAttribute('data-id');
  //     }

  //     document.querySelector("section > header").replaceChildren();
  //     renderPhotoInformation(next);
  //     addCurrentClass(next);

  //     document.querySelector("#comments ul").replaceChildren();
  //     getComments(next);
  //   }

  // });

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

    // this is grabbing the photos script from the templates and inserting the photos variable that contains the json photos data and assigning it to a new photos property - it's the same as doing this console.log(templates.photos({ photos })) - they both return a string representation of the html with photo data
    // templates.photos({ photos: photos })

    // is this shorthand for new property assignment { photos: photos }
    // this inserts the photos script filled with html of each photo at the end of the slides element
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