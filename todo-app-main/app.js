//Getters
listInput = document.querySelector(".input-item");
todoList = document.querySelector(".todo-list");
numOfItems = document.querySelector("#items-left");
clearBtn = document.querySelector("#clear-btn");
allBtn = document.querySelector("#all");
activeBtn = document.querySelector("#active");
completedBtn = document.querySelector("#completed");
modeBtn = document.querySelector("#mode-btn");

//Event Listeners
listInput.addEventListener("keyup", addListItem);
todoList.addEventListener("click", listEvent);
clearBtn.addEventListener("click", clearCompleted);
allBtn.addEventListener("click", filterList);
activeBtn.addEventListener("click", filterList);
completedBtn.addEventListener("click", filterList);
modeBtn.addEventListener("click", changeMode);

addDraggableFuncs();

//Functions
function addListItem(event) {
  if (event.keyCode === 13) {
    let li = document.createElement("li");
    li.innerHTML = `
    <img src="images/icon-check.svg" alt="tick" class="tick hidden">
    <div class="item-image"></div>
    <p class="item-text">${listInput.value}</p>
    <img src="images/icon-cross.svg" alt="cross" class="cross">`;
    li.classList.add("white");
    li.setAttribute("draggable", "true");
    todoList.append(li);
    listInput.value = "";
  }
  addDraggableFuncs();
  checkItemsLeft();
}

function listEvent(event) {
  let item = event.target;
  if (item.classList[0] === "cross") {
    parentElement = item.parentElement;
    deleteListItem(parentElement);
  }

  if (item.classList[0] === "tick") {
    parentElement = item.parentElement;
    checkComplete(parentElement);
    item.classList.toggle("hidden");
  }

  checkItemsLeft();
}

//Removes item
function deleteListItem(target) {
  target.remove();
}

//Checks the completed status and toggles it
function checkComplete(target) {
  target.classList.toggle("completed");
}

// Checks number of uncompleted items in list
function checkItemsLeft() {
  let numItems = 0;
  let todos = Array.from(todoList.getElementsByTagName("li"));
  for (i = 0; i < todos.length; i++) {
    if (!todos[i].classList.contains("completed")) {
      numItems += 1;
    }
  }
  numOfItems.innerText = `${numItems} items left`;
}

//clear completed items off the list
function clearCompleted() {
  let todos = Array.from(todoList.getElementsByTagName("li"));
  for (i = 0; i < todos.length; i++) {
    if (todos[i].classList.contains("completed")) {
      deleteListItem(todos[i]);
    }
  }
}

//Filters list between, all / active / completed
function filterList(event) {
  let todos = Array.from(todoList.getElementsByTagName("li"));
  let sortBy = event.target.id;
  switch (sortBy) {
    case "all":
      todos.forEach(function (todo) {
        todo.style.display = "flex";
      });
      highlightBottomBtn(sortBy);
      break;
    case "active":
      todos.forEach(function (todo) {
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      });
      highlightBottomBtn(sortBy);
      break;
    case "completed":
      todos.forEach(function (todo) {
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      });
      highlightBottomBtn(sortBy);
      break;
  }
}

//Highlights the active button in bottom middle section
function highlightBottomBtn(button) {
  switch (button) {
    case "all":
      allBtn.classList.add("selected");
      activeBtn.classList.remove("selected");
      completedBtn.classList.remove("selected");
      break;
    case "active":
      allBtn.classList.remove("selected");
      activeBtn.classList.add("selected");
      completedBtn.classList.remove("selected");
      break;
    case "completed":
      allBtn.classList.remove("selected");
      activeBtn.classList.remove("selected");
      completedBtn.classList.add("selected");
      break;
  }
}

function changeMode() {
  //Getters
  const htmlBody = document.querySelector("body");
  const background = document.querySelector(".background");
  const lis = document.querySelectorAll("li");
  const dragDropText = document.querySelector(".drag-drop");
  const div_bottom_section = document.querySelector(".bottom-section");
  const div_bottom_middle_section = document.querySelector(
    ".bottom-middle-section"
  );

  //DOM Changers
  htmlBody.classList.toggle("dark-body");
  background.classList.toggle("dark-background");

  listInput.classList.toggle("dark");
  listInput.classList.toggle("dark-color");

  div_bottom_section.classList.toggle("dark");

  div_bottom_middle_section.classList.toggle("dark");

  lis.forEach((li) => {
    li.classList.toggle("dark");
    li.classList.toggle("dark-color");
  });

  if (modeBtn.src.match("moon")) {
    modeBtn.src = "images/icon-sun.svg";
  } else {
    modeBtn.src = "images/icon-moon.svg";
  }
}

//Dragging Functions - Unfinished
function addDraggableFuncs() {
  let draggables = document.querySelectorAll(".white");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
    draggable.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(draggables, e.clientY);
      if (afterElement == null) {
        todoList.appendChild(draggable);
      } else {
        todoList.insertBefore(draggable, afterElement);
      }
    });
  });
}

function getDragAfterElement(draggables, y) {
  let draggableLis = [...draggables];

  return draggableLis.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}
