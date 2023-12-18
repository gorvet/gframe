<?php 
// app/controllers/InstallController.php
// Controlador para la instalación


require_once "../models/InstallModel.php";

class InstallController {  

private $installModel; // Para conectar con su modelo correspondiente

public function __construct() {
    $this->installModel = new InstallModel();
}

public function if_config() {
    if (file_exists('../../core/Config.php')) {
        $response = array('status' => 'success');
    } else {
        $response = array('success' => false);
    }

    $this->sendJsonResponse($response);  
}

public function if_db() {
    $response=$this->installModel->if_db();
    $this->sendJsonResponse($response);  
}

public function testDBConnection() {
    $dbName = $_POST["dbName"];
    $dbUser = $_POST["dbUser"];
    $dbPass = $_POST["dbPass"];
    $dbServer = $_POST["dbServer"];

    if (!filter_var($dbServer, FILTER_VALIDATE_IP) && !filter_var($dbServer, FILTER_VALIDATE_DOMAIN)) {
        $response = array('success' => false, 'message' => 'Host inválido.');
    }
    else if (empty($dbUser)) {
        $response = array('success' => false, 'message' => 'Nombre de usuario vacío.');
    }
    else if (empty($dbName)) {
        $response = array('success' => false, 'message' => 'Nombre de la base de datos vacío.');
    }
    else {    
        $response=$this->installModel->testDBConnection();
    }

    $this->sendJsonResponse($response); 
}


public function configCreate() {
    $response=$this->installModel->configCreate();
    $this->sendJsonResponse($response);  
}

public function installer() {
$response=$this->installModel->installer();
$this->sendJsonResponse($response); 
}

private function sendJsonResponse($response)
{
    header('Content-Type: application/json');
    echo json_encode($response);
}
/**/
}



// Manejar la solicitud Ajax
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];
        $installController = new InstallController();
// Invocar la acción correspondiente
        switch ($action) {
            case 'if_config':
            $installController->if_config();
            break;
            case 'if_db':
            $installController->if_db();
            break;
            case 'testDBConnection':
            $installController->testDBConnection();
            break;
            case 'configCreate':
            $installController->configCreate();
            break;
            case 'installer':
            $installController->installer();
            break;

            default:
// echo json_encode(['error' => 'Acción no válida']);
            break;
        }
    } else {
// echo json_encode(['error' => 'La acción no está definidas']);
    }
}

