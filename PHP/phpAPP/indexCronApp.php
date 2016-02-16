<?php

require_once('./fileApp.php');
require_once('./jsonApp.php');
$file = new File();
$videos = $file->cacheData('index-crontab-cache');
if($videos){
	return Response::showEnCode(200,'首页数据获取成功',$videos);
}else{
	return Response::showEnCode(400,'数据获取失败');
}





















?>