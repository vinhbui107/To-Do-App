// array for to do item
let todoItems = [];


function addTodo(text) {
  const todo = {
    text,
    check: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  console.log(todoItems);
}

const form = document.querySelector('.')

function removeTodo() {}

function updateTodo() {}

function clearTodo() {}
