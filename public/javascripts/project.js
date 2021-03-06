angular.module('project', ['ngRoute', 'firebase'])

.value('fbURL', 'https://angular-js.firebaseio.com/')

.factory('Projects', function($firebase, fbURL){
  return $firebase(new Firebase(fbURL))
})

.config(function($routeProvider){
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'partials/list'
    })
    .when('/edit/:projectId', {
      controller:'EditCtrl',
      templateUrl:'partials/details'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'partials/details'
    })
    .when('/login', {
      controller: 'LoginCtrl',
      templateUrl:'partials/login'
    })
    .otherwise({
      redirectTo:'/login'
    });
})

.controller('ListCtrl', ['$scope','$firebaseSimpleLogin', 'Projects', 'fbURL', function($scope, $firebaseSimpleLogin, Projects, fbURL){
  $scope.projects = Projects;
  $scope.loginObj = $firebaseSimpleLogin(new Firebase(fbURL))
}])

.controller('CreateCtrl', ['$scope', '$location', '$timeout', 'Projects' function($scope, $location, $timeout, Projects){
  $scope.save = function() {
    Projects.$add($scope.project, function(){
      $timeout(function(){ $location.path('/') });
    });
  };
}])

.controller('EditCtrl', ['$scope', '$location', '$routeParams', '$firebase', 'fbURL'
  function($scope, $location, $routeParams, $firebase, fbURL){
    var projectUrl = fbURL + $routeParams.projectId;
    $scope.project = $firebase(new Firebase(projectUrl));

    $scope.destroy = function() {
      $scope.project.$remove();
      $location.path('/');
    };

    $scope.save = function() {
      $scope.project.save();
      $location.path('/')
    };
  }]
)

.controller('LoginCtrl', ['$scope', '$location', '$firebaseSimpleLogin', 'fbURL'
  function($scope, $location, $firebaseSimpleLogin, fbURL){
    var ref = new Firebase(fbURL);
    $scope.loginObj = $firebaseSimpleLogin(ref);

    $scope.login = function() {
        $scope.loginObj
          .$login('twitter')
          .then(function(user){ $location.path('/') }, function(error){console.log(error)});
    };
  }]
);
