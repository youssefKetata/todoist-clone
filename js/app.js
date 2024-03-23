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

// modal

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
console.log(openModalBtn);
const closeModalBtn = document.querySelector(".btn-close");

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// open modal function
const openModal = function () {
  console.log("open modal");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// open modal event
openModalBtn.addEventListener("click", openModal);
