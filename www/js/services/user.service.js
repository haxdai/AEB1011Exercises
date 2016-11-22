(function() {
  'use strict';

  angular
    .module('Contacts.services') //On module Contacts.services
    .factory("UsersManager", UsersManager); //Define UsersManager service

  UsersManager.$inject = ["$http", "$q", "$crypto", "$rootScope", "$cordovaSQLite"];
  function UsersManager ($http, $q, $crypto, $rootScope, $cordovaSQLite) {

    //Service contract definition
    var factory = {
      userExists, userExists,
      getUser: getUser,
      addUser: addUser,
      removeUser: removeUser
    };

    //Return service contract object
    return factory;

    // Add a new user to the database
    function addUser(userInfo) {
      var params = [userInfo.user, $crypto.hash(userInfo.password)], //Insert params
          deferred = $q.defer(), //Deferred object
          query = "INSERT INTO users (name, password) VALUES (?,?)"; //SQL query

      //Execute insertion
      $cordovaSQLite.execute($rootScope.db, query, params)
        .then(function(res) {
          if (res && res.insertId) { //insertId must be defined if query was ok
            deferred.resolve(res);
          }
        })
        .catch(function(res) {
          deferred.reject(res);
        });

      //Return deferred promise
      return deferred.promise;
    };

    //Delete a user from database
    function removeUser(userId) {

    };

    //Checks wheter user exists with username
    function userExists(username) {
      var deferred = $q.defer(), //Deferred object
          query = "SELECT * FROM users WHERE name = ?"; //SQL query

      //Execute query
      $cordovaSQLite.execute($rootScope.db, query, [username])
        .then(function(res) {
          if (res.rows.length > 0) { //Rows available
            deferred.resolve(res); //Resolve using first row
          } else {
            deferred.resolve(); //Resolve with no data
          }
        })
        .catch(function (res) {
          deferred.resolve(res);
        });

      //Return deferred promise
      return deferred.promise;
    };

    //Gets user with provided user info
    function getUser(userInfo) {
      var params = [userInfo.user, $crypto.hash(userInfo.password)], //Query parameters
          deferred = $q.defer(), //Deferred object
          query = "SELECT * FROM users WHERE name = ? AND password = ?"; //SQL query

      //Execute query
      $cordovaSQLite.execute($rootScope.db, query, params)
        .then(function(res) {
          if (res.rows.length > 0) { //Rows available
            deferred.resolve({userId: res.rows.item(0).id}); //Resolve with userId
          } else {
            deferred.reject(); //Resolve with no data
          }
        })
        .catch(function (res) {
          deferred.reject(res);
        });

      //Return deferred promise
      return deferred.promise;
    };
  };

})();
