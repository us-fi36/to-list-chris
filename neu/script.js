function loadTodos() {
    fetch('todo-list.php')
    .then(Response => Response.json())
    .then(todos => {
        const todoList =
        document.getElementById('todoInput');
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = 
            document.createElement('li');
            li.textContent = todo;
            todoList.appendChild(li);
        })
    })
}
window.onload = loadTodos;

document.getElementById('todoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const todoInput = document.getElementById('todoInput').value;
    fetch('todoInput', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({todo: todoInput})
    })
    
    .then (response => response.json ())
    .then((data) =>{
    console.log(data)
    loadTodos();
    document.getElementById('todoInput').value ='';
    });
});