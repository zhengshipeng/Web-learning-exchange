<?php

class File{

	/*
	说明：__FILE__
	echo __FILE__ ; // 取得当前文件的绝对地址，结果：D:\www\test.php
	echo dirname(__FILE__); // 取得当前文件所在的绝对目录，结果：D:\www\
	echo dirname(dirname(__FILE__)); //取得当前文件的上一层目录名，结果：D:\
	说明：dirname  返回路径中的目录部分
	说明：is_file  检查函数指定的文件名是否存在
	说明: is_null  检查变量是否为null
	说明：filemtime() 函数返回文件内容上次的修改时间
	*/

	private $_dir;

	const EXT = '.txt';

	public function __construct(){
		$this->_dir = dirname(__FILE__).'/files/';
	}

	/**
	*cacheData静态缓存文件，删除文件，读取文件
	*@param string $key 缓存文件名
	*@param string array integer $value  需要缓存的数据
	*@param int $cacheTime 缓存失效时间
	*return  true or false
	*/
	public function cacheData($key,$value='',$cacheTime=0){
		$filename = $this->_dir.$key.self::EXT;

		if($value !== ''){
			if(is_null($value)){
				return @unlink($filename);
				exit;
			}
			$dir = dirname($filename);
			if(!is_dir($dir)){
				mkdir($dir,0777);
			}
			$cacheTime = sprintf('%011d',$cacheTime);
			return file_put_contents($filename, $cacheTime.json_encode($value));
		}else{
			if(!is_file($filename)){
				return FALSE;
			}else{
				$contents = file_get_contents($filename);
				$cacheTime = (int)substr($contents,0,11);
				$value = substr($contents,11);
				if($cacheTime!=0 && ($cacheTime+filemtime($filename)<time())){
					unlink($filename);
					return FALSE;
				}
				return json_decode($value,true);
			}
			
		}

	} 












}
























?>