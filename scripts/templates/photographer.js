function photographerTemplate(data) {
  const { name, portrait, tagline, city, country, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    // Image
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);

    // Title
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("aria-label", `Nom du photographe : ${name}`);

    // City and country
    const cityAndCountry = document.createElement("h3");
    cityAndCountry.textContent = `${city}, ${country}`;
    cityAndCountry.setAttribute(
      "aria-label",
      `Ville et pays du photographe : ${city}, ${country}`
    );
    // Tagline
    const tagline_p = document.createElement("p");
    tagline_p.textContent = tagline;
    tagline_p.setAttribute("aria-label", `Tagline du photographe : ${tagline}`);
    // Price
    const price_p = document.createElement("p");
    price_p.textContent = `${price}€/jour`;
    price_p.setAttribute("aria-label", `Prix du photographe : ${price}€/jour`);

    // Build Card
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    link.appendChild(cityAndCountry);
    link.appendChild(tagline_p);
    link.appendChild(price_p);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
