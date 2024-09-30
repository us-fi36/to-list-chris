document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'todo-list.php';
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const todoList = document.getElementById('todo-list');
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.title;
            todoList.appendChild(li);
        });
    });

    document.getElementById('todo-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const todoInput = document.getElementById('todo-input').value;
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: todoInput })
        })
        .then(response => response.json())
        .then(data => {
            const todoList = document.getElementById('todo-list');
            const li = document.createElement('li');
            li.textContent = data.title;
            todoList.appendChild(li);
        });
    })
})

