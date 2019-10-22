
			/*自动加载省份列表*/
			(function showProv() {
				showOption($('#provBox'),$("#prov"))
				showOption($('#cityBox'),$("#city"))
				showOption($('#countryBox'),$("#country"))
				// changeOption($("#prov div"),1);
				// changeOption($("#city div"),$("#cityBox input"),2);
				// changeOption($("#country div"),$("#countryBox input"),3);
			})();
			function showOption(obj1,obj2){
				obj1.click(function(e){
					var img=$(this).find('img')[0];
					if(obj2.is(':visible')){
						obj2.hide();
						$(img).attr('src','img/bottom.png')
					}else{
						obj2.show();
						$(img).attr('src','img/top.png')
					}
				})
			}
			function changeOption(obj,type){
				// var text=$(obj).text();
				var text=$(obj).html();
				console.log(text,type)
				var url='';
				if(type==1){
					url='turnCity';
					console.log(text,url,type)
					$("#provBox input").val(text)
					// ajax(text,url,type)
				}else if(type==2){
					console.log(text,url,type)
					url='turnCity';
					$("#cityBox input").val(text)
					// ajax(text,url,type)
				}else{
					
					$("#countryBox input").val(text)
					console.log(text,url,type)
				}
			}
			function ajax(name,url,type){
				console.log(name,160)
				$.ajax({
					url : "http://103.27.7.20/index/joinus/"+url,
					type : "post",
					head:{ Accept: "application/json; charset=utf-8"},
					async : false,//此处需要注意的是要想获取ajax返回的值这个async属性必须设置成同步的，否则获取不到返回值
					data : {"name":name},
					dataType : "jsonp",
					success : function(data) {
						console.log(data)
					},
					 error: function(){
					           alert('fail');
					         }
				});
			}
			$('body').click(function(e) {
			    var target = $(e.target);    // 如果#overlay或者#btn下面还有子元素，可使用    
				var targetC =$(e.target.parentNode)
				
				if(!target.is('.input')&&!targetC.is('.input')) {       
					if ( $('.morechoice').is(':visible') ) {              
						$('.morechoice').hide();                                                           
						}    
					}
				}
			);
			$('#button-show').click(function(){//提交表单的6个input的id
				// $.ajax({
				//         url : "",
				//         type : "post",
				//         async : false,//此处需要注意的是要想获取ajax返回的值这个async属性必须设置成同步的，否则获取不到返回值
				//         data : {"name":"xiaoli"},
				//         dataType : "jsonp",
				// 		head:{ Accept: "application/json; charset=utf-8"},
						
				//         success : function(data) {
				//             pageTotal = data.pageTotal;
				//         }
				         
				//     });
				// #("#name")
				// #("#storename")
				// #("#phone")
				// $("#provBox input")
				// $("#cityBox input")
				// $("#countryBox input")
				$("#showbox").show();
			})
			$("#hideshowbox").click(function(){
				$("#showbox").hide();
			})
			// report部分的JS
			$("#textarea").keyup(function(){
				textareak(this,500)
			})
			function textareak(e,total) {
				var val=$(e).val();
				console.log(102,val)
				var len=val.length;
				if(len>=total){
					var num=val.substr(0,total);
					len=total
					$(e).val(num);
				}
				var tex=len+'/'+total;
				$("#textareal").text(tex)
			}
			$("#telephone").blur(function(){
				var val=$(this).val();
				// var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))|(19[0-9]{1})+\d{8})$/; 
				var myreg =/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
				if(val.length==0) { 
					alert('请输入手机号码！'); 
					return false; 
				}else if(val.length!=11){ 
				   alert('请输入11位有效的手机号码！'); 
					
				   return false; 
				} else if(!myreg.test(val)) {
					alert('请输入有效的手机号码！'); 
					return false;
				}
				
			})
			$("input[type='radio']").each(function(i,item){
				$(item).click(function(i){
					$(this).attr("checked","checked").siblings('input').removeAttr("checked");
					$(this).addClass("checked").siblings('input').removeClass("checked");
				 })
			 })
			$("#submitre").click(function(){
				var storecityv=$("#storecity").val(),
					ordernumv=$("#ordernum").val(),
					storenamev=$("#storename").val(),
					radio1=$("#radio1").attr("checked"),
					radio2=$("#radio2").attr("checked"),
					radio3=$("#radio3").attr("checked"),
					radio4=$("#radio4").attr("checked"),
					textareav=$("#textarea").val(),
					telephonev=$("#telephone").val();
				if(storecityv==''){
					alert('请填写所在城市');
					return;
				}
				if(ordernumv==''){
					alert('请填写订单号')
					return;
				}
				if(storename==''){
					alert('请填写商家名称')
					return;
				}
				if(textareav==''){
					alert('请填写具体情况')
					return;
				}
				if(telephonev==''){
					alert('请填写您的联系方式')
					return;
				}
				var index=4;
				if(radio1=='checked'){
					index=1
				} else if(radio2=='checked'){
					index=2
				}else if(radio3=='checked'){
					index=3
				}
				 console.log(storecityv,ordernumv,storenamev,index,textareav,telephonev)
				
				$("#showbox").show();
			})
			
		