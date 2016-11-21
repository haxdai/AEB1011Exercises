(function() {
    'use strict';

    angular
        .module('Contacts.controllers')
        .controller('LoginCtrl', LoginController);

    LoginController.$inject = ["$scope", "$timeout", "$stateParams", "ionicMaterialInk", "UsersManager"];
    function LoginController($scope, $timeout, $stateParams, ionicMaterialInk, UsersManager) {
      //Variable to store login credentials
      $scope.loginData = {};

      //Calls clearFabs from parent controller to hide fab buttons
      $scope.$parent.clearFabs();

      //Hide header bar
      $timeout(function() {
          $scope.$parent.hideHeader();
      });

      //Activate effects for view elements
      ionicMaterialInk.displayEffect();

      //Login function
      $scope.login = function () {
        UsersManager.login($scope.loginData.username, $scope.loginData.password)
          .then(loginUser)
          .catch(loginFail);
      };

      function loginUser(response) {
        $scope.$parent.setLogged(true);
      }

      function loginFail(response) {
        $scope.$parent.setLogged(false);
      }
    };
})();
