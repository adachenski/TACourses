/**
 * Created by Just Nasko on 6/29/2016.
 */

var app = angular.module('app',['ngResource','ngRoute']);

app.controller('MainCtrl',[function($scope){

    $scope.hello = 'Hi from angular!'
}]);