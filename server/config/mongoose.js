/**
 * Created by Just Nasko on 7/8/2016.
 */

var mongoose = require('mongoose');
    passport = require('passport'),
    localPassport = require('passport-local');

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

  var userShema=  mongoose.Schema({
        username:String,
        firstName: String,
        lastName:String
        //salt:String,
        //hashPass:String
    });

    var User = mongoose.model('User',userShema);

    User.find({}).exec(function(err, collection){

        if(err){
            console.log('Cannot find user '+err);
            return;
        }
        if(collection.length==0){
            User.create({
                username:'adachenski',
                firstName:'Atanas',
                lastName:'Dachenski'
            });
            User.create({
                username:'pdonchev',
                firstName:'Petar',
                lastName:'Donchev'
            });
            User.create({
                username:'ganchev',
                firstName:'Georgi',
                lastName:'Anchev'
            });
            console.log('Users added to DataBase');
        }
    });
    passport.use(new localPassport(function(username,password,done){

        User.findOne({username:username}).exec(function(err,user){

            if(err){
                console.log('Error loading User: '+err);
                return;
            }
            if(user){
                return done(null,user)
            }
            else{
                return done(null,false);
            }
        })

    }));

    passport.serializeUser(function(user,done){

        if(user){

            return done(null, user._id)
        }
    });

    passport.deserializeUser(function(id, done){

        User.findOne({_id:id}).exec(function(err,user){
            if(err){
                console.log('Error finding user '+err);
                return;
            }
            if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })
    })
};