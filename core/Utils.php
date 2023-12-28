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


 

// Validación del CSRF 
function val_CSRF(){
  if (isset($_POST['csrfToken']) && isset($_POST['csrfTimestamp'])) {
    $csrf_token = $_POST['csrfToken'];
    $csrf_timestamp = $_POST['csrfTimestamp'];
    // Verifica si el token CSRF y la marca de tiempo coinciden con los valores almacenados en la sesión
    if ($csrf_token === $_SESSION['csrfToken'] && (int)$csrf_timestamp === (int)$_SESSION['csrfTimestamp']) {
      //si estoy aqui es q hay actividad por tanto se aprovecha y actualiza lastActivity
      $_SESSION['lastActivity'] = time();
      return 'okToken'; 
    }
    else {// El token CSRF y/o la marca de tiempo no son válidos
      // Verifica si la marca de tiempo es anterior a la marca de tiempo almacenada en la sesión
      if ($csrf_timestamp < $_SESSION['csrfTimestamp']) {
        // La marca de tiempo es anterior, esto significa que la sesión se cerró y abrió en otra pestaña
        return 'toLogin'; 
        }
      else {
      // La marca de tiempo es posterior, esto significa que el token CSRF no coincide debido a un ataque CSRF
      return 'noToken'; 
      }
    }
  } 
  else {// No se recibió un token CSRF y/o una marca de tiempo 
  return 'noToken'; 
  }
}

function val_AuthCSRF(){
  if (isset($_POST['csrfToken'])) {
    $csrf_token = $_POST['csrfToken'];
    if ($csrf_token === $_SESSION['csrfToken']) {
      return 'okToken'; 
    }
    else { 
      return 'noToken'; 
    }
  } 
  else {// No se recibió un token CSRF y/o una marca de tiempo 
  return 'noToken'; 
  }
}




 