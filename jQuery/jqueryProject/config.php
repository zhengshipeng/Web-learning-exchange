<?php

$dbhost = '******';
$dbdatabase = '******';
$username = '******';
$userpass = '******';

/*$dsn = 'mysql:host='.$dbhost.';dbname='.$dbdatabase.';'

$dbh = new PDO($dsn,$username,$userpass);*/


$db_connect=mysql_connect($dbhost,$username,$userpass) or die("Unable to connect to the MySQL!");
mysql_select_db($dbdatabase,$db_connect);
mysql_query("set names utf8");

?>