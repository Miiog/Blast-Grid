<?php
	$name = $_POST['name'];
	$message = $_POST['message'];

	$file = fopen("./name.txt","w");
	fwrite($file,$name);//将英雄名写入文件
	fclose($file);

	$file = fopen("./info.txt","w");
	fwrite($file,$message);//将留言写入文件
	fclose($file);

	header("location:./index.html");
	exit;
?>