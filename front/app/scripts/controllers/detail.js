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
      
    };

    $scope.leave = function () {

    };

    var userIds = _.map(users, "usr_id");
    $scope.userIsTraveler = function () {
      return _.includes(userIds, userId);
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
        datesToString(_.omit($scope.travel.plain(),["topics","users"])),
          'travels/' + $scope.travel.tra_id)
        .put()
        .then(function (data) {
          me.backupTravel = $scope.travel;
        }, function (error) {
          Notifications.error("Error de connexió");
          // En cas d'error tirem enrere els canvis
          me.originalModel = me.backupTravel;
        });
    };

    $scope.delete = function () {
      alert("TODO");
    };

    var users = $scope.users = [
      {
        usr_id           : 1,
        usr_name         : "Pepito",
        usr_surname      : "Grillo",
        usr_nickname     : "",
        usr_mail         : "",
        usr_password     : "",
        usr_birthday     : "",
        usr_gender       : "",
        usr_register_date: "",
        usr_avatar_url   : ""
      }
    ];

    $scope.details = [];
    $scope.marker = [];

    this.curDate = new Date();

    $scope.temes = {};
    $scope.temes.newtema = '';
    $scope.temes.defaults = [
      {text: 'Allotjament', done: true},
      {text: 'Desplaçament', done: false}
    ];
  });
