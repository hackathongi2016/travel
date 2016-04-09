'use strict';

/**
 * @ngdoc function
 * @name trabelApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the trabelApp
 */

angular.module('trabelApp').controller('NewCtrl', function ($scope, Restangular, uiGmapGoogleMapApi, userId) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.showmap = false;

    this.travel = {
        tra_origin: null,
        tra_destination: null,
        tra_num_days: 1,
        tra_budget_min: null,
        tra_budget_max: null,
        tra_date: null,
        tra_planning_limit: null,
        tra_persons_min: 0,
        tra_persons_max: 1,
        tra_description: null,
        tra_usr_id: userId
    };
    var me = this.travel;

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
