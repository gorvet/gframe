<?php 
//core/Router.php

class Router {
    private static $instance;
    private $renderController;

    public function __construct(RenderController $renderController) {
        $this->renderController = $renderController;
    }

     
//Determinamos que vista y acción se pide por url
    public function route() {
        $uri = $this->getRelativeURI();
        $isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
 
        switch ($uri[0]) {
            case '':
            $params=[
                'templateName' => 'home', 
                'moduleName' => 'home', 
                'actionName' => 'index'
            ];
            break;
            case 'admin':
            $params= $this->getAdminParams($uri);
            break;
            case ($uri[0] === 'login' || strpos($uri[0], 'login?v=') === 0):// Verifica si $uri[0] es exactamente 'login' o comienza con 'login?v='
             $params = $this->getAuthParams($uri);
            break;
        default: //'slug'
        $params=[
                'templateName' => 'slug', 
                'moduleName' => '', 
                'actionName' => 'index'
            ];
   
    }
  
        $this->toRender($params);
    
 
}


//determinamos el módulo o la acción según el case
private function getStandardParams($uri){
    $moduleName = $templateName = $uri[0];
    $actionName = 'index';
    if (empty($uri[1])&&empty($uri[2])) {
        $moduleName=$templateName;
        $actionName='index';
    }
    elseif(!empty($uri[1])&&empty($uri[2])){
        $moduleName=$uri[1];
        $actionName='index';
    }
    elseif(!empty($uri[1])&&!empty($uri[2])){
        $moduleName=$uri[1];
        $actionName=$uri[2];
    }

    $params=[
        'templateName' => $templateName, 
        'moduleName' => $moduleName, 
        'actionName' => $actionName
    ];
    return $params;

}

//determinamos el módulo o la acción según el case
private function getAdminParams($uri){
    $templateName = $uri[0];
    $moduleName = '';
    $actionName = 'index';
    if (empty($uri[1])&&empty($uri[2])) {
         $moduleName=$uri[0];
         $actionName='index';
    }
    elseif($uri[0]==$uri[1]){
        $moduleName = '';
    }
    elseif(!empty($uri[1])&&empty($uri[2])){
        $moduleName=$uri[1];
        $actionName='index';
    }
    elseif(!empty($uri[1])&&!empty($uri[2])){
        $moduleName=$uri[1];
        $actionName=$uri[2];
    }

    
     //si no está logueado no permitir la ruta al admin
if (!isset($_SESSION['userID'])) {
    header("Location: " . site_url . "/login");
    exit();
  }
else{
$params=[
    'templateName' => $templateName, 
    'moduleName' => $moduleName, 
    'actionName' => $actionName,
];
}
    return $params;

}

private function getAuthParams($uri){
    $templateName = 'auth';
    $moduleName = 'auth';
    $actionName='login';
    if (empty($uri[1])) {
        $actionName='login';
    }
     elseif($uri[0]==$uri[1]){
        $moduleName = '';
    }
    else{
    $actionName=$uri[1];//register,lostpasw, recovery...
    //comprobar aqui si tiene "?parámetros"
    $actionName = strpos($actionName, '?') !== false ? strstr($actionName, '?', true) : $actionName;

    }

 //si está logueado no tiene sentido permitir la ruta al auth
if (isset($_SESSION['userID'])) {
     header("Location: " . site_url . "/admin");
    exit();
  }
else{
$params=[
    'templateName' => $templateName, 
    'moduleName' => $moduleName, 
    'actionName' => $actionName,
];
}   

return $params;
}


//Llamamos al render con los parámetros obtenidos
public function toRender(array $params) {

       $content = $this->renderController->renderView($params);
       $this->renderController->loadTemplate($content, $params);
    }

 
private function getRelativeURI() {
    $base = dirname($_SERVER['SCRIPT_NAME']);
    $uri = substr($_SERVER['REQUEST_URI'], strlen($base));
    $uri = trim($uri, '/');
    $uri = explode('/', $uri);
    return $uri;
}

}


