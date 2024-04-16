import appendTask from "./create-task.js";

const openDialogButton = document.querySelector("#openDialog");
const myDialog = document.querySelector("#dialog-wrapper");
const closeDialog = document.querySelector(".closeDialog");
const openDialog = document.querySelector("#btn-open-dialog--non-modal");
export const priorities = ["low", "medium", "high", "default"];
const todoTitle = document.querySelector("#todo-title");
const projectsList = JSON.parse(localStorage.getItem("projects"));
const projects_ul = document.querySelector("#pojects-ul");
const projectSelect = document.querySelector("#todo-project");
const projectsSideBarList = document.querySelector("#projects_list");
let projects = [];

// funtion too add all the projects to the select input
const addProject = (project) => {
  const option = document.createElement("option");
  option.value = project.title;
  option.textContent = project.title;
  projectSelect.appendChild(option);
};
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

// funtion that format date object to string
const formatDate = (date) => date.toISOString().split("T")[0];

// sync between local storage and the projects array
const updateProjectsList = () => {
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
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
  title = title.toLowerCase();
  projects.push({ title, color, todos, addTodo, removeTodo, getTodos });
  updateProjectsList();
  updateSideBarProjectsList();
  updateProjectsListAsOptions();

  return { title, color, todos, addTodo, removeTodo, getTodos };
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

// create other project
if (projects.length == 1) {
  const project2 = createProject("Project 2", "blue");
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

//update the project select input with the projects
function addProjectOption(project) {
  const option = document.createElement("option");
  option.value = project.title;
  option.textContent = project.title;
  projectSelect.appendChild(option);
}
function updateProjectsListAsOptions() {
  projectSelect.innerHTML = "";
  projects.forEach((project) => {
    addProjectOption(project);
  });
}

updateProjectsListAsOptions();

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
  // render task which are not checked yet
  projects_ul.innerHTML = "";
  projects.forEach((project) => {
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

// delete a task
const deleteTask = (name) => {
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const foundToDo = project.todos.find((t) => t.title == name);
    if (foundToDo) {
      setTimeout(() => {
        const undo = document.createElement("button");
        undo.textContent = "Undo";
        undo.classList.add("undo");
        undo.addEventListener("click", () => {
          project.todos.push(foundToDo);
          updateProjectsList();
          renderProjects();
          undo.remove();
        });
        document.body.appendChild(undo);
      }, 5000);
      project.todos.splice(project.todos.indexOf(foundToDo), 1);
      console.log(projects);
      updateProjectsList();
      renderProjects();
      break;
    } else {
      break;
    }
  }
};

// append project dialog to html, avoiding long html intial file
const addProjectButton = document.querySelector("#add_project");
addProjectButton.addEventListener("click", () => {
  fetch("project-dialog.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#project-dialog-wrapper").innerHTML = data;
      const script = document.createElement("script");
      script.defer = true;
      script.src = "js/project-dialog.js";
      script.type = "module";
      document.body.appendChild(script);
    });
});

// put all the project in ul with id projects_list

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

export { deleteTask, createProject };
