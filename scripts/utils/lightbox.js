function openLightboxModal(firstName, media, currentIndex) {
  console.log("Open lightbox modal");
  updateLightboxContent(firstName, media, currentIndex);

  const lightboxModalPrevious = document.querySelector(
    "#lightbox-modal .lightbox-modal-previous"
  );
  const lightboxModalNext = document.querySelector(
    "#lightbox-modal .lightbox-modal-next"
  );

  lightboxModalNext.setAttribute(
    "nextIndex",
    (currentIndex + 1) % media.length
  );
  lightboxModalPrevious.setAttribute(
    "previousIndex",
    (currentIndex - 1 + media.length) % media.length
  );

  lightboxModalNext.addEventListener("click", () => {
    const newIndex = parseInt(lightboxModalNext.getAttribute("nextIndex"));
    updateLightboxContent(firstName, media, newIndex);
    lightboxModalPrevious.setAttribute(
      "previousIndex",
      (newIndex - 1 + media.length) % media.length
    );
    lightboxModalNext.setAttribute("nextIndex", (newIndex + 1) % media.length);
  });

  lightboxModalPrevious.addEventListener("click", () => {
    const newIndex = parseInt(
      lightboxModalPrevious.getAttribute("previousIndex")
    );
    updateLightboxContent(firstName, media, newIndex);
    lightboxModalNext.setAttribute("nextIndex", (newIndex + 1) % media.length);
    lightboxModalPrevious.setAttribute(
      "previousIndex",
      (newIndex - 1 + media.length) % media.length
    );
  });
}

function closeLightboxModal() {
  const lightboxModal = document.getElementById("lightbox-modal");
  lightboxModal.style.display = "none";
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
