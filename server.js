var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var port = process.env.PORT || 3030;
var env = process.env.NODE_ENV || 'development';

var app = express();

app.set('view engine','jade');
app.set('views',__dirname+'/server/views');
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src:__dirname+'/public',
        compile:function(str,path){
            return stylus(str).set('filename',path);
        }
    }
));

app.use(express.static(__dirname+'/public'));

mongoose.connect('mongodb://localhost/telerikdb');

var db = mongoose.connection;

db.once('once',function(err){

    if(err){
        console.log('Database error:'+err);
        return;
    }
    console.log('database is up and running!')
});

db.on('error',function(err){
    console.log(err);
});

var messageSchema = mongoose.Schema({
    message:String
});

var Message = mongoose.model('Message',messageSchema);
var messageFromDataBase;

Message.remove().exec(function(err){

    if(err){
        console.log('Message could not be cleared '+err);
        return;
    }

    console.log('Message deleted!');
    Message.create({message:'Hi from mongoose!'})
        .then(function(model){
        messageFromDataBase = model.message;
    });
})



app.get('/partials/:partialName',function(req,res){

    res.render('partials/'+req.params.partialName)
});

app.get('*',function(req,res){

    res.render('index', {message:messageFromDataBase});
});

app.listen(port);
console.log('server running on port'+port);

