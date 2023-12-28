// AuthLogin.js
// JS gestionar el login, la validación de cuenta 
// y recuperacion de contraseña

!(function($) {
  "use strict";

// Inicializamos valores
var toAdmin = getNewURL('login')+'/admin'// obtener la ruta

 
//Login
$('#submit_login').on('click', function(event) {
 var form = $('#login');
   if (form[0].checkValidity()) {
       login();
   } else {
       event.preventDefault();
       event.stopPropagation();
   }
   form.addClass('was-validated');
});

 
function login(){
  var alertOptions, swalOptions;
  alertOptions = swalOptions = {icon: 'error', title: ''};
  var formData = $('#login').serialize(); // Obtener los datos del formulario
 
   $.ajax({
    type: 'POST',
    url: 'app/controllers/auth/AuthController.php',
    data: formData+'&action=login',
    dataType: 'json',
    success: function(response) {
      if(response.status == 'success') {
        window.location.href = toAdmin;  
      } 
      else {
        if (response.message==='invalidUser') {
          swalOptions.title = 'Usuario o contraseña incorrecta.';
        swalAlert(swalOptions)
        }
          else if (response.message==='suspendedAcount') {
            swalOptions.title = 'Su cuenta ha sido suspendida.';
            swalAlert(swalOptions)
            }
           else if (response.message==='unverifyAcount') {
            swalOptions.title = 'Cuenta sin verificar';
            swalOptions.html = 'No haz verificado tu cuenta(ampliar a revisa el correo o pide uno nuevo.';
            swalAlert(swalOptions)
            }
        else if (response.message==='noToken') {toErrorView('403')}
        else if (response.message==1045) {toErrorView('503')}
        else{
          alertOptions.title = 'Ha ocurrido un error al intentar conectar con la base de datos.';
          alertToast(alertOptions);
        }
      }
    },
    error: function(xhr, status, error) {
      alertOptions.title = ajaxError(status, error)
      alertToast(alertOptions);
    }
  });
}

showPassword('.pswd', '.showPassword')

})(jQuery);