// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('iFiction', ['ionic', 'peanuthub-custom-keyboard']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl as home'
    })

    .state('game', {
      url: '/game',
      templateUrl: 'templates/game.html',
      controller: 'gameCtrl as game',
      resolve: {
        history: function($ionicHistory) {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
        },
        gameSrc: function($rootScope) {
          return $rootScope.src;
        },
        loadGame: function(gameSrc, $http, $quixe, $rootScope) {
          $http.get(gameSrc).then(function(data) {
            $quixe.load(data);
            $rootScope.gameLoading = false;
          });
        }
      }
    });

  $urlRouterProvider.otherwise('/');
});

app.config(function($peanuthubCustomKeyboardProvider) {
  $peanuthubCustomKeyboardProvider.addCustomKeyboard('CUSTOM_SKU', {
    keys: [{
        type: "CHAR_KEY",
        value: "1"
      },
      {
        type: "CHAR_KEY",
        value: "2",
        label: "ABC"
      },
      {
        type: "CHAR_KEY",
        value: "3",
        label: "DEF"
      },
      {
        type: "CHAR_KEY",
        value: "4"
      },
      {
        type: "CHAR_KEY",
        value: "5"
      },
      {
        type: "CHAR_KEY",
        value: "6"
      },
      {
        type: "CHAR_KEY",
        value: "7"
      },
      {
        type: "CHAR_KEY",
        value: "8"
      },
      {
        type: "CHAR_KEY",
        value: "9"
      },
      {
        type: "CHAR_KEY",
        value: "X"
      },
      {
        type: "CHAR_KEY",
        value: "0"
      },
      {
        type: "DELETE_KEY",
        icon: "ion-backspace-outline"
      }
    ]
  });
});

app.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});
