
/**
    This module contains all of the functionality needed for the 
    manipulation of the marketolive.com website. It handles the deep
    linking of the tiles, manipulation of the UI, cookie checking etc.
    It is loaded onto the page by the Marketo Live plugin. It largely uses
    jQuery to interact with DOM elements and inject new bahavior.
    
    @namespace
*/
var LIVE = function () {
    
        /**
            This function injects the deep links onto the homepage based
            on which pod that the user is in.
        */
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
        var emailDeliverabilityLogin = function () {
            $(document).ready(function () {
                $.getJSON("deliverability-login.json", function (login) {
                    $("#email").value = login.username;
                    $("#password").value = login.password;
                });
            });
        }
}();