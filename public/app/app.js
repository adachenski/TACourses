/**
 * Created by Just Nasko on 6/29/2016.
 */
var app = angular.module('app',['ngResource','ngRoute']).value('toastr',toastr);

app.config(function($routeProvider, $locationProvider){
   // $locationProvider.html5Mode(true);
    $routeProvider.when('/',{
        templateUrl:'/partials/main/home',
        controller:'MainCtrl'
    });
});