<?php
	header("Content-type:text/html; charset=utf-8");
	$userName = $_POST["userName"];//接收客户端数据
	$userEmail=$_POST['userEmail'];
	$userPhone=$_POST['userPhone'];
	$userPass=$_POST['userPass1'];
	
	//一、建立连接
	$conn= mysql_connect("localhost","root","qianfeng");	
	if(!$conn){
		die('Could not connect:'.mysql_error());	
	}
	//2、选择数据库
	mysql_select_db("Beautydb",$conn);	
	//3、执行SQL语句
	$sqlStr="insert into UserInfo(userName,userEmail,userPhone,userPass) values ('".$userName."','".$userEmail."','".$userPhone."','".$userPass."')";
	mysql_query($sqlStr,$conn);	
	//4、关闭数据
	mysql_close($conn);
	echo "true";
?>