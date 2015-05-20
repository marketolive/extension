<?php

/**
 * Enable our TinyMCE plugin. This plugin will ensure content surrounded 
 * by [raw] tags survives switches between HTML mode and the visual editor. 
 * 
 * @param array $plugins List of TinyMCE plugins.
 * @return array A modified list of plugins.
 */
function rawhtml_inject_mce_plugin($plugins){
	$plugins['ws_rawhtml_plugin'] = plugins_url('editor-plugin/tinymce-plugin.js', RAWHTML_PLUGIN_FILE).'?ver=20121002_2';
	return $plugins;
}
add_filter('mce_external_plugins', 'rawhtml_inject_mce_plugin');

/**
 * Register our TinyMCE i18n file.
 *
 * @param array $languages List of translation files, indexed by plugin name.
 * @return array A modified list of translation files.
 */
function rawhtml_add_mce_translations($languages) {
	//The array key must match the TinyMCE plugin name we used above.
	$languages['ws_rawhtml_plugin'] = dirname(RAWHTML_PLUGIN_FILE) . '/editor-plugin/language.php';
	return $languages;
}
add_filter('mce_external_languages', 'rawhtml_add_mce_translations');

/**
 * Add the plugin CSS to TinyMCE editor stylesheets.
 * 
 * @param string $mce_css Comma-separated list of stylesheet URLs.
 * @return string New list of stylesheet URLs.
 */
function rawhtml_inject_editor_css($mce_css){
	$css_url = plugins_url('editor-plugin/style.css', RAWHTML_PLUGIN_FILE);
	return $mce_css.','.$css_url;
}
add_filter('mce_css', 'rawhtml_inject_editor_css');

/**
 * Add a script that will protect the editor contents from being
 * molested by the JS version of wpautop. 
 * 
 * @return void
 */
function rawhtml_enqueue_editor_scripts(){
	wp_register_script(
		'rawhtml-wpautop-override',
		plugins_url('editor-plugin/wpautop-override.js', RAWHTML_PLUGIN_FILE),
		'jquery',
		'1.4'
	);
	wp_enqueue_script('rawhtml-wpautop-override');
}
add_action('admin_print_scripts-post.php', 'rawhtml_enqueue_editor_scripts');
add_action('admin_print_scripts-post-new.php', 'rawhtml_enqueue_editor_scripts');