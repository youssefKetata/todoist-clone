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
  console.log("projects[0].title:", projects[0].title);
  console.log("project:", project);
  console.log(projects[0].title == project);
  const projectObject = projects.find((p) => p.title == project);
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
// Define a factory function for creating tasks
function createTask(name, description, dueDate, priority) {
  // Create the <li> element
  var li = document.createElement("li");
  li.className = "";

  // Create the <div> with class "task_list_item"
  var divTaskListItem = document.createElement("div");
  divTaskListItem.className = "task_list_item";

  // Create the <button> element with appropriate attributes
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
  svg.className = "tb7nk6f";

  // Create the <path> element with appropriate attributes
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("clip-rule", "evenodd");
  path.setAttribute(
    "d",
    "M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z"
  );
  path.setAttribute("fill", getColorForPriority(priority));

  // Append the <path> element to the <svg> element
  svg.appendChild(path);

  // Create the <span> element with class "task-checkbox-circle" and set its border color
  var span = document.createElement("span");
  span.className = "task-checkbox-circle";
  span.style.borderColor = getColorForPriority(priority);

  // Append the <svg> element to the <button> element
  button.appendChild(svg);

  // Append the <span> element to the <button> element
  button.appendChild(span);

  // Append the <button> element to the <div> with class "task_list_item"
  divTaskListItem.appendChild(button);

  // Create the <div> with class "task_list_item__content"
  var divTaskListItemContent = document.createElement("div");
  divTaskListItemContent.className = "task_list_item__content";

  // Create the <div> with class "task-title" and set its text content
  var divTaskTitle = document.createElement("div");
  divTaskTitle.className = "task-title";
  divTaskTitle.textContent = name; // Set the task name

  // Append the <div> with class "task-title" to the <div> with class "task_list_item__content"
  divTaskListItemContent.appendChild(divTaskTitle);

  // Create the <div> with class "task-description" and set its text content
  var divTaskDescription = document.createElement("div");
  divTaskDescription.className = "task-description";
  divTaskDescription.textContent = description; // Set the task description

  // Append the <div> with class "task-description" to the <div> with class "task_list_item__content"
  divTaskListItemContent.appendChild(divTaskDescription);

  // Create the <div> with class "task_list_item__info_tags" and set its data attribute
  var divTaskListInfoTags = document.createElement("div");
  divTaskListInfoTags.className = "task_list_item__info_tags";
  divTaskListInfoTags.setAttribute("data-layout", "list");

  // Create the <button> element with appropriate attributes
  var dueDateButton = document.createElement("button");
  dueDateButton.setAttribute("type", "button");
  dueDateButton.setAttribute("aria-expanded", "false");
  dueDateButton.className = "due_date_controls";

  // Create the <span> element with class "date date_future" and set its text content
  var spanDate = document.createElement("span");
  spanDate.className = "date date_future";
  spanDate.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12" class="calendar_icon"><path fill="currentColor" fill-rule="evenodd" d="M9.5 1h-7A1.5 1.5 0 0 0 1 2.5v7A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5v-7A1.5 1.5 0 0 0 9.5 1ZM2 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7ZM8.75 8a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM3.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z" clip-rule="evenodd"></path></svg>' +
    dueDate; // Set the due date dynamically

  // Append the <span> element to the <button> element
  dueDateButton.appendChild(spanDate);

  // Append the <button> element to the <div> with class "task_list_item__info_tags"
  divTaskListInfoTags.appendChild(dueDateButton);

  // Append the <div> with class "task_list_item__info_tags" to the <div> with class "task_list_item__content"
  divTaskListItemContent.appendChild(divTaskListInfoTags);

  // Append the <div> with class "task_list_item__content" to the <div> with class "task_list_item"
  divTaskListItem.appendChild(divTaskListItemContent);

  // Append the <div> with class "task_list_item" to the <li> element
  li.appendChild(divTaskListItem);

  // Create an empty <div> element and append it to the <li> element
  var divEmpty = document.createElement("div");
  li.appendChild(divEmpty);

  // Finally, return the created <li> element
  return li;
}

// Function to get color based on priority
function getColorForPriority(priority) {
  switch (priority) {
    case "high":
      return "rgb(209, 69, 59)"; // Red
    case "medium":
      return "rgb(235, 137, 9)"; // Yellow
    case "low":
    default:
      return "rgb(36, 111, 224)"; // Blue
  }
}

// Example usage:
var task1 = createTask("Task 1", "Description 1", "Apr 11", "high"); // High priority task
var task2 = createTask("Task 2", "Description 2", "Apr 12", "medium"); // Medium priority task
var task3 = createTask("Task 3", "Description 3", "Apr 13", "low"); // Low priority task

// Append the tasks wherever you want in your HTML document
const projects_ul = document.querySelector("#pojects-ul");
projects_ul.appendChild(task1);
projects_ul.appendChild(task2);
projects_ul.appendChild(task3);

//update the project list in html
// const selectProject = document.querySelector("#todo-project");
// projects.forEach((project) => {
//   const option = document.createElement("option");
//   option.textContent = project.title;
//   selectProject.appendChild(option);
// });

// // Define a factory function for creating tasks
// function createTask(name, description, dueDate, priority) {
//   // Create the <li> element
//   var li = document.createElement("li");
//   li.className = "";

//   // Create the <div> with class "task_list_item"
//   var divTaskListItem = document.createElement("div");
//   divTaskListItem.className = "task_list_item";

//   // Create the <button> element with appropriate attributes
//   var button = document.createElement("button");
//   button.setAttribute("type", "button");
//   button.setAttribute("role", "checkbox");
//   button.setAttribute("aria-checked", "false");
//   button.setAttribute("aria-label", "mark task as completed");
//   button.className = "task-checkbox";

//   // Create the <svg> element with appropriate attributes
//   var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//   svg.setAttribute("width", "24");
//   svg.setAttribute("height", "24");
//   svg.setAttribute("viewBox", "0 0 24 24");
//   svg.setAttribute("fill", "none");
//   svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
//   svg.className = "tb7nk6f";

//   // Create the <path> element with appropriate attributes
//   var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//   path.setAttribute("fill-rule", "evenodd");
//   path.setAttribute("clip-rule", "evenodd");
//   path.setAttribute(
//     "d",
//     "M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z"
//   );
//   path.setAttribute("fill", getColorForPriority(priority));

//   // Append the <path> element to the <svg> element
//   svg.appendChild(path);

//   // Create the <span> element with class "task-checkbox-circle" and set its border color
//   var span = document.createElement("span");
//   span.className = "task-checkbox-circle";
//   span.style.borderColor = getColorForPriority(priority);

//   // Append the <svg> element to the <button> element
//   button.appendChild(svg);

//   // Append the <span> element to the <button> element
//   button.appendChild(span);

//   // Append the <button> element to the <div> with class "task_list_item"
//   divTaskListItem.appendChild(button);

//   // Create the <div> with class "task_list_item__content"
//   // Create the <div> with class "task_list_item__content"
//   var divTaskListItemContent = document.createElement("div");
//   divTaskListItemContent.className = "task_list_item__content";

//   // Create the <div> with class "task-title" and set its text content
//   var divTaskTitle = document.createElement("div");
//   divTaskTitle.className = "task-title";
//   divTaskTitle.textContent = "name";

//   // Append the <div> with class "task-title" to the <div> with class "task_list_item__content"
//   divTaskListItemContent.appendChild(divTaskTitle);

//   // Create the <div> with class "task-description" and set its text content
//   var divTaskDescription = document.createElement("div");
//   divTaskDescription.className = "task-description";
//   divTaskDescription.textContent = "description";

//   // Append the <div> with class "task-description" to the <div> with class "task_list_item__content"
//   divTaskListItemContent.appendChild(divTaskDescription);

//   // Create the <div> with class "task_list_item__info_tags" and set its data attribute
//   var divTaskListInfoTags = document.createElement("div");
//   divTaskListInfoTags.className = "task_list_item__info_tags";
//   divTaskListInfoTags.setAttribute("data-layout", "list");

//   // Create the <button> element with appropriate attributes
//   var dueDateButton = document.createElement("button");
//   dueDateButton.setAttribute("type", "button");
//   dueDateButton.setAttribute("aria-expanded", "false");
//   dueDateButton.className = "due_date_controls";

//   // Create the <span> element with class "date date_future" and set its text content
//   var spanDate = document.createElement("span");
//   spanDate.className = "date date_future";
//   spanDate.innerHTML =
//     '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12" class="calendar_icon"><path fill="currentColor" fill-rule="evenodd" d="M9.5 1h-7A1.5 1.5 0 0 0 1 2.5v7A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5v-7A1.5 1.5 0 0 0 9.5 1ZM2 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7ZM8.75 8a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM3.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z" clip-rule="evenodd"></path></svg>Apr 11';

//   // Append the <span> element to the <button> element
//   dueDateButton.appendChild(spanDate);

//   // Append the <button> element to the <div> with class "task_list_item__info_tags"
//   divTaskListInfoTags.appendChild(dueDateButton);

//   // Append the <div> with class "task_list_item__info_tags" to the <div> with class "task_list_item__content"
//   divTaskListItemContent.appendChild(divTaskListInfoTags);

//   // Append the <div> with class "task_list_item__content" to the <div> with class "task_list_item"
//   divTaskListItem.appendChild(divTaskListItemContent);

//   // Append the <div> with class "task_list_item" to the <li> element
//   li.appendChild(divTaskListItem);

//   // Create an empty <div> element and append it to the <li> element
//   var divEmpty = document.createElement("div");
//   li.appendChild(divEmpty);

//   // Append the <div> with class "task_list_item__content" to the <div> with class "task_list_item"
//   divTaskListItem.appendChild(divTaskListItemContent);

//   // Append the <div> with class "task_list_item" to the <li> element
//   li.appendChild(divTaskListItem);

//   // Create an empty <div> element and append it to the <li> element
//   var divEmpty = document.createElement("div");
//   li.appendChild(divEmpty);

//   // Finally, return the created <li> element
//   return li;
// }

// // Function to get color based on priority
// function getColorForPriority(priority) {
//   switch (priority) {
//     case "high":
//       return "rgb(209, 69, 59)"; // Red
//     case "medium":
//       return "rgb(235, 137, 9)"; // Yellow
//     case "low":
//     default:
//       return "rgb(36, 111, 224)"; // Blue
//   }
// }

// // Example usage:
// var task1 = createTask("Task 1", "Description 1", "Apr 11", "high"); // High priority task
// var task2 = createTask("Task 2", "Description 2", "Apr 12", "medium"); // Medium priority task
// var task3 = createTask("Task 3", "Description 3", "Apr 13", "low"); // Low priority task

// // Append the tasks wherever you want in your HTML document
// const projects_ul = document.querySelector("#pojects-ul");
// projects_ul.appendChild(task1);
// projects_ul.appendChild(task2);
// projects_ul.appendChild(task3);
