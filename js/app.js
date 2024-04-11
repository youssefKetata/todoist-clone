import appendTask from "./create-task.js";

const openDialogButton = document.querySelector("#openDialog");
const myDialog = document.querySelector("#dialog-wrapper");
const closeDialog = document.querySelector(".closeDialog");
const openDialog = document.querySelector("#btn-open-dialog--non-modal");
// make priorities available to create-ask.js file

export const priorities = ["low", "medium", "high", "default"];
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
  projects.push({ title, color, todos, addTodo, removeTodo, getTodos });
  updateProjectsList();
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
  return { title, description, dueDate, priority, project, checked };
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
      // updateProjectsList();
    }, 500);
  }
});

const playCheckedSound = () => {
  const audio = new Audio(
    "https://d3ptyyxy2at9ui.cloudfront.net/assets/sounds/d8040624c9c7c88aa730f73faa60cf39.mp3"
  );
  audio.play();
};
// set timeout before deleting the task and only remove the task from html, if the user click undo append the task again
// if not perform the deletion
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

// listen when the user want to add a project
// fetch the project-dialog.html and append it to the body
// excute the code that is in the project-dialog.js file
const addProjectButton = document.querySelector("#add_project");
addProjectButton.addEventListener("click", () => {
  fetch("project-dialog.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#project-dialog-wrapper").innerHTML = data;
      const script = document.createElement("script");
      script.defer = true; // Remove the value
      script.src = "js/project-dialog.js";
      document.body.appendChild(script);
    });
});

export { deleteTask };
