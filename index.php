<?php 
// index.php
// Este archivo es la entrada principal de la aplicación

// Verificar si el archivo config.php no existe para iniciar con la instalación

if (!file_exists('core/Config.php') && file_exists('install.php')){
    header('Location: install.php');
    exit();
}
elseif (!file_exists('core/config.php') && !file_exists('install.php')) {
  echo '<html dir="ltr"><head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Error de Configuración</title>
  <link href="public/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="public/css/common.css" rel="stylesheet">
  <link href="public/css/404/404.css" rel="stylesheet">
  </head>
  <body class="h-100" cz-shortcut-listen="true" style="line-height:1.5;">
  <main class="py-5">
  <div class="container">

  <div class="row justify-content-center">
  <div id="p404" class="col-12 col-lg-8 ">
  <div class="card  ">
  <span  class="d-block fs-error">404</span>
  <p class="lead border-bottom">Servicio no disponible</p>
  <p>Lo sentimos, pero no hemos encontrado el archivo <code>config.php</code>. Se ha intentado iniciar el asistente de instalación sin éxito, probablemente debido a la ausencia del archivo <code>install.php</code>.</p> 

  <p>Por favor, asegúrate de que el archivo <code>install.php</code> exista o intenta crear <code>config.php</code> de forma manual.</p>
  </div>       
  </div> 
  </div>
  </div>
  </main>



  </body></html>';
  die();
}

require_once 'core/Config.php';
require_once 'core/Router.php';
require_once 'app/controllers/RenderController.php';

session_start();

// Generar token CSRF 
if (!isset($_SESSION['csrfToken']) ) {
    $_SESSION['csrfToken'] = bin2hex(random_bytes(32));
} 
// Actualizar la última actividad del usuario
if (isset($_SESSION['lastActivity'])) {
    $_SESSION['lastActivity'] = time();
}

$renderController = new RenderController();
$router = new Router($renderController);

// Lógica para manejar la solicitud según sea AJAX o no
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    // Si es una solicitud AJAX
   $params = [
    'templateName' => 'error',
    'moduleName' => 'error',
    'actionName' => $_POST['errorType']
];
$router->toRender($params); 
} else {
    // Si no es una solicitud AJAX, realizar el enrutamiento normal
    $router->route();
}



