var getOneLoginUser;

getOneLoginUser = function() {
    var isOneLoginUser = window.setInterval(function() {
        if (typeof(Application) !== "undefined"
        && Application.user) {
            console.log("OneLogin > Getting: User");
            
            window.clearInterval(isOneLoginUser);
            
            var oneLoginUser = {
                username : Application.user.username,
                firstName : Application.user.firstname,
                lastName : Application.user.lastname,
                email : Application.user.email
            };
            return oneLoginUser;
        }
    }, 0);
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

console.log("One Login > Test");