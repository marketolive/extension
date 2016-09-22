var getOneLoginUser;

getOneLoginUser = function() {
    if (typeof(Application) !== "undefined"
    && Application.user) {
        console.log("OneLogin > Getting: User");
        
        var oneLoginUser = {
            username : Application.user.username,
            firstName : Application.user.firstname,
            lastName : Application.user.lastname,
            email : Application.user.email
        };
        return oneLoginUser;
    }
    else {
        console.log("OneLogin > NOT Getting: User");
    }
}

/**************************************************************************************
 *
 *  Main
 *  
 **************************************************************************************/

console.log("One Login > Test");