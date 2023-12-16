<?php
//require_once 'app/controllers/MetasController.php';
class ErrorController 
{  
 protected $metasController;

    public function __construct()
    {
        $this->metasController = MetasController::getInstance();

    }
 public function initializeConfig($actionName)
    {    
        // Configuraciones específicas del controlador Admin
        $this->metasController->setMetaTags(['title' => 'Error - '.$actionName]);
        $this->metasController->setCssLinks([
            '/public/css/common.css',
            '/public/css/404/404.css',
        ]);

    }

  }