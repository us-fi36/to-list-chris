<?php
header('Content-Type: application/json');

// Log function in PHP
function write_log($action, $data) {
    $log = fopen('log.txt', 'a');
    $timestamp = date('Y-m-d H:i:s');
    fwrite($log, "$timestamp - $action: " . json_encode($data) . "\n");
    fclose($log);
}

// Lese vorhandene TODOS
$file = 'todo.json';
if (file_exists($file)) {
    $json_data = file_get_contents($file);
    $todos = json_decode($json_data, true);
} else {
    $todos = [];
}

// Füge einen neuen Eintrag hinzu
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    write_log("read json file", $todos);
    
    // Sicherstellen, dass der Wert vorhanden ist und nicht leer ist
    if (isset($input['todo']) && trim($input['todo']) !== '') {
        $todos[] = $input['todo'];
        file_put_contents($file, json_encode($todos));
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Leeres ToDo ist nicht erlaubt']);
    }
    exit;
}

// Rückgabe der TODOs
echo json_encode($todos);
?>