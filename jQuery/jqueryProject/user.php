<?php


require "config.php";

	$sql = "SELECT * FROM zhiwen_user WHERE user='".$_POST['userName']."'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);

	if($row){
			echo 'false';
			exit;
		}else{
			echo 'true';
			exit;
		}


?>