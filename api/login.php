<?php 

include("config.php");

$data =json_decode(file_get_contents("php://input"),true);
$name = $data["name"];
$password = $data["password"];// step 1

$resp["status"] = mysqli_query($con, "update admin set loggedIn='1' where name = '$name' "); // step 2 & 3

echo json_encode($resp); // step 4

?>