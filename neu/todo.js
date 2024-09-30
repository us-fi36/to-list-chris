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
        const todoInput = document.getElementById('todo-input').value.trim(); // Entfernt überflüssige Leerzeichen
        if (todoInput === '') {
            console.log('Leere Einträge werden ver­wor­fen.');
            return; // Verhindert das Senden der leeren Anfrage
        }
        // Wenn das Eingabefeld nicht leer ist, wird der To-Do Eintrag hinzugefügt
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
    });
    })

