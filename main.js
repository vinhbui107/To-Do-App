// array for to do item
let todoItems = [];

function renderTodo(todo) {
  // select the first element with a class of 'js-todo-list'
  const list = document.querySelector(".js-todo-list");

  // Use the ternary operator to check if `todo.checked` is true
  // if so, assign 'done' to `isChecked`. Otherwise, assign an empty string
  const isChecked = todo.checked ? 'done' : '';

  const node = document.createElement("li");
  node.setAttribute('class', 'todo-item ' + isChecked);

  node.setAttribute("date-key", todo.id);
  node.innerHTML = `
  <input id="${todo.id}" type="checkbox"/>
  <label for="${todo.id}" class="tick js-tick"></label>
  <span>${todo.text}</span>
  <button class="delete-todo js-delete-todo">
  <svg><use href="#delete-icon"></use></svg>
  </button>
`;

  list.append(node);
}

// ADD A TODO
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

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

// MARK A TASK AS COMPLETED
// select the entire list
const list = document.querySelector(".js-todo-list");
// add a click event listener to the list and its children
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemkey = event.target.parentElement.dataset.key;
    toggleDone(itemkey);
  }
})

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));

  // change status of todo item
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}
