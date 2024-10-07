document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'todo-list.php';
    const todoList = document.getElementById('todo-list');

    // Event-Listener für das Absenden des Formulars
    document.getElementById('todo-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const todoInput = document.getElementById('todo-input').value.trim();
        
        if (todoInput === '') {
            console.log('Leere Einträge werden verworfen.');
            return; // Verhindert das Senden der leeren Anfrage
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: todoInput })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            const li = document.createElement('li');
            li.textContent = data.title;
            li.dataset.id = data.id; // ID speichern

            // Löschen-Button hinzufügen
            const delButton = document.createElement('button');
            delButton.textContent = 'Löschen';
            delButton.addEventListener('click', function() {
                const todoId = li.dataset.id; // ID vom Listenelement abrufen
                fetch(apiUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: todoId }) // Verwende die ID
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Fehler beim Löschen');
                    }
                    li.remove(); // Entfernt den Listeneintrag
                })
                .catch(error => {
                    console.error('Fehler beim Löschen:', error);
                });
            });

            li.appendChild(delButton);  // Button hinzufügen
            todoList.appendChild(li);
            document.getElementById('todo-input').value = ''; // Eingabefeld leeren
        })
        .catch(error => {
            console.error('Fehler beim Hinzufügen:', error);
        });
    });
});