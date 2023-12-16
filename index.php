<?php 
// index.php

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
 
 

