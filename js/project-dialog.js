const ul = document.querySelector("#dropdown-select-51-listbox");
const btn = document.querySelector("#dropdown-select-51");
const dialogModal = document.querySelector(".project-dialog-wrapper");
console.log("success");
dialogModal.showModal();

for (let i = 0; i < ul.children.length; i++) {
  ul.children[i].addEventListener("mouseover", (e) => {
    if (e.target.tagName == "LI") {
      e.target.classList.add("dropdown_select__option--highlighted");
    }
  });
  ul.children[i].addEventListener("mouseleave", (e) => {
    if (e.target.tagName == "LI") {
      e.target.classList.remove("dropdown_select__option--highlighted");
    }
  });
  ul.children[i].addEventListener("click", (e) => {
    console.log(e.currentTarget.getAttribute("data-value"));
    const selected_color_data = document.querySelector("#selected_color_data");
    // get the two spans in selected_color_data element
    const spans = selected_color_data.querySelectorAll("span");
    // change the color of the first span background to var(--named-colorName)
    spans[0].style.backgroundColor = `var(--named-color-${e.currentTarget.getAttribute(
      "data-value"
    )})`;
    spans[1].textContent = e.currentTarget.textContent;
    ul.style.display = "none";
  });
}

btn.addEventListener("click", (e) => {
  console.log(ul.style.display);
  ul.style.display = ul.style.display == "block" ? "none" : "block";
});
