/**
 * Created by Just Nasko on 7/10/2016.
 */

app.factory('auth',function($q){

    return{
        login:function(user){

            var deffer = $q.defer();

            $http.post('/login',user).success(function(response){

                if(response.success){

                    deffer.resolve(true);
                    identity.currentUser = response.user;
                    notifier.success("Login Success");
                }
                else{
                    deffer.resolve(false);
                    notifier.error("Wrong username or password");
                }
            });
        }
    }
});