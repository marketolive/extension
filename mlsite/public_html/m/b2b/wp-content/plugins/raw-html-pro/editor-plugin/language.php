<?php
if ( !defined('ABSPATH') ) {
	exit;
}

function rawhtml_get_mce_translation() {
	//At the moment, we don't have any actual i18n support.
	//Just need to pass the placeholder image URL to the TinyMCE plugin.
	$translations = array(
		'placeholder_image' => plugins_url('editor-plugin/placeholder.gif', RAWHTML_PLUGIN_FILE),
	);

	if ( class_exists('_WP_Editors') ) {
		$mce_locale = _WP_Editors::$mce_locale;
	} else {
		$mce_locale = ( '' == get_locale() ) ? 'en' : strtolower( substr(get_locale(), 0, 2) ); // only ISO 639-1
	}

	$translated = sprintf(
		"tinyMCE.addI18n(%s, %s);\n",
		json_encode($mce_locale . '.rawhtml'),
		json_encode($translations)
	);
	return $translated;
}
$strings = rawhtml_get_mce_translation();