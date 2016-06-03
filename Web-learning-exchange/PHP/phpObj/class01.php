<?php

/*
*interface关键字用于定义接口
*接口里面的方法不需要具体实现
*可以用extends让接口继承接口
*当类实现子接口时，父接口定义的方法也需要在这个类里面具体实现
*/
interface iCanEat
{
	public function eat($food);
}

interface iCanPee extends iCanEat
{
	public function pee();
}

/*
*implements关键字用于表示类实现某个接口
*实现了某个接口后，必须提供接口中定义的方法的具体实现
*/
class huMan implements iCanEat
{
	public function eat($food)
	{
		echo "huMan eating ".$food."\n";
	}
}

class Animal implements iCanEat
{
	public function eat($food)
	{
		echo "animal eating ".$food."\n";
	}
}

class plant implements iCanPee
{
	public function pee()
	{
		echo "I can pee \n";
	}

	public function eat($food)
	{
		echo "I can eating \n";
	}
}

$obj = new huMan();
//$obj->eat("Apple");
$ani = new Animal();
//$ani->eat("banana");
$plant = new plant();
//$plant->pee();
//$plant->eat("pear");
/*可以用instanceof关键字来判断某个对象是否实现了某个接口*/
var_dump($obj instanceof iCanEat);

function cheackEat($obj)
{
	if($obj instanceof iCanEat){
		$obj->eat("food");
	}else{
		echo "The obj can't eat \n";
	}
}

/*相同的一行代码，对于传入不同的接口的实现的对象的时候，表现是不同的，这就是多态*/
cheackEat($obj);
cheackEat($ani);



















?>