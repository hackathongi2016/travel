'use strict';

/**
 * @ngdoc function
 * @name trabelApp.controller:NewCtrl
 * @description
 * # NewCtrl
 * Controller of the trabelApp
 */
angular.module('trabelApp').controller('NewCtrl', function ($scope, Restangular) {
    console.log("New");


    $scope.opened = {start: false, end: false};
    $scope.openDatepicker = function ($event, datepicker) {
        console.log("Ie");
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened.start = false;
        $scope.opened.end = false;
        $scope.opened[datepicker] = true;
    };

    $scope.formnat = "shortDate";
    $scope.dateOptions = {formatYear: 'yy', startingDay: 1, class: 'datepicker', showWeeks: false, showButtonBar: false};


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
});
