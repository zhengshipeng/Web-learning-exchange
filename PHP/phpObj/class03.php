<?php

class cateImg
{
	/*当对象被当做string使用时，这个方法会被自动调用。*/
	public function __tostring()
	{
		return "This is the class magictest <br/>";
	}

	/*当对象被当成方法调用时，这个方法会被自动调用*/
	public function __invoke($key)
	{
		echo $key."<br/>";
	}

	/*
	当对象访问不存在的方法名称的时候__call方法会被调用
	方法的重载，这个方法的参数第一个就是调用的方法名称，第二个参数是方法调用的参数组成的数组
	*/
	public function __call($name,$arguments)
	{
		echo "Calling " .$name. " with parameters: ".implode(",",$arguments)."<br/>";
	}

	/*
	当对象调用不存在的静态方法的时候__callStatic方法会被自动调用
	静态方法的重载，这个方法需要设定为static
	*/
	public static function __callStatic($name,$arguments)
	{
		echo "Callstatic " .$name. " with parameters: ".implode(",",$arguments)."<br/>";
	}

	/*读取不可访问属性时，__get会被调用*/
	public function __get($name)
	{
		return $name."属性不可以访问<br/>";
	}

	/*在给不可访问属性赋值时，__set会被调用*/
	public function __set($name,$value)
	{
		echo $name. " 属性不可以赋值为 ".$value."<br/>";
	}

	/*当对不可访问属性调用isset(),empty()时，__isset会被调用*/
	public function __isset($name)
	{
		echo $name." 不可访问";
	}

	/*当对不可访问属性调用unset()时，__unset会被调用*/
	public function __unset($name)
	{
		echo $name."不可访问";
	}

}




$obj = new cateImg();
//echo $obj;
//$obj(4);
//$obj->test('para1','para2');
//cateImg::test('para3','para4');
echo $obj->className;
$obj->className = "xxx";
isset($obj->className);
empty($obj->classSex);
unset($obj->className);



class keLong
{
	public $name;
	public function __clone()
	{
		$this->name = "BBB";
	}
}

$ke1 = new keLong();
$ke1->name = "james1";
$ke2 = clone $ke1;
echo $ke2->name;
$ke2->name = "james2";
echo $ke1->name;
echo $ke2->name;




















?>