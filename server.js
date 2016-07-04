var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var port = process.env.PORT || 3030;
var env = process.env.NODE_ENV || 'development';

var app = express();

app.set('view engine','jade');
app.set('views',__dirname+'/server/views');
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

var messageFromDataBase;




app.get('/partials/:folder/:partialName',function(req,res){

    res.render('partials/'+req.params.folder+'/'+req.params.partialName)
});

app.get('*',function(req,res){

    res.render('index', {message:messageFromDataBase});
});

app.listen(port);
console.log('server running on port'+port);