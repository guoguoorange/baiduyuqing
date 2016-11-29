/*******************************************/
// 2016.8.29 
// 解决通过类名获取元素兼容问题 
function getClass(classname,father){
	var father = father || document;
	//默认选择范围是document
	if(father.getElementsByClassName){
		//如果要查找类名
		return father.getElementsByClassName(classname);
		// 输出类名
	}
	else{
		var all = father.getElementsByTagName("*");
		//找出所有标签
		var newarr = [];
			for(var i = 0;i < all.length;i++){
				if(checkrep(classname,all[i].className)){
				//比较找出标签类名和选定标签名类名是否相同
					newarr.push(all[i])
					//是则将找出标签加入新的数组
				}
			}	
		}
		return newarr;
 }
 function checkrep(val,string){
	var arr = string.split(" ")
	//将多类名（字符格式）转换为数组格式（每一个类名为数组的一个元素）

	for(var i in arr){
		if(arr[i] == val){
			//如果其中有一个类名和选定标签类名相同，输出true
			return true;
		}
	}
	return false;
	
 }

/*******************************************/
// 2016.8.30
// 解决外部样式获取属性的值的兼容性

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr]
	}
	else{
		return getComputedStyle(obj,null)[attr]
	}
 }
 /*******************************************/
 // 2016.8.31
// 获取元素的兼容函数，可支持标签，ID，class

function $(selector,father){
	var father=father||document;
	if(typeof selector=="string"){
		selector=selector.replace(/^\s*|\s*$/g,"")
		if(selector.charAt(0)=="."){
			return getClass(selector.substring(1),father)
		}
		else if(selector.charAt(0)=="#"){
			return document.getElementById(selector.substring(1))
		}
		else if(/^[a-z][1-6a-z]*/g.test(selector)){
			return father.getElementsByTagName(selector);
		}
	}else if(typeof selector=="function"){
		
			window.onload=function(){
				selector()
			}
		// addEvent(window,onload,function(){
		// 		selector()
		// 	})
	}
}

/************************************************/
//2016.9.2
//获取所有子节点的兼容函数
// father:指定父节点
// type："a",只有元素节点
// type："b",只有元素节点和文本节点
/************************************************/ 
function getChild(father,type){

	var type=type||"a";
	var all=father.childNodes;
	var newarr=[];
	if(type=="a"){
		for (var i = 0; i < all.length; i++) {
			if(all[i].nodeType==1){
				newarr.push(all[i])
			}
		}
	}
	else if(type=="b"){
		for (var i = 0; i < all.length; i++) {
			if(all[i].nodeType==1 || (all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){

				newarr.push(all[i])
			}	
		}
				
	}
	return newarr
}
		
// 兼容 获取第一个子节点
function getFirst(father){

	 return getChild(father)[0];
}
// 兼容 获取最后一个子节点
function getlLast(father){
	return getChild(father)[getChild(father).length-1]
}
// 兼容 获取任意子节点
function getnum(father,num){
	return getChild(father)[num-1]
}

/***********************************************/ 
// 兼容 获取下一个兄弟节点
/***********************************************/ 
function getnext(obj){
	var next=obj.nextSibling
	// 如果下一个元素不为null
	// 如果next后面没有东西，输出为null，null自动转化为布尔值是false，所以，当！false时，即为真时返回fasle
	if(!next){
	
		return false;
	}
	while(next.nodeType==3 ||next.nodeType==8){
		next=next.nextSibling
		if(!next){
	
		return false
		}
		return next
	}
}	

//获取上一个兄弟结点
function getPre(obj){
	var pre=obj.previousSibling;
	if(!pre){
		return false;
	}

	while(pre.nodeType==3||pre.nodeType==8){
		pre=pre.previousSibling;
		if(!pre){
			return ;
		}

	}
	return pre;
}

// 事件绑定
function addEvent(obj,event,fun){
	obj[fun]=function(){
		fun.call(obj);
	}
	if(obj.attachEvent){
		obj.attachEvent("on"+event,obj[fun])
	}else{
		obj.addEventListener(event,obj[fun],false)

	}
}

// 事件解除
function delEvent(obj,event,fun){
	if(obj.detachEvent){
		obj.detachEvent("on"+event,obj[fun])
	}else{
		obj.removeEventListener(event,obj[fun],false)

	}
}
/*****************************************************/
// 滚轮滚动事件
/******************************************************/
function mouseWheel(obj,up,down){
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scrollFn);
		// IE`opera
	}else if(obj.addEventListener){
		obj.addEventListener("mousewheel",scrollFn,false);
		// chrome,safari -webkit-
		obj.addEventListener("DOMMouseScroll",scrollFn,false);
		// firfox -moz-
	}
	function scrollFn(e){
		var f=e.wheelDelta||e.detail
		if(f==-3||f==120){
			if(up){
				up()
			}
			
		}
		if(f==3||f==-120){
			if(down){
				down()
			}
			
		}
	}
}


	