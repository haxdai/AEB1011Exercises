(function() {
    'use strict';

    angular
        .module('Contacts')
        .config(config)
        .run(run);

    config.$inject=["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider"];
    function config ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        // Turn off caching for demo simplicity's sake
        $ionicConfigProvider.views.maxCache(0);
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            /*.state('app.activity', {
                url: '/activity',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/activity.html',
                        controller: 'ActivityCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-activity').classList.toggle('on');
                            }, 200);
                        }
                    }
                }
            })*/
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
            /*.state('app.gallery', {
                url: '/gallery',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/gallery.html',
                        controller: 'GalleryCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                        controller: function ($timeout) {
                            $timeout(function () {
                                document.getElementById('fab-gallery').classList.toggle('on');
                            }, 600);
                        }
                    }
                }
            })*/
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            })
            .state('app.signup', {
                url: '/signup',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/signup.html',
                        controller: 'LoginCtrl'
                    },
                    'fabContent': {
                        template: ''
                    }
                }
            });
            /*.state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl'
                    },
                    'fabContent': {
                        template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                        controller: function ($timeout) {
                            /*$timeout(function () {
                                document.getElementById('fab-profile').classList.toggle('on');
                            }, 800);
                        }
                    }
                }
            });*/
        $urlRouterProvider.otherwise('/app/login');
    };

    run.$inject = ["$ionicPlatform", "$rootScope", "$cordovaSQLite"];
    function run($ionicPlatform, $rootScope, $cordovaSQLite) {
      $rootScope.userId = null;
      $ionicPlatform.ready(function() {
          if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if (window.StatusBar) {
            StatusBar.styleDefault();
          }

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
