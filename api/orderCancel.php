<?php
include("config.php");

$data =json_decode(file_get_contents("php://input"),true);


$id = $data["id"];
$quantity = $data["quantity"];



$resp["update"] = mysqli_query($con, "update products set quantity = quantity + '$quantity' where id = '$id'");
$resp["status"] = mysqli_query($con, "delete from purchases where id = '$id'");

echo json_encode($resp);
?>