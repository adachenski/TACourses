/**
 * Created by Just Nasko on 6/29/2016.
 */
var app = angular.module('app',['ngResource','ngRoute']);

app.config(function($routeProvider, $locationProvider){
   // $locationProvider.html5Mode(true);
    $routeProvider.when('/',{
        templateUrl:'/partials/home',
        controller:'MainCtrl'
    });
});