(function(angular) {
	'use strict';


	var module = angular.module('moviecat.movie_list', [
		'ngRoute',
		'moviecat.services.http'
		]);

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			//在路由的后面加上页数‘：’为提取page
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);

	module.controller('MovieListController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		function($scope,$route,$routeParams,HttpService) {
			var count = 10;
			var page = parseInt($routeParams.page);// 页码
			var start = (page - 1)*count;//当前页从哪条开始


			$scope.subjects = [];
			$scope.message = '';
			$scope.title = '';
			$scope.totalCount = 0;
			$scope.totalPages = 0;
			$scope.loading = true;//开始加载
			$scope.currentPage = page;
			HttpService.jsonp(
				'https://api.douban.com//v2/movie/'+$routeParams.category,
				{start:start,count:count},
				function(data){
				$scope.title = data.title;
				$scope.subjects = data.subjects;
				$scope.totalCount = data.total;
				$scope.totalPages = Math.ceil($scope.totalCount/count)
				$scope.loading = false;//数据加载完后loading消失
				$scope.$apply();
				//$apply的作用就是让制定的表达式重新同步



			});
			//暴露一个更改上一页下一页的操作
			$scope.go = function(page){
				//传过来是第几页就跳到第几页
				//一定要做一个合法范围检验
				if(page>=1&&page<=$scope.totalPages)
					$route.updateParams({page:page});
			}

	}]);

})(angular);



// var doubanApiAddress = ''
			// $http.jsonp(doubanApiAddress+'').then(function(res){
			// 	if(res.status==200){
			// 		$scope.subjects = res.data.subjects;
			// 	}else{
			// 		$scope.message="获取数据错误,错误信息："+res.statusText;
			// 	}

			// 	// console.log(data);
			// },function(err){
			// 	$scope.message="获取数据错误,错误信息："+err.statusText;
			// });
