$(document).ready(function() {
    setInterval(function() {
        var d = new Date(),
            hour = d.getHours(),
            mins = d.getMinutes(),
            day = d.getDate(),
            dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            month = monthNames[d.getMonth()],
            dayOfWeek = dayNames[d.getDay()],
            date = dayOfWeek + ' ' + month + ' ' + day,
            time;

        if (hour > 12) {
            hour = hour - 12;
        } else if (hour == 0) {
            hour = 12;
        } else {}
        if (mins < 10) {
            mins = '0' + mins;
        }

        time = hour + ':' + mins;

        document.getElementById('android-time').innerHTML = time;
        document.getElementById('android-date').innerHTML = date;
    }, 200);
});