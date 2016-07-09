var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser');


var env = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];
require('./server/config/mongoose')(config);

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

require('./server/config/routes')(app);

app.listen(config.port);
console.log('server running on port '+config.port);