<?php
header('Content-Type: application/json');
$todo_file = 'todo.json';

// Überprüfen, ob die Datei existiert, andernfalls initialisieren
if (!file_exists($todo_file)) {
    file_put_contents($todo_file, json_encode([]));
}

$todo_items = json_decode(file_get_contents($todo_file), true);

switch ($_SERVER['REQUEST_METHOD']) {
case 'GET':
    echo json_encode($todo_items);
    write_log("READ", $todo_items);
    break;

case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['title'])) {
        $new_todo = ["id" => uniqid(), "title" => $data['title']];
        $todo_items[] = $new_todo;
        file_put_contents($todo_file, json_encode($todo_items));
        echo json_encode($new_todo);
    } else {
        echo json_encode(['error' => 'Title is required']);
        exit;
    }
    break;

case 'PUT':
    // Placeholder für das Aktualisieren eines TODO
    break;

case 'DELETE':
    $data = json_decode(file_get_contents('php://input'), true);
    $todo_items = array_filter($todo_items, function($todo) use ($data) {
        return $todo['id'] !== $data['id'];
    });
    file_put_contents($todo_file, json_encode($todo_items));
    echo json_encode(['status' => 'success']);
    write_log("DELETE", $data);
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