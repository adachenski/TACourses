/**
 * Created by Just Nasko on 7/3/2016.
 */

'use strict'
app.controller('MainCtrl',function($scope){
    $scope.courses=[
        {name:'C# For Sociopaths',featured:true,published:new Date('11/2/2015')},
        {name:'Java for beginers',featured:false,published:new Date('01/5/2016')},
        {name:'JavaScript for infants',featured:true,published:new Date('04/12/2017')},
        {name:'DBMS for dummies',featured:false,published:new Date('06/7/2015')},
        {name:'Training for ninjas',featured:true,published:new Date('11/2/2015')},
        {name:'Operation Angular',featured:false,published:new Date('11/3/2016')},
        {name:'Advance SQL',featured:false,published:new Date('3/2/2015')},
        {name:'Sorting algoritums',featured:true,published:new Date('1/12/2014')},
        {name:'HTML5 for dummies',featured:true,published:new Date('4/26/1984')},
        {name:'Oracle test',featured:false,published:new Date('4/6/2015')},
        {name:'JavaScript Underwater',featured:true,published:new Date('2/7/2015')},
    ];
});