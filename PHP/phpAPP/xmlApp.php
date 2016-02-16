<?php

class Response{
	public  function xml(){
		header("Content-type:text/xml");
		$xml = "<?xml version='1.0' encoding='UTF-8'?>\n";
		$xml .= "<root>\n";
		$xml .= "<code>200</code>\n";
		$xml .= "<name>zheng</name>\n";
		$xml .= "<data>\n";
		$xml .= "<id>100</id>\n";
		$xml .= "<sex>男</sex>\n";
		$xml .= "</data>\n";
		$xml .= "</root>";

		echo $xml;
	}

	/*
	*方法2：使用DomDocument生成XML文件
	*创建节点使用createElement方法，
	*创建文本内容使用createTextNode方法，
	*添加子节点使用appendChild方法，
	*创建属性使用createAttribute方法
	*/
	public  function xml1(){
		header("Content-type:text/xml");
		$dom = new DOMDocument('1.1','utf-8');
		$root = $dom->createElement('root');
		$name = $dom->createElement('names','zhengshipeng');
		$sex = $dom->createElement('sexs','女');
		$data = $dom->createElement('data');
		$id = $dom->createElement('id',1);

		/*createElement创建节点*/
		$address = $dom->createElement('address');
		/*createTextNode创建文本内容*/
		$test = $dom->createTextNode('湖北');
		/*createAttribute创建属性*/
		$shuxing = $dom->createAttribute('class');
		$aval = $dom->createTextNode('add');
		$dom ->appendChild($root);
		$root->appendChild($name);
		$root->appendChild($sex);
		$root->appendChild($data);
		$data->appendChild($id);
		$data->appendChild($address);
		$address->appendChild($test);
		$address->appendChild($shuxing);
		$shuxing->appendChild($aval);
		echo $dom->savexml();
	}


}

$res = new Response();
//$res->xml();
$res->xml1();	

?>