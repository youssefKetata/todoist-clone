// list of priorities
const priorities = ["Low", "Medium", "High"];

// factory function to create projects that contain todos
const createProject = (title) => {
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
  return { title, addTodo, removeTodo, getTodos };
};

//create dafault project
const defaultProject = createProject("Default");

// factory function to create todo objects
const createTodo = (
  title,
  description,
  dueDate = new Date(),
  priority = priorities[1],
  project = defaultProject
) => {
  return { title, description, dueDate, priority, project };
};

// module to store all the todos in local storage

const todoList = (() => {
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
  return { addTodo, removeTodo, getTodos };
})();

// dialog box
const openDialogButton = document.getElementById("openDialog");
const myDialog = document.getElementById("myDialog");
const closeDialog = document.querySelector(".closeDialog");

openDialogButton.addEventListener("click", () => {
  myDialog.showModal();
});
closeDialog.addEventListener("click", () => {
  myDialog.close();
});
myDialog.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target === myDialog) {
    myDialog.close();
  }
});
