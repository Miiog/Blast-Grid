<!DOCTYPE html>
<html>
<head>
	<title>Blast Grid</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="./css/all.css">
	<link rel="stylesheet" type="text/css" href="./css/herosheet.css">
	<script type="text/javascript" src="./js/heroScript.js"></script>
	<?php
	
  		$master = $_COOKIE["goal"];//获取分数cookie
  	/*
  		$file = fopen("./master.txt","w");
		fwrite($file,$master);//将最高分写入文件
		fclose($file);
		setcookie("goal", NULL);//删除cookie
	*/

		$con = mysqli_connect("localhost","root","","blastgrid") or die("Could not connect: " . mysqli_error($con));
		mysqli_query($con,"SET NAMES utf8") or die("Could not encode :".mysqli_error($con));
		$sql = "UPDATE hero SET master = $master WHERE id = 1;";
		$res = mysqli_query($con, $sql);
		//echo mysqli_affected_rows($con);
		/*
		if( mysqli_affected_rows($con) == 0 )
		{
    		header("location:./faild.html");
    		exit();
		}
		*/
		mysqli_close($con);	
	?>
</head>
<body>
	<div class="battlefield">
		<p id="title_info">Hero, your message will be display on the index!</p>
		<form id="form" onsubmit="return check()" action="./saveinfo.php" method="post">
			<label><p>Your name:</p>
				<input id="name" name="name" type="text" />
			</label>
			<br /><br />
			<label><p>Leave your message:</p>
				<textarea id="message" name="message" type="text" maxlength="200">
				</textarea>
			</label>
			<br /><br />
			<label>
				<input id="btnSubmit" value="OK" type="submit" />
				<p id="info"></p>
			</label>
			
		</form>
			
		</div>
	</div>
</body>
</html>