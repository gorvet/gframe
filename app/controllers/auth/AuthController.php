<?php
// app/controllers/AuthController.php
// Controlador para la autenticación
require_once realpath( __dir__.'/../../../core/Config.php');
require_once realpath(ABSPATH . "app/controllers/MetasController.php"); 
require_once realpath( ABSPATH . "app/controllers/EmailController.php");
require_once realpath( ABSPATH . "app/models/auth/AuthModel.php");;

class AuthController 
{  
protected $metasController; // Para modificar las metas generales de la vista
private $authModel; // Para conectar con su modelo correspondiente
private $emailController; // Para el controlador para envío de correos

public function __construct()
{
    $this->metasController = MetasController::getInstance();
    $this->authModel = new AuthModel();
    $this->emailController =  new EmailController();


}

// Iniciamos las metas generales del template para login/register/lostPasw, etc. En esta vista el login es similar al index en las otras.
// Configuraciones específicas del controlador Auth

public function initializeConfig($actionName)
{   $authJS=ucfirst($actionName);
    if ($actionName=='register'){$title='Registrarse';}
    elseif($actionName=='lostpassword'){$title='Recuperar cuenta';}
    elseif($actionName=='resetpassword'){$title='Restablecer contraseña';}
    else{ $title='Acceder';}

    $this->metasController->setMetaTags(['title' => $title]);
    $this->metasController->setCssLinks([
        '/public/css/auth/auth.css',
        '/public/vendor/passwordUtils/passwordUtils.css',

    ]);
    $this->metasController->setJsScripts([
        '/public/vendor/passwordUtils/passwordUtils.js',
        '/public/js/app/auth/Auth'.$authJS.'.js',
        
    ]);
}

// Función para el registrar de usuarios en la app
public function registerAcount()
{
// Validación datos vacíos (también del lado del cliente) 

    if (empty($_POST['register_email']) || empty($_POST['register_password'])) {
        $response = array('success' => false, 'message' => 'emptyField');
    }
// Validación del token CSRF 
    else if (($_POST['csrf_token'] != $_SESSION['csrf_token'])) {
        $response = array('success' => false, 'message' => 'noToken');
    }
    else {
        $response=$this->authModel->registerAcount();
    }

    if (isset($response['status']) && $response['status']==='success')
    {
        $body= 'Haga clic en el siguiente enlace para verificar su cuenta:<a href="'.site_url.'/login?v='. $response['token'].'">Verifiar mi cuenta</a>';

        $sendMail=$this->emailController->sendMail($_POST['register_email'],"Verifique su cuenta",$body);
        $response['sendmail']=$sendMail;
    }

    $this->sendJsonResponse($response);  
}



// Función para el validar cuentas
public function validateAcount() {//¿pq aqui no compruebo el csrf?
    if (empty($_POST['vtoken'])) {
       $response = array('success' => false, 'message' => 'invalidToken');
    }else { $response=$this->authModel->validateAcount();}
    $this->sendJsonResponse($response);  
}

// Función para el pedir recuperar la cuenta
public function recoveryAcount()
{    
    if (empty($_POST['recovery_email']) ) {
        $response = array('success' => false, 'message' => 'emptyField');
    }
// Validación del token CSRF 
    else if (($_POST['csrf_token'] != $_SESSION['csrf_token'])) {
        $response = array('success' => false, 'message' => 'noToken');
    }
    else {
        $response=$this->authModel->recoveryAcount();
    }

    if (isset($response['status']) && $response['status']==='success')
    {
        $body= '<p>Hemos recibido una petición para recuperar su cuenta, si ha sido un error puede ignorar este correo electrónico y no pasará nada.</p>
        <p>Haga clic en el siguiente enlace para recuperar su cuenta:<a href="'.site_url.'/login/resetpassword?rp='. $response['token'].'">Recuperar mi cuenta</a></p>';

        $sendMail=$this->emailController->sendMail($_POST['recovery_email'],"Recupere su cuenta",$body);
        $response['sendmail']=$sendMail;
    }


    $this->sendJsonResponse($response);  
}


// Función para el resetear el passw
public function resetPassword()
{

    if (empty($_POST['rpuser_token']))  {
        $response = array('success' => false, 'message' => 'emptyField');
    }
// Validación del token CSRF 
    else if (($_POST['csrf_token'] != $_SESSION['csrf_token'])) {
        $response = array('success' => false, 'message' => 'noToken');
    }
    else {
        $response=$this->authModel->resetPassword();
    }

     

    $this->sendJsonResponse($response);  
}

// Función para hacer login
public function login()
{

     if (empty($_POST['login_email']) || empty($_POST['login_password'])) {
        $response = array('success' => false, 'message' => 'emptyField');
    }
// Validación del token CSRF 
    else if (($_POST['csrf_token'] != $_SESSION['csrf_token'])) {
        $response = array('success' => false, 'message' => 'noToken');
    }
    else {
        $response=$this->authModel->login();
    }
   

    $this->sendJsonResponse($response);  
}



private function sendJsonResponse($response)
{
    header('Content-Type: application/json');
    echo json_encode($response);
}

}

// Manejar la solicitud Ajax
if ($_SERVER['REQUEST_METHOD'] === 'POST') {;
    session_start();
    if (isset($_POST['action'])) {
        $action = $_POST['action'];
        $authController = new AuthController();
// Invocar la acción correspondiente
        switch ($action) {
            case 'registerAcount':
            $authController->registerAcount();
            break;
            case 'validateAcount':
            $authController->validateAcount();
            break;
            case 'recoveryAcount':
            $authController->recoveryAcount();
            break;
            case 'resetPassword':
            $authController->resetPassword();
            break;
            case 'login':
            $authController->login();
            break;
            case 'logout':
            $authController->login();
            break;
 
            default:
// echo json_encode(['error' => 'Acción no válida']);
            break;
        }
    } else {
// echo json_encode(['error' => 'La acción no está definidas']);
    }
}