<?php
	require 'config.php';

	$sql = "SELECT (SELECT COUNT(*) FROM zhiwen_comment WHERE titleid=a.id) AS count,a.id,a.user,a.title,a.content,a.contents,a.time FROM zhiwen_question a ORDER BY a.time DESC";

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