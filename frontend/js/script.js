//menu toggle
const profileIconBtn = document.querySelector("#profile-icon-btn");
const dropdownList = document.querySelector("#dropdown-list");

profileIconBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownList.classList.toggle("hide");
});

document.addEventListener("click", () => {
  dropdownList.classList.add("hide");
});

//button hamburguer
const hamburguerBtn = document.getElementById("btn-mobile");
const sidebar = document.getElementById("sidebar");
hamburguerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
