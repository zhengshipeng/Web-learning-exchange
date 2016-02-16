<?php
//让crontab定时执行的脚本程序*/5* * * * /usr/bin/php /data/www/app/cron.php

require_once('./dbApp.php');
require_once('./fileApp.php');

$sql = "select * from pages where user_id = 1 order by created_at desc";
try{
	$connect = Db::getInstance()->connect();
}catch(Exception $e){
	file_put_contents('./logs/'.time().'.txt',$e->getMessage());
	return;
}

$result = mysql_query($sql,$connect);
$videos = array();
while ($video = mysql_fetch_assoc($result)) {
	$videos[] = $video;
}
$file = new File();
if($videos){
	$file->cacheData('index-crontab-cache',$videos);
}else{
	file_put_contents('./logs/'.time().'.txt','没有相关数据');
}
return;




























?>