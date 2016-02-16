<?php
require_once('./db.inc.php');

/**
*getList 说明：递归无限分类下拉列表，递归的方式查询出数据表所有目录结构
*@param $pid  int 父类id，递归依次查询出所有子类，查询出id作为下一次查询的pid
*@param $result array 数组，用于存储查询出的所有数据
*@param $spac int displayCate方法拼接目录树时各级目录的空格倍数
*str_repeat(string,repeat)函数把字符串重复指定的次数  
*/
function getList($pid=0,&$result=array(),$spac=0)
{	
	$spac = $spac + 2;
	$connect = Db::getInstance();
	$link = $connect->connect();
	$sql = "SELECT * FROM deepcate WHERE pid = $pid";
	$res = mysql_query($sql,$link);	
	while ($row=mysql_fetch_assoc($res)) {
		$row['catename'] = str_repeat('&nbsp;&nbsp;', $spac).'|--'.$row['catename'];
		$result[] = $row;
		getList($pid=$row['id'],$result,$spac);
	}
	return $result;
}

/**
*getInfo 说明：无限分类导航列表
*@param $cid int 子类id，递归依次查询出它的父级，查询出pid作为下一次查询的id
*@param $result array 数组，用于存储查询的数据
*krsort 按照键名对关联数组进行降序
*ksort 按照键名对关联数组进行升序
*/
function getInfo($cid=0,&$result=array())
{
	$connect = Db::getInstance();
	$link = $connect->connect();
	$sql = "SELECT * FROM deepcate WHERE id = $cid";
	$res = mysql_query($sql,$link);
	$row = mysql_fetch_assoc($res);
	if($row){
		$result[]=$row;
		getInfo($row['pid'],$result);
	}
	krsort($result);
	return $result;
}


/**
*displayCate说明：将查询的目录结构拼接显示
*@param $pid int 父类id，递归依次查询出所有父类目录
*@param $selected int 默认显示哪一级层
*/

function displayCate($pid=0,$selected=1)
{
	$rs = getList($pid);
	$str = "<select>";
	foreach ($rs as $key => $val) {
		$selectedstr = '';
		if($val['id'] == $selected){
			$selectedstr = "selected";
		}
		$str .= "<option {$selectedstr}>{$val['catename']}</option>";	
	}
	return $str .= "</select>";
}


/**
*displayInfo 说明：将查询的分类导航拼接显示
*@param $cid int 子类id
*@param $url string 导航栏目跳转链接
*/

function displayInfo($cid=0,$url="cate.php?cid=")
{
	$res = getInfo($cid);
	$str= '';
	foreach ($res as $key => $val) {
		$str .= "<a href='{$url}{$val['id']}'>{$val['catename']}</a>->";
	}
	$str = substr($str,0,-2);
	return $str;
}


echo displayCate();
echo "<br/><br/>";
echo displayInfo(10,'list.html?page=1&id=');




















?>