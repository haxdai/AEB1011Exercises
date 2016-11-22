(function() {
  'use strict';

  angular
    .module('Contacts.services') //On module Contacts.services
    .factory("ContactsManager", ContactsManager); //Define ContactsManager service

  ContactsManager.$inject = ["$rootScope", "$http", "$q", "$cordovaSQLite"];
  function ContactsManager ($rootScope, $http, $q, $cordovaSQLite) {

    //Service contract definition
    var factory = {
      getContacts: getContacts,
      addContact: addContact,
      removeContact: removeContact
    };

    //Return service contract object
    return factory;

    //Get contacts from database
    function getContacts() {
      var deferred = $q.defer(), //Deferred object
          query = "SELECT * FROM contacts"; //SQL query

      //Execute query
      $cordovaSQLite.execute($rootScope.db, query, [])
        .then(function(res) {
            var result = getAllContacts(res); //Get contacts array
            deferred.resolve(result); //Resolve with contact data
        })
        .catch(function (res) {
          deferred.resolve(res);
        });

      //Return deferred promise
      return deferred.promise;
    };

    //Add contact to database
    function addContact(contactInfo) {

    };

    //Delete contact from database
    function removeContact(contactId) {

    };

    //Helper function to get an array of contacts
    function getAllContacts(result) {
      var ret = [];
      for (var i = 0; i < result.rows.length; i++) {
        ret.push(result.rows.item(i));
      }

      return ret;
    };

    };
})();
