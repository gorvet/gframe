<?php
// app/controllers/EmailController.php
// Controlador para el envío de correos

require_once realpath(__DIR__ . "/../../core/Config.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once realpath( __DIR__ . "/../../public/vendor/PHPMailer/src/Exception.php");
require_once realpath( __DIR__ . "/../../public/vendor/PHPMailer/src/PHPMailer.php");
require_once realpath( __DIR__ . "/../../public/vendor/PHPMailer/src/SMTP.php");


class EmailController
{
    private $mailer;

public function __construct()
{
    $this->mailer = new PHPMailer(TRUE);
    //$this->mailer->SMTPDebug = 2;
    $this->mailer->CharSet = 'UTF-8'; 
    $this->mailer->Encoding = 'base64';
    $this->mailer->isSMTP();
    $this->mailer->SMTPAuth = true;

    // Datos del servidor y usuario
    $this->mailer->Host = M_Host;
    $this->mailer->Port = M_Port;
    $this->mailer->Username = M_Username;
    $this->mailer->Password = M_Password;
    $this->mailer->SMTPSecure = M_Secure;
    $this->mailer->Timeout = 60; 

    // Remitente
    $this->mailer->setFrom(M_From, M_Name);
    $this->mailer->isHTML(true);

    //$this->mailer->AltBody = 'El texto como elemento de texto simple';
}

public function sendMail($address, $subject,$body )
{
     try {
        $this->mailer->addAddress($address, '');
        $this->mailer->Subject = $subject;
        $this->mailer->Body = $body;
        $this->mailer->send(); 
        return 'okMailSend';
    } catch (Exception $e) {
        return 'noMailSend';
        //echo '2Error al enviar el correo: ' . $e->getMessage();
    }
        
}

}