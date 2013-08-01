function codeCtrl($scope) {
  $scope.translations = {};
  var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for (var i = 0; i < letters.length; i++) {
    $scope.translations[letters[i]] = false;
  }
  $scope.updateLetters = function() {
    if (typeof($scope.secretMessage) != 'undefined') {
      $scope.letters = [];
      console.log($scope.secretMessage);
      var letters = $scope.secretMessage.split('');
      for (var i = 0; i < letters.length; i++) {
        $scope.letters.push({letter: letters[i], translated: $scope.translations[letters[i]]});
      }
    }
  }

  $scope.translate = function(letter) {
    $scope.translations[letter] = true;
    $scope.updateLetters();
  }

  $scope.$watch('secretMessage', $scope.updateLetters);
}
