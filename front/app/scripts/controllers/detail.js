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

    Restangular.one('travels',$routeParams.travelId).get()
      .then(function(travel){
        $scope.travel = travel;
      });

    /*
    Restangular.one('users').getList();
    Restangular.one('topics').getList();
    Restangular.one('proposals').getList();
    */
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

    $scope.join = function(){

    };

    var userIds = _.map(users,"usr_id");
    $scope.userIsTraveler = function(){
      return _.includes(userIds,userId);
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
      Restangular.one('travels', 1)
        .doPut($scope.travel)
        .then(function (data) {
          me.backupTravel = $scope.travel;
        }, function (error) {
          // En cas d'error tirem enrere els canvis
          me.originalModel = me.backupTravel;
        });
    };

    $scope.delete = function(){
      alert("TODO");
    };

    var users = $scope.users = [
      {
        usr_id: 1,
        usr_name: "Pepito",
        usr_surname: "Grillo",
        usr_nickname: "",
        usr_mail: "",
        usr_password: "",
        usr_birthday: "",
        usr_gender: "",
        usr_register_date: "",
        usr_avatar_url: ""
      }
    ];
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

    $scope.details = [];
    $scope.marker = [];

    this.curDate = new Date();

    $scope.temes = {};
    $scope.temes.newtema = '';
    $scope.temes.defaults = [
      {text:'Allotjament', done:true},
      {text:'Desplaçament', done:false}
    ];
  });
