require(['js/jquery','js/cookieTools'],function(){
	$("#publiceHeader").load("publiceHeader.html");
	$("#publiceFooter").load("publiceFooter.html");
	$(".main_1_main li").hover(function(){
		$(this).css({boxShadow:" 2px 2px 0px #7F96A9",border:"1px solid #7F96A9",borderRadius:"5px"});
	},function(){
		$(this).css({boxShadow:"none",border:"1px solid #fff"});
	});
	

	$(".main_3_main li").hover(function(){
		$(this).find("img").css({transform:"translateX(15px)"});
	},function(){
		$(this).find("img").css({transform:"translateX(0px)"});
	});
	
	setInterval(function(){ShowCountDown(2017,7,18,'countDown');}, 1000); 
	function ShowCountDown(year,month,day,divname){ 
		var now = new Date(); 
		var endDate = new Date(year, month-1, day); 
		var leftTime=endDate.getTime()-now.getTime(); 
		var leftsecond = parseInt(leftTime/1000); 
		var day1=Math.floor(leftsecond/(60*60*24)); 
		var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
		var cc = document.getElementById(divname); 
		cc.innerHTML = hour+"小时"+minute+"分"+second+"秒"; 
	} 

})