var express = require('express'),
    mongoose = require('mongoose');
var port = process.env.PORT || 3030;
var env = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')
require('./server/config/express')(app,config);
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


app.get('/partials/:folder/:partialName',function(req,res){

    res.render('../../public/app/'+req.params.folder+'/'+req.params.partialName)
});

app.get('*',function(req,res){

    res.render('index');
});

app.listen(port);
console.log('server running on port'+port);