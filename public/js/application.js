function codeCtrl($scope) {
  $scope.$watch('secretMessage', function() {
    $scope.copyOfMessage = $scope.secretMessage;
  });
}
