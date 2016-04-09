'use strict';

var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();

/**
 * @ngdoc overview
 * @name trabelApp
 * @description
 * # trabelApp
 *
 * Main module of the application.
 */
angular
  .module('trabelApp', [

      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'restangular',
      'uiGmapgoogle-maps',
      'ngAutocomplete',
      'pickadate'

  ])
  .service('Notifications',function($rootScope){
      return {
        error: function(errorMessage,delay){
          $rootScope.errorMessage = errorMessage;
          setTimeout(function(){
            $rootScope.errorMessage = null;
            $rootScope.$apply();
          },delay || 5000);
        }
      }
  })
  .filter('size',function(){ return _.size; })
  .constant('userId',QueryString.userid || 1)
  .config(function ($routeProvider,$locationProvider,RestangularProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/travels/new', {
        templateUrl: 'views/new.html',
        controller: 'NewCtrl',
        controllerAs: 'new'
      })
      .when('/travels/:travelId', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl',
        controllerAs: 'detail'
      })
      .when('/users/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'userDetail'
      })
      .otherwise({
        redirectTo: '/'
      });

    console.log("app.js loaded");

    RestangularProvider.setBaseUrl('http://api-travel.trabel.me/v1');

    // add a response interceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      // .. to look for getList operations
      if ((operation === "getList" || operation === "get") && _.get(data,"success")) {
        // .. and handle the data and meta data
        extractedData =  _.get(data,"data");
      } else if (! _.get(data,"success")) {
        extractedData = data;
      }
      return extractedData;
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .run(function($rootScope,userId){

    // No userid no party
    if(!userId){
      window.location = "http://auth.trabel.me/login";
    }

    $rootScope.userId = userId;
  });

  // Wtf men!! ^^
  var easter_egg = new Konami();
  easter_egg.code = function() {
    location.href = "http://www.cadizdirecto.com/wp-content/uploads/2015/12/Popular-negro-del-guasap.jpg";
  }
  easter_egg.load();
