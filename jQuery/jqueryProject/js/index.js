/*
*（1）学习jQuery,jQuery UI，jQuery form（异步提交插件） ，jQuery validator（表单验证插件）,jQuery cookie等插件时完成的项目
*（2）由于学习过程编写。时间跨度较长，各函数，变量申明不严谨。敬请见谅。例：注册函数userRegister(),登录函数userLogin()内容过多，因拆分多个函数
*（3）主文件：index.html，index.js，index.css
*（4）这个版本的jQuery UI 等插件不支持IE9以下。
*/

$(function(){
	
	if($.cookie('user')){
		showHide();
		$(".users").html($.cookie('user'));
	}else{
		hideShow();
	}
	
	$('.loginout').click(function(){
		$.removeCookie('user');
		hideShow();
		$("#reg .stau").html('*').removeClass('error_stau');
		window.location.reload();
	});
	
	$.ajax({
		url:'show_question.php',
		type:'post',
		success:function(response,status,xhr){
			//alert(response);
			var json = eval(response);
			var html = '';
			var arr = [];
			var summary = [];
			$.each(json,function(index,value){
				//alert(value.contents);
				var newDate = new Date();
				newDate.setTime(value.time * 1000);
				time = newDate.toLocaleString();
				html += '<h4>'+value.user+'  发表于'+time+'</h4><h3>'+value.title+'</h3><div class="editor">'+value.content+'</div><div class="bottom"><span class="pinglun" data-id="'+value.id+'">'+value.count+'条评论</span> <span class="down">显示全部</span><span class="up">收起</span></div><hr noshade="noshade" size="1"/><div class="comment_list"></div>';
			});
			$(".question").append(html);
			
			$.each($('.editor'),function(index,value){
				arr[index] = $(value).html();
				summary[index] = arr[index].substr(0,200)+'...';
				if(arr[index].length>200){
					if(arr[index].substring(199,200) == '<'){
						summary[index] = arr[index].substr(0,198)+'...';
						$(value).html(summary[index]);
					}else if(arr[index].substring(198,200) == '</'){
						summary[index] = arr[index].substr(0,197)+'...';
						$(value).html(summary[index]);
					}else{
						$(value).html(summary[index]);
					}
					$(value).next('.bottom').find('.up').hide();
				}else{
					$(value).html(arr[index]);
					$(value).next('.bottom').find('.up').hide();
					$(value).next('.bottom').find('.down').hide();
				}
				
			});
			
			$.each($('.bottom .down'),function(index,value){
				$(this).click(function(){
					$(this).parent().prev().html(arr[index]);
					$(this).hide();
					$(this).parent().find(".up").show();
				});
			});
			
			$.each($('.bottom .up'),function(index,value){
				$(this).click(function(){
					$(this).parent().prev().html(summary[index]);
					$(this).hide();
					$(this).parent().find(".down").show();
				});
			});
			
			$.each($('.bottom'),function(index,value){
				$(this).on('click','.pinglun',function(){
					comment_this = this;
					if($.cookie('user')){
						if(!$(".comment_list").eq(index).has('form').length){
							$.ajax({
								url:'show_comment.php',
								type:'POST',
								data:{
									titleid:$(comment_this).attr('data-id'),
								},
								beforeSend:function(jqXHR,settings){
									$(".comment_list").eq(index).append('<dl class="comment_load"><dd>正在加载评论</dd></dl>');
								},
								success:function(response,status){
									$(".comment_list").eq(index).find(".comment_load").hide();
									var json1 = eval(response);
									var count = 0;
									$.each(json1,function(index2,value){
										count = value.count;
										var newDate = new Date();
										newDate.setTime(value.time * 1000);
										time = newDate.toLocaleString();
										$(".comment_list").eq(index).append('<dl class="comment_content"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd>'+time+'</dd></dl>');
									});
									$(".comment_list").eq(index).append('<dl><dd><span class="comment_more">加载更多评论</span></dd></dl>');
									var page = 2;
									if(page>count){
										$(".comment_list").eq(index).find('.comment_more').off('click');
										$(".comment_list").eq(index).find('.comment_more').hide();
										}
									$(".comment_list").eq(index).find('.comment_more').button().on('click',function(){
										$(".comment_list").eq(index).find('.comment_more').button('disable');
										$.ajax({
											url:'show_comment.php',
											type:'POST',
											data:{
												titleid:$(comment_this).attr('data-id'),
												page:page,
											},
											beforeSend:function(jqXHR,settings){
												
											},
											success:function(response,status){
												var json2 = eval(response);
												$.each(json2,function(index3,value){
													var newDate = new Date();
													newDate.setTime(value.time * 1000);
													time = newDate.toLocaleString();
													$(".comment_list").eq(index).find(".comment_content").last().after('<dl class="comment_content"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd>'+time+'</dd></dl>');
												});
												page++;
												if(page>count){
													$(".comment_list").eq(index).find('.comment_more').off('click');
													$(".comment_list").eq(index).find('.comment_more').hide();
												}
												$(".comment_list").eq(index).find('.comment_more').button('enable');
											},	
										});
									});
									$(".comment_list").eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="'+$(comment_this).attr('data-id')+'"/></dd><dd><input type="hidden" name="user" value="'+$.cookie('user')+'"/></dd><dd><input type="button" value="发表"></dd></dl><form>');
									$(".comment_list").eq(index).find(".comment_add input[type=button]").button().click(function(){
										var _this = this;
										$(".comment_list").eq(index).find('form').ajaxSubmit({
											url:'comment.php',
											type:"post",
											beforeSubmit:function(formData,jqForm,options){
												$("#loading").dialog("open").parent().find('.ui-widget-header').hide();
												$("#loading").css('background','url("./img/loading.gif") no-repeat 20px center').html('正在交互中...');
												$(_this).button('disable');
											},
											success:function(responseText,statusText){
												if(responseText == 2){
													$("#loading").css('background','url("./img/reg_succ.png") no-repeat 20px center').html('评论成功...');
													
													var date = new Date();
													var times = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
													var comment = $(".comment_list").eq(index).find('textarea').val();
													$(".comment_list").eq(index).prepend('<dl class="comment_content"><dt>'+$.cookie('user')+'</dt><dd>'+comment+'</dd><dd>'+times+'</dd></dl>');
													
													$(_this).button('enable');
													setTimeout(function(){
														$("#loading").dialog("close");
														$(".comment_list").eq(index).find('form').resetForm('true');
													},1000);
												}else{
													$("#loading").css('background','url("./img/reg_succ.png") no-repeat 20px center').html('评论失败...');
													$(_this).dialog('widget').find('button').eq(1).button('enable');
													setTimeout(function(){
														$("#loading").dialog("close");
														$(".comment_list").eq(index).find('form').resetForm('true');
													},1000);
												}
											},
										});
									});
								},
							});
							
							
						}
						
						if($(".comment_list").eq(index).is(":hidden")){
							$(".comment_list").eq(index).show();
						}else{
							$(".comment_list").eq(index).hide();
						}
					
					}else{
						$('#error').dialog("open");
						setTimeout(function(){
							$('#error').dialog("close");
							userLogin();
						},1000);
					}
				});
			});
			
			
		}
	});
	
	
	/*按钮ui button*/
	$(".chaxun").button({
		icons:{
			primary:'ui-icon-search',
		},
	});
		
	$(".tiwen").button({
		icons:{
			primary:'ui-icon-lightbulb',
		},
	}).click(function(){
		if($.cookie('user')){
			$('#question').dialog("open");
			UE.getEditor('uEditorCustom');
		}else{
			$('#error').dialog("open");
			setTimeout(function(){
				$('#error').dialog("close");
				userLogin();
			},1000);
		}
	});
		
	/*登录*/
	$('.login_a').click(function(){
			userLogin();
	});	
	
	/*注册*/
	$('.reg_a').click(function(){
		userRegister();
	});
	
	
	/*选项卡ui tabs*/
	$('#tabs').tabs();
		
	/*折叠面板ui accordion*/
	$("#accordion").accordion();
		
	

	$('#reg').dialog({
		autoOpen:false,
		title:"用户注册",
		width:320,
		height:350,
		resizable:false,
		modal:true,
		buttons:{
			'提交':function(){
				$(this).submit();
			}
		},
	});
	
	
	$("#login").dialog({
		autoOpen:false,
		title:'用户登录',
		width:320,
		height:200,
		resizable:false,
		modal:true,
		buttons:{
			'提交':function(){
			    $(this).submit();	
			}
		},
	});	
	
	$("#question").dialog({
		autoOpen:false,
		title:'问题发表',
		width:600,
		height:500,
		resizable:false,
		modal:true,
		buttons:{
			'发表':function(){

			    $("#question").ajaxSubmit({
					url:'question.php',
					type:"post",
					data:{
						user:$.cookie('user'),
						contents:UE.getEditor('uEditorCustom').getContentTxt(),
					},
					beforeSubmit:function(formData,jqForm,options){
						$("#loading").dialog("open").parent().parent().find('.ui-widget-header').hide();
						$("#loading").css('background','url("./img/loading.gif") no-repeat 20px center').html('正在交互中...');
						$("#question").dialog('widget').find('button').eq(1).button('disable');
					},
					success:function(responseText,statusText){
						if(responseText == 2){
							//alert('2');
							$("#loading").css('background','url("./img/reg_succ.png") no-repeat 20px center').html('发表成功...');
							$("#question").dialog('widget').find('button').eq(1).button('enable');
							setTimeout(function(){
								$("#loading").dialog("close");
								$("#question").dialog("close").parent().find('.ui-widget-header').show();
								$("#question").resetForm('true');
								UE.getEditor('uEditorCustom').setContent('请输入描述');
							},1000);
						}else{
							$("#loading").css('background','url("./img/reg_succ.png") no-repeat 20px center').html('发表失败...');
							$("#question").dialog('widget').find('button').eq(1).button('enable');
							setTimeout(function(){
								$("#loading").dialog("close");
								$("#question").dialog("close").parent().find('.ui-widget-header').show();
								$("#question").resetForm('true');
								UE.getEditor('uEditorCustom').setContent('请输入描述');
							},1000);
						}
					},
				});	
			}
		},
	});
		
		
	$("#loading").dialog({
		autoOpen:false,
		modal:true,
		width:180,
		height:50,
		resizable:false,
		draggable:false,
		closeOnEscape:false,
	}).parent().find('.ui-widget-header').hide();
	
	$("#error").dialog({
		autoOpen:false,
		modal:true,
		width:180,
		height:50,
		resizable:false,
		draggable:false,
		closeOnEscape:false,
	}).parent().find('.ui-widget-header').hide();
	
	
	
	
	function hideShow(){
		$(".users,.loginout").hide();
		$(".reg_a,.login_a").show();
	}
	
	
	
	function showHide(){
		$(".users,.loginout").show();
		$(".reg_a,.login_a").hide();
	}

	
	
	/*登录函数userLogin*/
	function userLogin(){
		$('#login').dialog('open').buttonset().validate({
			submitHandler:function(){
				$("#login").ajaxSubmit({
					url:'demo.php',
					type:'post',
					beforeSubmit:function(formData,jqForm,options){
						$("#loading").dialog("open").parent().parent().find('.ui-widget-header').hide();
						$("#loading").css('background','url("./img/loading.gif") no-repeat 20px center').html('正在交互中...');
						$("#login").dialog('widget').find('button').eq(1).button('disable');
					},
					success:function(responseText,statusText){
						if(responseText == 2){
							$("#loading").css('background','url("./img/reg_succ.png") no-repeat 20px center').html('登录成功...');
							$("#login").dialog('widget').find('button').eq(1).button('enable');
							setTimeout(function(){
								/*引入jquery cookie 插件，将用户名存入cookie，用户注册后直接显示登录用户名*/
								$.cookie('user',$('#name').val());
								showHide();
								$('.users').html($('#name').val());
								
								$("#loading").dialog("close");
								$("#login").dialog("close").parent().parent().find('.ui-widget-header').show();
								$("#login").resetForm('true');
							},1000);
						}else{
							$("#loading").css('background','url("./img/reg_succ.png") no-repeat 20px center').html('登录失败...');
							$("#login").dialog('widget').find('button').eq(1).button('enable');
							setTimeout(function(){
								$("#loading").dialog("close");
								$("#login").dialog("close").parent().find('.ui-widget-header').show();
								$("#login").resetForm('true');
							},1000);	
							
							//window.location.reload();
						}
					}
				});
	
			},
			
			showErrors:function(errorMap,errorList){
				var errors = this.numberOfInvalids();
				if(errors > 0){
					$("#login").dialog('option','height',errors*30 + 200);
				}else{
					$("#login").dialog('option','height','200');
				}
				this.defaultShowErrors();
			},
			highlight:function(element,errorClass){
				$(element).css('border','1px solid #F7B240');
			},
			unhighlight:function(element,errorClass){
				$(element).css('border','1px solid #cccccc');
			},
			errorLabelContainer:'ol#login_error',
			wrapper:'li',
			rules:{
				name:{
					required:true,
					minlength:3,
					//remote:{url:'index.php',type:'GET'}
				},
				tel:{required:true,minlength:6},
			},
			messages:{
				name:{
					required:"请输入账号",
					minlength:jQuery.validator.format("账号长度至少为{0}位字符"),
					//remote:"账号不存在"
					},
				tel:{required:"请输入密码",minlength:jQuery.validator.format("密码长度至少为{0}位")},
			}
			
		});
		
	}
	
	
	/*注册函数userRegister*/
	function userRegister(){
		$('#reg').dialog('open').buttonset().validate({
			submitHandler:function(){
				$("#reg").ajaxSubmit({
					url:"demo.php",
					type:"get",
					beforeSubmit:function(formData,jqForm,options){
						
						$("#loading").dialog("open").parent().parent().find('.ui-widget-header').hide();
						$("#loading").css('background','url("./img/loading.gif") no-repeat 20px center').html('正在交互中...');
						$("#reg").dialog('widget').find('button').eq(1).button('disable');
						
					},
					success:function(responseText,statusText){
						if(responseText == 2){
							$("#loading").css('background','url("./img/reg_succ.png") no-repeat 20px center').html('数据新增成功...');
							$("#reg").dialog('widget').find('button').eq(1).button('enable');
							setTimeout(function(){
								/*引入jquery cookie 插件，将用户名存入cookie，用户注册后直接显示登录用户名*/
								$.cookie('user',$('#user').val());
								showHide();
								$('.users').html($('#user').val());
								
								$("#loading").dialog("close");
								$("#reg").dialog("close").parent().parent().find('.ui-widget-header').show();
								$("#reg").resetForm('true');
								$("#reg .stau").html('*').removeClass('error_stau');
							},1000);
						}else{
							$("#loading").css('background','url("./img/reg_succ.png") no-repeat 20px center').html('数据新增失败...');
							$("#reg").dialog('widget').find('button').eq(1).button('enable');
							setTimeout(function(){
								$("#loading").dialog("close");
								$("#reg").dialog("close").parent().find('.ui-widget-header').show();
								$("#reg").resetForm('true');
								$("#reg .stau").html('*').removeClass('error_stau');
							},1000);
							//window.location.reload();
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
				userName:{required:true,minlength:3,remote:{url:'user.php',type:'POST',}},
				userPass:{required:true,minlength:6},
				userEmail:{required:true,email:true},
				userDate:{date:true},
				},
			messages:{
				userName:{required:"请输入用户名",minlength:jQuery.validator.format("请至少输入{0}位字符"),remote:"此账号已被注册"},
				userPhone:{required:"请输入密码",minlength:jQuery.validator.format("请输入至少{0}位数密码")},
				userEmail:{required:"请输入邮箱",email:"请输入正确的邮箱"},
				userDate:{date:"请输入正确的日期格式"},
				}
		});
		
		$('#date').datepicker({
			dateFormat:"yy-mm-dd",
			dayNamesMin:['日','一','二','三','四','五','六'],//星期超简写，汉语有效
			monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],//月份简写，无效
			firstDay:1,//指定星期几到星期几，默认日-六
			altFormat:"dd/mm/yy",//对应显示的样式
			showWeek:true,	//一年中的第几周
			weekHeader:'周',//周的标题 	
			//changeMonth:true,//快速显示月份
			//changeYear:true,//快速显示年份
			yearRange:"1950:2040",//显示年份
			maxDate:"0",//最大的可选日期，0表示今天，1表示从今天开始的第一天，y,m,w,d->年月周天
		});
		
		/*$('#reg input[title]').tooltip({
			position:{
				my:"left bottom",
				at:"right+5 bottom"
			},
		});*/
		
		$('#email').autocomplete({
			autoFocus:true,
			delay:0,
			source:function(request,response){
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
	}


















});
