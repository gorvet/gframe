<?php
// AuthModel.php
class AuthModel {




// Manejo de solicitudes de registro
public function registerAcount() {

//Verificación de correo electrónico único
try {
$pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASSWORD);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :register_email");
$stmt->execute(['register_email' => $_POST['register_email']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
if ($user) {
$response = array('success' => false, 'message' => 'userExists');
return $response;
exit;
}
// Agregar nuevo usuario a la base de datos
$options = ['cost' => 12, // el número de rondas de cifrado (cuanto mayor sea, más lento será el cifrado)
];
// Generar token de verificación
$token = bin2hex(random_bytes(32));

$stmt = $pdo->prepare("INSERT INTO users (email, user_password, user_token) VALUES (:register_email, :register_password, :ruser_token)");
$stmt->execute([
'register_email' => $_POST['register_email'],
'register_password' => password_hash($_POST['register_password'],  PASSWORD_BCRYPT, $options),
'ruser_token' => $token,
]);
$user_id = $pdo->lastInsertId();
$stmt = $pdo->prepare("INSERT INTO memberships (user_id) VALUES (:user_id)");
$stmt->execute([
'user_id' => $user_id,
]);

$stmt = $pdo->prepare("SELECT name, start_date, end_date FROM memberships WHERE user_id = :user_id");
$stmt->execute(['user_id' => $user_id]);
$membership_data = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $pdo->prepare("INSERT INTO membership_history (user_id, membership_type, start_date, end_date, cost) VALUES (:user_id, :membership_type, :start_date, :end_date, :cost)");
$stmt->execute([
'user_id' => $user_id,
'membership_type' => $membership_data['name'],
'start_date' => $membership_data['start_date'],
'end_date' => $membership_data['end_date'],
'cost' => 0, 
]);

$response = array('status' => 'success', 'message' => 'registerOk','token' => $token);
}
catch (PDOException $e) {
$response = array('status' => 'error', 'message' => $e->getCode());
}
$pdo = null;
return $response;     
}


// Manejo de solicitudes de validación
public function validateAcount() {
try {
$pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASSWORD);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $pdo->prepare("SELECT * FROM users WHERE user_token = :vtoken");
$stmt->execute(['vtoken' => $_POST['vtoken']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
if ($user) {
$user_id = $user['user_id']; // Almacena el ID del usuario        // Generar nuevo token de verificación
$token = bin2hex(random_bytes(32));
$stmt = $pdo->prepare("UPDATE users SET user_status= :user_status, user_token= :user_token WHERE user_id = :user_id ");
$stmt->execute([
'user_status' => 'verify',
'user_token' => $token,
'user_id' => $user_id
]);
$response = array('status' => 'success', 'message' => 'userVerify');
}
else{
$response = array('success' => false, 'message' => 'invalidToken');
} 
}
catch (PDOException $e) {
$response = array('status' => 'error', 'message' => $e->getCode());
}
$pdo = null;
return $response;          
}

//Manejo de solicitudes de recuperacion 
function recoveryAcount() {

try {
$pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASSWORD);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $pdo->prepare("SELECT user_token FROM users WHERE email = :recovery_email");
$stmt->execute(['recovery_email' => $_POST['recovery_email']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
$token = $user['user_token'];
$response = array('status' => 'success','token' => $token);
}
else{
$response = array('success' => false, 'message' => 'notExists');
}
}
catch (PDOException $e) {
$response = array('status' => 'error', 'message' => $e->getCode());
}
$pdo = null;
return $response;     
}

//Manejo de solicitudes de resetear contraseña
function resetPassword() {
try {
$pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASSWORD);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $pdo->prepare("SELECT * FROM users WHERE user_token = :user_token");
$stmt->execute(['user_token' => $_POST['rpuser_token']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
if ($user) { 
$options = ['cost' => 12,];
$user_id = $user['user_id'];
$token = bin2hex(random_bytes(32));
$newpassword  =  password_hash($_POST['reset_password'],  PASSWORD_BCRYPT, $options);
$stmt = $pdo->prepare("UPDATE users SET user_password= :user_password, user_token= :user_token WHERE user_id = :user_id ");
$stmt->execute([
'user_id'=> $user_id,
'user_password' => $newpassword,
'user_token' => $token

]);
$response = array('status' => 'success', 'message' => 'okReset');

}
else{

$response = array('success' => false, 'message' => 'invalidToken');
}
}
catch (PDOException $e) {
$response = array('status' => 'error', 'message' => $e->getCode());
}

$pdo = null;
return $response;       
} 


// Manejo de solicitudes de login
function login(){
    try {
     $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASSWORD);
     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :login_email");
     $stmt->execute(['login_email' => $_POST['login_email']]);
     $user = $stmt->fetch(PDO::FETCH_ASSOC);
     if (!$user || !password_verify($_POST['login_password'], $user['user_password'])) {
       $response = array('success' => false, 'message' => 'invalidUser');  
    }
  
    else{
        if ($user['user_status']==='unverify') {
       $response = array('success' => false, 'message' => 'unverifyAcount');
        }
        elseif ($user['user_status']==='suspended') {
       $response = array('success' => false, 'message' => 'suspendedAcount');
        }
        else{
          $response = array('status' => 'success');
          // Establecimiento de sesión de usuario
          $_SESSION['userID'] = $user['user_id'];
          $_SESSION['userEmail'] = $user['email'];
          $_SESSION['userRole'] = $user['user_role'];
          $_SESSION['lastActivity'] = time();
          //$_SESSION['csrf_timestamp'] = time();//establezco una marca de tiempo
        }
    }
 
  }
    catch (PDOException $e) {
    $response = array('status' => 'error', 'message' => $e->getCode());
     
    }
$pdo = null;
return $response;   
}




/*fin de la clase*/
}
