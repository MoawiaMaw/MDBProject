<?php
include("config.php");

$data =json_decode(file_get_contents("php://input"),true);

$id = $data["id"];
$name = $data["name"];
$address = $data["address"];
$phone = $data["phone"];
$product = $data["product"];
$quantity = $data["quantity"];
$price = $data["price"];

$resp["status"] = mysqli_query($con, "insert into purchases(id, name, address, phone, product, price, quantity) values('$id','$name','$address','$phone','$product','$price','$quantity')"); // step 2 & 3
$resp["update"] = mysqli_query($con, "update products set quantity = quantity - '$quantity' where id = '$id'");

echo json_encode($resp)
?>
