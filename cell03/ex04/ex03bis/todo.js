$(document).ready(function() {
     function saveTodos() {
        const todos = [];
        $('#ft_list .todo-item').each(function() {
            todos.push($(this).text());
        });
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
                        $.each(todos, function(index, text) {
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
        const $div = $('<div></div>').addClass('todo-item').text(text);
        $div.click(function() {
            if (confirm('Do you really want to remove this TO DO?')) {
                $(this).remove();
                saveTodos();
            }
        });
        if (isLoad) {
            $('#ft_list').append($div);
        } else {
            $('#ft_list').prepend($div);
        }
    }
    $('#newBtn').click(function() {
        const text = prompt('Create a new TO DO:');
        if (text !== null && text.trim() !== '') {
            addTodoToDOM(text, false);
            saveTodos();
        }
    });
    loadTodos();
});