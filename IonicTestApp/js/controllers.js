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

            $scope.loadingIndicator = $ionicLoading.show({
                template: '<p>Loading ...</p>'
            });

            EmployeeService.findAll().success(function (response) {
                $scope.employees = response;
                $ionicLoading.hide();
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

    .controller('linqController', function ($scope, $stateParams, $ionicLoading, $compile) {
        var employees = [
    { "Id": 1, "FirstName": "James", "LastName": "King", "managerId": 0, "managerName": "", "reports": 4, "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "James_King.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org" },
    { "Id": 2, "FirstName": "Julie", "LastName": "Taylor", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "Julie_Taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org" },
    { "Id": 3, "FirstName": "Eugene", "LastName": "Lee", "managerId": 1, "managerName": "James King", "reports": 0, "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "Eugene_Lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org" },
    { "Id": 4, "FirstName": "John", "LastName": "Williams", "managerId": 1, "managerName": "James King", "reports": 3, "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "John_Williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org" },
    { "Id": 5, "FirstName": "Ray", "LastName": "Moore", "managerId": 1, "managerName": "James King", "reports": 2, "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "Ray_Moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org" },
    { "Id": 6, "FirstName": "Paul", "LastName": "Jones", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "Paul_Jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org" },
    { "Id": 7, "FirstName": "Paula", "LastName": "Gates", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "Paula_Gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org" },
    { "Id": 8, "FirstName": "Lisa", "LastName": "Wong", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "Lisa_Wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org" },
    { "Id": 9, "FirstName": "Gary", "LastName": "Donovan", "managerId": 2, "managerName": "Julie Taylor", "reports": 0, "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "Gary_Donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org" },
    { "Id": 10, "FirstName": "Kathleen", "LastName": "Byrne", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "Kathleen_Byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org" },
    { "Id": 11, "FirstName": "Amy", "LastName": "Jones", "managerId": 5, "managerName": "Ray Moore", "reports": 0, "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "Amy_Jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org" },
    { "Id": 12, "FirstName": "Steven", "LastName": "Wells", "managerId": 4, "managerName": "John Williams", "reports": 0, "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "Steven_Wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org" }
        ];

        var filteredEmployees = Enumerable.from(employees).where("x=>x.Id>5");
        $scope.origin = { text: "" };
        $scope.routeType = { text: "2" };
        $scope.objectGoogleMaps = {
            enable: false,
            routeType: "2",
            destination: ""
        };

        $scope.filteredListByLINQ = filteredEmployees.toArray();
        var directionsDisplay = new google.maps.DirectionsRenderer();


        function initialize() {
            var myLatlng = new google.maps.LatLng(43.07493, -89.381388);

            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'SOMEWHERE BEYOND THE SEA'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            directionsDisplay.setMap(map);

            $scope.directionsDisplay = directionsDisplay;
            $scope.map = map;
        }

        google.maps.event.addDomListener(window, 'load', initialize);

        initialize();

        $scope.centerOnMe = function () {
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 90000 };

            //Use HTML5 geolocation
            navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    map: $scope.map,
                    title: "I'm here"
                });
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            },options);
        };

        $scope.clickTest = function () {
            alert('Example of infowindow with ng-click')
        };

        $scope.calcRoute = function () {

            //Directions
            var directionsService = new google.maps.DirectionsService();

            var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 90000 };

            //Get current position using geolocation and use it as the origin to go somewhere else
            navigator.geolocation.getCurrentPosition(function (pos) {
                var currentLoc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

                var start = currentLoc;
                var end = $scope.objectGoogleMaps.destination;//"Oxford Circus, London";

                var routeTypeString = google.maps.TravelMode.WALKING;

                switch ($scope.objectGoogleMaps.routeType)
                {
                    case "1":
                        routeTypeString = google.maps.TravelMode.WALKING;
                        break;
                    case "2":
                        routeTypeString = google.maps.TravelMode.DRIVING;
                        break;
                    case "3":
                        routeTypeString = google.maps.TravelMode.TRANSIT;
                        break;
                    default: break;
                }

                var request = {
                    origin: start,
                    destination: end,
                    travelMode: routeTypeString
                };
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        $scope.directionsDisplay.setDirections(response);
                    }
                });

            }, function (error) {
                alert('Unable to get location: ' + error.message);
            }, options);
        }
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
