<?php 
// core/Utils.php
// Algunas funciones de ayuda que son usadas en varios archivos

 if (file_exists( __dir__ .'/Config.php')) {
   require_once __dir__ .'/Config.php';
 }

/*Funciones comunes para consultar y usar la db*/
function getPDOInstance(){
   $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASSWORD);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   return $pdo;
}


// Validación de usuario logueado
function is_login(){
  if (!isset($_SESSION['user_id'])) {
    $response = array('success' => false, 'message' => 'tologin');
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  }
}

// Validación del CSRF 
function val_CSRF(){
// Verifica si se recibió un token CSRF y una marca de tiempo válidos
  if (isset($_POST['csrf_token']) && isset($_POST['csrf_timestamp'])) {
    $csrf_token = $_POST['csrf_token'];
    $csrf_timestamp = $_POST['csrf_timestamp'];
    // Verifica si el token CSRF y la marca de tiempo coinciden con los valores almacenados en la sesión
    if ($csrf_token === $_SESSION['csrf_token'] && (int)$csrf_timestamp === (int)$_SESSION['csrf_timestamp']) {
      // El token CSRF y la marca de tiempo son válidos, procesa la solicitud   
    }
    else {
      // El token CSRF y/o la marca de tiempo no son válidos
      // Verifica si la marca de tiempo es anterior a la marca de tiempo almacenada en la sesión
      if ($csrf_timestamp < $_SESSION['csrf_timestamp']) {
        // La marca de tiempo es anterior, esto significa que la sesión se cerró y abrió en otra pestaña
        $response = array('success' => false, 'message' => 'tologin');
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
        }
      else {
      // La marca de tiempo es posterior, esto significa que el token CSRF no coincide debido a un ataque CSRF
        $response = array('success' => false, 'message' => 'notoken');
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
      }
    }
  } 
  else {
    // No se recibió un token CSRF y/o una marca de tiempo válidos
    $response = array('success' => false, 'message' => 'notoken');
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  }
}






/**
 * Recupera la URL del dominio del sitio
 * Eliminará los enlaces de login e install para recuperar solo las URL del directorio.
 *
 * @since 0.0.1
 *
 * @return string La URL recuperada.
 */

function guess_url() {
  $schema = is_ssl() ? 'https://' : 'http://';

  $host = isset($_SERVER['HTTP_HOST']) ? strtolower($_SERVER['HTTP_HOST']) : '';

  if (strpos($host, ':') !== false) {
    list($host, $port) = explode(':', $host, 2);
  } else {
    $port = '';
  }

  $server_name = isset($_SERVER['SERVER_NAME']) ? strtolower($_SERVER['SERVER_NAME']) : '';

  if (!empty($host) && $host !== $server_name) {
    $host = strtolower($host);
  }

  $path = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';

  // Strip query string
  $path = strtok($path, '?');
  $path = str_replace('/app/controllers/InstallController.php', '', $path);

  $url = $schema;

  if (!empty($host)) {
    $url .= $host;
    if (!empty($port)) {
      $url .= ':' . $port;
    }
  } elseif (!empty($_SERVER['SERVER_ADDR'])) {
    $url .= $_SERVER['SERVER_ADDR'];
  } else {
    $url .= '127.0.0.1';
  }

  if (!empty($path) && $path !== '/') {
    $url .= $path;
  }

  return $url;
}














/**Funciones auxiliares**/

/**
 * Determina si se está usando SSL.
 *
 * @since 0.0.1
 *
 * @return bool True si es SSL, o false en caso contrario.
 */
function is_ssl() {
	if ( isset( $_SERVER['HTTPS'] ) ) {
		if ( 'on' === strtolower( $_SERVER['HTTPS'] ) ) {
			return true;
		}

		if ( '1' == $_SERVER['HTTPS'] ) {
			return true;
		}
	} elseif ( isset( $_SERVER['SERVER_PORT'] ) && ( '443' == $_SERVER['SERVER_PORT'] ) ) {
		return true;
	}
	return false;
}
