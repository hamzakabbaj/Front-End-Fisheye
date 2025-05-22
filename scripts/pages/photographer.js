// ------------------------ FETCH DATA

async function getPhotographer() {
  const photographerId = window.location.search.split("=")[1];

  try {
    const response = await fetch("data/photographers.json");
    const photographers = await response.json();
    const profile = photographers["photographers"].find(
      (photographer) => parseInt(photographer.id) === parseInt(photographerId)
    );

    const media = photographers["media"].filter(
      (media) => parseInt(media.photographerId) === parseInt(photographerId)
    );

    return { profile, media };
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    throw error;
  }
}

// ------------------------ DISPLAY DATA
function displayProfile(profile) {
  const profileSection = document.querySelector(".photograph-header");
  profile.firstName = profile.name.split(" ")[0].replace("-", " ");
  profileSection.dataset.profile = JSON.stringify(profile);
  console.log(profile);
  const profileInfo = document.createElement("div");
  profileInfo.classList.add("photograph-info");
  profileInfo.setAttribute(
    "aria-label",
    `Informations sur le photographe ${profile.name}`
  );
  profileInfo.setAttribute("tabindex", "0");
  profileInfo.innerHTML = `
    <h2 tabindex="0" aria-label="Nom du photographe : ${profile.name}">${profile.name}</h2>
    <h3 tabindex="0" aria-label="Localisation du photographe : ${profile.city}, ${profile.country}">${profile.city}, ${profile.country}</h3>
    <p tabindex="0" aria-label="Slogan du photographe : ${profile.tagline}">${profile.tagline}</p>
  `;

  const profileImage = document.createElement("img");
  profileImage.src = `assets/photographers/${profile.portrait}`;
  profileImage.alt = profile.name;

  profileSection.prepend(profileInfo);
  profileSection.appendChild(profileImage);

  const modalPhotographerName = document.getElementById(
    "modal-photographer-name"
  );
  modalPhotographerName.textContent = profile.name;
}

function displayMedia(media, profile) {
  const mediaSection = document.querySelector(".photograph-media");
  // Save the media in the photographer object
  setMedia(media);
  // Empty the media section
  mediaSection.innerHTML = "";

  let sum_likes = 0;
  for (let i = 0; i < media.length; i++) {
    const mediaFactory = new MediaFactory(media[i], profile, i);
    const mediaItem = mediaFactory.createMediaItem();
    sum_likes += media[i].likes;
    mediaSection.appendChild(mediaItem);
  }

  const likesAndPriceSection = document.createElement("div");
  likesAndPriceSection.classList.add("photograph-likes-and-price");
  likesAndPriceSection.innerHTML = `
    <p>${sum_likes} <i class="fa-solid fa-heart"></i></p>
    <p>${profile.price}€ / jour</p>
  `;
  document.body.appendChild(likesAndPriceSection);
  console.log(sum_likes);
}

function displaySortedMedia(photographer, sortValue) {
  const media = photographer.media;
  if (sortValue === "likes") {
    media.sort((a, b) => b.likes - a.likes);
  } else if (sortValue === "date") {
    media.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortValue === "title") {
    media.sort((a, b) => a.title.localeCompare(b.title));
  }
  displayMedia(media, photographer.profile);
}

// ------------------------ HANDLE EVENTS
function addLike(mediaItemId) {
  const mediaItem = document.getElementById(mediaItemId);
  console.log(mediaItemId);
  let mediaItemLikes = parseInt(
    mediaItem.querySelector(".photograph-media-item-info p").textContent
  );
  let sum_likes = parseInt(
    document.querySelector(".photograph-likes-and-price p").textContent
  );
  mediaItem.classList.toggle("liked");
  if (mediaItem.classList.contains("liked")) {
    mediaItemLikes++;
    sum_likes++;
    heart = "fa-solid fa-heart";
  } else {
    mediaItemLikes--;
    sum_likes--;
    heart = "fa-regular fa-heart";
  }
  mediaItem.querySelector(
    ".photograph-media-item-info p"
  ).innerHTML = `${mediaItemLikes} <i class="${heart}" aria-label="${mediaItemLikes} j'aime" role="button" tabindex="0"></i>`;
  document.querySelector(
    ".photograph-likes-and-price p"
  ).innerHTML = `${sum_likes} <i class="fa-solid fa-heart" aria-label="${sum_likes} mentions j'aime" role="button" tabindex="0"></i>`;

  mediaItem
    .querySelector(".photograph-media-item-info i")
    .addEventListener("click", () => {
      addLike(mediaItem.id);
    });

  mediaItem
    .querySelector(".photograph-media-item-info i")
    .addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addLike(mediaItem.id);
      }
    });
}

function handleContactForm() {
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get the form data
    const formData = {
      firstname: contactForm.firstname.value,
      lastname: contactForm.lastname.value,
      email: contactForm.email.value,
      message: contactForm.message.value,
    };

    // Validate the form data
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.message
    ) {
      const error = document.getElementById("contact-form-error");
      error.textContent = "*Veuillez remplir tous les champs";
      error.style.color = "#690808";
      error.style.fontSize = "18px";
      error.style.fontWeight = "bold";
      return;
    }

    console.log(formData);
    closeModal();
  });
}

// ------------------------ GETTERS & SETTERS

function getMedia() {
  const mediaSection = document.querySelector(".photograph-media");
  return JSON.parse(mediaSection.dataset.media);
}

function getProfile() {
  const profileSection = document.querySelector(".photograph-header");
  return JSON.parse(profileSection.dataset.profile);
}

function setMedia(media) {
  const mediaSection = document.querySelector(".photograph-media");
  mediaSection.dataset.media = JSON.stringify(media);
}

// ------------------------ INIT

async function init() {
  const photographer = await getPhotographer();
  if (!photographer.profile) {
    window.location.href = "index.html";
    return;
  }

  displayProfile(photographer.profile);
  displaySortedMedia(photographer, "likes");

  document.querySelector(".sort-by select").addEventListener("change", (e) => {
    displaySortedMedia(photographer, e.target.value);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      document.querySelector(".lightbox-modal-previous")?.click();
    } else if (event.key === "ArrowRight") {
      document.querySelector(".lightbox-modal-next")?.click();
    } else if (event.key === "Escape") {
      closeLightboxModal();
      closeModal();
    }
  });

  handleContactForm();

  return photographer;
}

// ------------------------ RUN

init();
