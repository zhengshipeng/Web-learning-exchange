<?php

/*
*abstract关键字用于定义抽象类
*在抽象方法前面添加abstract关键字可以标明这个方法是抽象方法不需要具体实现
*抽象类中可以包含普通的方法，可以实现
*/
abstract class aCanEat
{
	abstract public function eat($food);

	public function breath()
	{
		echo "Breath use the air \n";
	}
}

/*
*继承抽象类的关键字是extends
*继承抽象类的子类需要实现抽象类中定义的抽象方法
*/
class Human extends aCanEat
{
	public function eat($food)
	{
		echo "Human eating ".$food."\n";
	}
}

class Animal extends aCanEat
{
	public function eat($food)
	{
		echo "Animal eating ".$food."\n";
	}
}

$man = new Human();
$monkey = new Animal();
$man->eat("rice");
$man->breath();
$monkey->eat("banana");
$monkey->breath();


































?>