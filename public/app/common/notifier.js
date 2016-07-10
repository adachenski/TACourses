/**
 * Created by Just Nasko on 7/10/2016.
 */

app.factory('notifier',function(toastr){
    return{
        success:function(msg){
            return toastr.success(msg);
        },
        error:function(msg){
            return toastr.error(msg);
        }
    }
})