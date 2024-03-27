// create af untion that return to do object
// object have title, description, date, priority, labels, status, project(there should be a default project)

//funtion to create a new project object with name, color, and todos

function createProject(name, color, todos) {
  return {
    name,
    color,
    todos,
  };
}

function createTodo(
  title,
  description,
  date,
  priority,
  labels,
  status,
  project
) {
  return {
    title,
    description,
    date,
    priority,
    labels,
    status,
    project,
  };
}

//create default project if it doesn't exist
function createDefaultProject() {
  const defaultProject = createProject("Default", "blue", []);
  return defaultProject;
}
