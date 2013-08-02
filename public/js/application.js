angular.module('codeBreaker', ['firebase'], function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'new.html',
    controller: 'NewCtrl'
  });
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard.html',
    controller: 'DashboardCtrl'
  });
  $routeProvider.when('/:messageKey', {
    templateUrl: 'decode.html',
    controller: 'TranslateCtrl'
  });
  $locationProvider.html5Mode(true);
}).
value('fbURL', 'https://secret-messages.firebaseio.com/messages');

function NewCtrl($scope, $routeParams, fbURL, angularFire) {
  angularFire(fbURL, $scope, 'messages', {});

  $scope.name = 'NewCtrl';
  $scope.params = $routeParams;

  $scope.updateLetters = function() {
    if (typeof($scope.secretMessage) != 'undefined') {
      $scope.letters = [];
      var letters = $scope.secretMessage.split('');
      for (var i = 0; i < letters.length; i++) {
        $scope.letters.push({letter: letters[i], translated: $scope.translations[letters[i]]});
      }
    }
  }
  $scope.translations = {};
  var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for (var i = 0; i < letters.length; i++) {
    $scope.translations[letters[i]] = false;
  }
  $scope.saveMessage = function() {
    var key = Math.random().toString(36).slice(2);
    $scope.messages[key] = $scope.secretMessage;
  }

  $scope.$watch('secretMessage', $scope.updateLetters);
}

function DashboardCtrl($scope, $routeParams, fbURL, angularFire) {
  $scope.name = 'DashboardCtrl';
  $scope.params = $routeParams;
  angularFire(fbURL, $scope, 'messages', {});
}

function TranslateCtrl($scope, $routeParams, fbURL, angularFire) {
  $scope.name = 'TranslateCtrl';
  $scope.params = $routeParams;
  angularFire(fbURL, $scope, 'messages', {});
  $scope.secretMessage = $scope.messages[$routeParams.messageKey];

  $scope.translations = {};
  var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for (var i = 0; i < letters.length; i++) {
    $scope.translations[letters[i]] = false;
  }
  $scope.updateLetters = function() {
    $scope.letters = [];
    var letters = $scope.secretMessage.split('');
    for (var i = 0; i < letters.length; i++) {
      $scope.letters.push({letter: letters[i], translated: $scope.translations[letters[i]]});
    }
  }
  $scope.translate = function(letter) {
    $scope.translations[letter] = true;
    $scope.updateLetters();
  }
  $scope.updateLetters();
}

function codeCtrl($scope, $route, $routeParams, $location, fbURL, angularFire) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  angularFire(fbURL, $scope, 'messages', {});
}
