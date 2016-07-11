/**
 * Created by Just Nasko on 7/9/2016.
 */

var passport = require('passport'),
    auth = require('./auth');

module.exports = function(app){
    app.get('/partials/:folder/:partialName',function(req,res){

        res.render('../../public/app/'+req.params.folder+'/'+req.params.partialName)
    });

    app.post('/login',auth.login);

    app.get('*',function(req,res){

        res.render('index');
    });
};