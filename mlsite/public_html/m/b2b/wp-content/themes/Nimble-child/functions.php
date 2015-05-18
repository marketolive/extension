<?php
//Put all new functions here, this extends the functions.php in nimble's main theme.
function tabclass() {
	$dirr = get_stylesheet_directory_uri();
	$cookie = $_COOKIE['_mkto_trk'];
	$cookie = explode(":", $cookie);
	$cookiesplit = $cookie[2];
	echo "a {title:'Mkto!', url:'https://cryptic-atoll-9445.herokuapp.com/', data:'{$cookiesplit}'}";
	//echo "a {title:'Mkto!', url:'https://heroku.marketosolutionsconsulting.com/', data:'{$cookiesplit}'}";
	//url: {$dir}/extruderFill.php, data: 'name=value'
}
add_action( 'filltabclass' , 'tabclass');

function populatecookie(){
	$dirr = get_stylesheet_directory_uri();
	$cookie = $_COOKIE['_mkto_trk'];
	$cookie = explode(":", $cookie);
	$cookiesplit = $cookie[2];
	echo "'{$cookiesplit}'";
}
add_action('populatecookie', 'populatecookie');

function loadsidetabjs() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('jquery.jsonp', "{$ss_url}/js/jquery.jsonp.js", array('jquery'));
    wp_enqueue_script('jquery-hoverIntent-min', "{$ss_url}/js/jquery.hoverIntent.min.js", array('jquery'));
	wp_enqueue_script('jquery-mb-flipText', "{$ss_url}/js/jquery.mb.flipText.js", array('jquery'));
	wp_enqueue_script('jquery-metadata', "{$ss_url}/js/jquery.metadata.js", array('jquery'));
	wp_enqueue_script('mbExtruder', "{$ss_url}/js/mbExtruder.js", array('jquery', 'jquery-hoverIntent-min', 'jquery-mb-flipText', 'jquery-metadata'));
}
add_action('wp_enqueue_scripts','loadsidetabjs');

function loadsidetabstyle() {
	$css_path = get_stylesheet_directory_uri();
	wp_enqueue_style( 'extruder_css', "{$css_path}/mbExtruder.css");
}
add_action('wp_enqueue_scripts', "loadsidetabstyle");

function loadaccordionstyle() {
	$css_path = get_stylesheet_directory_uri();
	wp_enqueue_style( 'accordion_css', "{$css_path}/jquery-ui-1.10.3.custom.css");
}
add_action('wp_enqueue_scripts', "loadaccordionstyle");

function loadlefttab() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('lefttab', "{$ss_url}/js/lefttab.js", array('jquery', 'mbExtruder'));
}
add_action('wp_enqueue_scripts', 'loadlefttab');

function jqueryui() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('jqueryui', "{$ss_url}/js/jquery-ui-1.10.3.custom.js", array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'jqueryui');

function loadaccordion() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('loadaccordion', "{$ss_url}/js/accordion.js", array('jquery, jqueryui'), null, true);
}
add_action('wp_enqueue_scripts', 'loadaccordion');

function loadscrollbarcss() {
	$css_path = get_stylesheet_directory_uri();
	wp_enqueue_style( 'scrollbarcss', "{$css_path}/jquery.mCustomScrollbar.css");
}
add_action('wp_enqueue_scripts', "loadscrollbarcss");

function mousewheelscroll() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('mousewheelscroll', "{$ss_url}/js/jquery.mousewheel.js", array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'mousewheelscroll');

function scrollbar(){
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('scrollbar', "{$ss_url}/js/jquery.mCustomScrollbar.js", array('jquery', 'mousewheelscroll'), null, true);
}
add_action('wp_enqueue_scripts', 'scrollbar');

function loadrevealmodalcss() {
	$css_path = get_stylesheet_directory_uri();
	wp_enqueue_style( 'revealcss', "{$css_path}/reveal.css");
}
add_action('wp_enqueue_scripts', "loadrevealmodalcss");

function revealmodal() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('reveal', "{$ss_url}/js/jquery.reveal.js", array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'revealmodal');

function loadfullwidthpagecss() {
	$css_path = get_stylesheet_directory_uri();
	wp_enqueue_style( 'fullwidthpagecss', "{$css_path}/fullpagewidth.css");
}
add_action('wp_enqueue_scripts', "loadfullwidthpagecss");

//Start YouTube Code
function swfobj() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('swf', "https://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js", array('jquery'), null, true);
}
function youtube() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('yt', "{$ss_url}/js/youtube.js", array('jquery'), null, true);
}
function presentation() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('yt', "{$ss_url}/js/presentation.js", array('jquery'), null, true);
}
function cookiejs(){
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('cookjs', "{$ss_url}/js/jquery.cookie.js", array('jquery'), null, true);
}
$url = '//' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
if (false !== strpos($url,'video')) {
	add_action('wp_enqueue_scripts', 'cookiejs');	
	add_action('wp_enqueue_scripts', 'swfobj');
	add_action('wp_enqueue_scripts', 'youtube');
}
if (false !== strpos($url, 'presentation')) {
	add_action('wp_enqueue_scripts', 'cookiejs');	
	add_action('wp_enqueue_scripts', 'swfobj');
	add_action('wp_enqueue_scripts', 'presentation');	
}
function loadscrolltotop() {
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('scrolltotop', "{$ss_url}/js/scrolltotop.js", array('jquery'));
}
//if (false !== strpos($url, 'score') || false !== strpos($url, 'nurture') || false !== strpos($url, 'faq') || false !== strpos($url, 'automated-email') || false !== strpos($url, 'events')){
add_action('wp_enqueue_scripts', 'loadscrolltotop');
//}
//start scoregame code
function scoregame(){
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('sg', "{$ss_url}/js/scoregame.js", array('jquery'), null, true);
}
if (false !== strpos($url, 'score')){
	add_action('wp_enqueue_scripts', 'scoregame');
}//start nurturegame codefunction nurturegame(){	$ss_url = get_stylesheet_directory_uri();	wp_enqueue_script('sg', "{$ss_url}/js/nurturegame.js", array('jquery'), null, true);}if (false !== strpos($url, 'nurture')){	add_action('wp_enqueue_scripts', 'nurturegame');}

//start nurturegame code
function nurturegame(){
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('sg', "{$ss_url}/js/nurturegame.js", array('jquery'), null, true);
}
if (false !== strpos($url, 'nurture')){
	add_action('wp_enqueue_scripts', 'nurturegame');
}

//start faq code
function faqgame(){
	$ss_url = get_stylesheet_directory_uri();
	$css_path = get_stylesheet_directory_uri();
	wp_enqueue_script('sgga', "{$ss_url}/js/venobox/venobox.min.js", array('jquery'), null, true);
	wp_enqueue_style( 'sgg', "{$css_path}/js/venobox/venobox.css");
}
if (false !== strpos($url, 'faq') || false !== strpos($url, 'search-engine') || false !== strpos($url, 'social-promotions') || false !== strpos($url, 'calendar') || false !== strpos($url, 'website-personalization')){
	add_action('wp_enqueue_scripts', 'faqgame');
}

//start pricinggame code
function pricinggame(){
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('sg', "{$ss_url}/js/pricinggame.js", array('jquery'));
}
if (false !== strpos($url, 'pricing')){
	add_action('wp_enqueue_scripts', 'pricinggame');
}//start contactgame codefunction contactgame(){	$ss_url = get_stylesheet_directory_uri();	wp_enqueue_script('cg', "{$ss_url}/js/contactgame.js", array('jquery'), null, true);}if (false !== strpos($url, 'contact')){	add_action('wp_enqueue_scripts', 'contactgame');}

//start pricinggame code
function agile(){
	$ss_url = get_stylesheet_directory_uri();
	$css_path = get_stylesheet_directory_uri();
	wp_enqueue_script('oc', "{$ss_url}/js/owl.carousel.js", array('jquery'));
	wp_enqueue_style('ocs', "{$css_path}/owl.carousel.css");
	wp_enqueue_style('ocst', "{$css_path}/owl.theme.css");
	wp_enqueue_style('ocstr', "{$css_path}/owl.transitions.css");
}
if (false !== strpos($url, 'agile')){
	add_action('wp_enqueue_scripts', 'agile');
}

//start contactgame code
function contactgame(){
	$ss_url = get_stylesheet_directory_uri();
	wp_enqueue_script('cg', "{$ss_url}/js/contactgame.js", array('jquery'), null, true);
}
if (false !== strpos($url, 'contact')){
	add_action('wp_enqueue_scripts', 'contactgame');
}

?>