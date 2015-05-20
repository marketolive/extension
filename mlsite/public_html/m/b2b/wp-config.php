<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'marketol_b2bm');

/** MySQL database username */
define('DB_USER', 'marketol_simoni');

/** MySQL database password */
define('DB_PASSWORD', '$C_rockst@r5');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '|j/T0YS}jP+$u5DJL;{vnnVMNtV[ X)yE;AsRVl$jLbXpS2!`UF;4j4L2TaU$9vs');
define('SECURE_AUTH_KEY',  'b,W|55UQcvod+fzR|6?ifHN?=-^tux&AH0ge+8I<tp/UmxP@oW@#hK/ G+Iit[um');
define('LOGGED_IN_KEY',    '8lWPAv=BT7Zy+27#$lhkFe>e 2oG=(tcZ7$ewcB=<0^GWGvt8 Nb4M3?N3-:0m[_');
define('NONCE_KEY',        'Of$1[6A=B:oUh/}6fi vShCPc$A]p+Q_|TCn~=B5GU2w7FHM.#dJW9 _bljxVlLM');
define('AUTH_SALT',        'A2W7{8b~X6sf O!=!|A:);2`xe7MZut* GNkj:-1xb^5Yx1EhXrpX<$E|%^hPHW~');
define('SECURE_AUTH_SALT', '6`T<u4v+]tl%/*T`}qK9;O0GC,i-Wffz49}V*D9(vAu^0CO [/wOWW~H[=A&6/7f');
define('LOGGED_IN_SALT',   '%^p=;#H,7J&CWgpEAO0c|3e/]H1DI#$y)OmjF$s7ptdN1t+j(w)q#wR*a9o:+yP>');
define('NONCE_SALT',       '<*%x?#cA`0L9nLEN4 cj;lx5v_ie-D?v:SS9eNGv[ECL@B.<u}QEk418E@o58l.0');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
