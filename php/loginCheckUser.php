<?php
	header("Content-type","text/html;charset=utf-8");
	$userName=$_POST['userName'];
	$userPass=$_POST['userPass'];

	//搭桥
	$conn= mysql_connect("localhost","root","qianfeng");
	if(!$conn){
		die('Could not connect:'.mysql_error());	
	}	
		//选择数据库
		mysql_select_db("Beautydb",$conn);	
		//执行sql语句
		$sqlstr="select * from UserInfo where userName='".$userName."' and userPass='".$userPass."'";
		
		$result = mysql_query($sqlstr,$conn);
		$rows = mysql_num_rows($result);
		//关闭数据库
		mysql_close($conn);	
		if($rows==0){
			echo "1";
		}else{
			echo "0";
		};
?>
