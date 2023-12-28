// AuthLostPaswword.js
// JS para validar y controlar por ajax las acciones de registro

!(function($) {
  "use strict";

// Inicializamos valores
var toLogin = getNewURL('login')+'/login'// obtener la ruta
$(window).on('load', function() {

});


//recuperar
$('#submit_recovery').on('click', function(event) {
 var form = $('#recovery');
 if (form[0].checkValidity()) {
   recoveryAcount();
 } else {
   event.preventDefault();
   event.stopPropagation();
 }
 form.addClass('was-validated');
});


function recoveryAcount(){
  var alertOptions = {icon: 'error', title:''};
  var formData = $('#recovery').serialize(); // Obtener los datos del formulario
  var email=$('#recovery_email').val();
  showLoader()
  $.ajax({
    type: 'POST',
    url: '../app/controllers/auth/AuthController.php',
    data: formData+ '&action=recoveryAcount',
    dataType: 'json',
    success: function(response) {
    showLoader(false)
      if(response.status == 'success') {
        var swalOptions = {
          icon: 'success',
          title: 'Recupera tu cuenta',
          html: '<p>Hemos enviado un correo electrónico a <strong>'+email+'</strong> con el enlace para recuperar tu cuenta. Si no lo encuentras revisa en tu carpeta de spam.</p>',
        };

        swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
            //location.reload();
            window.location.href = toLogin;// Al login
          }  
        }); 
     } 
     else {
      if (response.message==='notExists') {
        var swalOptions = {
            icon: 'warning',
            title: 'Oops...',
            text: 'Parece que este correo no está registrado.',
          };
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
       showLoader(false)
       alertOptions.title = ajaxError(status, error)
       alertToast(alertOptions);

     }


   });

}




})(jQuery);