/**
 * Created by Just Nasko on 7/8/2016.
 */

var mongoose = require('mongoose');
    passport = require('passport'),
    localPassport = require('passport-local'),
    crypto = require('crypto');

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
        lastName:String,
        salt:String,
        hashPass:String
    });

    userShema.method({

        authenticate:function(password){
            if(generateHashedPassword(this.salt, password)==this.hashPass){

                return true;
            }
            else{
                return false;
            }
        }
    });

    var User = mongoose.model('User',userShema);

    User.find({}).exec(function(err, collection){

        if(err){
            console.log('Cannot find user '+err);
            return;
        }
       // User.remove({},function() {

            if (collection.length == 0) {

                var salt, hashedPwd;

                salt = generateSalt();
                hashedPwd = generateHashedPassword(salt, 'Atanas');

                User.create({
                    username: 'adachenski',
                    firstName: 'Atanas',
                    lastName: 'Dachenski',
                    salt: salt,
                    hashedPassword: hashedPwd
                });

                salt = generateSalt();
                hashedPwd = generateHashedPassword(salt, 'Petar');
                User.create({
                    username: 'pdonchev',
                    firstName: 'Petar',
                    lastName: 'Donchev',
                    salt: salt,
                    hashedPassword: hashedPwd
                });

                salt = generateSalt();
                hashedPwd = generateHashedPassword(salt, 'Georgi');
                User.create({
                    username: 'ganchev',
                    firstName: 'Georgi',
                    lastName: 'Anchev',
                    salt: salt,
                    hashedPassword: hashedPwd
                });
                console.log('Users added to DataBase');
            }
        //});
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

function generateSalt(){

   return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt,pwd){

    var hmac = crypto.createHmac('sha1',salt);
    return hmac.update(pwd).digest('hex');
}