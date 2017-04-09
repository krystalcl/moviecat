

(function(angular){
	var http = angular.module('moviecat.services.http',[]);
	http.service('HttpService',['$window','$document',function($window,$document){
		this.jsonp = function  (url,data,callback) {
		// 请求地址，传过去的数据，回调函数

		//步骤：
		//0.将data转换为url字符串的形式




		//1.挂载回调函数
		var cbFuncName = 'my_jsonp_cb_'+Math.random().toString().replace('.','');
		$window[cbFuncName] = callback;//把回调函数callback赋给cbFuncName
		//
		var querystring = url.indexOf('?')==-1?'?':'&';//判断url是否有？
		for(var key in data){//key为 data的键
			querystring+=key+'='+data[key]+'&';
			//           id   =     1       &
			//{id:1,name:'zhangsan'}=>id=1&name=zhangsan
		}
		//2.处理url中的回调参数
		//url+=callback=asagqAfdg

		querystring+='callback=' + cbFuncName;
		//豆瓣的回调函数只接受名字为callback

		//3.创建一个script标签
		var scriptElement = $document[0].createElement('script');
		scriptElement.src = url + querystring;
		//此时还不能将其append到页面上

		//4.将script标签放到页面中
		$document[0].body.appendChild(scriptElement);
		//append过后页面会自动对这个地址请求，执行脚本文件
	};

	}]);
})(angular);


// 手写一个跨域的组件

// (function(window,document,undefined){
// 	'use strict';
// 	var jsonp = function  (url,data,callback) {
// 		// 请求地址，传过去的数据，回调函数

// 		//步骤：
// 		//0.将data转换为url字符串的形式




// 		//1.挂载回调函数
// 		var cbFuncName = 'my_jsonp_cb_'+Math.random().toString().replace('.','');
// 		window[cbFuncName] = callback;//把回调函数callback赋给cbFuncName
// 		//
// 		var querystring = url.indexOf('?')==-1?'?':'&';//判断url是否有？
// 		for(var key in data){//key为 data的键
// 			querystring+=key+'='+data[key]+'&';
// 			//           id   =     1       &
// 			//{id:1,name:'zhangsan'}=>id=1&name=zhangsan
// 		}
// 		//2.处理url中的回调参数
// 		//url+=callback=asagqAfdg

// 		querystring+='callback=' + cbFuncName;
// 		//豆瓣的回调函数只接受名字为callback

// 		//3.创建一个script标签
// 		var scriptElement = document.createElement('script');
// 		scriptElement.src = url + querystring;
// 		//此时还不能将其append到页面上

// 		//4.将script标签放到页面中
// 		document.body.appendChild(scriptElement);
// 		//append过后页面会自动对这个地址请求，执行脚本文件
// 	};

// 	window.$jsonp = jsonp;//把我们编写的jsonp赋值到全局的jsonp中
// })(window,document);
