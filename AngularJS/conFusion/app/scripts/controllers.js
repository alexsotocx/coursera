'use strict';

angular.module('confusionApp')

				.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

						$scope.tab = 1;
						$scope.filtText = '';
						$scope.showDetails = false;
						$scope.dishes = [];
						$scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });


						$scope.select = function(setTab) {
								$scope.tab = setTab;

								if (setTab === 2) {
										$scope.filtText = "appetizer";
								}
								else if (setTab === 3) {
										$scope.filtText = "mains";
								}
								else if (setTab === 4) {
										$scope.filtText = "dessert";
								}
								else {
										$scope.filtText = "";
								}
						};

						$scope.isSelected = function (checkTab) {
								return ($scope.tab === checkTab);
						};

						$scope.toggleDetails = function() {
								$scope.showDetails = !$scope.showDetails;
						};
				}])

				.controller('ContactController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
						$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
						$scope.feedbacks = feedbackFactory.getFeedBack().query();

						var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

						$scope.channels = channels;
						$scope.invalidChannelSelection = false;

				}])

				.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

						$scope.sendFeedback = function() {


								if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
										$scope.invalidChannelSelection = true;
										console.log('incorrect');
								}
								else {
										$scope.invalidChannelSelection = false;
										$scope.feedbacks.push($scope.feedback);
										feedbackFactory.getFeedBack().create({}, $scope.feedbacks);
										$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
										$scope.feedback.mychannel="";
										$scope.feedbackForm.$setPristine();
										console.log($scope.feedback);
								}
						};
				}])

				.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

						$scope.dish = {};
						$scope.showDish = false;
            $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );

				}])

				.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
						$scope.commentFeed = {rating:5, comment:"", author:"", date:""};
						$scope.submitComment = function () {
								$scope.commentFeed.date = new Date().toISOString();
                console.log($scope.commentFeed);
								$scope.dish.comments.push($scope.commentFeed);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
								$scope.commentForm.$setPristine();
								$scope.commentFeed = {rating:5, comment:"", author:"", date:""};
            }
				}])

				// implement the IndexController and About Controller here
				.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory){
					$scope.dish = {};
					$scope.showDish = false;
	        $scope.messageDish="Loading ...";
	        $scope.dish = menuFactory.getDishes().get({id:0}).$promise.then(
	            function(response){
	                $scope.dish = response;
	                $scope.showDish = true;
	            },
	            function(response) {
	                $scope.messageDish = "Error: "+response.status + " " + response.statusText;
	            }
	        );
	        $scope.showPromotion = false;
	        $scope.messagePromotion="Loading ...";
	        $scope.dish = menuFactory.getPromotions().get({id:0}).$promise.then(
	            function(response){
	                $scope.promotion = response;
	                $scope.showPromotion = true;
	            },
	            function(response) {
	                $scope.messagePromotion = "Error: "+response.status + " " + response.statusText;
	            }
	        );
	        $scope.showLeader = false;
	        $scope.messageLeader="Loading ...";
	        $scope.dish = corporateFactory.getLeaders().get({id:0}).$promise.then(
	            function(response){
	                $scope.executiveChief = response;
	                $scope.showLeader = true;
	            },
	            function(response) {
	                $scope.messageLeader = "Error: "+response.status + " " + response.statusText;
	            }
	        );
				}])
				.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
					$scope.leaders = [];
					$scope.showLeaders = false;
          $scope.message = "Loading ...";
          corporateFactory.getLeaders().query(
              function(response) {
                  $scope.leaders = response;
                  $scope.showLeaders = true;
              },
              function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              });
				}])

;
