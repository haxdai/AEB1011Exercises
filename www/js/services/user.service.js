(function() {
    'use strict';

    angular
        .module('Contacts.services')
        .factory("UsersManager", UsersManager);

    UsersManager.$inject = ["$http", "$q", "$crypto"];
    function UsersManager ($http, $q, $crypto) {
      var users = [{name:"haxdai", password:"gdyb21LQTcIANtvYMT7QVQ=="}];

      var factory = {
        getUsers: getUsers,
        addUser: addUser,
        removeUser: removeUser,
        login: login
      };

      return factory;

      function getUsers() {
        return users;
      };

      function addUser(userInfo) {
        userInfo.password = $crypto.hash(userInfo.password);
        contacts.push(userInfo);
      };
      
      function removeUser(userId) {

      };

      function login(username, password) {
        var deferred = $q.defer(), pwdHash = $crypto.hash(password);
        var usr = users.find(function(item) {
          return item.password === pwdHash;
        });

        if (usr) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
        return deferred.promise;
      };
    };
})();
