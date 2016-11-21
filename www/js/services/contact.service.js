(function() {
    'use strict';

    angular
        .module('Contacts.services')
        .factory("ContactsManager", ContactsManager);

    ContactsManager.$inject = ["$http", "$q"];
    function ContactsManager ($http, $q) {
      var contacts = [{picture:"jon-snow.jpg", name: "Jon Snow", jobTitle:"Da illest illegitimate"}, {picture:"daenerys.jpg", name: "Daenerys Targaryen", jobTitle:"Dragon mommy"}, {picture:"jon-snow.jpg", name: "Jon Snow", jobTitle:"Da illest illegitimate"}];

      var factory = {
        getContacts: getContacts,
        addContact: addContact,
        removeContact: removeContact
      };

      return factory;

      function getContacts() {
        return contacts;
      };

      function addContact(contactInfo) {
        contacts.push(contactInfo);
      };

      function removeContact(contactId) {

      };
    };
})();
