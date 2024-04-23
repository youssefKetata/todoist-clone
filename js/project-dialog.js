import { createProject } from "./app.js";
// note:  use var so that the variables can be changes on each project-dialog open
var ul = document.querySelector("#dropdown-select-51-listbox");
var btn = document.querySelector("#dropdown-select-51");
var dialogModal = document.querySelector(".project-dialog-wrapper");
var closeProjectDialog = document.querySelector("#closeDialog");
dialogModal.showModal();
console.log("project dialog opened");

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
    var selected_color_data = document.querySelector("#selected_color_data");
    // get the two spans in selected_color_data element
    var spans = selected_color_data.querySelectorAll("span");
    // change the color of the first span background to var(--named-colorName)
    spans[0].style.backgroundColor = `var(--named-color-${e.currentTarget.getAttribute(
      "data-value"
    )})`;
    spans[1].textContent = e.currentTarget.textContent;
    ul.style.display = "none";
  });
}

// enale the add project button only when the project name is not empty
var projectTitle = document.querySelector("#project-name");
var enableAddTaskButton = () => {
  projectTitle.addEventListener("input", () => {
    var addProjectButton = document.querySelector("#add-project");
    addProjectButton.disabled = projectTitle.value ? false : true;
  });
};
enableAddTaskButton();

btn.addEventListener("click", (e) => {
  ul.style.display = ul.style.display == "block" ? "none" : "block";
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDialog();
  }
});

closeProjectDialog.addEventListener("click", (e) => {
  closeDialog();
});

function closeDialog() {
  // the src has query parameter to identify the script(timestamp)
  var script = document.querySelector("script[src^='js/project-dialog.js']");
  script.remove();
  console.log("project dialog closed", script);
  dialogModal.close();
}
const addProjectButton = document.querySelector("#add-project");

addProjectButton.addEventListener("click", (e) => {
  // get the info from the form
  var projectTitle = document.querySelector("#project-name").value;
  var projectColor = document.querySelector("#selected_color_data span").style
    .backgroundColor;

  // create a project object
  createProject(projectTitle, projectColor);
});
