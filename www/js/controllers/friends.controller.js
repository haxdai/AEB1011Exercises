(function() {
    'use strict';

    angular
        .module('Contacts.controllers')
        .controller('FriendsCtrl', FriendsController);

    FriendsController.$inject = ["$scope", "$stateParams", "$timeout", "ionicMaterialInk", "ionicMaterialMotion", "ContactsManager"];
    function FriendsController($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, ContactsManager) {
        //Calls showHeader from parent controller to show top navbar
        $scope.$parent.showHeader();
        //Calls clearFabs from parent controller to hide buttons in fabs
        $scope.$parent.clearFabs();
        //Calls setHeaderFab from parent controller to adjust header fab position variables
        $scope.$parent.setHeaderFab('left');
        //Defines an array of object for contact info
        $scope.contacts = ContactsManager.getContacts();//[{picture:"jon-snow.jpg", name: "Jon Snow", jobTitle:"Da illest illegitimate"}, {picture:"daenerys.jpg", name: "Daenerys Targaryen", jobTitle:"Dragon mommy"}, {picture:"jon-snow.jpg", name: "Jon Snow", jobTitle:"Da illest illegitimate"}];

        // Delay expansion and animations
        $timeout(function() {
            //Expand content
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
            // Set Motion
            ionicMaterialMotion.ripple();

            // Set Ink
            ionicMaterialInk.displayEffect();
        }, 200);
    };

})();
