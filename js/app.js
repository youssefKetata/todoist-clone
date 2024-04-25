import appendTask from "./create-task.js";

const openDialogButton = document.querySelector("#openDialog");
const myDialog = document.querySelector("#dialog-wrapper");
const closeDialog = document.querySelector(".closeDialog");
const openDialogNonModal = document.querySelector(
  "#btn-open-dialog--non-modal"
);
export const priorities = ["low", "medium", "high", "default"];

const projectsList = JSON.parse(localStorage.getItem("projects"));
const projects_ul = document.querySelector("#pojects-ul");
const projectSelect = document.querySelector("#todo-project");
const projectsSideBarList = document.querySelector("#projects_list");
const todoForm = document.querySelector("#newTodo-form");
const prioritySelect = document.querySelector("#todo-priority");
let projects = [];

// open and close todo dialog
openDialogButton.addEventListener("click", () => {
  if (!myDialog.open) {
    myDialog.showModal();
  }
});

closeDialog.addEventListener("click", () => {
  if (myDialog.open) {
    myDialog.close();
  }
});

myDialog.addEventListener("click", (event) => {
  if (event.target === myDialog) {
    myDialog.close();
  }
});

// format date object to string
const formatDate = (date) => date.toISOString().split("T")[0];

// sync between local storage and the projects variable
const updateProjectsList = () => {
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
};

const createProject = (title, color) => {
  let todos = [];
  title = title.toLowerCase();
  projects.push({ title, color, todos });

  updateProjectsList();
  updateSideBarProjectsList();
  updateProjectsListAsOptions();

  return { title, color, todos };
};

// factory function to create todo objects
const date = formatDate(new Date());
const createTodo = (
  title,
  description,
  dueDate = date,
  priority = priorities[1],
  project = "default",
  checked = false
) => {
  updateProjectsList();
  updateSideBarProjectsList();
  return { title, description, dueDate, priority, project, checked };
};

//create dafault project if it doesn't exist in the local storage
if (!projectsList) {
  const defaultProject = createProject("default", "var(--named-color-grey)");
  let date = formatDate(new Date());
  const defaultTodo = createTodo(
    "default todo",
    "this is the default default todo",
    date,
    priorities[2]
  );
  defaultProject.todos.push(defaultTodo);
  projects = [defaultProject];
  localStorage.setItem("projects", JSON.stringify(projects));
} else {
  projects = projectsList;
}

// render existed projects in the local storage
renderProjects();

const enableAddTaskButton = (dialogHTML) => {
  // acces the #add-task form dialogHTML
  if (!dialogHTML) {
    var addTaskButton = document.querySelector("#add-task");
    var todoTitle = document.querySelector("#todo-title");
  } else {
    var addTaskButton = dialogHTML.querySelector("#add-task");
    var todoTitle = dialogHTML.querySelector("#todo-title");
  }

  todoTitle.addEventListener("input", () => {
    if (todoTitle.value !== "") {
      addTaskButton.disabled = false;
      // change aria-disabled to false
      addTaskButton.setAttribute("aria-disabled", false);
    } else {
      addTaskButton.disabled = true;
      addTaskButton.setAttribute("aria-disabled", true);
    }
  });
};
enableAddTaskButton();

//update the project list in add-task dialog
function addProjectOption(project) {
  const option = document.createElement("option");
  console.log("project name is : ", project.title === "default");
  project.title === "default" && (option.defaultSelected = true);
  option.value = project.title;
  option.textContent = project.title;
  projectSelect.appendChild(option);
}

//update project options when creating a new task
function updateProjectsListAsOptions() {
  projectSelect.innerHTML = "";
  projects.forEach((project) => {
    addProjectOption(project);
  });
}
updateProjectsListAsOptions();

// priorities
priorities.forEach((priority) => {
  const option = document.createElement("option");
  // set default to default
  priority === "default" && (option.defaultSelected = true);
  option.value = priority;
  option.textContent = priority;
  prioritySelect.appendChild(option);
});

//user can't select a date earlier then today
const today = new Date();
const todayFormatted = today.toISOString().split("T")[0];
document.getElementById("todo-dueDate").min = todayFormatted;

function handleTodoFormSubmit(e, todoFrm = todoForm, dialog = myDialog) {
  e.preventDefault();

  const title = document.querySelector("#todo-title").value;
  console.log("title is : ", title);
  const description = document.querySelector("#todo-description").value;
  const dueDate = document.querySelector("#todo-dueDate").value;
  const priority = document.querySelector("#todo-priority").value;
  const project = document.querySelector("#todo-project").value;
  // find project that the todo belongs to
  const projectObject = projects.find((p) => p.title == project);
  const newTodo = createTodo(title, description, dueDate, priority);
  projectObject.todos.push(newTodo);
  updateProjectsList();
  updateSideBarProjectsList();

  todoFrm.reset();
  dialog.close();
  renderProjects();
}

// listen for form submission
todoForm.addEventListener("submit", handleTodoFormSubmit);

function renderProject(project) {
  project.todos.forEach((todo) => {
    if (!todo.checked) {
      const task = appendTask(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.priority
      );
      projects_ul.appendChild(task);
    }
  });
}
// render the projects, or render one particular project
function renderProjects(project = projects) {
  projects_ul.innerHTML = "";
  // render a particular project
  if (project.hasOwnProperty("todos")) {
    renderProject(project);
    return;
  }
  // render all projects
  projects.forEach((project) => {
    renderProject(project);
  });
}

// open the dialog as non modal
const non_modal_dialog_wrapper = document.querySelector(
  "#non-modal-dialog-wrapper"
);

openDialogNonModal.addEventListener("click", () => {
  // Check if a dialog already exists
  if (!document.querySelector(".DialogClone")) {
    const dialogclone = myDialog.cloneNode(true);
    dialogclone.classList.add("DialogClone");
    const closeBtn = dialogclone.querySelector(".closeDialog");
    dialogclone.dataset.dialog = "non-modal"; // for css selectors
    closeBtn.addEventListener("click", () => {
      dialogclone.close();
      dialogclone.remove();
      openDialogNonModal.style.display = "flex";
    });
    enableAddTaskButton(dialogclone);

    dialogclone.addEventListener("submit", (e) => {
      handleTodoFormSubmit(e, dialogclone.children[0], dialogclone);
      updateSideBarProjectsList();
      openDialogNonModal.style.display = "flex";
      dialogclone.remove();
    });
    openDialogNonModal.style.display = "none";
    non_modal_dialog_wrapper.appendChild(dialogclone);
    dialogclone.show();
    dialogclone.classList.add("non-modal-position");
  } else {
    console.log("error loading the dialog");
  }
});

// check todos
projects_ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-checkbox-circle")) {
    const task = e.target.closest("li");
    const btn = e.target.closest("button");
    //animate the task
    btn.classList.add("task-done-animation");
    // set the button color to the task color
    btn.style.backgroundColor = e.target.style.borderColor;
    // remove the svg for compatibily
    btn.innerHTML = "";

    const taskTitle = task.querySelector(".task-title").textContent;
    const project = projects.find((p) =>
      p.todos.find((t) => t.title == taskTitle)
    );
    const todo = project.todos.find((t) => t.title == taskTitle);
    todo.checked = true;

    playCheckedSound();
    setTimeout(() => {
      task.remove();
      updateProjectsList();
    }, 500);
  }
});

const playCheckedSound = () => {
  const audio = new Audio(
    "https://d3ptyyxy2at9ui.cloudfront.net/assets/sounds/d8040624c9c7c88aa730f73faa60cf39.mp3"
  );
  audio.play();
};

// funciton that creates undo note
const createUndoNote = (timeoutId) => {
  const undoNote = document.createElement("div");
  undoNote.classList.add("undo-note");
  //   <p class="text-info">task deleted</p>
  const textInfo = document.createElement("p");
  textInfo.classList.add("text-info");
  textInfo.textContent = "Task deleted.";
  undoNote.appendChild(textInfo);

  const undoBtn = document.createElement("button");
  undoBtn.classList.add("undo-btn");
  undoBtn.textContent = "Undo";
  undoBtn.addEventListener("click", () => {
    renderProjects();
    undoNote.remove();
    clearTimeout(timeoutId);
  });
  undoNote.appendChild(undoBtn);
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");
  closeBtn.textContent = "X";
  // close btn
  closeBtn.addEventListener("click", () => {
    undoNote.remove();
    clearTimeout(timeoutId);
  });
  undoNote.appendChild(closeBtn);
  return undoNote;
};

// delete a task
const deleteTask = (name, element) => {
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const foundToDo = project.todos.find((todo) => todo.title == name);
    // remove the todo just from the screen and wait 2s to allow the user to undo
    // if the user doesn't undo the task will be removed from the projects
    if (typeof foundToDo !== "undefined") {
      element.remove();
      const timeoutId = setTimeout(() => {
        project.todos.splice(project.todos.indexOf(foundToDo), 1);
        updateProjectsList();
        renderProjects();
        undo.remove();
      }, 3000);
      const undo = createUndoNote(timeoutId);
      const undo_wrapper = document.querySelector(".undo-wrapper");
      undo_wrapper.appendChild(undo);
      break;
    } else {
      console.log("Task not found");
    }
  }
};

// append project dialog to html, avoiding long html intial file
// append project dialog only the first time and then hide and show it
// when the user clicks on the add project button
const addProjectDialog = document.querySelector("#project-dialog-wrapper");
const addProjectButton = document.querySelector("#add_project");
addProjectButton.addEventListener("click", () => {
  if (addProjectDialog.innerHTML == "") {
    fetch("project-dialog.html")
      .then((response) => response.text())
      .then((data) => {
        addProjectDialog.innerHTML = data;
        loadScript();
      });
  } else {
    loadScript();
  }
});

// add query parameter to the script to avoid caching
function loadScript() {
  const script = document.createElement("script");
  script.defer = true;
  script.src = "js/project-dialog.js?" + new Date().getTime();
  script.type = "module";
  document.body.appendChild(script);
}

// update side bar projects list
function updateSideBarProjectsList() {
  projectsSideBarList.innerHTML = "";
  projects.forEach((project) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = "#";
    var svg = `<svg
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
  class=""
  style="color: red"
>
  <path
    fill="#999999"
    fill-rule="evenodd"
    d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
    clip-rule="evenodd"
  ></path>
</svg>`;
    a.innerHTML = createProjectSvg(project.color);
    const projectName = document.createElement("span");
    projectName.id = "project_name";
    projectName.textContent = project.title;
    const nbTasks = document.createElement("span");
    nbTasks.classList.add("nb-tasks");
    nbTasks.id = "nb_tasks";
    nbTasks.textContent = project.todos.length;
    a.appendChild(projectName);
    a.appendChild(nbTasks);
    li.appendChild(a);
    projectsSideBarList.appendChild(li);
  });
}
updateSideBarProjectsList();

function createProjectSvg(color) {
  return `<svg
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  viewBox="0 0 24 24"
  class=""
  style="color: ${color}"
>
  <path
    fill=${color}
    fill-rule="evenodd"
    d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493l.487-2.918ZM14.327 10H10.34l-.667 4h3.987l.667-4Z"
    clip-rule="evenodd"
  ></path>
</svg>`;
}

projectsSideBarList.addEventListener("click", (e) => {
  const index = Array.from(projectsSideBarList.children).indexOf(
    e.target.closest("li")
  );
  const project = projects[index];
  renderProjects(project);
});

const navigation_list = document.querySelector("#navigation_list");
navigation_list.addEventListener("click", (e) => {
  console.log(e.target.closest("li"));
});

// test
const pojects_ul = document.querySelector("#pojects-ul");
pojects_ul.addEventListener("dragenter", (e) => {
  e.preventDefault();
  console.log("dragenter", e.target);
});

export { deleteTask, createProject };
