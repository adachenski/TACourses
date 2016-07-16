/**
 * Created by Just Nasko on 7/10/2016.
 */

app.factory('auth',function($q,$http, identity){

    return{
        login:function(user){

            var deffer = $q.defer();

            $http.post('/login',user).success(function(response){

                if(response.success){

                    deffer.resolve(true);
                    identity.currentUser = response.user;
                }
                else{
                    deffer.resolve(false);
                }
            });
            return deffer.promise;
        },
        logout:function(){

            var deffer = $q.defer();
            http.post('/logout').success(function(response){
                if(response.success){
                    identity.currentUser= undefined;
                    deffer.resolve(true);
                }
                deffer.resolve(false);
            });

            return deffer.promise;
        }
    }
});