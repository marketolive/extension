=== Raw HTML Pro ===
Contributors: whiteshadow
Tags: posts, formatting, javascript, html, css, code, disable
Requires at least: 2.8
Tested up to: 3.6-beta2
Stable tag: 1.7

Lets you use raw HTML or any other code in your posts, as well as disable smart quotes and other automatic formatting on a per-post basis.

== Description ==

Tired of WordPress mangling your content? Is the visual editor messing up the code you entered in the HTML view? With this plugin, you can prevent that. Just surround the content you want to protect with [raw]...[/raw] tags, and the plugin will ensure WordPress leaves it alone.

Also, the plugin will add a new editor widget that lets you disable formatting like "smart quotes" and automatic paragraphs on a per-post basis.

**Usage**

To prevent a part of your post or page from being formatted by WordPress, switch to the HTML view and surround that content with `[raw]...[/raw]` tags. Any text, HTML, JS, CSS, XML or other code you enter between those tags will be preserved exactly.

Example:

`[raw]
This 

is 

a 'test'!
[/raw]`

Note that any content protected by [raw] tags will no longer be editable in the Visual editor. You'll need to switch to HTML mode to modify it. Of course, you can still edit the rest of your post in the Visual editor.

== Installation ==

To install the plugin follow these steps :

1. Download the raw-html-pro.zip file to your computer.
1. Unzip the file.
1. Upload the "raw-html-pro" folder to your "/wp-content/plugins/" directory.
1. Deactivate the previous version of the plugin (if applicable).
1. Activate the new plugin through the 'Plugins' menu in WordPress.

== Frequently Asked Questions ==

= Is there a way to make the "Disable ..." settings be "On" by default? =

Yes. Open to the post editor and click the "Screen Options" button in the top-right part of the page. A settings panel will appear. Locate the "Raw HTML defaults" section and tick the appropriate checkboxes. Any changes you make to these settings will only affect new and edited posts.

== Changelog ==

= 1.7 =
* Fixed a rare bug where all [raw]...[/raw] blocks in a post would be replaced with the content of the first block.
* Tested with WP 3.5.1 and WP 3.6-beta2.

= 1.6 =
* Fixed: Prevent WordPress from wrapping each [raw]...[/raw] block in a paragraph. Note: Doesn't affect inline [raw] blocks.
* Tested with WP 3.5-beta2.

= 1.5 =
* Fixed: Activating RawHTML Pro no longer breaks plugins that embed the Visual editor in their admin pages.
* Tested with WP 3.4.2 and WP 3.5-beta-1.

= 1.4 =
* Fixed a bug where switching from HTML to Visual mode could still mess up code protected by [raw] tags if it contained anything looking like a gallery shortcode.
* Fixed a conflict with WP-Syntax.
* Tested on WP 3.4.1

= 1.3 =
* Store per-post disable_* flags in a single post meta field instead of one field per flag.
* Tested on WordPress 3.4 (alpha).

= 1.2 =
* Fixed a minor conflict with the "Really simple Facebook Twitter share buttons" plugin. 
* Fixed incompatibility with SyntaxHighlighter Evolved.
* Tested on WordPress 3.3 (release candidate).

= 1.1 =
* Tested on WordPress 3.2.1
* Improved the checkbox layout in the plugin's post editor widget (extra whitespace).

= 1.0 =
* Initial release.
* Changes from the free version: added visual editor support.