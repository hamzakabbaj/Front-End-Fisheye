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
  const lightboxModalImage = document.querySelector(
    "#lightbox-modal .lightbox-modal-image img"
  );
  lightboxModalImage.src = `assets/images/${firstName}/${media[currentIndex].image}`;
  lightboxModalImage.alt = media[currentIndex].title;

  // Title
  const lightboxModalImageTitle = document.querySelector(
    "#lightbox-modal .lightbox-modal-image-title"
  );
  lightboxModalImageTitle.textContent = media[currentIndex].title;
}
