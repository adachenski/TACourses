/**
 * Created by Just Nasko on 7/10/2016.
 */

app.factory('identity',function(){
    var currentUser;
    return{
        currentUser:undefined,
        isAuthenticate:function(){
            return !!this.currentUser;
        }
    }
})