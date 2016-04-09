'use strict';

/**
 * @ngdoc function
 * @name trabelApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the trabelApp
 */
angular.module('trabelApp')
  .controller('UserCtrl', function (userId, Restangular, $routeParams, $scope) {
    $scope.user = {
      usr_name : "pepe"
    }
  });
