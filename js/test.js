setTimeout(() => {
  // new map colors
  // const mapColors = {
  //   berry_red: "#b8255f",
  //   red: "#cf473a",
  //   orange: "#c77100",
  //   yellow: "#b29104",
  //   olive_green: "#949c31",
  //   lime_green: "#65a33a",
  //   green: "#369307",
  //   mint_green: "#42a393",
  //   teal: "#148fad",
  //   sky_blue: "#319dc0",
  //   light_blue: "#6988a4",
  //   blue: "#2a67e2",
  //   grape: "#692ec2",
  //   violet: "#ac30cc",
  //   lavender: "#a4698c",
  //   magenta: "#e05095",
  //   salmon: "#b2635c",
  //   charcoal: "#808080",
  //   grey: "#999",
  //   taupe: "#8f7a69",
  // };
  console.log("Hello from test.js");
  const ul = document.querySelector("#dropdown-select-51-listbox");

  const btn = document.querySelector("#dropdown-select-51");
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
      const selected_color_data = document.querySelector(
        "#selected_color_data"
      );
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
}, 500);
