function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  setTimeout(() => {
    document.getElementById("firstname").focus();
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
