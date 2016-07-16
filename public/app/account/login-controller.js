/**
 * Created by Just Nasko on 7/4/2016.
 */
app.controller('LoginCtrl',function($scope,notifier, $location,identity,auth){

    $scope.identity = identity;
    $scope.login=function(user){

        auth.login(user).then(function(success){

            if(success){
                notifier.success('Successful login');
            }
            else{
                notifier.error('Username or Password not valid')
            }
        });
    }
    $scope.signout = function(){
        auth.logout().then(function(success){

            if(success){
                notifier.success('Successful logout');
                $location.path('/')
            }
            else{
                notifier.error('Error logout')
            }
        });

    }
});