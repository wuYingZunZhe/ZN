window.onscroll = function(){
	Limg()
}
function qqFriend(){
	
	var p = {
		    /*获取URL，可加上来自分享到QQ标识，方便统计*/  
		    url: 'https://exbuy.double.com.cn',   
		    desc: '',
		    /*分享标题(可选)*/
		    title: '一鹿省',
		    /*分享摘要(可选)*/
		    summary: '',
		    /*分享图片(可选)*/
		    pics: '',
		    /*视频地址(可选)*/
		    flash: '',
		   /*分享来源(可选) 如：QQ分享*/
		   site: '',
		   style: '201',
		   width: 32,
		   height: 32
	};
	        var s = [];
		for(var i in p) {
		   s.push(i + '=' + encodeURIComponent(p[i] || ''));
		}
		var url = "http://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
		window.open(url);
}
// "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" QQ空间url;
function sinaWeiBo() {
	alert('p')
        var p = {
	// 表示是否显示当前页面被分享数量(1 显示)(可选， 允许为空) 
	count: '1',
	//将页面地址转成短域名， 并显示在内容文字后面。(可选， 允许为空) 
	url: 'https://exbuy.double.com.cn',
        //用于发布微博的来源显示， 为空则分享的内容来源会显示来自互联网。(可选， 允许为空) 
	appkey: '',
	//分享时所示的文字内容， 为空则自动抓取分享页面的title值(可选， 允许为空) 
	title: '一鹿省',
	//自定义图片地址， 作为微博配图(可选， 允许为空) 
	pic: '',
	//转发时会 @相关的微博账号(可选， 允许为空)
	ralateUid: '',
	//语言设置(zh_cn | zh_tw)(可选)
	language: 'zh_cn'
};
				
	var s = [];
	for(var i in p) {
	    s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
	var url = "http://service.weibo.com/share/share.php?" + s.join('&');
	window.open(url);
}

//页面加载时调用一次，使图片显示
window.onload = function() {
	
	var img = document.querySelectorAll("img[data-src]");
	
	for(var i = 0; i < img.length; i++) {
		img[i].style.opacity = "0"
	}
	Limg();
	var tele = document.querySelector('.tele');
	if(tele){
		var teleD=tele.getElementsByTagName('button')[0];
		
		tele.onmouseenter=function(){
			teleD.className='over'
		}
		tele.onmouseleave=function(){
			
				teleD.className='';
		}
		var flag=IsPC();
		if(flag){ 
			var a = tele.getElementsByTagName('a')[0];
			// a.href ='JavaScript：void(0)';
			a.setAttribute("href","JavaScript:;");
			console.log(a)
		}
	}
}
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
	"SymbianOS", "Windows Phone",
	"iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
	if (userAgentInfo.indexOf(Agents[v]) > 0) {
	flag = false;
	break;
	}
	}
	return flag;
	}
function copyUrl2(){
	var text=document.getElementById('text');
	text.select();
	document.execCommand("Copy"); // 执行浏览器复制命令
	alert("已复制好，可贴粘。");
}
function Limg() {
	var viewHeight = document.documentElement.clientHeight // 可视区域的高度
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	var limg = document.querySelectorAll("img[data-src]")
	// Array.prototype.forEach.call()是一种快速的方法访问forEach，并将空数组的this换成想要遍历的list
	Array.prototype.forEach.call(limg, function(item, index) {
		var rect
		if(item.getAttribute("data-src") === "")
			return
		//getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
		rect = item.getBoundingClientRect()
		// 图片一进入可视区，动态加载
		if(rect.bottom >= 0 && rect.top < viewHeight) {
			(function() {
				var img = new Image()
				img.src = item.getAttribute("data-src")
				item.src = img.src
				//给图片添加过渡效果，让图片显示
				var j = 0
				setInterval(function() {
					j += 0.2
					if(j <= 1) {
						item.style.opacity = j
						return
					}
				}, 100)
				item.removeAttribute('data-src')
			})()
		}
	})
}

 