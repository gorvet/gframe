!(function($) {
  "use strict";
// Initiate los valores
const alertModal = new bootstrap.Modal('#alertModal')



 $.fn.alertModal = function(status, sms, btn1,txt_btn1, btn2, id_btn2,txt_btn2){

  if (status=='show') {
      $('#alertModal #alert_body').html('<p class="mb-3">'+sms+'</p>')

      if (btn1){//accion cerrar
        $('#alertModal #alert_actions').prepend('<a id="alertClose" class="btn  btn-'+btn1 +' btn-modal" >'+txt_btn1+'</a>')           
      }
      if (btn2) { //accion principal"
        $('#alertModal #alert_actions').prepend('<a id="'+id_btn2+'" class="btn btn-'+btn2 +' btn-modal ms-2" >'+txt_btn2+'</a>')           
      }
      
alertModal.show();
$('#alertClose').on('click', function () {
 alertModal.hide()
  
});
  }

else  {
  alertModal.hide()
}


}

         

 const $alertModal = $('#alertModal');
 $alertModal.on('hidden.bs.modal', event => {
    $('#alertModal #alert_body').html('')//borro
   $('#alertModal #alert_actions').html('')//borro
 })


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
  

 

  

})(jQuery);

