// dialog box
const openDialogButton = document.querySelector("#openDialog");
const myDialog = document.querySelector("#dialog-wrapper");
const closeDialog = document.querySelector(".closeDialog");
openDialogButton.addEventListener("click", () => {
  myDialog.showModal();
});
closeDialog.addEventListener("click", () => {
  myDialog.close();
});
myDialog.addEventListener("click", (event) => {
  if (event.target === myDialog) {
    myDialog.close();
  }
});

// todo form
const priorities = ["Low", "Medium", "High"];
let projects = [];

// funtion that format date object to string
const formatDate = (date) => date.toISOString().split("T")[0];

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
  projects.push({ title, addTodo, removeTodo, getTodos });
  return { title, color, addTodo, removeTodo, getTodos };
};

// add project to the projects list
const addProject = (project) => {
  projects.push(project);
};

// factory function to create todo objects
date = formatDate(new Date());
const createTodo = (
  title,
  description,
  dueDate = date,
  priority = priorities[1]
) => {
  return { title, description, dueDate, priority };
};

//create dafault project if it doesn't exist in the local storage
const projectsList = JSON.parse(localStorage.getItem("projects"));
if (!projectsList) {
  const defaultProject = createProject("Default", "grey");
  let defaultTodo = createTodo(
    "Default Todo",
    "This is the default todo",
    new Date(),
    "Low"
  );
  defaultProject.addTodo(defaultTodo);
  localStorage.setItem("projects", JSON.stringify([defaultProject]));
  projects = [defaultProject];
} else {
  projects = projectsList;
  console.log(projects[0]);
}

// edit projectsList whener a new project is created or deleted
const updateProjectsList = () => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

// enable the add task button if the user has entered a title
const todoTitle = document.querySelector("#todo-title");
todoTitle.addEventListener("input", () => {
  const addTaskButton = document.querySelector("#add-task");
  addTaskButton.disabled = todoTitle.value ? false : true;
});

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
  const projectObject = projects.find((p) => p.title === project);
  console.log(projects);
  const newTodo = createTodo(title, description, dueDate, priority);
  projectObject.addTodo(newTodo);
  addProject(projectObject);
  updateProjectsList();
  // console.log(projectObject.getTodos());

  todoForm.reset();
  myDialog.close();
  renderProjects();
});

function renderProjects() {
  const projectList = document.querySelector("#project-list");
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const projectItem = document.createElement("ul");
    projectItem.textContent = project.title;
    projectList.appendChild(projectItem);
    // render all the todos in this project
    const todoList = document.createElement("ul");
    const todos = project.getTodos();
    todos.forEach((todo, index) => {
      const todoItem = document.createElement("li");
      const todoDescription = document.createElement("p");
      todoItem.textContent = todo.title;
      todoDescription.textContent = todo.description;
      todoItem.appendChild(todoDescription);
      // If this is the last todo, add the animate class
      if (index === todos.length - 1) {
        todoItem.classList.add("animate");
      }
      todoList.appendChild(todoItem);
    });
    projectList.appendChild(todoList);
  });
}

const openDialog = document.querySelector("#btn-open-dialog");
// open the dialog in
openDialog.addEventListener("click", () => {
  console.log("open dialog");
  // toogle open attribute
  myDialog.setAttribute("open", "");
});
