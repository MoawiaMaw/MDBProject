<?php 

include("config.php");

// $data =json_decode(file_get_contents("php://input"),true);
// // step 1

$resp["status"] = mysqli_query($con, "update admin set loggedIn='0' where name = 'moawia ahmed' "); // step 2 & 3

echo json_encode($resp); // step 4

?>