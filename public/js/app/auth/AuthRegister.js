// AuthRegister.js
// JS para validar y controlar por ajax las acciones de registro

!(function($) {
  "use strict";

// Inicializamos valores
var toLogin = getNewURL('login')+'/login'// obtener la ruta

$(window).on('load', function() {
  // Generamos contraseña aleatorea y actualziamos el MeterPassword
  $('#register_password').val(generatePassword());
  updateMeterPassword($("#register_password").val(),$("#register_email").val()); 
});


// Register
$('#submit_register').on('click', function(event) {
  var form = $('#register');
  if (form[0].checkValidity()) {
    registerAcount();
  } else {
    event.preventDefault();
    event.stopPropagation();
  }
  form.addClass('was-validated');
});

function registerAcount(){
  var alertOptions = {icon: 'error', title:''};
  var formData = $('#register').serialize();
  var email = $('#register_email').val();
  showLoader();/* Mostramos un loader hasta que se procese
                  la solocitud que puede estar demorada por el 
                  envío del correo*/

  $.ajax({
    type: 'POST',
    url: '../app/controllers/auth/AuthController.php',
    data: formData + '&action=registerAcount', // Agregar la acción manualmente
    dataType: 'json',
    success: function(response) {
      showLoader(false)
      if(response.status == 'success') {
      
        var swalOptions = {
          icon: 'success',
          title: '¡Por favor revisa tu correo electrónico!',
          html: '<p>Hemos enviado un correo electrónico a <strong>'+email+'</strong> con el enlace para validar tu cuenta. Si no lo encuentras revisa en tu carpeta de spam.</p>',
        };

        swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
            //location.reload();
            window.location.href = toLogin;// Al login
          }  
        }); 
      }
      else { 
        if (response.message==='invalidToken') {
          swalOptions = {
          icon: 'error',
          title: 'Token no válido',
         };
        swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
            //location.reload();
           window.location.href = toLogin;// Al login
          }  
        }); 
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
      showLoader(false)
      alertOptions.title = ajaxError(status, error)
      alertToast(alertOptions);
    }
  });
}

$('#register_password').on('keyup focusout focus', function() {
  updateMeterPassword($("#register_password").val(),$("#register_email").val())
  var extensionValida = passwordValidate($("#register_password").val(),$("#register_email").val());
  if (!extensionValida) {
    this.setCustomValidity('Por favor, contraseña');
  } else {
    this.setCustomValidity('');
  }
})

showPassword('.pswd', '.showPassword')

})(jQuery);


