angular.module('directory.controllers', ['ionic'])

    .controller('EmployeeIndexCtrl', function ($scope, EmployeeService, $ionicLoading) {

        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            findAllEmployees();
        }

        $scope.search = function () {
            //EmployeeService.findByName($scope.searchKey).then(function (employees) {
            //    $scope.employees = employees;
            //});
            EmployeeService.findByName($scope.searchKey).success(function (response) {
                $scope.employees = response;
            });
        }

        var findAllEmployees = function() {
            //EmployeeService.findAll().then(function (employees) {
            //    $scope.employees = employees;
            //});

            //$ionicLoading.show({
            //    content: 'Loading',
            //    animation: 'fade-in',
            //    showBackdrop: true,
            //    maxWidth: 200,
            //    showDelay: 0
            //});

            EmployeeService.findAll().success(function (response) {
                $scope.employees = response;
                //$ionicLoading.hide();
            });
        }

        findAllEmployees();
    })

    .controller('EmployeeDetailCtrl', function ($scope, $stateParams, EmployeeService) {
        //EmployeeService.findById($stateParams.employeeId).then(function(employee) {
        //    $scope.employee = employee;
        //});
        EmployeeService.findById($stateParams.employeeId).success(function (response) {
            $scope.employee = response;
        });

        EmployeeService.getRSS('https://news.ycombinator.com/rss').success(function (response) {
            $scope.feeds = response.responseData.feed.entries;
        });
    })

    .controller('EmployeeReportsCtrl', function ($scope, $stateParams, EmployeeService) {
        //EmployeeService.findByManager($stateParams.employeeId).then(function(employees) {
        //    $scope.employees = employees;
        //});
        EmployeeService.findByManager($stateParams.employeeId).success(function(employees) {
            $scope.employees = employees;
        });
    })

    .controller('accordionController', function ($scope, $stateParams, EmployeeService) {

        $scope.groups = [];

        //for (var i = 0; i < 10; i++) {
        //    $scope.groups[i] = {
        //        name: i,
        //        items: []
        //    };
        //    for (var j = 0; j < 3; j++) {
        //        $scope.groups[i].items.push(i + '-' + j);
        //    }
        //}

        ///*
        // * if given group is the selected group, deselect it
        // * else, select the given group
        // */
        //$scope.toggleGroup = function (group) {
        //    if ($scope.isGroupShown(group)) {
        //        $scope.shownGroup = null;
        //    } else {
        //        $scope.shownGroup = group;
        //    }
        //};
        //$scope.isGroupShown = function (group) {
        //    return $scope.shownGroup === group;
        //};

        //navigator.notification.vibrate(2000);
        //navigator.splashscreen.show();


        EmployeeService.findById($stateParams.employeeId).success(function (response) {
            var rssFeedUrl = response.Blog;        

            EmployeeService.getRSS(rssFeedUrl).success(function (response) {
                $scope.feeds = response.responseData.feed.entries;

                $.each($scope.feeds, function (index, value) {
                    $scope.groups[index] = {
                        name: value.title,
                        items: []
                    };
                    $scope.groups[index].items.push(value);
                });

                $scope.toggleGroup = function (group) {
                    if ($scope.isGroupShown(group)) {
                        $scope.shownGroup = null;
                    } else {
                        $scope.shownGroup = group;
                    }
                };
                $scope.isGroupShown = function (group) {
                    return $scope.shownGroup === group;
                };
            });

        });
    });
