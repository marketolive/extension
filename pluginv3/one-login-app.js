var getOneLoginUser = function() {
    console.log("OneLogin > Executing: getOneLoginUser");
    
    if (Application
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