angular.module('directory.controllers', [])

    .controller('EmployeeIndexCtrl', function ($scope, EmployeeService) {

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

            EmployeeService.findAll().success(function (response) {
                $scope.employees = response;
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
    })

    .controller('EmployeeReportsCtrl', function ($scope, $stateParams, EmployeeService) {
        EmployeeService.findByManager($stateParams.employeeId).then(function(employees) {
            $scope.employees = employees;
        });
    });
