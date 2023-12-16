<?php 
// RenderController.php
require_once 'core/Config.php';
require_once realpath(ABSPATH . "app/controllers/error/ErrorController.php");
require_once realpath(ABSPATH . "app/controllers/MetasController.php");

class RenderController 
{   
    private static $instance;
    protected $metaTags = [];
    protected $cssLinks = [];
    protected $jsScripts = [];
    protected $linkMenú = [];
    protected $metasController;


    public function __construct()
    {
        $this->metasController = MetasController::getInstance();
    }

   
    public function renderView(array $params)
    {   
          //echo 'template: '.$params['templateName'].'<br>';
         //echo 'módulo: '. $params['moduleName'].'<br>';
         //echo 'acción: '.$params['actionName'].'<br>';

        // Instanciar el controlador correspondiente a la vista solicitada
        $controller = $this->getControllerInstance($params);

        // Cargar configuraciones específicas del controlador (si es necesario)
          $controller->initializeConfig($params['actionName']);

         //Cargar la vista con un contenido específico
         $content = $this->loadView($params);
      //print_r($params);
       
        return $content;
    }

    private function loadView(array $params)
    { 
      // Sanear la entrada para evitar posibles ataques
      $viewName = ucfirst(basename($params['actionName']));
      //echo $viewName;
       if ($params['templateName']==$params['moduleName']) {
        $viewPath = realpath(ABSPATH . "app/views/".$params['templateName']."/".$params['templateName'].$viewName .".php");
          
        //echo '1';
       }
       elseif ($params['moduleName']=='') {//echo '2';
           $viewPath ='';
       }
       else{//echo '3';
       $viewPath = realpath(ABSPATH . "app/views/".$params['templateName']."/".$params['moduleName']."/".$params['moduleName'].$viewName .".php");
   }
   
    //echo  $viewPath; 

  if ($viewPath!=''&&file_exists($viewPath)) {
            ob_start(); // Iniciar el búfer de salida
            require_once $viewPath;
            return ob_get_clean(); // Obtener el contenido del búfer y limpiarlo
        } 
        else {$this->errorControl('s404','Vista no encontrada' );}
    }

    private function getControllerInstance(array $params)
    {     
       if ($params['templateName']!=$params['moduleName']) { 
        $controllerPath = realpath(ABSPATH .'app/controllers/'.$params['templateName'].'/'.$params['moduleName'].'/'. ucfirst($params['moduleName']) . 'Controller.php');
    }
   else{ 
     $controllerPath = realpath(ABSPATH .'app/controllers/'.$params['templateName'].'/'. ucfirst($params['moduleName']) . 'Controller.php');

 }
 
 
       if (file_exists($controllerPath)) {//comprobamos la existencia del controlador
            require_once $controllerPath;
             $controllerClass=ucfirst($params['moduleName']) . 'Controller';
             $controllerInstance = new $controllerClass();
              return $controllerInstance;

          }
            else {$this->errorControl('s404','Controlador no encontrado' );}


    }
    public function loadTemplate($content,array $params)
    {    //print_r($params);
         if (!file_exists(realpath(ABSPATH . 'app/views/templates/'.$params['templateName'].'Template.php'))) 
         {
            $this->errorControl('s404','Template no encontrado' );
             }

         include realpath(ABSPATH . "app/views/templates/header.php");
        include realpath(ABSPATH . "app/views/templates/".$params['templateName'].'Template.php');
        include realpath(ABSPATH . "app/views/templates/footer.php");
            
    
   }

     public function errorControl($action,$info){
        $controllerInstance = new ErrorController();
        $params['templateName']='error';
        $params['moduleName']='error';
        $params['actionName']=$action;
        $this->metasController->setMetaTags(['info' => $info]);
        $controllerInstance->initializeConfig($action);
        $content = $this->loadView($params);
        $this->errorTemplate($content);
        die();
}
 public function errorTemplate($content)
    {    
     
        include realpath(ABSPATH . "app/views/templates/header.php");
        include realpath(ABSPATH . "app/views/templates/errorTemplate.php");
        include realpath(ABSPATH . "app/views/templates/footer.php");
   
   }

   public function getMeta($meta){
    return $this->metasController->getMetaTag($meta);
}
public function ajaxToRender(array $params) {
    $html = $this->renderView($params);
    echo $html;
}
}
