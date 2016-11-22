(function() {
    'use strict';

    angular
        .module('Contacts.services')
        .factory("UsersManager", UsersManager);

    UsersManager.$inject = ["$http", "$q", "$crypto", "$rootScope", "$cordovaSQLite"];
    function UsersManager ($http, $q, $crypto, $rootScope, $cordovaSQLite) {
      //var users = [{name:"haxdai", password:"gdyb21LQTcIANtvYMT7QVQ=="}];

      var factory = {
        userExists, userExists,
        addUser: addUser,
        removeUser: removeUser,
        login: login
      };

      return factory;

      function addUser(userInfo) {
        var params = [userInfo.user, $crypto.hash(userInfo.password)],
          deferred = $q.defer(),
          query = "INSERT INTO users (name, password) VALUES (?,?)";
        $cordovaSQLite.execute($rootScope.db, query, params)
          .then(function(res) {
            if (res && res.insertId) {
              deferred.resolve(res);
            }
          })
          .catch(function(res) {
            deferred.reject(res);
          });

          return deferred.promise;
      };

      function removeUser(userId) {

      };

      function userExists(username) {
        var deferred = $q.defer(), query = "SELECT * FROM users WHERE name = ?";

        $cordovaSQLite.execute($rootScope.db, query, [username]).then(function(res) {
          if (res.rows.length > 0) {
            deferred.resolve(res);
          } else {
            deferred.resolve();
          }
        })
        .catch(function (res) {
          deferred.resolve(res);
        });

        return deferred.promise;
      };

      function login(userInfo) {
        var params = [userInfo.user, $crypto.hash(userInfo.password)],
          deferred = $q.defer(), query = "SELECT * FROM users WHERE name = ? AND password = ?";

        $cordovaSQLite.execute($rootScope.db, query, params).then(function(res) {
          if (res.rows.length > 0) {
            deferred.resolve({userId: res.rows.item(0).id});
          } else {
            deferred.reject();
          }
        })
        .catch(function (res) {
          deferred.reject(res);
        });

        return deferred.promise;
      };
    };
})();
