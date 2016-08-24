angular.module('cacheExampleApp', ['angular-cache']).
run(["$http","CacheFactory",function($http,CacheFactory) {
            $http.defaults.cache = CacheFactory('defaultCache', {
                maxAge: 5 * 60 * 1000,  //Items added to this cache expire after 5 minutes
                cacheFlushInterval: 30 * 60 * 1000,  //This cache will clear itself every 30 minutes
                deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
				storageMode: 'sessionStorage'
            })
			
			// above is use to cache response of http request 
}]).

controller('CacheController', ['$scope','CacheFactory','$window','$http', function($scope,CacheFactory,$window,$http) {
    var pageCache = CacheFactory.createCache('pageCache', {
    	        deleteOnExpire: 'aggressive',
    	        maxAge: 30 * 60 * 1000, // 30 Mins
    	        recycleFreq: 60000,
    	        storageMode: 'memory'});
				// if storageMode is memory than u can not see it in sessionStorage
				// if storageMode is sessionStorage than u can see it in sessionStorage
			pageCache.put("name","Gourav Patil");	
			pageCache.put("Company","Cybage s/w pvt. ltd.");	
			$scope.name = pageCache.get("name");
			$scope.company = pageCache.get("Company");
			
			console.log("name  = "+pageCache.get("name") + "Company  = "+pageCache.get("Company"));						 
}]); 