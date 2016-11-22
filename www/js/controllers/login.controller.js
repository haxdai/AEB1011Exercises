(function() {
  'use strict';

  angular
    .module('Contacts.controllers') //On module Contacts.controllers
    .controller('LoginCtrl', LoginController); //Define LoginCtrl controller

  LoginController.$inject = ["$scope", "$rootScope", "$timeout", "$state", "$stateParams", "ionicMaterialInk", "UsersManager"];
  function LoginController($scope, $rootScope, $timeout, $state, $stateParams, ionicMaterialInk, UsersManager) {
    $scope.loginData = {}; //Object to store login credentials
    $scope.userData = {}; //Object to store louser data

    $scope.$parent.clearFabs(); //hide fab buttons

    $timeout(function() {
      $scope.$parent.hideHeader(); //Hide header bar
    });

    ionicMaterialInk.displayEffect(); //Activate effects for view elements

    //Login function
    $scope.login = function () {
      UsersManager.getUser($scope.loginData)
        .then(loginUser)
        .catch(loginFail);
    };

    //Signup function
    $scope.signup = function() {
      if ($scope.userData.password === $scope.userData.password2) { //password must match
        UsersManager.userExists($scope.userData.user)
          .then(function(res) {
            if (res) { //User exists
              $scope.$parent.showAlert("", "Ya existe un usuario con ese nombre");
            } else { //Add user to database
              UsersManager.addUser($scope.userData).then(function(res) {
                $state.go("app.login");
              });
            }
          });
      } else {
        $scope.$parent.showAlert("", "La contraseña no coincide");
      }
    };

    //Set userId on rootScope
    function loginUser(response) {
      if (response && response.userId) {
        $rootScope.userId = response.userId;
        $state.go("app.friends");
      }
    };

    //Login fail callback
    function loginFail(response) {
      $scope.$parent.showAlert("", "Datos inválidos, intente nuevamente");
    };
  };

})();
