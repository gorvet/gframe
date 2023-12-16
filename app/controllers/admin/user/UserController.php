<?php
class UserController  
{  
 protected $metasController;

    public function __construct()
    {
        $this->metasController = MetasController::getInstance();

    }
 public function initializeConfig()
    {        
        // Configuraciones específicas del controlador Admin
        $this->metasController->setMetaTags(['title' => 'Usuarios']);
        $this->metasController->setCssLinks(['/public/css/admin/style.css']);
        //$this->RenderController->setJsScripts(['public/js/login.js']);

    }
    
}
 