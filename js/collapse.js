let collapse_icon = document.querySelector("#collapse_icon");
let projects_list = document.querySelector(".projects-list");
collapse_icon.addEventListener("click", () => {
  projects_list.style.height =
    projects_list.style.height === "0px" ? "100px" : "0px";
  collapse_icon.classList.toggle("rotate_icon");
});
