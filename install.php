<?php 
//instal.php
// Este instalador es un asistente failitador para crear las configuraciones necesarias del frame y tu proyecto. Con el que se creará el archivo config.php y la estructura principal de la base de datos. No es necesario, pero queda chulo :p
?>

<!DOCTYPE html>
<html  lang="es">
<head>
	<meta charset="utf-8">
	<meta content="width=device-width, initial-scale=1.0" name="viewport">
	<meta name="robots" content="noindex,nofollow">
	<title>G-Frame › Instalación.</title>


	<!-- Favicons -->
	<link href="public/img/favicon.png" rel="icon">
	<link href="public/img/apple-touch-icon.png" rel="apple-touch-icon">

	<!-- Vendor CSS Files -->
	<link href="public/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link href="public/vendor/sweetalert2/sweetTheme.css" rel="stylesheet">

	<link href="public/vendor/sweetalert2/sweetalert2.min.css" rel="stylesheet">
	<link href="public/vendor/passwordUtils/passwordUtils.css" rel="stylesheet">



	<!-- Template Main CSS File -->
	<link href="public/css/common.css" rel="stylesheet">
	<link href="public/css/install/install.css" rel="stylesheet">
</head>
<body class="h-100"  >
	<main  class="py-5">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-12 col-lg-8 d-flex justify-content-center pb-3">
					<img src="public/img/logo.png" class="img-fluid install-logo">
				</div>
			</div>
			<div class="row justify-content-center">
				
				<div id="step1" class="col-12 col-lg-8">
					<div class="install-card card">
						<p>¡Hola y bienvenido a <strong>G-Frame</strong>! Antes de empezar necesitarás algunos datos para crear el archivo de configuración <code>config.php</code>.</p>
						<ol class="mb-3">
							<li>Nombre de la base de datos</li>
							<li>Usuario de la base de datos</li>
							<li>Contraseña de la base de datos</li>
							<li>Servidor de la base de datos</li>
						</ol>
						<p><strong>No te preocupes si por alguna razón no funciona la creación automática de este archivo. Este archivo solo contiene la información para conectarse a la base de datos y a tu servidor de envío de correos; puedes crearlo manualmente. Simplemente abre el archivo <code>core/config-sample.php</code> en un editor de texto, completa la información y guárdalo como <code>config.php</code>.</strong></p>
						<p>Normalmente, tu proveedor de alojamiento web te proporcionará estos datos. Si no los tienes, deberás contactarlos antes de continuar. ¿Listo para comenzar?</p>
						<button id="iNext1" class="btn btn-primary  ms-auto d-block" >¡Empecemos!</button>
					</div>
				</div>

				<div id="step2" class="col-12 col-lg-8 d-none">
					<div class="install-card card">
						<p>¡Ahora toca introducir los detalles de tu conexión con la base de datos! Si no estás seguro de ellos, ponte en contacto con tu proveedor de alojamiento.</p>
						<form id="dbDatas" class="needs-validation " novalidate>
							<div class="row">
								<label class="form-label" for="dbName">Nombre de la base de datos</label>
								<div class="mb-0 col-12 col-lg-6">
									<input class="form-control" type="texto" name="dbName"   id="dbName" value="gframe" autocomplete="off" autofocus required>
								</div>
								<div class="mb-0 col-12 col-lg-6">
									<p>El nombre de la base de datos que quieres usar con G-Frame.</p>
								</div>
							</div>
							<div class="row">
								<label class="form-label" for="dbUser">Nombre de usuario</label>
								<div class="mb-0 col-12 col-lg-6">
									<input class="form-control" type="text" name="dbUser"   id="dbUser" value="root" autocomplete="off" required>
								</div>
								<div class="mb-0 col-12 col-lg-6">
									<p>El nombre de usuario de tu base de datos.</p>
								</div>
							</div>
							<div class="row">
								<label class="form-label" for="dbPass">Contraseña</label>
								<div class="mb-0 col-12 col-lg-6">
									<input class="form-control" type="text" name="dbPass"   id="dbPass" value="" autocomplete="off">
								</div>
								<div class="mb-0 col-12 col-lg-6">
									<p>La contraseña de tu base de datos.</p>
								</div>
							</div>
							<div class="row">
								<label class="form-label" for="dbServer">Servidor de la base de datos</label>
								<div class="mb-0 col-12 col-lg-6">
									<input class="form-control" type="text" name="dbServer"   id="dbServer"  value="localhost" autocomplete="off" required >
								</div>
								<div class="mb-0 col-6">
									<p> Si localhost no funciona, deberías poder obtener esta información de tu proveedor de alojamiento web.</p>
								</div>
							</div>
						</form>
						<button id="iNext2" class="btn btn-primary  ms-auto d-block" >Enviar</button>
					</div> 
				</div>
				<!-- los pasos 3 y 4 eran notificaciones, pasaron a ser alertas en lugar de pasos en el asistente de instalación. -->
				<div id="step5" class="col-12 col-lg-8   d-none">
					<div class="install-card card">
						<p>¡Muy bien! Ya casi terminamos. Ahora <strong>G-Frame</strong> puede comunicarse con tu base de datos y estamos listos para finalizar.</p>
						<p>Por favor, proporciona la siguiente información para crear tu perfil de Administrador.</p>
						<form method="post" id="uData" class="needs-validation " novalidate>
							<div class="row">
								<label class="form-label" for="uMail">Tu correo electrónico</label>
								<div class="mb-0 col-12 col-lg-6">
									<input class="form-control " type="email" name="uMail" required id="uMail" value="" autocomplete="off" placeholder="juank@yourdomain.com" autofocus pattern="^[a-z0-9_\-.]+@[a-z0-9_\-.]+\.[a-z]{2,3}$">
								</div>
								<div class="mb-0 col-12 col-lg-6">
									<p>Comprueba bien tu dirección de correo electrónico antes de continuar.</p>
								</div>
							</div>
							<div class="row">
								<label class="form-label" for="uPass">Contraseña</label>
								<div class="mb-0 col-12 col-lg-6 ">
									<div class="input-group">
										<input class="form-control pswd" type="text" name="uPass" required id="uPass" value="" autocomplete="off">
										<span class="showPassword input-group-text">Ocultar</span>
									</div>
									<div class="passwordMeter"></div>
								</div>
								<div class="mb-0 col-12 col-lg-6">
									<p>No uses parte de tu correo en la contraseña e incluye al menos una letra mayúscula, un número y símbolos</p>
									<p><strong>Importante:</strong> Necesitas esta contraseña para acceder. Por favor, guárdala en un lugar seguro.</p>
								</div>
							</div>
						</form>
						<button  id="iNext5"  class="btn btn-primary  ms-auto d-block" >Finalizar la instalación</button>
					</div>
				</div>
				<!-- los pasos 6, 7, 8, 9 y 10 eran notificaciones, pasaron a ser alertas en lugar de pasos en el asistente de instalación. -->			
			</div>
		</div>
	</main>


	<!-- Vendor JS Files -->
	<script src="public/vendor/jquery/jquery.min.js"></script>
	<script src="public/vendor/bootstrap/js/bootstrap.bundle.js"></script>

	<!-- Template Main JS File -->
	<script src="public/vendor/sweetalert2/sweetalert2.all.min.js"></script> 
	<script src="public/vendor/passwordUtils/passwordUtils.js"></script> 
	<script src="public/js/utils/utils.js"></script> 
	<script src="public/js/utils/alertToast.js"></script> 
	<script src="public/js/install/install.js"></script> 
</body>
</html>