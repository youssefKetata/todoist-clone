import { priorities, deleteTask } from "./app.js";

export default function appendTask(name, description, dueDate, priority) {
  let li = document.createElement("li");
  li.className = "";

  let divTaskListItem = document.createElement("div");
  divTaskListItem.className = "task_list_item";

  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("role", "checkbox");
  button.setAttribute("aria-checked", "false");
  button.setAttribute("aria-label", "mark task as completed");
  button.className = "task-checkbox";

  // Create the <svg> element with appropriate attributes
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  //   svg.className = "";

  // Create the <path> element with appropriate attributes
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("clip-rule", "evenodd");
  path.setAttribute(
    "d",
    "M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z"
  );
  path.setAttribute("fill", getColorForPriority(priority));

  svg.appendChild(path);

  // Create the <span> element with class "task-checkbox-circle" and set its border color
  let span = document.createElement("span");
  span.className = "task-checkbox-circle";
  span.style.borderColor = getColorForPriority(priority);

  button.appendChild(svg);

  button.appendChild(span);

  divTaskListItem.appendChild(button);
  let divTaskListItemContent = document.createElement("div");
  divTaskListItemContent.className = "task_list_item__content";

  let divTaskTitle = document.createElement("div");
  divTaskTitle.className = "task-title";
  divTaskTitle.textContent = name; // Set the task name

  divTaskListItemContent.appendChild(divTaskTitle);

  let divTaskDescription = document.createElement("div");
  divTaskDescription.className = "task-description";
  divTaskDescription.textContent = description; // Set the task description

  divTaskListItemContent.appendChild(divTaskDescription);

  let divTaskListInfoTags = document.createElement("div");
  divTaskListInfoTags.className = "task_list_item__info_tags";
  divTaskListInfoTags.setAttribute("data-layout", "list");

  let dueDateButton = document.createElement("button");
  dueDateButton.setAttribute("type", "button");
  dueDateButton.setAttribute("aria-expanded", "false");
  dueDateButton.className = "due_date_controls";

  let spanDate = document.createElement("span");
  spanDate.className = "date date_future";
  spanDate.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12" class="calendar_icon"><path fill="currentColor" fill-rule="evenodd" d="M9.5 1h-7A1.5 1.5 0 0 0 1 2.5v7A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5v-7A1.5 1.5 0 0 0 9.5 1ZM2 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7ZM8.75 8a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM3.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z" clip-rule="evenodd"></path></svg>' +
    dueDate; // Set the due date dynamically

  dueDateButton.appendChild(spanDate);

  divTaskListInfoTags.appendChild(dueDateButton);

  divTaskListItemContent.appendChild(divTaskListInfoTags);

  divTaskListItem.appendChild(divTaskListItemContent);

  li.appendChild(divTaskListItem);

  let divEmpty = document.createElement("div");

  li.appendChild(divEmpty);
  const taskActions = createTaskActionsElement(name);
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

function createTaskActionsElement(name) {
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

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.ariaLabel = "Delete";
  deleteBtn.dataset.actionHint = "task-delete";
  deleteBtn.classList.add("task_list_item__delete_link");
  deleteBtn.setAttribute("id", "delete-task");
  deleteBtn.innerHTML = createDeleteButtonSvg();
  deleteBtn.addEventListener("click", () => {
    // how can i access the variale name in the parent funtion

    deleteTask(name);
  });

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
  element.appendChild(deleteBtn);
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

function createDeleteButtonSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true">
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0h24v24H0z"></path>
      <rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5" ></rect>
      <path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z" ></path>
      <path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"></path></g></svg>`;
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
