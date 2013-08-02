angular.module('codeBreaker', [], function($routeProvider, $locationProvider) {
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
factory('Messages', function() {
  return {};
});

function NewCtrl($scope, $routeParams, Messages) {
  $scope.name = 'NewCtrl';
  $scope.params = $routeParams;
  $scope.messages = Messages;

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
    console.log('save message!');
    var key = Math.random().toString(36).slice(2);
    $scope.messages[key] = $scope.secretMessage;
  }

  $scope.$watch('secretMessage', $scope.updateLetters);
}

function DashboardCtrl($scope, $routeParams, Messages) {
  $scope.name = 'DashboardCtrl';
  $scope.params = $routeParams;
  $scope.messages = Messages;
}

function TranslateCtrl($scope, $routeParams, Messages) {
  $scope.name = 'TranslateCtrl';
  $scope.params = $routeParams;
  $scope.messages = Messages;
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
      $scope.letters.push({letter: letters[i], translated: $scope.translations[letters[i].toLowerCase()]});
    }
  }
  $scope.translate = function(letter) {
    $scope.translations[letter] = true;
    $scope.updateLetters();
  }
  $scope.updateLetters();
}

function codeCtrl($scope, $route, $routeParams, $location, Messages) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.messages = Messages;
}
