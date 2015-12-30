<?php


require "config.php";

		if($_GET){
			$data = array();
			$data['user'] = $_GET['userName'];
			$data['pass'] = $_GET['userPass'];
			$data['email'] = $_GET['userEmail'];
			$data['sex'] = $_GET['sex'];
			$data['date'] = $_GET['userDate'];
			$data['time'] = time();
			$sql = "INSERT INTO zhiwen_user (user,pass,email,sex,dates,time) VALUES ('".$data['user']."','".$data['pass']."','".$data['email']."','".$data['sex']."','".$data['date']."','".$data['time']."')";
			$result = mysql_query($sql);
			if($result){
				echo 2;
			}else{
				echo 1;
			}
			
		}elseif($_POST){
			$info = array();
			$info['name'] = $_POST['name'];
			$info['pass'] = $_POST['pass'];
			$sql = "SELECT * FROM zhiwen_user WHERE user='".$info['name']."' AND pass='".$info['pass']."'";
			$result = mysql_query($sql);
			$row = mysql_fetch_array($result);
			if($row){
				echo 2;
			}else{
				echo 1;
			}
		}else{
			echo 1;
		}



?>