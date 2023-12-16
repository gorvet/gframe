<?php
require_once 'app/controllers/MetasController.php';
class AdminController  
{  
 protected $metasController;

    public function __construct()
    {
        $this->metasController = MetasController::getInstance();

    }
 public function initializeConfig()
    {        
        // Configuraciones específicas del controlador Admin
        $this->metasController->setMetaTags(['title' => 'Admingo']);
        $this->metasController->setCssLinks(['/public/css/admin/style.css']);
        //$this->RenderController->setJsScripts(['public/js/login.js']);

    }
    
}
