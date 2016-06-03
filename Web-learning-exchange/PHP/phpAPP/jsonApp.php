<?php

class Response{
	const JSON = 'json';//类里面定义常量

	/**
	* 输出通信数据
	*@param integer $code 状态码
	*@param string $message 提示信息
	*@param array $data 数据
	*@param format string get传参数显示格式（json，xml）
	*return string
	*/
	public static function showEnCode($code,$message,$data=array()){
		if(!is_numeric($code)){
			return '';
		}
		$type = isset($_GET['format']) ? $_GET['format'] : self::JSON;
		$result = array(
				'code' => $code,
				'message' => $message,
				'data' => $data,
			);

		if($type == 'json'){
			self::jsonEnCode($code,$message,$data);
			exit;
		}elseif($type == 'xml'){
			self::xmlOneEnCode($code,$message,$data);
			exit;
		}elseif($type == 'array'){
			var_dump($result);
		}else{
			//TODO
		}
	}

	/**
	* 按json方式输出通信数据
	*@param integer $code 状态码
	*@param string $message 提示信息
	*@param array $data 数据
	*return string
	*/
	public static function jsonEnCode($code,$message='',$data=array()){
		
		if(!is_numeric($code)){
			return '';
		}

		$result = array(
				'code' => $code,
				'message' => $message,
				'data' => $data
				);

		echo json_encode($result);
		exit;
	}

	/**
	* 按xml方式输出通信数据
	*@param integer $code 状态码
	*@param string $message 提示信息
	*@param array $data 数据
	*return string
	*/
	public static function xmlOneEnCode($code,$message='',$data=array()){

		if(!is_numeric($code)){
			return '';
		}
		$result = array(
				'code' => $code,
				'message' => $message,
				'data' => $data,
			);

		header("Content-Type:text/xml");
		$xml = "<?xml version='1.0' encoding='utf-8'?>\n";
		$xml .= "<root>\n";
		$xml .= self::xmlTwoEnCode($result);
		$xml.= "</root>\n";

		echo $xml;
	}


	public static function xmlTwoEnCode($result){
		$xml = $arr = '';
		foreach ($result as $key => $value) {
			if(is_numeric($key)){
				$arr = "id='{$key}'";
				$key = 'item';
			}
			/*if(preg_match('/^[0-9]*$/',$key)){
				$arr = "id='{$key}'";
				$key = 'item';
			}*/
			$xml .= "<{$key} {$arr}>";
			$xml .= is_array($value) ? self::xmlTwoEnCode($value) : $value;
			$xml .="</{$key}>";
		}
		return $xml;
	}


}


	

?>