var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser');

var port = 3030;
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

app.get('*',function(req,res){

    res.render('index');
});

app.listen(port);
console.log('server running on port'+port);

