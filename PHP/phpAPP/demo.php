<?php

//require_once('./jsonApp.php');
require_once('./fileApp.php');




$arrs = array(
		'id' => 1,
		'name' => "zhengshipengssss",
		'num' => array(1,2,3,'indexs'=>'哈哈哈哈','number'=>array('id'=>2,'name'=>'zsp',3,4,10))
	);


//Response::jsonEnCode(200,'成功',$arr);
//Response::xmlOneEnCode(200,'success',$arrs);
//Response::showEnCode(200,'success',$arrs,'json');
//Response::showEnCode(200,'success',$arrs);

$file = new File();

/*$fileCache = $file->cacheData('index-file-cache',$arrs,600);
if($fileCache){
	echo "SUCCESS";
}else{
	echo "ERROR";
}*/


 $fileLook = $file->cacheData('index-file-cache');
if($fileLook){
	var_dump($fileLook);exit;
}else{
	echo "ERROR";
}


/*$fileLook = $file->cacheData('index-file-cache',null);
if($fileLook){
	echo "SUCCESS";
}else{
	echo "ERROR";
}
*/











?>