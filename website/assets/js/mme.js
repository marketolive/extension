var getCookie = function(cookieField) {
    var name = cookieField + "=",
        cookies = document.cookie.split(';'),
        currentCookie;
    for (var ii = 0; ii < cookies.length; ++ii) {
        var currentCookie = cookies[ii].trim();
        if (currentCookie.indexOf(name) == 0)
            return currentCookie.substring(name.length, currentCookie.length);
    }
    return null;
}

$(document).ready(function() {
    var pod = getCookie("userPod");
    switch (pod) {
        case "app-sjp":
        case "app-ab07":
            $("#demo-in-marketo").attr("href", "https://" + pod + ".marketo.com/#SC20920B2");
            break;
        case "app-ab08":
            $("#demo-in-marketo").attr("href", "https://" + pod + ".marketo.com/#SC19745B2");
            break;
        default:
            // Add error condition here
            break;
    }

    setInterval(function() {
        var d = new Date();
        var hour = d.getHours();
        if (hour > 12)
            hour = hour - 12;
        else if (hour == 0)
            hour = 12;
        else {}
        var mins = d.getMinutes();
        if (mins < 10)
            mins = '0' + mins;
        var day = d.getDate();
        var time = hour + ':' + mins;
        var dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var month = monthNames[d.getMonth()];
        var dayOfWeek = dayNames[d.getDay() - 1];
        var date = dayOfWeek + ' ' + day + ' ' + month;
        document.getElementById('android-time').innerHTML = time;
        document.getElementById('android-date').innerHTML = date;
    }, 200);
});