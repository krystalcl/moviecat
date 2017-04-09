(function(angular){
	angular.module('moviecat.directives.auto_focus',[])
	.directive('autoFocus',['$location',function($location){
		var path = $location.path(); //  /coming_soon/1
		return{
			restrict:'A',
			link:function($scope,iElm,iAttrs,controller){
				var aLink = iElm.children().attr('href');
				var type = aLink.replace(/#(\/.+?)\/\d+/,'$1'); // /coming_soon
				if(path.startsWith(type)){
					iElm.addClass('active');
				}
				iElm.on('click',function(){
					iElm.parent().children().removeClass('active');
					iElm.addClass('active');
				});
			}
		};
	}]);
})(angular);
