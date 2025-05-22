class MediaFactory {
  constructor(media, profile, mediaIndex) {
    this.media = media;
    this.profile = profile;
    this.mediaIndex = mediaIndex;
  }

  createMediaItem() {
    const mediaItem = document.createElement("article");
    mediaItem.id = `media-${this.media.id}`;
    mediaItem.classList.add("photograph-media-item");

    if (this.mediaIsImage()) {
      mediaItem.innerHTML = this.createImageInnerHTML();
    } else if (this.mediaIsVideo()) {
      mediaItem.innerHTML = this.createVideoInnerHTML();
    }
    mediaItem.innerHTML += this.addTitleAndLikes();
    this.addEventListeners(mediaItem);

    return mediaItem;
  }

  mediaIsImage() {
    return "image" in this.media;
  }

  mediaIsVideo() {
    return "video" in this.media;
  }

  createImageInnerHTML() {
    return `
      <div class="photograph-media-item-container" aria-label="Voir l'image ${this.media.title}">
        <img class="media-item" src="assets/images/${this.profile.firstName}/${this.media.image}" alt="${this.media.title}" tabindex="0" role="button"/>
      </div>
    `;
  }

  createVideoInnerHTML() {
    return `
      <div class="photograph-media-item-container" aria-label="Voir la vidéo ${this.media.title}">
        <video class="media-item" src="assets/images/${this.profile.firstName}/${this.media.video}" alt="${this.media.title}">
        </video>
        <i class="fa-solid fa-play media-item-play" aria-label="Lancer la vidéo ${this.media.title}" role="button" tabindex="0"></i>
      </div>
    `;
  }

  addTitleAndLikes() {
    return `
    <div class="photograph-media-item-info">
      <h3>${this.media.title}</h3>
      <p ><span aria-label="${this.media.likes} mentions j'aime">${this.media.likes}</span> <i class="fa-regular fa-heart" aria-label="Aimer l'image ${this.media.title}" role="button" tabindex="0"></i></p>
    </div>
    `;
  }

  addEventListeners(mediaItem) {
    mediaItem
      .querySelectorAll(".media-item, h3, .media-item-play")
      .forEach((element) => {
        element.addEventListener("click", () => {
          console.log(mediaItem.id);
          openLightboxModal(this.mediaIndex);
        });
      });

    mediaItem
      .querySelectorAll(".media-item, h3, .media-item-play")
      .forEach((element) => {
        element.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            openLightboxModal(this.mediaIndex);
          }
        });
      });

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
}
