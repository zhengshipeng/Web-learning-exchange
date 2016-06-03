<?php

php多种序列化和反序列化方法
<1>serialize unserialize
(当数组值包含如双引号、单引号或冒号等字符时，它们被反序列化后，可能会出现问题。为了克服这个问题，一个巧妙的技巧是使用base64_encode和base64_decode)
base64_encode base64_decode(base64编码后字符串过长，结合压缩函数)
压缩函数：gzcompress,gzdeflate,gzencode
解压函数：gzuncompress,gzinflate,gzdecode

<2>json_encode json_decode

<3>var_export,eval
(var_export函数把变量作为一个字符串输出，eval把字符串当成php代码执行，反序列化得到最初变量的内容)

<4>wddx_serialize_value,wddx_deserialize
(序列化数组，并以XML字符串格式形式输出）

/*可以作为php每日一练的题目*/	





















?>
