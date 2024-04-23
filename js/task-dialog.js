const enableAddTaskButton = () => {
  todoTitle.addEventListener("input", () => {
    const addTaskButton = document.querySelector("#add-task");
    addTaskButton.disabled = todoTitle.value ? false : true;
  });
};
enableAddTaskButton();

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
