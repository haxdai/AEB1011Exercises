(function() {
  'use strict';

  angular
    .module('Contacts') //On module Contacts
    .config(config) //Set configuration
    .run(run); //Set run parameters

  config.$inject=["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider"];
  function config ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0); //Turn off caching

    //Define angular-ui app states
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.friends', {
        url: '/friends',
        views: {
          'menuContent': {
            templateUrl: 'templates/friends.html',
            controller: 'FriendsCtrl'
          },
          'fabContent': {
            template: '<button ui-sref="app.signup" id="fab-friends" class="button button-fab button-fab-top-left expanded button-assertive spin"><i class="icon ion-plus"></i></button>',
            controller: function ($timeout) {
              $timeout(function () {
                  document.getElementById('fab-friends').classList.toggle('on');
              }, 900);
            }
          }
        }
      })
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          },
          'fabContent': { template: '' }
        }
      })
      .state('app.signup', {
        url: '/signup',
        views: {
          'menuContent': {
              templateUrl: 'templates/signup.html',
              controller: 'LoginCtrl'
          },
          'fabContent': { template: '' }
        }
      });

    //Default app route
    $urlRouterProvider.otherwise('/app/login');
  };

  run.$inject = ["$ionicPlatform", "$rootScope", "$cordovaSQLite"];
  function run($ionicPlatform, $rootScope, $cordovaSQLite) {
    $rootScope.userId = null; //Session user

    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      //Initialize SQLIte database and tables
      if (window.cordova && window.SQLitePlugin) {
        $rootScope.db = $cordovaSQLite.openDB( {name:'contacts.db', location:'default'}, 1 );
      } else {
        $rootScope.db = window.openDatabase('contacts', '1.0', 'contacts.db', 100 * 1024 * 1024);
      }

      //$cordovaSQLite.execute($rootScope.db, "DROP TABLE contacts;");
      //$cordovaSQLite.execute($rootScope.db, "DROP TABLE users;");
      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS contacts(id integer PRIMARY KEY, name text NOT NULL, email text NOT NULL, jobtitle text NOT NULL, picture text NOT NULL);");
      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS users(id integer PRIMARY KEY, name text NOT NULL, password text NOT NULL);");
    });
  };

})();
