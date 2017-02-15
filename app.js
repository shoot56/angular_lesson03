(function() {
	angular
		.module('myApp', [])
		.controller('MainController', ['$scope', function($scope) {

			$scope.countPerPage = 15;
			$scope.offset = 0;
			$scope.activePage = 1;

			// angular.fromJson(window.localStorage.getItem('taskList')) || []
			$scope.newTaskName = '';
			$scope.taskList = angular.fromJson(window.localStorage.getItem('taskList')) || [];

			$scope.addTask = function() {
				if ($scope.newTaskName) {
					$scope.taskList.push({
						id: $scope.taskList.length,
						name: $scope.newTaskName,
						done: false
					});
					$scope.newTaskName = '';
				}
			};
			$scope.removeTask = function(taskId) {
				for (var i = 0; i < $scope.taskList.length; i++) {
					if ($scope.taskList[i].id === taskId) {
						if (confirm('Are you sure you want to delete item `' + $scope.taskList[i].name + '`')) {
							$scope.taskList.splice(i, 1);
						}
						break;
					}
				}
			};

			// remove all
			$scope.removeAllTask = function() {
				if (confirm('Are you sure you want to delete ALL item ')) {
					$scope.taskList.splice($scope.offset, $scope.countPerPage);
				}
			};
			// check all
			$scope.selectAll = {
				value: false
			}
			$scope.checkAll = function() {
				if ($scope.selectAll.value) {
					for (var i = $scope.offset; i < $scope.offset + $scope.countPerPage; i++) {
						if($scope.taskList[i]){
							$scope.taskList[i].done = true;
						}
					}
				} else {
					for (var i = $scope.offset; i < $scope.offset + $scope.countPerPage; i++) {
						if($scope.taskList[i]){
							$scope.taskList[i].done = false;
						}
					}
				}
			}

		$scope.$watch('taskList', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				window.localStorage.setItem('taskList', angular.toJson($scope.taskList));
			}
			// paging start
			$scope.pagers = [];
			$scope.taskListPager = Math.ceil($scope.taskList.length/$scope.countPerPage);

			for (var i = 0; i < $scope.taskListPager; i++) {
				$scope.pagers.push(i);
			}
			$scope.goToPage = function(page){
				$scope.offset = page * $scope.countPerPage;
				$scope.selectAll = {
					value: false
				}
				$scope.activePage = ($scope.offset/$scope.countPerPage)+1;

			}
			// paging end
		}, true);
		// sort task list 
		$scope.sortStatus = 1;
		$scope.sortTask = function() {
			if ($scope.sortStatus === 1) {
				function compareName(taskA, taskB) {
					return taskA.name - taskB.name;
				}
				$scope.taskList.sort(compareName);
				console.log($scope.taskList);
				$scope.sortStatus = 0;
			} else {
				$scope.taskList.reverse(compareName);
				$scope.sortStatus = 1;
			}
		};
	}]);
})();