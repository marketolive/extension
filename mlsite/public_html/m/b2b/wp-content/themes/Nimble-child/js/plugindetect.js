function pluginStatus() {
	window.addEventListener('message', function(event) {
		if (event.data.type && event.data.type == 'PluginMsg') {
			var pagePluginStatus = event.data.text;
			console.log('PAGE : Receive Plugin Status = ' + pagePluginStatus + ' <--- *** Provide this variable for the Marketo application ***');			
		}
	}, false);
}
//pluginStatus();
