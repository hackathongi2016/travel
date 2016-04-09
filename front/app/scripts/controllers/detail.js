'use strict';

/**
 * @ngdoc function
 * @name trabelApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the trabelApp
 */
angular.module('trabelApp')
  .controller('DetailCtrl', function (Notifications, userId, Restangular, $routeParams, $scope) {

    var me = this;

    $scope.users = [];

    var dateFields = ["tra_date", "tra_planning_limit"];
    var fieldsToDate = function (model) {
      return _.transform(model, function (model, v, k) {
        if (_.includes(dateFields, k)) {
          model[k] = new Date(v);
        }
      }, model);
    };
    var datesToString = function (model) {
      return _.transform(model, function (model, v, k) {
        if (_.includes(dateFields, k)) {
          model[k] = moment(v).format('YYYY-MM-DD');
        }
      }, model);
    };
    var travel = {};
    Restangular.one('travels', $routeParams.travelId).get({expand: "topics,users"})
      .then(function (travelData) {
        travel = $scope.travel = fieldsToDate(travelData);
        $scope.topics = travel.topics || [];
        $scope.users = travel.users || [];
        $scope.userIsAdmin = userId == travel.tra_usr_id;
        //$scope.$apply();
      });
    $scope.userIsAdmin = false;

    $scope.$watch('travel.tra_persons_max', function (newValue) {
      if (newValue < travel.tra_persons_min) {
        travel.tra_persons_max = travel.tra_persons_min;
      }
    });

    $scope.$watch('travel.tra_budget_max', function (newValue) {
      if (newValue < travel.tra_budget_min) {
        travel.tra_budget_max = travel.tra_budget_min;
      }
    });

    /*
     Restangular.one('users').getList();
     Restangular.one('topics').getList();
     Restangular.one('proposals').getList();
     */
    //Restangular.one('travels',$routeParams.travelId).get()();

    $scope.join = function () {
      // travels/travel_id/user_id/
      Restangular.one('travels/'+travel.tra_id+'/'+userId)
        .post()
        .then(function(user){
          $scope.users.push(user);
        }, function (error) {
          Notifications.error("Error de connexió");
        });
    };

    $scope.leave = function () {
      Restangular.one('travels/'+travel.tra_id+'/'+userId)
        .remove()
        .then(function(user){
          _.pull($scope.users,user);
        }, function (error) {
          Notifications.error("Error de connexió");
        });
    };

    $scope.userIsTraveler = function () {
      return _.includes(_.map($scope.users, "usr_id"), +userId);
    };

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
      Restangular.restangularizeElement(null,
        datesToString(_.omit($scope.travel.plain(), ["topics", "users"])),
          'travels/' + $scope.travel.tra_id)
        .put()
        .then(function (data) {
          me.backupTravel = $scope.travel;
          $scope.editMode = false;
        }, function (error) {
          Notifications.error("Error de connexió");
          // En cas d'error tirem enrere els canvis
          me.originalModel = me.backupTravel;
        });
    };

    $scope.delete = function () {
      $scope.travel.delete().then(function () {
        // $routeProvider.
      })
    };
  });
