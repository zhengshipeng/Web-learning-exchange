<?php

class Db
{	
	/*
	*(1)静态变量，保存全局实例，与类绑定，跟对象无关
	*(2)私有属性，为了避免类外部直接调用
	*/
	private static $instance;
	private static $connectSource;
	private $_dbConfig = array(
			'host' => '127.0.0.1',
			'user' => 'root',
			'password' => '',
			'database' =>'zsp'
		);
	/*
	*私有化构造函数，防止外界实例化对象
	*/
	private function __construct() 
	{

	}


	/*
	*私有化构造函数，防止外界克隆对象
	*/
	private function __clone()
	{

	}

	/*
	*静态方法，单例模式访问统一入口
	*返回对象中的唯一对象实例
	*/
	public static function getInstance()
	{
		if(!(self::$instance instanceof self))
		{
			self::$instance = new self();
			//self::$instance = new Db();
		}

		return self::$instance;
	}


	public function connect()
	{
		if(!self::$connectSource)
		{
			self::$connectSource = mysql_connect($this->_dbConfig['host'],$this->_dbConfig['user'],$this->_dbConfig['password']);
			if(!self::$connectSource)
			{
				throw new Exception('mysql connect error' . mysql_error());
			}

			mysql_select_db($this->_dbConfig['database'],self::$connectSource);
			mysql_query("set names UTF8",self::$connectSource);
		}
		
		return self::$connectSource;
	}



}

/*$connect = Db::getInstance();
$sql = "select * from pages";
$result = mysql_query($sql,$connect->connect());
$num = mysql_num_rows($result);
while($row=mysql_fetch_array($result)){
    $rows[]=$row;
} 
var_dump($rows);*/


































?>