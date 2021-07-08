let todos = [];
const list = document.getElementById('list')

getTodos();

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addItem();
    }
}, false);

list.addEventListener('click', function (event) {
    if (event.target.classList.contains('item')) {
        deleteTodo(event.target.getAttribute('data-key'));
    }
});

list.addEventListener('contextmenu', function (event) {
    if (event.target.classList.contains('item')) {
        toggle(event.target.getAttribute('data-key'));
    }
});

document.addEventListener('contextmenu', event => event.preventDefault());

function addItem() {
    let text = document.getElementById("task").value;
    if (text.trim() != "") {
        document.getElementById("task").value = '';
        const todo = {
            id: Date.now(),
            name: text,
            completed: false
        };
        todos.push(todo);
        saveTodos(todos);
    }
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos(todos);
}

function loadTodos(todos) {
    list.innerHTML = '';
    todos.forEach(function (item) {
        const element = document.createElement("div");
        element.setAttribute('class', 'item');
        element.setAttribute('data-key', item.id);
        element.innerHTML = item.name
        if (item.completed == true) {
            element.setAttribute('class', 'item completed');
        }
        list.append(element);
    });
}

function getTodos() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        loadTodos(todos);
    }
}

function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });
    saveTodos(todos);
}

function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    saveTodos(todos);
}

