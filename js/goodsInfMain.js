require(['js/jquery','js/cookieTools','js/lunboMore','js/parabola'],function(){

		$("#publiceHeader").load("publiceHeader.html");
		$("#publiceFooter").load("publiceFooter.html");
		$("#loadImg").css("display","block");//页面一打开先显示loading图片
		//点击事件，显示评价和产品详情页面
		$(".main_right_bottom_title a").click(function(){
			$(this).siblings().css({font:"16px/44px '' ",borderBottom:"none"})
			$(this).css({font:"700 16px/44px '' ",borderBottom:"2px solid #662d91"});
		});
		
		$(".main_right_bottom_btn1").click(function(){
			$(".main_right_bottom_content1").css({display:"block"});
			$(".main_right_bottom_content2").css({display:"none"});
		});
		
		$(".main_right_bottom_btn2").click(function(){
			$(".main_right_bottom_content2").css({display:"block"});
			$(".main_right_bottom_content1").css({display:"none"});
		});
		
		//当ajax请求结束后，移除loading图片所在元素
			 $("#loadImg").ajaxStop(function(){
			   $(this).remove();
			 });
			
		//获取点击选中的商品ID，动态创建商品详情页面
		let currGoodsId=getCookie("currGoodsId");				
		$.get("php/getGoodsInfo.php",{goodsId:currGoodsId},function(data){
			let obj=eval('('+data+')');
			//动态创建图片展示信息
			let str1="<div class='main_left_top'><img src='"+obj.goodsImg+"' /></div><ul class='main_left_bottom'><li class='mig01'><img src='"+obj.beiyong3+"' /></li><li class='mig02'><img src='"+obj.beiyong4+"' /></li><li class='mig03'><img src='"+obj.beiyong5+"' /></li></ul>";
			$(".main_left").prepend(str1);
			//点击小图更换大图
			$(".main_left_bottom").delegate("li","click",function(){
				$(".main_left_top img").attr("src",$(this).find("img").attr("src"));
				
			})
			
			//动态创建产品详情简介
			let goodsName=obj.goodsName;//产品名
			let goodsDetail=obj.goodsType;//产品详情
			let mill=obj.goodsDesc;//毫升
			let newPrice=Number(obj.beiyong1).toFixed(2);//现价
			let oldPrice=Number(obj.beiyong2).toFixed(2);//原价
			let mul=parseInt((1-newPrice/oldPrice).toFixed(2)*100);
			let img=$(".main_left_top img").attr("src");
			let str2="<ul class='main_right_top'><li><h3>"+goodsName+"</h3></li><li><h4>"+goodsDetail+"</h4></li><li class='li_3'><p>容量："+mill+"</p></li><li class='li_4 clear'><div ><p>活动中!</p><b>50ml/<br>1.72oz</b></div><div><strong>活动中!</strong><b>30ml/<br>1.02oz</b></div></li><li class='li_5'>￥"+newPrice+"</li><li class='li_6'>建议零售价：<span>￥"+oldPrice+"</span><strong>节省"+mul+"%</strong></li><li class='li_7' style='position:relative'><select><option value='1'>1</option><option value='1'>1</option><option value='1'>1</option></select><input id='addChart' type='button' value='加入购物车'/><img style='width:35px;height:35px;border-radius:50%;position:absolute;left:111px;top:-4px;display:none;' id='flyStart' src='"+img+"'/></li></ul>";
			$(".main_right").prepend(str2);
			
			//飞入购物车效果
			let element = document.getElementById("flyStart"), 
				target = document.getElementById("endChart");
			// 抛物线元素的的位置标记
			let parabola = funParabola(element, target).mark();
			// 抛物线运动的触发
			
			let userName=getCookie("userName");
			let goodsCountMsg=0;
			document.getElementById("addChart").onclick=function(){
				if(userName==""){
					alert("请先登录，再继续选购");
				}else{
					element.style.display="block";
					parabola.init();
					
					goodsCountMsg++;
					//添加到购物车：vipName goodsId goodsCount
					$.get("php/addShoppingCart.php",{vipName:userName,goodsId:currGoodsId,goodsCount:1},function(data){
						if(data==1){//添加成功
							$("#goodsCountMsg").html(goodsCountMsg);
							//alert("vipName:"+userName+"选中"+currGoodsId+"号产品:"+goodsCount+"件");
						}else{
							alert("添加失败");
						}
					})
				}

			};	
			
		
		});
	
	//滚动侧边栏购物车消失
		let offset = 400;
		//hide or show the "back to top" link
		$(window).scroll(function(){
			if( $(this).scrollTop() > offset  ) { 
				$("#chartRight").css("display","none");
			}else{
				$("#chartRight").css("display","block");
			}
		});
	
});
