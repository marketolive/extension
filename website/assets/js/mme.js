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
    console.log("MME > Reading User Pod: " + pod);
    switch (pod) {
        case "app-sjp":
            console.log("MME > Deeplinking: 106");
            $("#demo-in-marketo").attr("href", "https://" + pod + ".marketo.com/#SC21914B2");
            break;
        case "app-ab07":
            console.log("MME > Deeplinking: 106a");
            $("#demo-in-marketo").attr("href", "https://" + pod + ".marketo.com/#SC20920B2");
            break;
        case "app-ab08":
            console.log("MME > Deeplinking: 106b");
            $("#demo-in-marketo").attr("href", "https://" + pod + ".marketo.com/#SC19745B2");
            break;
        default:
            console.log("MME > Invalid userPod cookie: " + pod);
            $("#demo-in-marketo").click(function() {
                $("#modal-background").attr("style", "display:block");
            });
            break;
    }

    setInterval(function() {
        var d = new Date(),
            hour = d.getHours(),
            mins = d.getMinutes(),
            day = d.getDate(),
            time = hour + ':' + mins,
            dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
            month = monthNames[d.getMonth()],
            dayOfWeek = dayNames[d.getDay() - 1],
            date = dayOfWeek + ' ' + day + ' ' + month;

        if (hour > 12) {
            hour = hour - 12;
        } else if (hour == 0) {
            hour = 12;
        } else {}
        if (mins < 10) {
            mins = '0' + mins;
        }
        document.getElementById('android-time').innerHTML = time;
        document.getElementById('android-date').innerHTML = date;
    }, 200);
});