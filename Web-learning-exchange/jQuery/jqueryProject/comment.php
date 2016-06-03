<?php


require "config.php";

	if($_POST){
		$info = array();
		$info['user'] = $_POST['user'];
		$info['titleid'] = $_POST['titleid'];
		$info['comment'] = $_POST['comment'];
		$info['time'] = time();
		$sql = "INSERT INTO zhiwen_comment (user,titleid,comment,time) VALUES ('".$info['user']."','".$info['titleid']."','".$info['comment']."','".$info['time']."')";
		$result = mysql_query($sql);
		if($result){
			echo 2;
		}else{
			echo 1;
		}
	}else{
		echo 1;
	}





?>