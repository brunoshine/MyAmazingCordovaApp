'use strict';

var notifyApp = angular.module('notifyApp', ['ionic', 'ngCordova', 'angular-storage'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: "/",
        templateUrl: "templates/home.html",
        controller: 'homeCtrl'
    })
    .state('signin', {
        url: "/signin",
        templateUrl: "templates/signin.html",
        controller: 'signinCtrl'
    })
    .state('logoff', {
        url: "/logoff",
        template: "<h3>logging off...</h3>",
        controller: 'logoffCtrl'
    });
})

.run(function ($rootScope, $state, $mobileServices, $location, $auth0Store) {
    console.log($location.url());

    if (!$auth0Store.isAuthenticated()) {
        $state.transitionTo('signin');
    }else {
        if(!$mobileServices.currentUser){
            $mobileServices.currentUser = $auth0Store.getToken();
            $state.transitionTo('home');
        }
    }

    $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
        if (!$auth0Store.isAuthenticated() && to.templateUrl != "templates/signin.html") {
            ev.preventDefault();
            $state.transitionTo('signin');
        }
    });
});




