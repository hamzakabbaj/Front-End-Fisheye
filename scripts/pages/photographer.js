async function getPhotographer() {
  const photographerId = window.location.search.split("=")[1];
  const response = await fetch("data/photographers.json");
  const photographers = await response.json();
  const profile = photographers["photographers"].find(
    (photographer) => parseInt(photographer.id) === parseInt(photographerId)
  );

  const media = photographers["media"].filter(
    (media) => parseInt(media.photographerId) === parseInt(photographerId)
  );

  return { profile, media };
}

async function displayProfile(profile) {
  const profileSection = document.querySelector(".photograph-header");
  console.log(profile);
  const profileInfo = document.createElement("div");
  profileInfo.classList.add("photograph-info");
  profileInfo.innerHTML = `
    <h2>${profile.name}</h2>
    <h3>${profile.city}, ${profile.country}</h3>
    <p>${profile.tagline}</p>
  `;

  const profileImage = document.createElement("img");
  profileImage.src = `assets/photographers/${profile.portrait}`;
  profileImage.alt = profile.name;

  profileSection.prepend(profileInfo);
  profileSection.appendChild(profileImage);
}

async function displayMedia(media, profile) {
  const mediaSection = document.querySelector(".photograph-media");

  console.log(media);
  const firstName = profile.name.split(" ")[0].replace("-", " ");
  let sum_likes = 0;
  media.forEach((media) => {
    const mediaItem = document.createElement("article");
    mediaItem.classList.add("photograph-media-item");
    console.log(media);
    sum_likes += media.likes;

    if ("image" in media) {
      mediaItem.innerHTML = `
        <img src="assets/images/${firstName}/${media.image}" alt="${media.title}" />
    `;
    } else if ("video" in media) {
      mediaItem.innerHTML = `
        <video src="assets/images/${firstName}/${media.video}" alt="${media.title}" />
      `;
    }
    mediaItem.innerHTML += `
    <div class="photograph-media-item-info">
        <h3>${media.title}</h3>
        <p>${media.likes} <i class="fa-solid fa-heart"></i></p>
      </div>
    `;
    mediaSection.appendChild(mediaItem);
  });

  const likesAndPriceSection = document.createElement("div");
  likesAndPriceSection.classList.add("photograph-likes-and-price");
  likesAndPriceSection.innerHTML = `
    <p>${sum_likes} <i class="fa-solid fa-heart"></i></p>
    <p>${profile.price}€/jour</p>
  `;
  document.body.appendChild(likesAndPriceSection);
  console.log(sum_likes);
}

async function init() {
  const photographer = await getPhotographer();
  displayProfile(photographer.profile);
  displayMedia(photographer.media, photographer.profile);
}

init();
