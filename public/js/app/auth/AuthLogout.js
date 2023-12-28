// AuthLogout.js
// JS gestionar el logout, 
// este js debe estar cargdo desde metas conttoller ya q se usará
// en todo el proyecto

!(function($) {
  "use strict";

// Inicializamos valores
var toLogin = getNewURL('login')+'/login'// obtener la ruta

//logout
$('#logout').on('click', function(event) {
  event.preventDefault();
    var swalOptions = {
          icon: 'warning',
          title: '¿Seguro que desea salir?',
          confirmButtonText:'Sí, deseo salir',
          cancelButtonText:'No, regresar',
          showCancelButton: true,

         };
        swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
           logout() 
          }  
        });
 })

function logout(){
  var alertOptions;
  alertOptions = {icon: 'error', title: ''};
  $.ajax({
    type: 'POST',
    url: 'app/controllers/auth/AuthController.php',
    data: 'action=logout',
    dataType: 'json',
    success: function(response) {
      if(response.status == 'success') {
       window.location.href = toLogin; 
       } 
     else {
      }
   },
   error: function(xhr, status, error) {
      alertOptions.title = ajaxError(status, error)
      alertToast(alertOptions);
  }
});
}

// control de inactividad
setInterval(function() { 
  var alertOptions;
  alertOptions = {icon: 'error', title: ''};
  $.ajax({
   type: 'POST',
   url: 'app/controllers/auth/AuthController.php',
   data: 'action=checkSesion',
   dataType: 'json',
   success: function(response) {
    if (response == 'expired') {

         var swalOptions = {
          icon: 'info',
          title: 'Su sesión se ha cerrado por inactividad',
          confirmButtonText:'Acceder',
          allowOutsideClick: false,
         };
        swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {      
            window.location.href = toLogin; 
          }  
        });

   }
 },
 error: function(xhr, status, error) {
   alertOptions.title = ajaxError(status, error)
      //alertToast(alertOptions);
      console.log(ajaxError(status, error))
}
});
}, 1800 * 1000);




})(jQuery);


