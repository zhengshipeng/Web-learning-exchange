<?php

$redis = new Redis();
$redis->connect("127.0.0.1","6379");
//存储一个 值
$redis->set("say","Redis test!");
echo $redis->get("say");

//存储多个值
$array = array('first_key'=>'first_val',
          'second_key'=>'second_val',
          'third_key'=>'third_val');
$array_get = array('first_key','second_key','third_key');
$redis->mset($array);
var_dump($redis->mget($array_get));



?>