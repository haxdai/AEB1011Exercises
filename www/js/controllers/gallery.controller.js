(function() {
    'use strict';
    
    angular
        .module('Contacts.controllers')
        .controller('GalleryCtrl', GalleryController);
    
    GalleryController.$inject = ["$scope", "$stateParams", "$timeout", "ionicMaterialInk", "ionicMaterialMotion"];
    function GalleryController($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
        //Calls showHeader from parent controller to show top navbar
        $scope.$parent.showHeader();
        //Calls clearFabs from parent controller to hide buttons in fabs
        $scope.$parent.clearFabs();
        //Set expanded state in controller and parent
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        //Hide fab button in top navbar
        $scope.$parent.setHeaderFab(false);

        //Activate ink for view elements
        ionicMaterialInk.displayEffect();

        //Activate material animations
        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });
    };
})();