// Auswahl der HTML-Elemente
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Laden der TODOs aus dem LocalStorage beim Start
document.addEventListener('DOMContentLoaded', function() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    // Erstellen der Listeneinträge aus den gespeicherten Daten
    savedTodos.forEach(function(todo) {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) {
            li.classList.add('completed'); // Wenn erledigt, durchstreichen
        }
        todoList.appendChild(li);
    });
});

// Event-Listener für das Hinzufügen neuer Einträge
todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Verhindert das automatische Neuladen der Seite
     e.preventDefault();
        const todoInput = document.getElementById('todoInput').value.trim(); // Entfernt überflüssige Leerzeichen
        if (todoInput === '') {
            console.log('Leere Einträge werden ver­wor­fen.');
            return; // Verhindert das Senden der leeren Anfrage
        }

    // Erstellen eines neuen Listeneintrags
    const li = document.createElement('li');
    li.textContent = todoInput.value;

    // Hinzufügen des neuen Listeneintrags zur Liste
    todoList.appendChild(li);

    // Liste im LocalStorage speichern
    saveTodos();

    // Eingabefeld zurücksetzen
    todoInput.value = '';
});

// Event-Listener für das Durchstreichen und Löschen von Einträgen
todoList.addEventListener('click', function(e) {
    // Überprüfen, ob der Klick auf ein Listenelement erfolgte
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed'); // Toggle des Durchstreichens
        saveTodos(); // Liste im LocalStorage aktualisieren
    }
});

// Speichern der aktuellen TODO-Liste im LocalStorage
function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('li').forEach(function(li) {
        todos.push({
            text: li.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
