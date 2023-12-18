<?php 
// index.php
// Este archivo es la entrada principal de la aplicación

// Verificar si el archivo config.php no existe para iniciar con la instalación

if (!file_exists('core/Config.php') && file_exists('install.php')){
    header('Location: install.php');
    exit();
}
elseif (!file_exists('core/config.php') && !file_exists('install.php')) {
   header('Location: 503.php');
    exit();
}

require_once 'core/Config.php';
require_once 'core/Router.php';
require_once 'app/controllers/RenderController.php';
 
 
session_start();

// Generar token CSRF 
if (!isset($_SESSION['csrf_token']) ) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
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
 
 

