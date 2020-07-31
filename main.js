// array for to do item
let todoItems = [];

function renderTodo(todo) {
  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    // remove the item form the DOM
    item.remove();
    return;
  }

  // Use the ternary operator to check if `todo.checked` is true
  // if so, assign 'done' to `isChecked`. Otherwise, assign an empty string
  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", "todo-item " + isChecked);

  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
  <input id="${todo.id}" type="checkbox"/>
  <label for="${todo.id}" class="tick js-tick"></label>
  <span>${todo.text}</span>
  <button class="delete-todo js-delete-todo">
  <svg><use href="#delete-icon"></use></svg>
  </button>
`;

  // If the item already in the DOM
  if (item) {
    //replace it
    list.replaceChild(node, item);
  } else {
    // otherwise append it to the end of the list
    list.append(node);
  }
}

// ADD A TODO
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

//select the form element
const form = document.querySelector(".js-form");

// add a submit event listener
form.addEventListener("submit", (event) => {
  //preve page refresh on form submission
  event.preventDefault();

  // select the text input
  const input = document.querySelector(".js-todo-input");

  // get value of the input and remove whitespace
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});
// END ADD A TODO

// MARK A TASK AS COMPLETED
function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));

  // change status of todo item
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

// DELETE A TODO
function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));

  // create a new object with pro of the current todo item
  const todo = {
    deleted: true,
    ...todoItems[index],
  };

  // remove the todo item from the array by filtering it out
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}

// select the entire list
const list = document.querySelector(".js-todo-list");
// add a click event listener to the list and its children
if (list) {
  list.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-tick")) {
      const itemKey = event.target.parentElement.dataset.key;
      toggleDone(itemKey);
    }

    if (event.target.classList.contains("js-delete-todo")) {
      const itemKey = event.target.parentElement.dataset.key;
      deleteTodo(itemKey);
    }
  });
}
// END MARK AND DELETE TODO
