'use strict';

/**
 * @ngdoc function
 * @name trabelApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the trabelApp
 */
angular.module('trabelApp')
  .controller('DetailCtrl', function (userId, Restangular, $routeParams, $scope) {

    /*

     http://localhost/viatgem-junts/rest/api/web/?r=v1/travel/view&id=2

     `tra_id` bigint(20) NOT NULL,
     `tra_origin` varchar(255) NOT NULL,
     `tra_destination` varchar(255) NOT NULL,
     `tra_num_days` int(11) NOT NULL,
     `tra_budget_min` float DEFAULT NULL,
     `tra_budget_max` float DEFAULT NULL,
     `tra_date` date NOT NULL,
     `tra_lat` float NOT NULL,
     `tra_long` float NOT NULL,
     `tra_planning_limit` date NOT NULL,
     `tra_persons_min` int(11) DEFAULT NULL,
     `tra_persons_max` int(11) DEFAULT NULL,
     `tra_description` varchar(4000) NOT NULL,
     `tra_usr_id` bigint(20) NOT NULL

     CREATE TABLE IF NOT EXISTS `Topic` (
     `top_id` bigint(20) NOT NULL,
     `top_name` varchar(1000) NOT NULL,
     `top_tra_id` bigint(20) NOT NULL
     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

     CREATE TABLE IF NOT EXISTS `TopicProposal` (
     `pro_id` bigint(20) NOT NULL,
     `pro_title` varchar(1000) NOT NULL,
     `pro_description` varchar(4000) DEFAULT NULL,
     `pro_top_id` bigint(20) NOT NULL,
     `pro_usr_id` bigint(20) NOT NULL
     */

    console.log($routeParams.travelId);

    //Restangular.one('travels',$routeParams.travelId).get()();
    var travel = $scope.travel = {
      tra_origin: "Barcelona",
      tra_destination: "Berlin",
      tra_num_days: 3,
      tra_budget_min: 500,
      tra_budget_max: 1500,
      tra_date: moment("2016-08-08").toDate(),
      tra_planning_limit: moment("2016-06-08").toDate(),
      tra_persons_min: 0,
      tra_persons_max: 1,
      tra_description: null,
      tra_usr_id: 1
    };

    $scope.userIsAdmin = userId == travel.tra_usr_id;
    var me = this;

    $scope.editMode = false;
    $scope.toggleEditMode = function () {
      if (!$scope.editMode) {
        $('#tra_date').focus().select();
        me.backupTravel = angular.copy($scope.travel);
      }
      else {
        // Desfem canvis
        cancel();
      }
      $scope.editMode = !$scope.editMode;
    };

    var cancel = $scope.cancel = function () {
      $scope.travel = me.backupTravel;
    };

    $scope.save = function () {
      Restangular.one('travels', 1)
        .doPut($scope.travel)
        .then(function (data) {
          me.backupTravel = $scope.travel;
        }, function (error) {
          // En cas d'error tirem enrere els canvis
          me.originalModel = me.backupTravel;
        });
    };

    $scope.topics = [
      {
        id       : 1,
        name     : "Hotels",
        proposals: [
          {
            id         : 1,
            title      : "Proposta tal",
            description: "Jo proposo anar al hotel grand marina",
            top_id     : 1,
            usr_id     : 1
          },
          {
            id         : 2,
            title      : "Proposta tal",
            description: "Jo proposo anar al hotel grand marina",
            top_id     : 1,
            usr_id     : 1
          }
        ]
      },
      {
        id       : 2,
        name     : "Transport",
        proposals: [
          {
            id         : 3,
            title      : "Proposta tal",
            description: "Jo proposo anar al hotel grand marina",
            top_id     : 1,
            usr_id     : 1
          },
          {
            id         : 4,
            title      : "Proposta tal",
            description: "Jo proposo anar al hotel grand marina",
            top_id     : 1,
            usr_id     : 1
          }
        ]
      }
    ];

  });
