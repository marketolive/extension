var URL_PATH = "m3-dev",
HEAP_ANALYTICS_SCRIPT_LOCATION = "https://marketolive.com/" + URL_PATH + "/pluginv3/heap-analytics.min.js",
devExtensionId = "aahhkppadknlakhbppohbeolcfdhmocf",
prodExtensionId = "onibnnoghllldiecboelbpcaeggfiohl",
extensionId = devExtensionId,
loadScript,
getOneLoginUser;

/**************************************************************************************
 *
 *  This function loads the given script source.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 *  @param {String} scriptSrc - The URL of the desired script.
 *
 **************************************************************************************/

loadScript = function (scriptSrc) {
    console.log("OneLogin > Loading: Script: " + scriptSrc);
    
    var scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = scriptSrc;
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
};

/**************************************************************************************
 *
 *  This function retrieves the username, first name, last name, and email address of
 *  the current OneLogin user.
 *
 *  @Author Brian Fisher
 *
 *  @function
 *
 **************************************************************************************/

getOneLoginUser = function () {
    var isOneLoginUser = window.setInterval(function () {
            if (typeof(Application) !== "undefined"
                 && Application.user) {
                console.log("OneLogin > Getting: User");
                
                window.clearInterval(isOneLoginUser);
                
                var oneLoginUser = {
                    username : Application.user.username,
                    firstName : Application.user.firstname,
                    lastName : Application.user.lastname,
                    email : Application.user.email
                },
                isHeapAnalyticsForOneLogin;
                
                oneLoginUser.action = "setOneLoginUser";
                chrome.runtime.sendMessage(extensionId, oneLoginUser, function (response) {
                    console.log("OneLogin > Receiving: Message Response from Background: " + response);
                    
                    return response;
                });
                
                loadScript(HEAP_ANALYTICS_SCRIPT_LOCATION);
                isHeapAnalyticsForOneLogin = window.setInterval(function () {
                    if (typeof(heap) !== "undefined"
                         && heap) {
                        
                        window.clearInterval(isHeapAnalyticsForOneLogin);
                        
                        heap.identify(oneLoginUser.email);
                        heap.addUserProperties({
                            Name : oneLoginUser.firstName + " " + oneLoginUser.lastName
                        });
                        heap.track("OneLogin > Apps", {
                            app : "OneLogin",
                            url : document.location.href
                        });
                        console.log("OneLogin > Heap Analytics ID: " + oneLoginUser.firstName + " " + oneLoginUser.lastName);
                        console.log("OneLogin > Tracking: Heap Event: OneLogin > Apps");
                    }
                }, 0);
            } else {
                console.log("OneLogin > NOT Getting: User");
            }
        }, 0);
};

/**************************************************************************************
 *
 *  Main
 *
 **************************************************************************************/

console.log("OneLogin > Script Loaded");

getOneLoginUser();