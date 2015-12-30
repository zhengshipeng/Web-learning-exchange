<?php
sleep(1);
	require 'config.php';

	$_sql = "SELECT COUNT(*) AS count FROM zhiwen_comment WHERE titleid=".$_POST['titleid'];
	$_query = mysql_query($_sql);
	$_result = mysql_fetch_array($_query,MYSQL_ASSOC);
	$_pagesize = 2;
	$_count = ceil($_result['count']/$_pagesize);
	if(!isset($_POST['page'])){
		$_page = 1;
	}else{
		$_page = $_POST['page'];
		if($_page>$_count){
			$_page = $_count;
		}
	}
	/*0,2
	2,2
	4,2
	6,2*/
	$_limit = ($_page-1)*$_pagesize;

	$sql = "SELECT ({$_count}) AS count,titleid,comment,user,time FROM zhiwen_comment WHERE titleid=".$_POST['titleid']." ORDER BY time DESC LIMIT {$_limit},{$_pagesize}";

	$query = mysql_query($sql);

	while (!!$row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		foreach ($row as $key => $value) {
			$row[$key] = urlencode(str_replace('\n', '', $value));
		}

		$json .= urldecode(json_encode($row)).',';
		
	}
	echo '['.substr($json,0,strlen($json)-1).']';

	mysql_close();





?>