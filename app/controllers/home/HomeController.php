<?php
require_once 'app/controllers/MetasController.php';
class HomeController  
{  
 protected $metasController;

    public function __construct()
    {
        $this->metasController = MetasController::getInstance();

    }
 public function initializeConfig()
    {        
        // Configuraciones específicas del controlador Home
        $this->metasController->setMetaTags(['title' => 'Inicio']);
        $this->metasController->setCssLinks(['/public/css/home/home.css']);
   

    }
    
}
