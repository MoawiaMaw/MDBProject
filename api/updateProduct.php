<?php
include("config.php");

$data =json_decode(file_get_contents("php://input"),true);
$id = $data["id"];
$name = $data["name"];
$section = $data["section"];
$quantity = $data["quantity"]; 
$price = $data["price"];
$description = $data["description"]; // step 1

$resp["status"] = mysqli_query($con, "update products set name='$name',section='$section',quantity='$quantity', price = '$price', description = '$description'  where id=$id"); // step 2 & 3

echo json_encode($resp); // step 4


?>