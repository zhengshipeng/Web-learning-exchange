<?php

function deeploop1(&$i=1)
{
	echo $i;
	$i++;
	if($i<10){
		deeploop1($i);
	}

}

function deeploop2()
{
	static $f =1;
	echo $f;
	$f++;
	if($f<20){
		deeploop2();
	}
}

$k = 1;
function deeploop3()
{
	global $k;
	echo $k;
	$k++;
	if($k<30){
		deeploop3();
	}
}

deeploop1();
echo "<br/>";
deeploop2();
echo "<br/>";
deeploop3();


/*
*递归无限分类原理
*每一个分类都需要记录它的父级id，当为顶级分类的时候，父id为0。这样无论哪个分类，都可以通过父级id一层一层去查明它所有的父级，以便清楚知道它属于何种分类，层级深度如何。
id          id
pid         父id
catename    分类名称
cateorder   排序
catetime    创建时间
*/




























?>