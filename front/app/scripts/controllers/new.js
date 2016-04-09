'use strict';

/**
 * @ngdoc function
 * @name trabelApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the trabelApp
 */

angular.module('trabelApp').controller('NewCtrl', function ($scope, Restangular, uiGmapGoogleMapApi) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.details = [];
    this.options = {
      types: '(cities)',
      country: 'ca',
      scrollwheel: false
    }

    $scope.$watch('details', function() {
      if($scope.details.length <= 0) return false;
      console.log($scope.details.geometry);
      $scope.map = {
        center: {
          latitude: ($scope.details.geometry) ? $scope.details.geometry.location.lat : $scope.details.access_points[0].location.lat,
          longitude: ($scope.details.geometry) ? $scope.details.geometry.location.lng : $scope.details.access_points[0].location.lng,
        },
        zoom: 10
      }
      console.log($scope.map);
    });

    uiGmapGoogleMapApi.then(function (maps) {
      $scope.map = {center: {latitude: 39.8433, longitude: -105.1190}, zoom: 10};
    })


});
