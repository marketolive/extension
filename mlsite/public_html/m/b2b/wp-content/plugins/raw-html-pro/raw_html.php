<?php
/*
Plugin Name: Raw HTML Pro
Plugin URI: http://rawhtmlpro.com/
Description: Lets you enter raw HTML in your posts. You can also enable/disable smart quotes and other automatic formatting on a per-post basis. Pro version.
Version: 1.7
Author: Janis Elsts
Author URI: http://w-shadow.com/blog/
*/

/*
Copyrigt 2013 Janis Elsts
Licensed under the GPL.
*/

define('RAWHTML_PLUGIN_FILE', __FILE__);

require 'include/tag-handler.php';
require 'include/formatting-override.php'; 

if ( is_admin() && file_exists(dirname(__FILE__).'/editor-plugin/init.php') ){
	require 'editor-plugin/init.php';
}