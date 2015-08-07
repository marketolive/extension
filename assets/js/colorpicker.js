var reload = location.search.split('reloaded=')[1];
console.log("Color Picker > Reload Query String: "+reload);

if (reload) {
    document.getElementById('first').style.display = "none";
    document.getElementById('second').style.display = "block";
    document.getElementById('second-correct').style.display = "block";
}