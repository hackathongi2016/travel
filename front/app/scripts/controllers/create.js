'use strict';

/**
 * @ngdoc function
 * @name trabelApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the trabelApp
 */
angular.module('trabelApp',['restangular'])
  .controller('CreateCtrl', function ($scope,Restangular) {
    
    
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
