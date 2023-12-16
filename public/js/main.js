 
!(function($) {
  "use strict";
// Initiate los valores
const alertModal = new bootstrap.Modal('#alertModal')
const actionModal = new bootstrap.Modal('#actionModal')





//manejar q template template_part voy a mostrar de acuerdo a lo último q se mostró
$(document).ready(function(){

  if (localStorage.getItem('template_part')) {
    $("#main").load(localStorage.getItem('template_part'))
  }
  else {
    $("#main").load("views/link/index.php", function() {
      localStorage.setItem("template_part", "views/link/index.php");
    });
  }
 
});



 
/*sidebar*/

/*corrección de los iconos del sidebar*/
$("#sidebar-nav .nav-item").click(function() {
    // Cambiar el ícono de flecha al hacer clic en el elemento padre correspondiente
  $(this).find(".gicon-fd").toggleClass("gicon-fu");
    // Cambiar el ícono de los elementos hermanos correspondientes
  $(this).siblings().find(".gicon-fu").removeClass("gicon-fu").addClass("gicon-fd");


  });




/*Enalces del sidebar*/

/*cargar el listar de links*/
 $("#all_link").click(function(event) {
    event.preventDefault();
    $("#main").load("views/link/index.php", function() {
    
    localStorage.setItem("template_part", "views/link/index.php");
  });
    
});


/*cargar el agregar links*/
 
  $("#nav_new_short").click(function(event) {
    event.preventDefault();
    $("#main").load("views/link/add.php", function() {
     localStorage.setItem("template_part", "views/link/add.php");}
     );
})

















//logout
$('#logout').on('click', function(event) {
event.preventDefault();
logout() 
})

function logout(){
    $.ajax({
      type: 'POST',
      url: 'controllers/AuthController.php?funcion=logout',
      data: '',
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') {
           var newUrl = window.location.origin + window.location.pathname.replace('/app/index.php', '');
           window.location.replace(newUrl);
        } 
        else {
          
         }
      },
     error: function(xhr, status, error) {
          if (status == 'timeout') {
          alert('La solicitud ha tardado demasiado en responder.');
        } else if (status == 'error') {
          alert('Se ha producido un error en la solicitud: ' + error);
        } else if (status == 'abort') {
          alert('La solicitud ha sido cancelada.'+ error);
        } else if (status == 'parsererror') {
          alert('No se puede analizar la respuesta JSON.');
        } else {
          alert('Ha ocurrido un error desconocido: ' + error);
        }

      }
  

    });

}



/*funciones globales*/
/*generar notificaciones toast*/
$.fn.generaToast = function(msg, type) {
 
     
var toast='<div class="toast align-items-center bg-'+type+' border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000"><div class="d-flex"><div class="toast-body">';
      toast+=msg
       toast+='</div><button type="button" class="btn-close abtn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div>'

 var $toast = $(toast);
  
  $('#alertToast').append($toast);
  $toast.toast('show');
$toast.on('hidden.bs.toast', function() {
   $toast.remove();
 
  });
     
};
  

 $.fn.alertModal= function(status, sms, btn1,txt_btn1, btn2, id_btn2,txt_btn2){

  if (status=='show') {
      $('#alertModal #alert_body').html('<p class="mb-3">'+sms+'</p>')

      if (btn1){//accion cerrar
        $('#alertModal #alert_actions').prepend('<a class="btn btn-'+btn1 +' btn-modal" data-bs-dismiss="modal">'+txt_btn1+'</a>')           
      }
      if (btn2) { //accion principal
        $('#alertModal #alert_actions').prepend('<a id="'+id_btn2+'" class="btn btn-'+btn2 +' btn-modal ms-2" >'+txt_btn2+'</a>')           
      }
      
alertModal.show();
  }

else if (status=='hide') {
  alertModal.hide()
}


}
const $alertModal = $('#alertModal');
$alertModal.on('hidden.bs.modal', event => {
   $('#alertModal #alert_body').html('')//borro
  $('#alertModal #alert_actions').html('')//borro
})



$.fn.actionModal= function(status, sms, btn1,txt_btn1, btn2, id_btn2,txt_btn2){

  if (status=='show') {
      $('#actionModal #alert_body').html('<p class="mb-3">'+sms+'</p>')

      if (btn1){//accion cerrar
        $('#actionModal #alert_actions').prepend('<a class="btn btn-'+btn1 +' btn-modal" data-bs-dismiss="modal">'+txt_btn1+'</a>')           
      }
      if (btn2) { //accion principal
        $('#actionModal #alert_actions').prepend('<a id="'+id_btn2+'" class="btn btn-'+btn2 +' btn-modal ms-2" >'+txt_btn2+'</a>')           
      }
      
actionModal.show();
  }

else if (status=='hide') {
  actionModal.hide()
}


}
const $actionModal = $('#actionModal');
$actionModal.on('hidden.bs.modal', event => {
   $('#actionModal #alert_body').html('')//borro
  $('#actionModal #alert_actions').html('')//borro
 
})








 // control de pestaña abierta con sesion terminada    
 $.fn.toLogin= function (){
   window.location.replace("../login.php");
}
 
// control de inactividad
 
 setInterval(function() { 
    $.ajax({
     type: 'POST',
     url: 'controllers/AuthController.php?funcion=checkssesion',
     dataType: 'json',
        success: function(response) {
            if (response == 'expired') {
         $.fn.toLogin()
             }
            },
     error: function(xhr, status, error) {
          if (status == 'timeout') {
          alert('La solicitud ha tardado demasiado en responder.');
        } else if (status == 'error') {
          alert('Se ha producido un error en la solicitud: ' + error);
        } else if (status == 'abort') {
          alert('La solicitud ha sido cancelada.'+ error);
        } else if (status == 'parsererror') {
          alert('No se puede analizar la respuesta JSON.');
        } else {
          alert('Ha ocurrido un error desconocido: ' + error);
        }

      
        }
    });
 }, 1801 * 1000);

 


})(jQuery);


      