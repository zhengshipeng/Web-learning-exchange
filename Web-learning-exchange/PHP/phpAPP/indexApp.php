<?php
	require_once('./jsonApp.php');
	require_once('./dbApp.php');
	require_once('./fileApp.php');
	/**
	*@param $page number 分页
	*@param $pageSize number 每一页显示条数
	*@param $videos array 查询出的数据拼接为一个数组	
	*@param 401：传入的$page $pageSize不是数字
	*@param 403：数据库连接出错
	*@param 400：查询数据失败，$videos为空
	*@param 200：数据获取成功 
	*/
	$page = isset($_GET['page']) ? $_GET['page'] : 1;
	$pageSize = isset($_GET['pageSize']) ? $_GET['pageSize'] : 10;
	if(!is_numeric($page) || !is_numeric($pageSize)){
		return Response::showEnCode(401,'数据不合法');
	}
	$cache = new File();
	$videos =array();
	$videos = $cache->cacheData('index-mk-cache'.$page.'-'.$pageSize);
	$offSet = ($page-1)*$pageSize;
	$sql = "select * from pages where user_id = 1 order by created_at desc limit ".$offSet.",".$pageSize; 
	if(!$videos){
		try{
			$connect = Db::getInstance()->connect();
		}catch(Exception $e){
			return Response::showEnCode(403,'数据库连接失败');
		}
	
		$result = mysql_query($sql,$connect);
		while ($video = mysql_fetch_assoc($result)) {
			$videos[] = $video;
		}
		if($videos){
			$cache->cacheData('index-mk-cache'.$page.'-'.$pageSize,$videos,600);
		}
	}


	if($videos){
		return Response::showEnCode(200,'数据查询成功',$videos);
	}else{
		return Response::showEnCode(400,'数据查询为空');
	}





































?>