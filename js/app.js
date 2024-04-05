const openDialogButton = document.querySelector("#openDialog");
const myDialog = document.querySelector("#dialog-wrapper");
const closeDialog = document.querySelector(".closeDialog");
const openDialog = document.querySelector("#btn-open-dialog--non-modal");
const priorities = ["low", "medium", "high", "default"];
const todoTitle = document.querySelector("#todo-title");
const projectsList = JSON.parse(localStorage.getItem("projects"));
const projects_ul = document.querySelector("#pojects-ul");
const projectSelect = document.querySelector("#todo-project");
let projects = [];

// funtion too add all the projects to the select input
const addProject = (project) => {
  const option = document.createElement("option");
  option.value = project.title;
  option.textContent = project.title;
  projectSelect.appendChild(option);
};

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

// funtion that format date object to string
const formatDate = (date) => date.toISOString().split("T")[0];

const updateProjectsList = () => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

const createProject = (title, color) => {
  let todos = [];
  const addTodo = (todo) => {
    todos.push(todo);
  };
  const removeTodo = (index) => {
    todos.splice(index, 1);
  };
  const getTodos = () => {
    return todos;
  };
  projects.push({ title, color, todos, addTodo, removeTodo, getTodos });
  updateProjectsList();
  return { title, color, todos, addTodo, removeTodo, getTodos };
};

// factory function to create todo objects
date = formatDate(new Date());
const createTodo = (
  title,
  description,
  dueDate = date,
  priority = priorities[1],
  checked = false
) => {
  return { title, description, dueDate, priority, checked };
};

//create dafault project if it doesn't exist in the local storage
if (!projectsList) {
  const defaultProject = createProject("default", "grey");
  let date = formatDate(new Date());
  let defaultTodo = createTodo(
    "Default Todo",
    "This is the default todo",
    date,
    priorities[3]
  );
  defaultProject.addTodo(defaultTodo);
  projects = [defaultProject];
  localStorage.setItem("projects", JSON.stringify(projects));
} else {
  projects = projectsList;
}

// render existed projects in the local storage
renderProjects();

const enableAddTaskButton = () => {
  todoTitle.addEventListener("input", () => {
    const addTaskButton = document.querySelector("#add-task");
    addTaskButton.disabled = todoTitle.value ? false : true;
  });
};
enableAddTaskButton();

function addProjectOption(project) {
  const option = document.createElement("option");
  option.value = project.title;
  option.textContent = project.title;
  projectSelect.appendChild(option);
}
// add all the projects names as options in the select input
projects.forEach((project) => {
  addProjectOption(project);
});

// do the sam for priorities
const prioritySelect = document.querySelector("#todo-priority");
priorities.forEach((priority) => {
  const option = document.createElement("option");
  option.value = priority;
  option.textContent = priority;
  prioritySelect.appendChild(option);
});

//user can't select a date earlier then today
const today = new Date();
const todayFormatted = today.toISOString().split("T")[0];
document.getElementById("todo-dueDate").min = todayFormatted;

// listen for form submission
const todoForm = document.querySelector("#newTodo-form");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#todo-title").value;
  const description = document.querySelector("#todo-description").value;
  const dueDate = document.querySelector("#todo-dueDate").value;
  const priority = document.querySelector("#todo-priority").value;
  const project = document.querySelector("#todo-project").value;
  // identify the project that the todo belongs to

  const projectObject = projects.find((p) => p.title == project);
  const newTodo = createTodo(title, description, dueDate, priority);
  projectObject.todos.push(newTodo);
  updateProjectsList();

  todoForm.reset();
  myDialog.close();
  renderProjects();
});

function renderProjects() {
  const projectList = document.getElementById("pojects-ul");
  projectList.innerHTML = "";
  projects.forEach((project) => {
    project.todos.forEach((todo, index) => {
      const task = appendTask(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.priority
      );
      projects_ul.appendChild(task);
    });
  });
}

// open the dialog as non modal
openDialog.addEventListener("click", () => {
  // Check if a dialog already exists
  if (!document.querySelector("yDialogClone")) {
    const dialogclone = myDialog.cloneNode(true);
    dialogclone.classList.add("DialogClone");
    const closeBtn = dialogclone.querySelector(".closeDialog");
    closeBtn.addEventListener("click", () => {
      dialogclone.close();
    });
    enableAddTaskButton();
    openDialog.parentElement.appendChild(dialogclone);
    dialogclone.show();
    dialogclone.classList.add("non-modal-position");
  }
});

// Define a factory function for creating tasks
function appendTask(name, description, dueDate, priority) {
  var li = document.createElement("li");
  li.className = "";

  var divTaskListItem = document.createElement("div");
  divTaskListItem.className = "task_list_item";

  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("role", "checkbox");
  button.setAttribute("aria-checked", "false");
  button.setAttribute("aria-label", "mark task as completed");
  button.className = "task-checkbox";

  // Create the <svg> element with appropriate attributes
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.className = "";

  // Create the <path> element with appropriate attributes
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("clip-rule", "evenodd");
  path.setAttribute(
    "d",
    "M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z"
  );
  path.setAttribute("fill", getColorForPriority(priority));

  svg.appendChild(path);

  // Create the <span> element with class "task-checkbox-circle" and set its border color
  var span = document.createElement("span");
  span.className = "task-checkbox-circle";
  span.style.borderColor = getColorForPriority(priority);

  button.appendChild(svg);

  button.appendChild(span);

  divTaskListItem.appendChild(button);
  var divTaskListItemContent = document.createElement("div");
  divTaskListItemContent.className = "task_list_item__content";

  var divTaskTitle = document.createElement("div");
  divTaskTitle.className = "task-title";
  divTaskTitle.textContent = name; // Set the task name

  divTaskListItemContent.appendChild(divTaskTitle);

  var divTaskDescription = document.createElement("div");
  divTaskDescription.className = "task-description";
  divTaskDescription.textContent = description; // Set the task description

  divTaskListItemContent.appendChild(divTaskDescription);

  var divTaskListInfoTags = document.createElement("div");
  divTaskListInfoTags.className = "task_list_item__info_tags";
  divTaskListInfoTags.setAttribute("data-layout", "list");

  var dueDateButton = document.createElement("button");
  dueDateButton.setAttribute("type", "button");
  dueDateButton.setAttribute("aria-expanded", "false");
  dueDateButton.className = "due_date_controls";

  var spanDate = document.createElement("span");
  spanDate.className = "date date_future";
  spanDate.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12" class="calendar_icon"><path fill="currentColor" fill-rule="evenodd" d="M9.5 1h-7A1.5 1.5 0 0 0 1 2.5v7A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5v-7A1.5 1.5 0 0 0 9.5 1ZM2 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7ZM8.75 8a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM3.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z" clip-rule="evenodd"></path></svg>' +
    dueDate; // Set the due date dynamically

  dueDateButton.appendChild(spanDate);

  divTaskListInfoTags.appendChild(dueDateButton);

  divTaskListItemContent.appendChild(divTaskListInfoTags);

  divTaskListItem.appendChild(divTaskListItemContent);

  li.appendChild(divTaskListItem);

  var divEmpty = document.createElement("div");

  li.appendChild(divEmpty);
  const taskActions = createTaskActionsElement();
  divTaskListItemContent.appendChild(taskActions);

  return li;
}

// Function to get color based on priority
function getColorForPriority(priority) {
  switch (priority) {
    case priorities[0]:
      return "rgb(235, 137, 9)"; // Red
    case priorities[1]:
      return "rgb(36, 111, 224)"; // Blue
    case priorities[2]:
      return "rgb(209, 69, 59)"; // Yellow
    default:
      return "rgb(153 153 153)"; // grey
  }
}

function createTaskActionsElement() {
  const element = document.createElement("div");
  element.classList.add("task_list_item__actions");

  // Edit button
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.ariaLabel = "Edit";
  editButton.dataset.actionHint = "task-edit";
  editButton.innerHTML = createEditButtonSvg();

  // Due date button
  const dueDateButton = document.createElement("button");
  dueDateButton.type = "button";
  dueDateButton.ariaExpanded = "false";
  dueDateButton.dataset.actionHint = "task-scheduler";
  dueDateButton.ariaLabel = "Due date";
  dueDateButton.classList.add("due_date_controls");
  dueDateButton.innerHTML = createDueDateButtonSvg();

  // Comment button
  const commentButton = document.createElement("button");
  commentButton.type = "button";
  commentButton.ariaLabel = "Comment";
  commentButton.dataset.actionHint = "task-comment";
  commentButton.classList.add("task_list_item__comments_link");
  commentButton.innerHTML = createCommentButtonSvg();

  // More actions button
  const moreButton = document.createElement("button");
  moreButton.type = "button";
  moreButton.ariaExpanded = "false";
  moreButton.ariaHaspopup = "menu";
  moreButton.dataset.actionHint = "task-overflow-menu";
  moreButton.ariaLabel = "More task actions";
  // moreButton.classList.add(" "); //
  moreButton.innerHTML = createMoreButtonSvg();

  // Append buttons to the element
  element.appendChild(editButton);
  element.appendChild(dueDateButton);
  element.appendChild(commentButton);
  element.appendChild(moreButton);

  return element;
}

// Helper functions to create SVG strings
function createEditButtonSvg() {
  return `<svg width="24" height="24">
              <g fill="none" fill-rule="evenodd">
                <path fill="currentColor" d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z" />
                <path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z" />
              </g>
            </svg>`;
}

function createDueDateButtonSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" fill-rule="evenodd" d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM5 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6Zm12 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7z"
            clip-rule="evenodd"
          ></path>
        </svg>`;
}

function createCommentButtonSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" data-svgs-path="sm1/comments.svg">
            <path fill="currentColor" fill-rule="nonzero" d="M11.707 20.793A1 1 0 0 1 10 20.086V18H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.5l-2.793 2.793zM11 20.086L14.086 17H19a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6v3.086z"
            ></path>
          </svg>`;
}

function createMoreButtonSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" transform="translate(3 10)">
              <circle cx="2" cy="2" r="2"></circle>
              <circle cx="9" cy="2" r="2"></circle>
              <circle cx="16" cy="2" r="2"></circle>
            </g>
          </svg>`;
}
