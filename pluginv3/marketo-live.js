//This function transforms the MarketoAgile page to all deep links 
$(document.ready(function () {
    
    var insertDeepLinks() = function () {
        console.log(current_pod);
        //    var pod = new PODS.Pod(current_pod);
        $(".use-case").click(function (e) {
            e.preventDefault();
            window.open(pod[$(this).context.id]);
        });
    }
    
    /**
        This function inserts the login credentials for 250ok. Since
        we only have one account for the whole team, everyone needs
        to use the same set of credentials.
    */
    var emailDeliverabilityLogin = function() {
        $(document).ready(function(login) {
            $.getJSON("deliverability-login.json", function() {
                $("#email").value = login.username;
                $("#password").value = login.password;
            });                                                 
        });
    }
});