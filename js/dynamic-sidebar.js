const sidebar = document.querySelector(".side-bar-container");
const resizeHandle = document.querySelector(".resize-handle");
const container = document.querySelector(".container");
let content = document.querySelector(".main_content");
const collapseIcon = document.querySelector(".collapse_icon");
// Set minimum and maximum width if the sidebar
const minWidth = 230; // Adjust minimum width in px
const maxWidth = 400; // Adjust maximum width in px

let isResizing = false;
let startWidth = 0;
let startCursorX = 0;
let paddingInline = 0;
let originalContentPadding = ""; // Store the original content padding

const hideMargin = -60;
const showMargin = 0;

function handleMouseDown(event) {
  const style = getComputedStyle(sidebar);
  event.preventDefault();
  isResizing = true;

  startWidth = sidebar.clientWidth;
  startCursorX = event.clientX;
}

function handleMouseUp() {
  isResizing = false;
}

function handleMouseMove(event) {
  if (!isResizing) return;

  const deltaX = event.clientX - startCursorX;
  const newWidth = startWidth + deltaX;
  sidebar.style.width = Math.min(Math.max(newWidth, minWidth), maxWidth) + "px";
}

function hideSideBar(width) {
  sidebar.style.marginLeft = `-${width}px`;
  collapseIcon.style.marginRight = hideMargin + "px"; // move collapse icon to the right
}

function showSideBar() {
  sidebar.style.marginLeft = "0px";
  collapseIcon.style.marginRight = showMargin + "px";
}

// Collapse sidebar

function handleCollapse() {
  let style = getComputedStyle(sidebar);
  let sidebar_marginLeft = parseInt(style.marginLeft);
  const width = sidebar.clientWidth;

  if (window.innerWidth < 750) mobile_sidebar(width);
  else {
    if (sidebar_marginLeft === 0) {
      hideSideBar(width);
      resizeHandle.style.display = "none"; // hide resize handle
    } else {
      showSideBar();
      resizeHandle.style.display = "block";
    }
  }
}

function addOverlay(container) {
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  container.appendChild(overlay);
}

function removeOverlay(container) {
  let overlay = document.querySelector(".overlay");
  if (overlay && container.contains(overlay)) {
    container.removeChild(overlay);
  }
}

function mobile_sidebar(width) {
  let overlay = document.querySelector(".overlay");
  if (sidebar.style.marginLeft === "0px") {
    hideSideBar(width);

    container.removeChild(overlay);
  } else {
    sidebar.style.zIndex = "1";
    sidebar.style.position = "absolute";
    sidebar.style.width = "250px";
    addOverlay(container);
    showSideBar();
  }
}

//keep the sidebar collapsed when the window is resized
window.addEventListener("resize", () => {
  if (window.innerWidth < 750) {
    const width = sidebar.clientWidth;
    hideSideBar(width);
    removeOverlay(container);
  } else {
    showSideBar();

    sidebar.style.position = "relative";

    removeOverlay(container);
  }
});

resizeHandle.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("mousemove", handleMouseMove);
collapseIcon.addEventListener("click", handleCollapse);
