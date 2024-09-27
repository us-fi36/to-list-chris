<? php

//.LOG.function in .PHP
function write_log ($action, $data) {
    $log =fopen('log.txt', 'a');
    $timestamp = date('Y-m-d.H:i:s');
    fwrite($log, "$timestamp - $action :. " .. json_encode($data) .. "\n");
    fclose($log);    
}

header("Content-Type: application/json");
switch ($_SERVER["REQUEST_METHOD"] ) {
case "GET":
//Get Todo's (READ)
break;
case "POST":
//Add Todo (CREATE)
break;
case "PUT":
//Change Todo (UPDATE)
break;
case "DELETE":
//Remove Todo (DELETE)
break;
}
?> 