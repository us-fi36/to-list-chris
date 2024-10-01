document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'todo-list.php';
    const todoList = document.getElementById('todo-list'); // Global definiert, damit es auch außerhalb verfügbar ist

    // Laden der bestehenden To-Do-Einträge
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const li = document.createElement('li');

//Löschen
const delButton = document.createElement('button');
delButton.textContent = 'Löschen';

delButton.addEventListener('click', function() {
    fetch(apiUrl, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: item.id })
})
.then(response => response.json())
.then(() => {
    li.remove();
    });
});

li.textContent = item.title;
            li.appendChild(delButton);  // Button hinzufügen
            todoList.appendChild(li);  // `li` hinzufügen, nachdem Text und Button gesetzt sind
        });
    });


    // Event-Listener für das Absenden des Formulars
    document.getElementById('todo-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const todoInput = document.getElementById('todo-input').value.trim(); // Entfernt überflüssige Leerzeichen
        if (todoInput === '') {
            console.log('Leere Einträge werden verworfen.');
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
            const li = document.createElement('li');
            li.textContent = data.title;
            todoList.appendChild(li);
        });
    });

    // Event-Listener für das Durchstreichen und Löschen von Einträgen
    todoList.addEventListener('click', function(e) {
        // Überprüfen, ob der Klick auf ein Listenelement erfolgte
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed'); // Toggle des Durchstreichens
        }
    });
});