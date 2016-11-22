(function() {
  'use strict';

  angular
    .module('Contacts.controllers') //On module Contacts.controllers
    .controller('AppCtrl', AppController); //Define AppCtrl controller

  AppController.$inject = ["$scope", "$ionicModal", "$ionicPopover", "$timeout", "$ionicPopup"];
  function AppController($scope, $ionicModal, $ionicPopover, $timeout, $ionicPopup) {
    $scope.isExpanded = false; //Content expanded flag
    $scope.hasHeaderFabLeft = false; //Fab left flag
    $scope.hasHeaderFabRight = false; //Fab right flag

    //Bind active state on nav click
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
      navIcons.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    }

    //Hides top navbar for a particular view
    $scope.hideNavBar = function() {
      var bar = document.getElementsByTagName('ion-nav-bar')[0]; //Locate navbar in DOM
      bar.style.display = 'none'; //Apply display:none to bar style to hide it
    };

    //Displays nabar for a particular view
    $scope.showNavBar = function() {
      var bar = document.getElementsByTagName('ion-nav-bar')[0]; //Locate navbar in DOM
      bar.style.display = 'block'; //Apply display:block to bar style to show it
    };

    //Removes has-header css class on ion-content directive
    $scope.noHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }
    };

    //Set variables for expanded status in content
    $scope.setExpanded = function(bool) {
      $scope.isExpanded = bool;
    };

    //Sets header fab position flags
    $scope.setHeaderFab = function(location) {
      var hasHeaderFabLeft = false;
      var hasHeaderFabRight = false;

      switch (location) {
        case 'left':
          hasHeaderFabLeft = true;
          break;
        case 'right':
          hasHeaderFabRight = true;
          break;
      }

      $scope.hasHeaderFabLeft = hasHeaderFabLeft;
      $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    //Enable has-header css class on ion-content directive
    $scope.hasHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (!content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }
    };

    //Hides top nav bar and sets content as having no header
    $scope.hideHeader = function() {
      $scope.hideNavBar();
      $scope.noHeader();
    };

    //Swhows top nav bar and sets content as having header
    $scope.showHeader = function() {
      $scope.showNavBar();
      $scope.hasHeader();
    };

    //Hides fabs section in a particular view
    $scope.clearFabs = function() {
      var fabs = document.getElementsByClassName('button-fab'); //Locate fab buttons
      if (fabs.length && fabs.length > 1) {
        fabs[0].remove(); //Remove buttons from DOM
      }
    };

    //Show an alert dialog using ionicPopup
    $scope.showAlert = function(title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg,
        buttons: [
          {
            text: 'Aceptar',
            type: 'button-positive'
          }
        ]
      });
    };
  };

})();
