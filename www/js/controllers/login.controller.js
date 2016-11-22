(function() {
    'use strict';

    angular
        .module('Contacts.controllers')
        .controller('LoginCtrl', LoginController);

    LoginController.$inject = ["$scope", "$rootScope", "$timeout", "$state", "$stateParams", "ionicMaterialInk", "UsersManager"];
    function LoginController($scope, $rootScope, $timeout, $state, $stateParams, ionicMaterialInk, UsersManager) {
      //Variable to store login credentials
      $scope.loginData = {};
      $scope.userData = {};

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
        UsersManager.login($scope.loginData)
          .then(loginUser)
          .catch(loginFail);
      };

      $scope.signup = function() {
        if ($scope.userData.password === $scope.userData.password2) {
          UsersManager.userExists($scope.userData.user)
            .then(function(res) {
              if (res) {
                $scope.$parent.showAlert("", "Ya existe un usuario con ese nombre");
              } else {
                UsersManager.addUser($scope.userData).then(function(res) {
                  $state.go("app.login");
                });
              }
            });
        } else {
          $scope.$parent.showAlert("", "La contraseña no coincide");
        }
      };

      function loginUser(response) {
        if (response && response.userId) {
          $rootScope.userId = response.userId;
          $state.go("app.friends");
        }
      }

      function loginFail(response) {
        $scope.$parent.showAlert("", "Datos inválidos, intente nuevamente");
      }
    };
})();
