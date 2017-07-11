//javascript通用事件封装
var myEvent={
		 //添加事件函数,调用方法addEvent(btn1,'click',showmsg);
		addEvent:function(ele,event,func){
			//用能力检测进行跨浏览器兼容处理
			//DOM 2 事件处理
			if(ele.addEventListener)
			{
				//false表示冒泡事件模型
				ele.addEventListener(event,func,false);
			}
			else if(ele.attachEvent)
			{
				//若是click事件,IE为onclick
				ele.attachEvent('on'+event,func);
			}
			else
			{
				//DOM 0级事件，兼容老浏览器
				//not ele.'on'+event=func;
				//js中.可以用[]进行代替
				ele['on'+event]=func;
			}
		},
		//删除事件函数
		delEvent:function(ele,event,func){
			if(ele.removeEventListener)
			{
				ele.removeEventListener(event,func,false);
			}
			else if(ele.detachEvent){
				ele.detachEvent('on'+event,func);//IE
			}
			else
			{
				//DOM 0级事件，兼容老浏览器
				ele['on'+event]=null;
			}
		},
		//获取触发事件的源DOM元素
		getSrcElement:function(event){
			//如果event.target不为空，则返回event.target值
			//否则返回event.srcElement
			return event.target || event.srcElement;
		},
		//获取事件类型
		getType:function(event)
		{
			return event.type;
		},
		//获取事件
		getEvent:function(event){
			//window.event为兼容IE版本
			return event?event:window.event;
		},
		//阻止事件冒泡
		stopBuble:function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}
			else{
				event.cacelBuble=false;//IE
			}
		},
		//禁用默认行为
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}
			else
			{
				event.returnValue=false;//IE为属性
			}
		}
};