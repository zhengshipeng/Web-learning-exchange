<?php


require "config.php";

	if($_POST){
		$info = array();
		$info['user'] = $_POST['user'];
		$info['question'] = $_POST['question'];
		$info['content'] = $_POST['content'];
		$info['contents'] = $_POST['contents'];
		$info['time'] = time();
		$sql = "INSERT INTO zhiwen_question (user,title,content,contents,time) VALUES ('".$info['user']."','".$info['question']."','".$info['content']."','".$info['contents']."','".$info['time']."')";
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