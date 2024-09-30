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
// Placeholder for creating a new TODO
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