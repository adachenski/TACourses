/**
 * Created by Just Nasko on 7/4/2016.
 */
var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser');

module.exports=function(app,config){

app.set('view engine','jade');
app.set('views',config.roothPath+'/server/views');
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src:config.roothPath+'/public',
        compile:function(str,path){
            return stylus(str).set('filename',path);
        }
    }
));

app.use(express.static(config.roothPath+'/public'));

};