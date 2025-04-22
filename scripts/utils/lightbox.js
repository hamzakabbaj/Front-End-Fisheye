function openLightboxModal(currentIndex) {
  const media = getMedia();
  const profile = getProfile();
  currentIndex = parseInt(currentIndex);
  const nextIndex = (currentIndex + 1) % media.length;
  const previousIndex = (currentIndex - 1 + media.length) % media.length;
  console.log(previousIndex, currentIndex, nextIndex);
  updateLightboxContent(profile.firstName, media, currentIndex);

  const lightboxModalPrevious = document.querySelector(
    "#lightbox-modal .lightbox-modal-previous"
  );
  const lightboxModalNext = document.querySelector(
    "#lightbox-modal .lightbox-modal-next"
  );

  lightboxModalNext.setAttribute("nextIndex", nextIndex);
  lightboxModalPrevious.setAttribute("previousIndex", previousIndex);

  lightboxModalNext.removeEventListener("click", displayNextMedia);
  lightboxModalPrevious.removeEventListener("click", displayPreviousMedia);

  lightboxModalNext.addEventListener("click", displayNextMedia);
  lightboxModalPrevious.addEventListener("click", displayPreviousMedia);
}
function displayNextMedia() {
  const lightboxModalNext = document.querySelector(
    "#lightbox-modal .lightbox-modal-next"
  );
  const newCurrentIndex = parseInt(lightboxModalNext.getAttribute("nextIndex"));
  updateArrows(newCurrentIndex);
}

function displayPreviousMedia() {
  const lightboxModalPrevious = document.querySelector(
    "#lightbox-modal .lightbox-modal-previous"
  );
  const newCurrentIndex = parseInt(
    lightboxModalPrevious.getAttribute("previousIndex")
  );
  updateArrows(newCurrentIndex);
}

function updateArrows(newCurrentIndex) {
  const lightboxModalPrevious = document.querySelector(
    "#lightbox-modal .lightbox-modal-previous"
  );
  const lightboxModalNext = document.querySelector(
    "#lightbox-modal .lightbox-modal-next"
  );
  const media = getMedia();
  const profile = getProfile();
  const newNextIndex = (newCurrentIndex + 1) % media.length;
  const newPreviousIndex = (newCurrentIndex - 1 + media.length) % media.length;
  console.log(newPreviousIndex, newCurrentIndex, newNextIndex);
  updateLightboxContent(profile.firstName, media, newCurrentIndex);
  lightboxModalPrevious.setAttribute("previousIndex", newPreviousIndex);
  lightboxModalNext.setAttribute("nextIndex", newNextIndex);
}

function closeLightboxModal() {
  const lightboxModal = document.getElementById("lightbox-modal");
  lightboxModal.style.display = "none";
  const lightboxModalPrevious = lightboxModal.querySelector(
    ".lightbox-modal-previous"
  );
  const lightboxModalNext = lightboxModal.querySelector(".lightbox-modal-next");
  lightboxModalNext.removeEventListener("click", displayNextMedia);
  lightboxModalPrevious.removeEventListener("click", displayPreviousMedia);
}

function updateLightboxContent(firstName, media, currentIndex) {
  const lightboxModal = document.getElementById("lightbox-modal");
  lightboxModal.style.display = "flex";

  // Image
  const lightboxModalMedia = lightboxModal.querySelector(
    "#lightbox-modal .lightbox-modal-image"
  );
  lightboxModalMedia.innerHTML = "";
  if ("image" in media[currentIndex]) {
    lightboxModalMedia.innerHTML = `
      <img src="assets/images/${firstName}/${media[currentIndex].image}" alt="${media[currentIndex].title}" />
    `;
  } else if ("video" in media[currentIndex]) {
    lightboxModalMedia.innerHTML = `
      <video src="assets/images/${firstName}/${media[currentIndex].video}" alt="${media[currentIndex].title}" controls/>
    `;
  }

  // Title
  lightboxModalMedia.innerHTML += `
    <p class="lightbox-modal-media-title">${media[currentIndex].title}</p>
  `;
}
