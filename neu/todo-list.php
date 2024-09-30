<?php

header("Content-Type: application/json");

function write_log($action, $data) {
    $log = fopen('log.txt', 'a');
    $timestamp = date('Y-m-d H:i:s');
    fwrite($log, "$timestamp - $action: " . json_encode($data) . "\n");
    fclose($log);
}

$file = 'todo.json';
$todos = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        write_log("READ", null);
        echo json_encode($todos);
        break;
        
    case "POST":
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['title'])) {
            $todos[] = $input;
            file_put_contents($file, json_encode($todos));
            write_log("CREATE", $input);
            echo json_encode(["message" => "ToDos hinzugefügt."]);
        } else {
            echo json_encode(["error" => "Fehlerhafte Eingabe."]);
        }
        break;
        
    case "PUT":
        write_log("PUT", null);
        break;
        
    case "DELETE":
        write_log("DELETE", null);
        break;
}
?>