angular.module('App', ['ngAnimate', 'TealiumHelper', 'TealiumHelper.directive'])
  .config(function(tealiumProvider) {
    'use strict';
    tealiumProvider.config({
      account: 'tealiummobile',
      profile: 'demo',
      environment: 'dev',
      ui_selectors: '.trackable, input',
      suppress_first_view: true
    });

    var home = function() {
      var data = {
        "page_type" : "home",
        "date"      : Date(),
        "key"       :"value"
      };
      return data;
    };
    var product = function() {
      var data = {
        "page_type" : "product",
        "key2"  : "value2"
      };
      return data;
    };
    var generic = function() {
      var data = {
        "page_type" : "generic",
        "key"  : "generic value"
      };
      return data;
    };

    tealiumProvider.setViewIdMap({
      '/template1.html' : home,
      '/template2.html' : product,
      'generic'         : generic
    });
  })
  .controller('AppController', function($rootScope, $scope, $location, tealium) {
    $scope.templates =
      [ { name: 'template1.html', url: 'template1.html'},
        { name: 'template2.html', url: 'template2.html'},
        { name: 'template_x.html', url: 'template_x.html'}
      ];

    $scope.updatePath = function(){
      $location.path($scope.template.url);
    };
    $scope.template = $scope.templates[0];

/*
*if using include content handling
*/
    $scope.$on("$includeContentLoaded",
      function () {
        tealium.view();
      });

/*
*if using view content handling
*/
    $scope.$on("$viewContentLoaded",
      function () {
        //tealium.view();
      });

/*
*if using route change handling
*/
    $rootScope.$on('$routeChangeSuccess',
      function(event, toState, toParams, fromState, fromParams){
        //tealium.view();
      });

/*
* if using inline for onLoad=
* example: <div  ng-include="template.url" onload="tealiumView()">
*/
    //$scope.tealiumView = tealium.view;

 });
