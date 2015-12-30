<?php

$dbhost = '1234';
$dbdatabase = '1234';
$username = '1234';
$userpass = '1234';

/*$dsn = 'mysql:host='.$dbhost.';dbname='.$dbdatabase.';'

$dbh = new PDO($dsn,$username,$userpass);*/


$db_connect=mysql_connect($dbhost,$username,$userpass) or die("Unable to connect to the MySQL!");
mysql_select_db($dbdatabase,$db_connect);
mysql_query("set names utf8");

?>
