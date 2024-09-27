<? php
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