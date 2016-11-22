(function() {
  'use strict';

  angular
    .module('Contacts.controllers') //On module Contacts.controllers
    .controller('FriendsCtrl', FriendsController); //Define FriendsCtrl

  FriendsController.$inject = ["$scope", "$stateParams", "$timeout", "ionicMaterialInk", "ionicMaterialMotion", "ContactsManager"];
  function FriendsController($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, ContactsManager) {
    $scope.$parent.showHeader(); //show top navbar
    $scope.$parent.clearFabs(); //hide buttons in fabs
    $scope.$parent.setHeaderFab('left'); //adjust header fab position flags

    $scope.contacts = ContactsManager.getContacts(); //Get contacts from database using ContactsManager service

    // Delay expansion and animations (workaround to contacts not displaying)
    $timeout(function() {
      $scope.isExpanded = true; //Expand content
      $scope.$parent.setExpanded(true);
      ionicMaterialMotion.ripple(); // Set Motion
      ionicMaterialInk.displayEffect(); // Set Ink
    }, 200);
  };

})();
