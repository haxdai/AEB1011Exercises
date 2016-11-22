(function() {
    'use strict';

    angular
        .module('Contacts.controllers')
        .controller('AppCtrl', AppController);

    AppController.$inject = ["$scope", "$ionicModal", "$ionicPopover", "$timeout", "$ionicPopup"];
    function AppController($scope, $ionicModal, $ionicPopover, $timeout, $ionicPopup) {
        $scope.isExpanded = false;
        $scope.hasHeaderFabLeft = false;
        $scope.hasHeaderFabRight = false;
        $scope.isLogged = false;

        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        }

        //Hides top navbar for a particular view
        $scope.hideNavBar = function() {
            //Locate navbar in DOM
            var bar = document.getElementsByTagName('ion-nav-bar')[0];
            //Apply display:none to bar style to hide it
            bar.style.display = 'none';
        };

        //Displays nabar for a particular view
        $scope.showNavBar = function() {
            //Locate navbar in DOM
            var bar = document.getElementsByTagName('ion-nav-bar')[0];
            //Apply display:block to bar style to show it
            bar.style.display = 'block';
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

        //Sets header fab position variables
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

        //Enables has-header css class on ion-content directive
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
            //Locate fab buttons
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                //Remove buttons from DOM
                fabs[0].remove();
            }
        };

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
