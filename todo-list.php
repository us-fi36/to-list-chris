<?php
header('Content-Type: application/json');
$todo_file = 'todo.json';
$todo_items = json_decode(file_get_contents($todo_file), true);

switch ($_SERVER['REQUEST_METHOD']) {
case 'GET':
    echo json_encode($todo_items);
    write_log("READ", $todo_items);
break;
case 'POST':
// Get data from the input stream.
$data = json_decode(file_get_contents('php://input'), true);
// Create new todo item.
$new_todo = ["id" => uniqid(), "title" => $data['title']];
// Add new item to our todo item list.
$todo_items[] = $new_todo;
// Write todo items to JSON file.
file_put_contents($todo_file, json_encode($todo_items));
// Return the new item.
echo json_encode($new_todo);
break;
case 'PUT':
// Placeholder for updating a TODO
break;
case 'DELETE':
// Placeholder for deleting a TODO
break;
}

// LOG function in PHP
function write_log($action, $data) {
    $log = fopen('log.txt', 'a');
    $timestamp = date('Y-m-d H:i:s');
    fwrite($log, "$timestamp - $action: " . json_encode($data) . "\n");
    fclose($log);
}
?>