/**
 * Created by Just Nasko on 7/8/2016.
 */

var mongoose = require('mongoose');

module.exports = function(config){
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open',function(err){

        if(err){
            console.log('Database could not be open!:'+err);
            return;
        }
        console.log('Database is up and running!')
    });

    db.on('error',function(err){
        console.log(err);
    });
};