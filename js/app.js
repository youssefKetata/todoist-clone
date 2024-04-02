// dialog box
const openDialogButton = document.querySelector("#openDialog");
const myDialog = document.querySelector("#dialog-wrapper");
const closeDialog = document.querySelector(".closeDialog");
openDialogButton.addEventListener("click", () => {
  myDialog.showModal();
});
closeDialog.addEventListener("click", () => {
  myDialog.close();
  console.log("close");
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
  priority = priorities[1]
) => {
  return { title, description, dueDate, priority };
};

//create dafault project if it doesn't exist in the local storage
const projectsList = JSON.parse(localStorage.getItem("projects"));
if (!projectsList) {
  const defaultProject = createProject("Default", "grey");
  let date = formatDate(new Date());
  let defaultTodo = createTodo(
    "Default Todo",
    "This is the default todo",
    date,
    priorities[0]
  );
  defaultProject.addTodo(defaultTodo);
  localStorage.setItem("projects", JSON.stringify(projects));
  projects = [defaultProject];
} else {
  projects = projectsList;
}

// create another project
if (projects.length === 1) {
  const project2 = createProject("Work", "green");
}

renderProjects();

const todoTitle = document.querySelector("#todo-title");
const enableAddTaskButton = () => {
  // const todoTitle = document.querySelector("#todo-title");
  console.log(todoTitle);
  todoTitle.addEventListener("input", () => {
    const addTaskButton = document.querySelector("#add-task");
    addTaskButton.disabled = todoTitle.value ? false : true;
  });
};

enableAddTaskButton();

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
  const newTodo = createTodo(title, description, dueDate, priority);
  console.log(projectObject);
  projectObject.addTodo(newTodo);
  // addProject(projectObject);
  updateProjectsList();

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

    const todos = project.todos;

    todos.forEach((todo, index) => {
      const todoItem = document.createElement("li");
      const todoDescription = document.createElement("p");
      const dueDate = document.createElement("p");
      const priority = document.createElement("p");

      todoItem.textContent = todo.title;
      todoDescription.textContent = todo.description;
      todoItem.appendChild(todoDescription);
      dueDate.textContent = todo.dueDate;
      todoItem.appendChild(dueDate);
      priority.textContent = todo.priority;
      todoItem.appendChild(priority);
      // If this is the last todo, add the animate class

      if (index === todos.length - 1) {
        todoItem.classList.add("animate");
      }
      todoList.appendChild(todoItem);
    });
    projectList.appendChild(todoList);
  });
}
const openDialog = document.querySelector("#btn-open-dialog--non-modal");

// open the dialog in
openDialog.addEventListener("click", () => {
  // Check if a dialog already exists
  if (!document.querySelector("yDialogClone")) {
    const dialogclone = myDialog.cloneNode(true);
    dialogclone.classList.add("DialogClone");
    const closeBtn = dialogclone.querySelector(".closeDialog");
    closeBtn.addEventListener("click", () => {
      dialogclone.close();
    });
    console.log("here");
    enableAddTaskButton();
    openDialog.parentElement.appendChild(dialogclone);
    dialogclone.show();
    dialogclone.classList.add("non-modal-position");
  }
});

//update the project list in html
const selectProject = document.querySelector("#todo-project");
projects.forEach((project) => {
  const option = document.createElement("option");
  option.textContent = project.title;
  selectProject.appendChild(option);
});
