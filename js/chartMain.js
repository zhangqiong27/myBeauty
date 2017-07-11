require(['js/jquery','js/cookieTools','https://code.jquery.com/jquery','js/bootstrap'],function(){
	$("#publiceHeader").load("publiceHeader.html");
	$("#publiceFooter").load("publiceFooter.html");
	let userName=getCookie("userName");
	if(userName==""){
		$(".main_left_1").show();
		$(".main_left_2").hide();
	}else{
		//显示购物车（购物车列表）vipName
		$.get("php/getShoppingCart.php",{vipName:userName},function(data){
			$(".main_left_1").hide();
			$(".main_left_2").show();
			let obj=eval('('+data+')');			
			for(let i=0;i<obj.length;i++){
				let ord=obj[i].goodsId;
				let goodsName=obj[i].goodsName;//产品名称
				let goodsType=obj[i].goodsType;//产品介绍
				let newPrice=Number(obj[i].beiyong1).toFixed(2);//现价
				let imgSrc=obj[i].goodsImg;//产品图片
				let goodsCount=obj[i].goodsCount;//商品数量
				let totlePrice=Number(newPrice*goodsCount).toFixed(2)//总价
				str="<tr ord='"+ord+"'><td><input type='checkbox' class='chkbox'/><img src='"+imgSrc+"' /></td><td><span>"+goodsName+"</span></td><td class='price'>"+newPrice+"</td><td ><button class='downBtn'>-</button><b class='count'>"+goodsCount+"</b><button class='upBtn'>+</button></td><td class='totle'>"+totlePrice+"</td><td ><button class='delBtn'>删除</button></td></tr>";
				$(".chartTable tbody").append(str);
				money();
			}
			
			//判断如果购物车内商品已经全部清空，则显示购物车空空
			if($(".chartTable tbody tr").length==0){
				$(".main_left_1").show();
				$(".main_left_2").hide();
			}else{
				//删除购物车的商品 vipName goodsId
				$(".delBtn").on("click",function(){
					let goodsId=$(this).parents("tr").attr("ord");
					let that=this;
					let r=confirm("您确定要删除吗？");
					if (r==true){
						$.get("php/deleteGoods.php",{vipName:userName,goodsId:goodsId},function(data){
							if(data=="1"){
								$(that).parents("tr").remove();
								money();
								if($(".chartTable tbody tr").length==0){
									$(".main_left_1").show();
									$(".main_left_2").hide();
								}
							}else{
								alert("失败");
							}
						});

					}
					
				});
				
				//修改（增加、减少）商品数量vipName goodsId goodsCount
				$(".upBtn").on("click",function(){
					let goodsId=$(this).parents("tr").attr("ord");//产品id
					let currCount=$(this).siblings("b").html();//产品数量
					let price=$(this).parent().siblings(".price").html();//产品单价				
					currCount++;
					let that=this;
					$.get("php/updateGoodsCount.php",{vipName:userName,goodsId:goodsId,goodsCount:currCount},function(data){
						if(data=="1"){
							$(that).siblings("b")[0].innerHTML=currCount;//改变数量
							$(that).parent().siblings(".totle")[0].innerHTML=Number(currCount*price).toFixed(2);//改变总价
							money();
						}
					});
				});
								
				$(".downBtn").on("click",function(){
					let goodsId=$(this).parents("tr").attr("ord");//产品id
					let currCount=$(this).siblings("b").html();//产品数量
					let price=$(this).parent().siblings(".price").html();//产品单价				
					currCount--;
					let that=this;
					if(currCount>0){
						$.get("php/updateGoodsCount.php",{vipName:userName,goodsId:goodsId,goodsCount:currCount},function(data){
							if(data=="1"){
								$(that).siblings("b")[0].innerHTML=currCount;//改变数量
								$(that).parent().siblings(".totle")[0].innerHTML=Number(currCount*price).toFixed(2);//改变总价
								money();
							}
						});
					}
				});
				
			}
			
			
			
			
			
			//最下端的总价和最右侧的总价设置
			function money(){
				let sum=0,totleCount=0;
				let length=$(".chartTable tbody tr").length;
				for(let i=0;i<length;i++){
					sum+=Number($(".chartTable tbody tr")[i].getElementsByClassName("totle")[0].innerHTML);	
					totleCount+=Number($(".chartTable tbody tr")[i].getElementsByClassName("count")[0].innerHTML);
				}
				$(".main_left_2_bottom span")[0].innerHTML=sum.toFixed(2);
				$(".main_right h5")[0].innerHTML='￥'+sum.toFixed(2);
				$("#chartMsg")[0].innerHTML=totleCount;
				saveCookie("totleCount",totleCount,7)//保存用户产品数量总值
			}
			
		})
		
	}
	
	$(".main_right s").click(function(){
		window.location.href="pay.html";
	})
	
})