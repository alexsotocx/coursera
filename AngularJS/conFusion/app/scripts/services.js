'use strict';

angular.module('confusionApp')
.constant('baseURL', "http://localhost:3000/")
.service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {




	this.getDishes = function(){
		return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
	};

	this.getPromotions = function() {
		return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
	}
	// that returns a selected promotion.


}])

.factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {

	var corpfac = {};

	// Implement two functions, one named getLeaders,
	corpfac.getLeaders = function() {
		return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
	};

	// the other named getLeader(index)
	// Remember this is a factory not a service
	return corpfac;

}])
.factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {

	var feedbackFactory = {};

	// Implement two functions, one named getLeaders,
	feedbackFactory.getFeedBack = function() {
		return $resource(baseURL+"feedback/:id",null,  {'create':{method:'POST' }});
	};

	// the other named getLeader(index)
	// Remember this is a factory not a service
	return feedbackFactory;

}])
;
