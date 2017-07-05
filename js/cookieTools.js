function saveCookie(key,value,dayCount){
	var d = new Date();
	d.setDate(d.getDate()+dayCount);
	document.cookie = key+"="+encodeURIComponent(value)+";expires="+d.toGMTString();
}
function getCookie (key) {
	var str=decodeURIComponent(document.cookie);
	var arr=str.split("; ");
	for (var i=0;i<arr.length;i++) {
		if(arr[i].indexOf(key+"=")==0){
			return arr[i].substring((key+"=").length); 			
		}
	}
	return "";
}
function removeCookie(key){
	//借用就是保存。
	saveCookie(key,"007",-10);	
}