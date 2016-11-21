(function() {
    'use strict';
    
    angular
        .module('Contacts.controllers')
        .controller('ActivityCtrl', ActivityController);
    
    ActivityController.$inject = ["$scope", "$stateParams", "$timeout", "ionicMaterialInk", "ionicMaterialMotion"];
    function ActivityController($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
        
        //Calls clearFabs from parent controller to hide buttons in fabs
        $scope.$parent.clearFabs();
        //Calls showHeader from parent controller to show top navbar
        $scope.$parent.showHeader();

        //Set expanded state in controller and parent
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        //Calls setHeaderFab in parent controller to set position of fab button
        $scope.$parent.setHeaderFab('right');

        //Waits 200ms and launches animation to show activity content
        $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            });
        }, 200);

        // Activate ink effect in UI elements
        ionicMaterialInk.displayEffect();
    };
    
})();