<?php

/** Database settings - You can get this info from your web host **/

/** The name of the database for G-Frame */
define( 'DB_NAME', 'ristophp' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Absolute path to the system directory. */
if ( ! defined( 'ABSPATH' ) ) {
  define( 'ABSPATH', __DIR__ .'/../');
}

/** Site URL. */
define( 'site_url', 'http://localhost/gptmvc' );




/** Mailer */
define( 'M_Host', 'smtp.hostinger.com' );
define( 'M_Port', 587 );
define( 'M_Username', "juank@gorvet.com" );
define( 'M_Password', "Morales23!" );
define( 'M_Secure', "tls" );
define( 'M_From', "juank@gorvet.com" );
define( 'M_Name', "Juank" );

 