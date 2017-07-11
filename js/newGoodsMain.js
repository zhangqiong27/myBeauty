require(['js/jquery','js/cookieTools'],function(){
		$("#publiceHeader").load("publiceHeader.html");
		$("#publiceFooter").load("publiceFooter.html");
		$("#loadImg").show();//页面一打开先显示loading图片
		//		alert("1")
		$(".main_right_title_2 li:nth-child(2)").hover(function(){
			$(".hotBtnContent").css({display:"block"}
			);
		},function(){
			$(".hotBtnContent").css("display","none");
		});
		//当ajax请求结束后，移除loading图片所在元素
		 $("#loadImg").ajaxStop(function(){
		//		 		alert("2")
		   $(this).parent().remove();
		 });
		
		//获取产品列表信息
		$.get("php/getGoodsList.php",function(data){
			let arr=eval(data);
			for(let i=0;i<arr.length;i++){
				let ord=arr[i].goodsId;
				let goodsName=arr[i].goodsName;//产品名h4
				let goodsDetail=arr[i].goodsType;//产品详情h5
				let mill=arr[i].goodsDesc;//毫升h6
				let imgSrc=arr[i].goodsImg;//图片路径
				let newPrice=Number(arr[i].beiyong1).toFixed(2);//现价
				let oldPrice=Number(arr[i].beiyong2).toFixed(2);//原价
				let mul=parseInt((1-newPrice/oldPrice).toFixed(2)*100);
				let str="<li ord='"+ord+"'><dl><dt><h4>"+goodsName+"</h4><h5>"+goodsDetail+"</h5><h6>"+mill+"</h6></dt><dd class='dd_1'><img src='"+imgSrc+"'/><p>新品登场</p></dd><dd class='dd_2'><b>建议零售价</b><strong>￥"+oldPrice+"</strong><span><i>节省</i><br>"+mul+"%</span></dd><dd class='dd_3'><strong>￥"+newPrice+"</strong><span>全网低价重置</span></dd><dd class='dd_4'><b>加入<br>购物车</b></dd></dl></li>";
				$(".main_right_main").append(str);
			}
		});
		
		$(".main_right_main").delegate("li","click",function(){
			let currGoodsId=$(this).attr("ord");
			saveCookie("currGoodsId",currGoodsId,1);//保存点击商品的产品ID，进入产品详情页面，显示对应商品
			window.location.href="goodsInf.html";
		})
	
})