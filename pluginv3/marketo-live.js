
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
            
            @param pod {PODS.Pod} - The pod object that stores all of the
                                    user's links for that subscription.s
        */
        var insertDeepLinks() = function(pod) {
            console.log(current_pod);
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
            $(document).ready(function () {
                $.getJSON("deliverability-login.json", function (login) {
                    $("#email").value = login.username;
                    $("#password").value = login.password;
                });
            });
        }
        
        var getCookie = function(cookieField) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0)
                    return c.substring(name.length, c.length);
            }
            return "";
        }
        
        pod = new PODS.Pod(getCookie("userPod"));
        $(document).ready(function() {
            insertDeepLinks(pod);
        });
}();