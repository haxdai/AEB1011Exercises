(function() {
    'use strict';

    angular
        .module('Contacts.services', ['mdo-angular-cryptography'])
        .config(config);

        config.$inject = ["$cryptoProvider"];
        function config($cryptoProvider) {
          $cryptoProvider.setCryptographyKey('usyysyysnn');
        };
})();
