var app = angular.module('StopwatchApp', ['ui.bootstrap']);

app.controller('WatchController', function ($scope, $interval) {
	$scope.title = "Stopwatch App";
	$scope.currentTime = new Date();
	$scope.startTimes = [];
	$scope.totalStarts = 0;
	$interval(function() {
		$scope.currentTime = new Date();
	}, 500);

});

app.directive('stopwatch', function() {
	return {
		restrict: 'E',
		templateUrl: '../views/stopwatch.html',
		
		controllerAs: 'watch',
		controller: function($scope, $interval) {
			var elapsedTime = 0;
			var totalElapsedTime = 0;
			var startTime;
			var timerPromise;

			$scope.buttonText = "Start";

			this.startStop = function() {
				if (!timerPromise) {
					$scope.buttonText = "Stop";
					startTime = new Date();
					$scope.startTimes.push(startTime);
					$scope.totalStarts++;
					timerPromise = $interval(function() {
						var now = new Date();
						elapsedTime = now.getTime() - startTime.getTime();
					}, 50);
				} else if (timerPromise) {
					$scope.buttonText = "Start";
					$interval.cancel(timerPromise);
					timerPromise = undefined;
					totalElapsedTime += elapsedTime;
					elapsedTime = 0;
				};
			};
			
			this.reset = function() {
				startTime = new Date();
				totalElapsedTime = elapsedTime = 0;
			};

			this.getElapsedTime = function() {
				return totalElapsedTime + elapsedTime;
			};
		}
	};
});

app.directive('timeChart', function() {
	return {
		restrict: 'E',
		templateUrl: '../views/startTime.html',
		
		controllerAs: 'chart',
		controller: function($scope) {
			this.getStartTimes = function() {
				return $scope.startTimes;
			};

			this.clearStartTimes = function() {
				$scope.startTimes = [];
			};
		}
	};
});

