/**
 * Created by Just Nasko on 7/4/2016.
 */
var path = require('path');
var rootPath = path.normalize(__dirname +'/../../')

module.exports={

    development:{

        rootPath:rootPath,//Not working
        db:'mongodb://localhost/telerikdb',
        port:process.env.PORT || 3030
    },
    production:{

        db:''
    }
}