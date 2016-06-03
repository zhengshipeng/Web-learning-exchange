<?php
/*
*全路径无限分类
*/
require_once('./db.inc.php');
/**
*likeCate 说明：全路径无限分类下拉菜单
*str_repeat()函数把字符串重复指定的次数
*explode将字符串以xx分割为一个数组
*trim()去除字符串两端空格，可添加第二个参数
*/
function likeCate()
{
	$connect = Db::getInstance();
	$link = $connect->connect();
	$sql = "SELECT id,catename,path,concat(path,',',id) AS fullpath FROM likecate ORDER BY fullpath ASC";
	$res = mysql_query($sql,$link);
	$result = array();
	while ($row = mysql_fetch_assoc($res)) {
		$deep = count(explode(',',trim($row['fullpath'],',')));
		$row['catename'] = str_repeat('&nbsp;&nbsp;', $deep*3).'|--'.$row['catename'];
		$result[] = $row;
	}
	return $result;
}

/**
*likeInfo 说明：全局路劲无限分类导航
*@param $id int 某级目录的id
*/
function likeInfo($id)
{
	$connect = Db::getInstance();
	$link = $connect->connect();
	$sql = "SELECT *,concat(path,',',id) AS fullpath FROM likecate WHERE id = $id";
	$res = mysql_query($sql,$link);
	$row = mysql_fetch_assoc($res);
	$ids = $row['fullpath'];
	$sql1 = "SELECT * FROM likecate WHERE id IN ($ids) ORDER BY id ASC";
	$res = mysql_query($sql1,$link);
	$reqult = array();
	while ($row = mysql_fetch_assoc($res)) {
		$reqult[] = $row;
	}
	return $reqult;
}


function displayCate()
{
	$rs = likeCate();
	$str = "<select>";
	foreach ($rs as $key => $val) {
		$str .= "<option >{$val['catename']}</option>";	
	}
	return $str .= "</select>";
}

function displayInfo($id,$url="like.php?id=")
{
	$res = likeInfo($id);
	$str = '';
	foreach ($res as $key => $val) {
		$str .= "<a href='{$url}{$val['id']}'>{$val['catename']}</a>->";
	}
	$str = substr($str,0,-2);
	return $str;
}

echo displayCate();
echo "<br/><br/>";
echo displayInfo(10);
































?>