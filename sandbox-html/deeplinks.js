current_pod = "app-sjp";

//This function transforms the MarketoAgile page to all deep links 
var marketoAgile = function() {
    var pod = new PODS.Pod(current_pod);
    $(".marketo-live-option").click(function(e) {
        e.preventDefault();
        window.open(pod[$(this).context.id]); // Need to make sure that this will work.
        console.log($(this).context.id);
    });
}

marketoAgile();