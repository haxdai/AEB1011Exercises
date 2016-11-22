(function() {
    'use strict';

    angular
        .module('Contacts.services')
        .factory("ContactsManager", ContactsManager);

    ContactsManager.$inject = ["$rootScope", "$http", "$q", "$cordovaSQLite"];
    function ContactsManager ($rootScope, $http, $q, $cordovaSQLite) {

      var factory = {
        getContacts: getContacts,
        addContact: addContact,
        removeContact: removeContact
      };

      return factory;

      function getContacts() {
        var deferred = $q.defer(), query = "SELECT * FROM contacts";

        $cordovaSQLite.execute($rootScope.db, query, []).then(function(res) {
            var result = getAllContacts(res);
            deferred.resolve(result);
        })
        .catch(function (res) {
          deferred.resolve(res);
        });

        return deferred.promise;
      };

      function addContact(contactInfo) {

      };

      function removeContact(contactId) {

      };

      function getAllContacts(result) {
        var ret = [];
        for (var i = 0; i < result.rows.length; i++) {
          ret.push(result.rows.item(i));
        }

        return ret;
      };
    };
})();
