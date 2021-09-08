<?php
include("config.php");
$id = $_POST["id"];

$result = mysqli_query($con, "select image from products where id=$id");
$row = mysqli_fetch_assoc($result); // {"img":"uploads/a22.png"}
unlink("../".$row["image"]); // ../uploads/a22.png

$img_name = $_FILES["image"]["name"];
move_uploaded_file($_FILES["image"]["tmp_name"],"../uploads/$img_name");
// step 1

$resp["status"] = mysqli_query($con , "update products set image ='uploads/$img_name' where id=$id"); // step 2 & 3

echo json_encode($resp); // step 4

?>