
$(function(){
	//$.cookie(‘cookieName’,'cookieValue’，｛expires：7，path：’/'，domain: ‘chuhoo.com’，secure: false，raw:false｝);
	/*domain：创建cookie所在网页所拥有的域名；secure：默认是false，如果为true，cookie的传输协议需为https；raw：默认为false，读取和写入时候自动进行编码和解码（使用encodeURIComponent编码，使用decodeURIComponent解码），关闭这个功能，请设置为true。*/
	function hideShow(){
		$(".users,.loginout").hide();
		$(".reg_a,.login_a").show();
	}
	
	function showHide(){
		$(".users,.loginout").show();
		$(".reg_a,.login_a").hide();
	}
	
	if($.cookie('user')){
		//$(".users,.loginout").show();
		//$(".reg_a,.login_a").hide();
		showHide();
		$(".users").html($.cookie('user'));
	}else{
		//$(".users,.loginout").hide();
		//$(".reg_a,.login_a").show();
		hideShow();
	}
	
	$('.loginout').click(function(){
		$.removeCookie('user');
		hideShow();
		//$(".users,.loginout").hide();
		//$(".reg_a,.login_a").show();
		window.location.reload();//刷新页面
		//location.replace();//刷新页面
		//如果想删除一个带有效路径的cookie，如下：$.cookie(‘cookieName’,null,{path:’/'});
	});
	
	
	$('#reg').dialog({
		autoOpen:false,
		title:"用户注册",
		width:320,
		height:350,
		resizable:false,
		modal:true,
		buttons:{
			'提交':function(){
				alert('正在ajax提交');
			}
		},
	});
	
$('.reg_a').click(function(){
	$('#reg').dialog('open').buttonset().validate({
		$('#reg').dialog('open').buttonset().validate({
			submitHandler:function(){
				$("#reg").ajaxSubmit({
					url:"demo.php",
					type:"post",
					beforeSubmit:function(formData,jqForm,options){
						//alert("正在提交");
						//alert(formData[0].name);//得到第一个传递元素的name
						//alert(formData[0].value);//得到第一个元素的vlaue值
						//alert(jqForm);//得到整个form的对象
						//alert(jqForm.html());//得到form的元素
						//alert(options);//得到目前options设置的值
						//alert(options.url);
						//return false;//开启设置false，则不会ajax提交
						$("#loading").dialog("open").parent().parent().find('.ui-widget-header').hide();
						$("#loading").css('background','url("./img/loading.gif") no-repeat 20px center').html('正在交互中...');
						$("#reg").dialog('widget').find('button').eq(1).button('disable');
						
					},
					success:function(responseText,statusText){
						//alert("提交成功");
						//alert(responseText);
						if(responseText){
							$("#loading").css('background','url("./img/reg_succ.png") no-repeat 20px center').html('数据新增成功...');
							$("#reg").dialog('widget').find('button').eq(1).button('enable');
							setTimeout(function(){
								/*引入jquery cookie 插件，将用户名存入cookie，用户注册后直接显示登录用户名*/
								$.cookie('user',$('#user').val());
								//$('.reg_a,.login_a').hide();
								//$('.users,.loginout').show();
								showHide();
								$('.users').html($('#user').val());
								
								$("#loading").dialog("close");
								$("#reg").dialog("close").parent().parent().find('.ui-widget-header').show();
								$("#reg").resetForm('true');
								$("#reg .stau").html('*').removeClass('error_stau');
							},1000);
						}
					}
				});
			},
			
			showErrors:function(errorMap,errorList){
				var errors = this.numberOfInvalids();
				if(errors > 0){
					$("#reg").dialog('option','height',errors*20 + 350);
				}else{
					$("#reg").dialog('option','height','350');
				}
				this.defaultShowErrors();
			},
			
			highlight:function(element,errorClass){
				$(element).css('border','1px solid #F7B240');
				$(element).parent().find('span').html('*').removeClass('error_stau');
			},
			
			unhighlight:function(element,errorClass){
				$(element).css('border','1px solid #cccccc');
				$(element).parent().find('span').html('').addClass('error_stau');	
			},
			
			errorLabelContainer:"ol#reg_error",
			wrapper:"li",
			
			rules:{
				userName:{required:true,minlength:3},
				userPass:{required:true,minlength:6},
				userEmail:{required:true,email:true},
				userDate:{date:true},
				},
			messages:{
				userName:{required:"请输入用户名",minlength:jQuery.validator.format("请至少输入{0}位字符")},
				userPhone:{required:"请输入密码",minlength:jQuery.validator.format("请输入至少{0}位数密码")},
				userEmail:{required:"请输入邮箱",email:"请输入正确的邮箱"},
				userDate:{date:"请输入正确的日期格式"},
				}
		});
	});

		$('#date').datepicker({
			dateFormat:"yy-mm-dd",
			//dayNames:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],//星期全称，汉语无效，显示不下
			//dayNamesShort:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],//星期简写，汉语无效，显示不下
			dayNamesMin:['日','一','二','三','四','五','六'],//星期超简写，汉语有效
			monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],//月份全称，汉语有效
			monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],//月份简写，无效
			//defaultDate:+7,//默认日期加7天
			//duration:2000,//打开方式，fast,slow,normal，或者毫秒
			firstDay:1,//指定星期几到星期几，默认日-六
			//altField:"#datepicker",//一个input元素 ，使用选择器 选择的另一个地方更新datepicker选择的日期
			altFormat:"dd/mm/yy",//对应显示的样式
			//appendText:"日期",//日期字段后面的文本
			showWeek:true,	//一年中的第几周
			weekHeader:'周',//周的标题 	
			//numberOfMonths:3,//同时显示月份的个数
			//numberOfMonths:[3,3],//同时显示3行3列
			//showOtherMonths:true,当月中没有的单元格会补全，但是不可用，如果需要可用，则设置selectOtherMonths
			//selectOtherMonths:true,
			changeMonth:true,//快速显示月份
			changeYear:true,//快速显示年份
			yearRange:"1950:2040",//显示年份
			maxDate:"0",//最大的可选日期，0表示今天，1表示从今天开始的第一天，y,m,w,d->年月周天
			//	minDate:"-1m",//最小的可选日期
			//isRTL:true,//对否由右边想左边绘制日历
			//autoSize:true,//是否自动调整控件大小。自己书写了css样式后，没什么作用
			//showOn:'button',//focus:获取焦点触发,button:点击按钮触发,both:两则兼容
			//buttonText:'选择',//showOn选择button后按钮显示的文字
			//buttonImage:'./img/error.png',//showOn选择button后按钮处的图片地址
			//buttonImageOnly:true,//showOn选择button后按钮处的图片，去除按钮边框
			//showButtonPanel:true,//开启显示按钮面板
			//closeText:'关闭',	//按钮面板关闭按钮文字
			//currentText:"当前日期yy-mm-dd",//按钮面板返回当前日期按钮文字
			//nextText:'下个月mm',//上个月按钮文字设置
			//prevText:'上个月mm',//下个月按钮文字设置
			//navigationAsDateFormat:true,//设置curren，next，prev的文字格式可以是format的日期格式(yy,mm,dd)
			//yearSuffix:"年",//附加在年份后面的文字
			//showMonthAfterYear:true,//月份放到年份后面显示	
			/*beforeShow:function(){
				alert('日历显示之前被调用');
			},*/
			
			/*beforeShowDay:function(date){
				if(date.getDate()==1){
					return [false,'a','不能选'];
				}else{
					return [true];
				}
			},*/
			
			/*onChangeMonthYear:function(year,month,inst){//日历中年份或者月份改变时激活
				//alert(year);
				//alert(month);
				//alert(inst);
				$.each(inst,function(name,value){
					//alert(name);
					document.write(name+'---'+value+'<br/>');
				});
			},*/
		});
		
		$('#reg input[title]').tooltip({
			//content:"请输入验证码",
			//disabled:true,
			position:{//确定提示框的位置
				my:"left bottom",
				at:"right+5 bottom"
			},
			//show:"slide",//打开效果
			//hide:"slide",//关闭效果
			tooltipClass:"tools",//css样式名称
			//track:true,//提示信息更随鼠标
			/*close:function(event,ui){
				alert('关闭时促发');
			},
			open:function(event,ui){
				alert('打开时促发');
			}*/
			
		});
		//$("#reg input[title]").tooltip("option","track",false);//更改track的值
		//alert($("#reg input[title]").tooltip('option','track'));//获取track的值
		//alert($("#reg input[title]").tooltip('widget').length);//返回一个包含 生成包裹元素 的 jQuery 对象。
		
		
		/*自动完成练习*/
		//var hot = ['aa','aaa','aaaa','bb'];
		//$("#email").autocomplete({
			//source:hot,
			//autoFocus:true,//第一个条目自动获取焦点
			//delay:1000,//按键和执行搜索之间的延迟
			//disabled:true,//是否禁用
			//minLength:2,//执行搜索前用户必须输入的最小字符数
			/*position:{//建议菜单的位置
				my:"left bottom",
				at:"right+5 bottom"
			},*/
			/*change:function(event,ui){
				alert("输入域的值改变，则促发，需要失去焦点");
			}*/
			/*close:function(event,ui){
				alert("当菜单隐藏时促发");
			}*/
			/*create:function(event,ui){
				alert("当创建autocomplete时促发");
			}*/
			/*focus:function(event,ui){
				alert("当焦点移动到一个条目上时促发（未选择）");
			}*/
			/*open:function(event,ui){
				alert("打开建议菜单的、或者更新建议菜单时促发");
			}*/
			/*response:function(){
				alert("搜索完成时促发");
			}*/
			/*search:function(){
				alert("在搜索满足minLength，和delay后促发");
			}*/
			/*select:function(){
				alert("当从菜单中选择条目时触发");
			}*/
		//});
		
		/*邮箱自动完成*/
		$('#email').autocomplete({
			autoFocus:true,
			delay:0,
			source:function(request,response){
				//alert(request.term);//获取用户输入的内容
				//response(['aa','ddd','aaaa','cccc']);//绑定数据源
				
				var hosts = ['qq.com','163.com','sina.com.cn','gmail.com','126.com'],
					term = request.term,//获取用户输入的内容
					name = term,//赋值给name,邮箱的用户名
					host = '',//邮箱的域名
					num = term.indexOf('@'),//@出现的位置
					result = [];//最终呈现的邮箱列表
					
					result.push(term);
					
					if(num > -1){
						name = term.slice(0,num);
						host = term.slice(num+1);
					}
					if(name){
						/*如果用户已经输入@和后面的域名，那么就找到相关的域名提示，bbs@1，就提示bbs@163.com
						 *如果用户还没有输入@和后面的域名
						 *那么就把所有的域名都提示出来
						 * indexOf()返回某个指定的字符串值在字符串中首次出现的位置,不存在返回-1
						 * $.grep，过滤函数，过滤数组元素
						 * $.map() 将一组元素转换成其他数组（不论是否是元素数组）
						 */
						var findHost = (host ? $.grep(hosts,function(value,index){
										return value.indexOf(host) > -1
									}):hosts),
							findResult = $.map(findHost, function(value,index) {
										return name + '@' +value;
									});	
										
						result = result.concat(findResult);			
					}
					
					response(result);
			},
		});
		

	});
	
	
	
	/*juqery validate插件 form验证插件*/
		
		//$.validator.setDefaults({
		//	debug:true,
		//});//全局所有表单，调试模式，不可提交
		
		$('#regs').validate({
			
			debug:true,//调试模式，表单不提交
			submitHandler:function(){//通过验证后运行的函数，里面要加上表单提交的函数，否者表单不会提交。多结合ajax提交使用
				alert('验证成功啦');
			},
			//ignore:'.user,.email',//对某些元素不验证
			
			/*groups:{//群组错误提示
				myerror:'user email',
			},
			focusInvalid:false,
			errorPlacement:function(error,element){//重组错误提示
				//alert(error);
				//alert(element[0]);
				$.each(error,function(index,value){
					//alert(index+'--'+$(value).html());
					$("#myerror").html($("#myerror").html()+'--'+$(value).html());
				});
				
			},*/
			
			/*groups:{
				error_user:'user',
				error_email:'email',
			},
			*/
			/*errorPlacement:function(error,element){
				error.appendTo('#myerror');
			},*/
			
			//errorClass:'abc',//指定错误提示的class名，默认error
			//errorElement:'p',//指定错误提示的标签，默认label
			//errorLabelContainer:"#myerror",
			//wrapper:'li',
			
			//success:'abc',//要验证的元素通过验证后的动作，如果跟一个字符串，会当作一个 css 类，也可跟一个函数
			//success:function(label){
			//	label.addClass('abc').text("ok");		
			//},
			
		/*	highlight:function(element,errorClass){//未通过验证的添加样式
				$(element).css('border','1px solid red');
			},
			unhighlight:function(element,errorClass){//通过后恢复
				$(element).css('border','0px solid red');
			},*/
			
			
			
			rules:{
				user:{
					required:true,
					minlength:2,
				},
				email:{
					required:true,
					email:true,
				},
				url:{
					required:true,
					url:true,
				},
				pass:{
					required:true,
					minlength:5,
				},
				notpass:{
					required:true,
					minlength:5,
					equalTo:'#pass',
				},
				num:{
					required:true,
					number:true,
					range:[5,10],
				},
				dig:{
					required:true,
					digits:true,
					rangelength:[3,8],
				},
				date:{
					required:true,
					date:true,
				},
				dateISO:{
					required:true,
					dateISO:true,
				},
				
			},
			messages:{
				user:{
					required:'请输入账号',
					minlength:jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
				},
				email:{
					required:'请输入邮箱',
					email:'请输入正确的邮箱',
				},
				url:{
					required:'请输入网址',
					url:'请输入正确的网址',
				},
				pass:{
					required:'请输入密码',
					minlength:jQuery.validator.format('请输入不少于{0}位密码'),
				},
				notpass:{
					required:'请输入密码',
					minlength:jQuery.validator.format('请输入不少于{0}位密码'),
					equalTo:'两次输入密码不一致',
				},
				num:{
					required:'请输入内容',
					number:'请输入合法的数字',
					range:jQuery.validator.format('输入的值必须在{0}-{1}之间'),
				},
				dig:{
					required:'请输入内容',
					digits:'请输入正整数',
					rangelength:jQuery.validator.format('输入长度必须介于{0}-{1}之间（汉字算一个字符）'),
				},
				date:{
					required:'请输入内容',
					date:'请输入正确的日期格式，即验证格式也验证有效性',
				},
				dateISO:{
					required:'请输入内容',
					dateISO:'请输入正确的格式，只验证格式',
				},
				
			}
		});
	
	
	
	
/*选项卡ui tabs*/
	
	$('#tabs').tabs({
		active:1,//默认选中第几个选项卡
		collapsible:true,//允许折叠选项卡
		//disabled:[0,1],//哪些标签将要被禁用，true所有的禁用
		//event:"mouseover",//激活选项卡的事件类型。mouseoner悬停激活
		//heightStyle:'auto',//所有的面板将会设置为最高面板的高度
		//heightStyle:"content",//每个面板的高度取决于它的内容容
		//heightStyle:"fill",//基于tabs父元素的高度，扩展到可用高度
		hide:true,//隐藏的动画效果
		show:true,//显示的动画效果
		
		/*activate:function(event,ui){
			alert('面板被激活后促发（在动画完成之后）');
			alert($(ui.oldTab.get()).html());//oldTab刚被取消的选项卡
			alert($(ui.oldPanel.get()).html());//oldPanel刚被取消的面板
			alert($(ui.newTab.get()).html());//newTab刚刚被激活的选项卡
			alert($(ui.newPanel.get()).html());//newPanel刚刚被激活的面板
		},
		*/
		
		/*
		beforeActivate:function(event,ui){
			alert('面板被激活前触发');
			alert($(ui.oldTab.get()).html());//oldTab刚被取消的选项卡
			alert($(ui.oldPanel.get()).html());//oldPanel刚被取消的面板
			alert($(ui.newTab.get()).html());//newTab刚刚被激活的选项卡
			alert($(ui.newPanel.get()).html());//newPanel刚刚被激活的面板
		},
		*/
		/*
		create:function(event,ui){
			alert('创建选项卡时触发');
			alert($(ui.tab.get()).html());
			alert($(ui.panel.get()).html());
		}
		*/
		});
		
		/*折叠面板ui accordion*/
		$("#accordion").accordion();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
