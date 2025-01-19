let scrollContainer = document.querySelector("gallery");
let back = document.getElementById("back");
let next = document.getElementById("next");

scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
});
