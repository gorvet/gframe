
!(function($) {
  "use strict";
 
 const editModal = new bootstrap.Modal('#editModal')//el edit de los link cortos


//el boton de nuevo link en el listar
  $(document).on("click", "#new_short", function(event){
    event.preventDefault();
    $("#main").load("views/link/add.php", function() {
     localStorage.setItem("template_part", "views/link/add.php");}
     );
   

});


 

 /*funcionalidad de añadir link*/

//boton de añadir en el formulario
 $(document).on("click", "#add_url_short", function(event){
   var form = $('#addLink');
   if (form[0].checkValidity()) {
       addLink();
   } else {
       event.preventDefault();
       event.stopPropagation();
   }
   form.addClass('was-validated');
});



 function addLink(){
  var formData = $('#addLink').serialize(); // Obtener los datos del formulario
    $.ajax({
      type: 'POST',
      url: 'controllers/LinkController.php?funcion=add',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') {
           $('#original_url').val('');
           $('#url_alias').val(generarShortHash());
           $.fn.generaToast('El registro del enlace fue exitoso','primary-success')
          
          //alertModal.show();
          //$('#alert_body').html('<p class="mb-0">El enlace se ha registrado</p>')
           
        } 
        else {
            if (response.message==='existe') {
          //alertModal.show();
          //$('#alert_body').html('<p class="mb-0">Este <strong>Alias</strong> ya está registrado</p>')
           $.fn.generaToast('Este <strong>Alias</strong> ya está registrado','danger-subtle')
      
            }
            else if (response.message==='notoken') {
               window.location.replace("../403.php");
            }
            else if (response.message==='tologin') {
               window.location.replace("../login.php");
            }
            else if (response.message==1045) {
              window.location.replace("../503.php");
            }
         }
      },
     error: function(xhr, status, error) {
          if (status == 'timeout') {
          alert('La solicitud ha tardado demasiado en responder.');
        } else if (status == 'error') {
          alert('Se ha producido un error en la solicitud: ' + error);
        } else if (status == 'abort') {
          alert('La solicitud ha sido cancelada.');
        } else if (status == 'parsererror') {
          alert('No se puede analizar la respuesta JSON.');
        } else {
          alert('Ha ocurrido un error desconocido: ' + error);
        }

      }
  

    });

}



/*funcionalidad de eliminar link*/

// Agregar un controlador de eventos al botón de eliminar
$(document).on('click', '[id^="del_"]', function() {
   event.preventDefault();
  // Obtener el ID del elemento que se va a eliminar
  var id = $(this).attr('id').substring(4);

  $.fn.actionModal('show', '¿Seguro que quiere eliminar este enlace?', 'secondary','cancelar', 'danger', 'delc_'+id,'Eliminar')
  
})


$(document).on('click', '[id^="delc_"]', function() {
   event.preventDefault();
  // Obtener el ID del elemento que se va a eliminar
  var id = $(this).attr('id').substring(5);
  var ecsrf_token= $('#actionModal #csrf_token').val()
  var ecsrf_timestamp= $('#actionModal #csrf_timestamp').val() 

 delLink(id,ecsrf_token,ecsrf_timestamp)
})

 function delLink(id,ecsrf_token,ecsrf_timestamp){
    $.ajax({
      type: 'POST',
      url: 'controllers/LinkController.php?funcion=borrar',
      data: { link_id: id,csrf_token: ecsrf_token,csrf_timestamp: ecsrf_timestamp},
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') {
          $('#' + id).closest('tr').remove();
           $.fn.generaToast('Enlace eliminado','primary-success')
           $.fn.actionModal('hide')

          if ($('#all_links tbody').children().length === 0) {
            $('#all_links tbody').html('<tr><td>No tienes enlaces creados</td><td></td><td></td><td></td></tr>')
           }
        } 
        else {
          
              if (response.message==='notoken') {
               //window.location.replace("../403.php");
            }
              if (response.message==='noyour') {
               //window.location.replace("../403.php");
            }
             else if (response.message==='tologin') {
              // window.location.replace("../login.php");
            }
            else if (response.message==1045) {
              //window.location.replace("../503.php");
            }
         }
      },
     error: function(xhr, status, error) {
          if (status == 'timeout') {
          alert('La solicitud ha tardado demasiado en responder.');
        } else if (status == 'error') {
          alert('Se ha producido un error en la solicitud: ' + error);
        } else if (status == 'abort') {
          alert('La solicitud ha sido cancelada.');
        } else if (status == 'parsererror') {
          alert('No se puede analizar la respuesta JSON.');
        } else {
          alert('Ha ocurrido un error desconocido: ' + error);
        }

      }
   });
}


/*funcinonalidad de editar link*/
$(document).on('click', '[id^="edit_"]', function() {
   event.preventDefault();
  // Obtener el ID del elemento que se va a eliminar
  var id = $(this).attr('id').substring(5);
   // Seleccionar los elementos td y a de la fila correspondiente
  var short_url_href = $(this).closest('tr').find('.short_url a').attr("href");
  var short_url_text = $(this).closest('tr').find('.short_url a').text();
  var short_url_hash = short_url_text.split('/').pop(); // El último elemento después de dividir la cadena por /
  const parts = short_url_text.split('/');
  var site_url = parts.slice(0, -1).join('/');
  site_url += '/';
 $("#edestino").text(short_url_href);
 $("#eurl_alias").val(short_url_hash);
 $("#ecurl_alias").val(short_url_hash);
 $("#site_url").text(site_url);
 $("#ecurl_id").val(id);
 editModal.show();
})

$(document).on('input', '#eurl_alias', function() { 

   if ($('#eurl_alias').val().toLowerCase()!=$('#ecurl_alias').val().toLowerCase()) {
      $('#editLink_guardar').removeClass("disabled")
   }
   else{ $('#editLink_guardar').addClass("disabled")}

})
$('#editLink').on('submit', function(event) {
  event.preventDefault();
//evitar un submit
});

$(document).on('click', '#editLink_guardar', function() {
   event.preventDefault();
   editLink()
})

 function editLink(){
  var formData = $('#editLink').serialize(); // Obtener los datos del formulario
    $.ajax({
      type: 'POST',
      url: 'controllers/LinkController.php?funcion=editar',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') {
           $('#original_url').val('');
           $('#url_alias').val(generarShortHash());
          
            editUpdateLink()

           editModal.hide();



           $.fn.generaToast('Enlace actualizado','primary-success')
          
           
        } 
        else {
            if (response.message==='existe') {
          //alertModal.show();
          //$('#alert_body').html('<p class="mb-0">Este <strong>Alias</strong> ya está registrado</p>')
           $.fn.generaToast('Este <strong>Alias</strong> ya está registrado','danger-subtle')
      
            }
            else if (response.message==='notoken') {
               window.location.replace("../403.php");
            }
            else if (response.message==='tologin') {
               window.location.replace("../login.php");
            }
            else if (response.message==1045) {
              window.location.replace("../503.php");
            }
         }
      },
     error: function(xhr, status, error) {
          if (status == 'timeout') {
          alert('La solicitud ha tardado demasiado en responder.');
        } else if (status == 'error') {
          alert('Se ha producido un error en la solicitud: ' + error);
        } else if (status == 'abort') {
          alert('La solicitud ha sido cancelada.');
        } else if (status == 'parsererror') {
          alert('No se puede analizar la respuesta JSON.');
        } else {
          alert('Ha ocurrido un error desconocido: ' + error);
        }

      }
  

    });

}

/*actualizo el link luego de ser editado*/
function editUpdateLink(){
   
  
  var id= $("#ecurl_id").val()
  var eurl_alias= $("#eurl_alias").val()
  var url= $('#'+id).closest('tr').find('.short_url a').attr("theshort_url")
  const parts = url.split('/');
  var site_url = parts.slice(0, -1).join('/');
  site_url += '/';
  var site_url_text = parts.slice(2, -1).join('/');
  site_url_text += '/';
  $('#'+id).closest('tr').find('.short_url a').attr("theshort_url", site_url+eurl_alias)
  $('#'+id).closest('tr').find('.short_url a').text(site_url_text+eurl_alias)

}


/*funcionalidad de ver link*/

// Agregar un controlador de eventos al botón de detalles
$(document).on('click', '[id^="details_"]', function() { 
   event.preventDefault();
  // Obtener el ID del elemento que se va a ver
  var id = $(this).attr('id').substring(8);
  alert(id)


  //$.fn.fmodal('show', '¿Seguro que quiere eliminar este enlace?', 'secondary','cancelar', 'danger', 'delc_'+id,'Eliminar')
  
})


function generarShortHash() {
  var comun = "abcdefghijklmnopqrstuvwxyz";
  var maynum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var shortHash = "";
  for (var i = 0; i < 3; i++) {
    var caractercomun = comun.charAt(Math.floor(Math.random() * comun.length));
    var caractermaynum = maynum.charAt(Math.floor(Math.random() * maynum.length));
    shortHash += caractercomun + caractermaynum;
  }
  return shortHash;
}

     




})(jQuery);


      