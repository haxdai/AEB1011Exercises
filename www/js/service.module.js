/**
* Module to group app services
*/
(function() {
  'use strict';

  angular
    .module('Contacts.services', ['Contacts.crypto']) //Contacts.services module definition
    .config(config); //Module configuration

  config.$inject = ["$cryptoProvider"];
  function config($cryptoProvider) {
    $cryptoProvider.setCryptographyKey('usyysyysnn'); //Set encryption key
  };

})();
