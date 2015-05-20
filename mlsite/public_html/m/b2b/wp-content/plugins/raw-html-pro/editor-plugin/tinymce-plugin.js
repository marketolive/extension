(function() {
	tinymce.create('tinymce.plugins.wsRawHtmlPlugin', {
		/**
		 * Initializes the plugin.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			
			var placeholderSrc = ed.getLang('rawhtml.placeholder_image');
			var placeholderClass = 'mceRawHtmlPlaceholder';
			var placeholderTitle = 'Switch to HTML mode to edit this code';

			/**
			 * Just before TinyMCE gets its hands on the content, replace any code 
			 * that's surrounded with [raw] tags with a placeholder. 
			 */
			ed.onBeforeSetContent.addToTop(function(ed, o) {
				o.content = o.content.replace(
					/(\[raw\]|<!--raw-->|<!--start_raw-->)([\s\S]*?)(\[\/raw\]|<!--\/raw-->|<!--end_raw-->)/gi, 
					function(content){
						//Store the content in the ALT attribute of a placeholder image.
						var alt = escape(content);
						return '<img alt="'+alt+'" class="'+placeholderClass+' mceItemNoResize" title="'+placeholderTitle+'" src="'+placeholderSrc+'" />';
					}
				)
			});

			/**
			 * Replace placeholders with the original content.
			 */
			ed.onGetContent.add(function(ed, o) {
				var extractAlt = /\balt\s*=\s*"([^"]*?)"/;
				o.content = o.content.replace(
					/<img\s+([^>]+?)>/g,
					function(fullMatch, attributes, offset, s){
						if ( attributes.indexOf('src="'+placeholderSrc+'"') == -1 ){
							return fullMatch;
						}
						//Extract content from the ALT attribute.
						var matches = extractAlt.exec(attributes);
						if ( !matches ){
							return fullMatch;
						}
						return unescape(matches[1]);
					}
				);
			});
		},
		
		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
		        return {
		                longname : 'RawHTML plugin',
		                author : 'Janis Elsts',
		                authorurl : 'http://w-shadow.com/',
		                infourl : '',
		                version : "1.0"
		        };
		}
	});
	
	// Register plugin
	tinymce.PluginManager.add('ws_rawhtml_plugin', tinymce.plugins.wsRawHtmlPlugin);
})();