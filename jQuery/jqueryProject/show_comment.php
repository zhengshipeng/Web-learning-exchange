<?php
sleep(1);
	require 'config.php';

	$sql = "SELECT * FROM zhiwen_comment WHERE titleid=".$_POST['titleid']." ORDER BY time DESC";

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