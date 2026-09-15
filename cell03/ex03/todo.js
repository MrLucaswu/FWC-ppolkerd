const newBtn = document.getElementById('newBtn');
const ftList = document.getElementById('ft_list');
function saveTodos() {
    const todos = [];
    const items = ftList.children;
    for (let i = 0; i < items.length; i++) {
        todos.push(items[i].textContent);
    }
    const jsonStr = JSON.stringify(todos);
    document.cookie = "todoCookie=" + encodeURIComponent(jsonStr) + "; path=/; max-age=86400";
}
function loadTodos() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf("todoCookie=") === 0) {
            const cookieData = c.substring("todoCookie=".length, c.length);
            if (cookieData) {
                try {
                    const todos = JSON.parse(decodeURIComponent(cookieData));
                    todos.forEach(text => {
                        addTodoToDOM(text, true);
                    });
                } catch (e) {
                    console.error("Error parsing cookies", e);
                }
            }
            break;
        }
    }
}
function addTodoToDOM(text, isLoad = false) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.textContent = text;
    div.addEventListener('click', function() {
        if (confirm('Do you really want to remove this TO DO?')) {
            div.remove();
            saveTodos();
    });
    if (isLoad) {
        ftList.appendChild(div);
    } else {
        ftList.prepend(div);
    }
}
newBtn.addEventListener('click', function() {
    const text = prompt('Create a new TO DO:');
    if (text !== null && text.trim() !== '') {
        addTodoToDOM(text, false);
        saveTodos();
    }
});
window.onload = loadTodos;