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

    this.travel = [];
    var me = this.travel;

    $scope.showmap = false;
    $scope.details = [];
    $scope.marker = [];
    this.options = {
      types: '(cities)',
      country: 'ca',
      scrollwheel: false
    }

    $scope.$watch('details', function() {

      if($scope.details.length <= 0) return false;

      $scope.map = {
        center: {
          latitude: $scope.details.geometry.location.lat(),
          longitude: $scope.details.geometry.location.lng()
        },
        zoom: 10
      }
      me.lat = $scope.details.geometry.location.lat();
      me.lon = $scope.details.geometry.location.lng();

      $scope.marker = {
        id: 0,
        coords: {
          latitude: $scope.details.geometry.location.lat(),
          longitude: $scope.details.geometry.location.lng(),
        },
        options: {draggable: true},
        events: {
          dragend: function (marker, eventName, args) {

            me.lat = marker.getPosition().lat();
            me.lon = marker.getPosition().lng();

            $scope.marker.options = {
              draggable: true,
              labelClass: "marker-labels"
            };
          }
        }
      }

      $scope.showmap = true;
    });

    uiGmapGoogleMapApi.then(function (maps) {
      $scope.map = {center: {latitude: 39.8433, longitude: -105.1190}, zoom: 10};
    })


});
