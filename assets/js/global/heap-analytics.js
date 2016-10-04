function getCookie(cookieName) {
    console.log("Getting: Cookie " + cookieName);
    
    var name = cookieName + '=',
    cookies = document.cookie.split(';'),
    currCookie;
    
    for (var ii = 0; ii < cookies.length; ii++) {
        currCookie = cookies[ii].trim();
        if (currCookie.indexOf(name) == 0) {
            return currCookie.substring(name.length, currCookie.length);
        }
    }
    console.log("Getting: Cookie " + cookieName + " not found");
    return null;
}

var oneLoginEmail = getCookie("onelogin_email"),
oneLoginFirstName = getCookie("onelogin_first_name"),
oneLoginLastName = getCookie("onelogin_last_name"),
prod = "3348268820",
dev = "3598597352",
env = dev;

window.heap = window.heap || [], heap.load = function (e, t) {
    window.heap.appid = e,
    window.heap.config = t = t || {};
    var r = t.forceSSL || "https:" === document.location.protocol,
    a = document.createElement("script");
    a.type = "text/javascript",
    a.async = !0,
    a.src = (r ? "https:" : "http:") + "//cdn.heapanalytics.com/js/heap-" + e + ".js";
    var n = document.getElementsByTagName("script")[0];
    n.parentNode.insertBefore(a, n);
    for (var o = function (e) {
        return function () {
            heap.push([e].concat(Array.prototype.slice.call(arguments, 0)))
        }
    }, p = ["addEventProperties", "addUserProperties", "clearEventProperties", "identify", "removeEventProperty", "setEventProperties", "track", "unsetEventProperty"], c = 0; c < p.length; c++)
        heap[p[c]] = o(p[c])
};
heap.load(env);

if (oneLoginEmail) {
    heap.identify(oneLoginEmail);
}

if (oneLoginFirstName
     && oneLoginLastName) {
    console.log("Heap Analytics ID: " + oneLoginFirstName + " " + oneLoginLastName);
    
    heap.addUserProperties({
        Name : oneLoginFirstName + " " + oneLoginLastName
    });
}