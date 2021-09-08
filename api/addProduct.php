<?php
include("config.php");

$name = $_POST["name"];
$section = $_POST["section"];
$quantity = $_POST["quantity"];
$price = $_POST["price"];
$description = $_POST["description"];

$img_name=$_FILES["image"]["name"];
move_uploaded_file($_FILES["image"]["tmp_name"],"../uploads/$img_name");
// step 1

$resp["status"] = mysqli_query($con, "insert into products(isReady, name, section, quantity, price, description, image) values('0','$name','$section','$quantity','$price','$description','uploads/$img_name')"); // step 2 & 3

echo json_encode($resp); // step 4



?>