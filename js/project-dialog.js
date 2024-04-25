import { createProject } from "./app.js";
let ul = document.querySelector("#dropdown-select-51-listbox");
let btn = document.querySelector("#dropdown-select-51");
let dialogModal = document.querySelector(".project-dialog-wrapper");
let projectTitle = document.querySelector("#project-name");
let addProjectButton = document.querySelector("#add-project");
let closeProjectDialog = document.querySelector("#closeDialog");
let projectForm = document.querySelector("#project-form");

dialogModal.showModal();

// Event listeners for dropdown options
for (let i = 0; i < ul.children.length; i++) {
  ul.children[i].addEventListener("mouseover", (e) => {
    if (e.target.tagName == "LI") {
      e.target.classList.add("dropdown_select__option--highlighted");
    }
  });
  ul.children[i].addEventListener("mouseleave", (e) => {
    if (e.target.tagName == "LI") {
      e.target.classList.remove("dropdown_select__option--highlighted");
    }
  });
  ul.children[i].addEventListener("click", (e) => {
    let selected_color_data = document.querySelector("#selected_color_data");
    let spans = selected_color_data.querySelectorAll("span");
    spans[0].style.backgroundColor = `var(--named-color-${e.currentTarget.getAttribute(
      "data-value"
    )})`;
    spans[1].textContent = e.currentTarget.textContent;
    ul.style.display = "none";
  });
}

// control the add project button state
function addProjectButtonState() {
  console.log(projectTitle.value ? false : true);
  addProjectButton.disabled = projectTitle.value ? false : true;
}
projectTitle.addEventListener("input", addProjectButtonState);

// hide and show the dropdown
btn.addEventListener("click", controlDropDown);

function controlDropDown() {
  ul.style.display = ul.style.display === "block" ? "none" : "block";
}

// add the event listenr only when ther is a project dialog open
const escKeyListener = (e) => {
  if (e.key === "Escape") {
    closeDialog();
  }
};

window.addEventListener("keydown", escKeyListener);
closeProjectDialog.addEventListener("click", closeDialog);

function closeDialog() {
  // the src has query parameter to identify the script(timestamp)
  let script = document.querySelector("script[src^='js/project-dialog.js']");
  if (script) {
    script.remove();
    projectTitle.removeEventListener("input", addProjectButtonState);
    btn.removeEventListener("click", controlDropDown);
    window.removeEventListener("keydown", escKeyListener);
    closeProjectDialog.removeEventListener("click", closeDialog);
    addProjectButton.removeEventListener("click", newProjectFunction);
    dialogModal.close();
    projectForm.reset();
    addProjectButton.disabled = true;
  }
}

addProjectButton.addEventListener("click", newProjectFunction);

function newProjectFunction() {
  let projectTitle = document.querySelector("#project-name").value;
  let projectColor = document.querySelector("#selected_color_data span").style
    .backgroundColor;
  projectForm.reset();
  createProject(projectTitle, projectColor);
  closeDialog();
}
