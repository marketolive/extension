/**
 * This little script ensures content surrounded with [raw] tags survives
 * the HTML transformations that WordPress runs when switching from the rich
 * text editor to the plaintext one and back.
 *
 * See the SwitchEditors.go function in /wp-admin/js/editor.dev.js for more info.    
 */ 
jQuery(function($) {
	function extractCodeBlocks(e, o){
		o.codeBlocks = [];
		o.data = o.unfiltered.replace(
			/(\[raw\]|<!--raw-->|<!--start_raw-->)([\s\S]*?)(\[\/raw\]|<!--\/raw-->|<!--end_raw-->)/gi,
			function(fullMatch){
				var index = o.codeBlocks.push(fullMatch) - 1;
				return '!RAWBLOCK'+(index)+'!';
			}
		);
	}
	function insertExtractedBlocks(e, o){
		o.data = o.data.replace(
			/!RAWBLOCK(\d+?)!/gi,
			function(fullMatch, index){
				index = parseInt(index, 10);
				return o.codeBlocks[index];
			}
		);
	}
	
	jQuery('body').bind({
		beforePreWpautop: extractCodeBlocks, 
		afterPreWpautop: insertExtractedBlocks,
		beforeWpautop: extractCodeBlocks,
		afterWpautop: insertExtractedBlocks 
	}); 
});