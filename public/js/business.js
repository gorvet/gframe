 
!(function($) {
  "use strict";
// Initiate los valores
const alertModal = new bootstrap.Modal('#alertModal')
//const actionModal = new bootstrap.Modal('#actionModal')


$(document).ready(function(){
  listBusiness();
  selectShopCategory();
 });

function listBusiness(page) {

 if (!page) {page=1}
 var formData = "page="+page;  
    $.ajax({
      type: 'POST',
       url: 'controllers/BusinessController.php?funcion=listar',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') { 
        creaTabla(response.rows, response.total_pages, response.page, response.site_url)
        
        } 
        else {
            
              if (response.message==='notoken') {
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

function creaTabla(rows,total_pages,page, site_url){

// Obtener el elemento tbody de la tabla
var tbody = $('#all_items tbody');

 // Vaciar el contenido actual de la tabla
 if (rows.length != 0) {tbody.empty();}
  
 
// Iterar sobre cada fila de datos y construir una nueva fila de la tabla
var htmlActions=''
const siteurl=site_url
  $.each(rows, function(index, row, siteurl) { 
    // Crear una nueva fila
    var tr = $('<tr id="'+row.shop_id+'">');
 if (row.name.length>30){
      name=row.name.substring(0,30)
      name += '[...]'
 }

 else {name=row.name}

 const theBusiness_url = site_url+'/'+row.url;
 //const prettyhort_url = theBusiness_url.replace(/^(https?:\/\/)?/, "");
 
var is_active = row.is_active != 0 ? "Activa" : "Desactivada";
var i_active = row.is_active != 0 ? "text-primario" : "";

    // Agregar cada celda de la fila  
    tr.append($('<td>').html('<i class="d-md-none gicon-shutdown me-2 '+i_active+'"></i>'+name)); 
    tr.append($('<td class="theBusiness_url d-none d-md-table-cell">').html('<a id="lcopy_'+row.shop_id+'" target="_blank" theBusiness_url="'+theBusiness_url+'" href="#">'+row.url+'</a>'));//añadir la url del sistema
    tr.append($('<td class="d-none d-md-table-cell">').text(is_active));

    htmlActions='<div class="dropdown">'
    //htmlActions+='<a id="lcopy_'+row.shop_id+'"class="btn btn-tercero me-1" href="#">Copiar URL</a>'
    htmlActions+='<button class="btn btn-tercero dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="gicon-config"></i></button>'
    htmlActions+='<ul class="dropdown-menu ">'
    htmlActions+='<li class="d-md-none d-block"><a id="lcopy_'+row.shop_id+'" class="dropdown-item " target="_blank" theBusiness_url="'+theBusiness_url+'" href="#">Copiar URL</a></li>'

    htmlActions+='<li><a id="details_'+row.shop_id+'"class="dropdown-item"  target="_blank" href="'+theBusiness_url+'">Ver Negocio</a></li>'
    htmlActions+='<li><a id="edit_'+row.shop_id+'"class="dropdown-item" href="#">Editar</a></li>'
    htmlActions+='<li><hr class="dropdown-divider"></li>'
    htmlActions+='<li><a id="del_'+row.shop_id+'"class="dropdown-item text-danger" href="#">Eliminar</a></li>'
    htmlActions+='</ul>'
    htmlActions+='</div>'

    tr.append($('<td class="acciones">').append(htmlActions));

    // Agregar la fila a la tabla
    tbody.append(tr);
  });

 if (total_pages>1) {creaPaginacion(total_pages,page)}


 }
 function creaPaginacion(total_pages,page){

// Obtener el elemento tbody de la tabla
var upbody = $('#all_items_pagination');
 var li=''
 var item=''
upbody.empty()
//primer item
if (page==1) {
li = $('<li class="page-item disabled">')
item='<span class="page-link">Anterior</span>'
}
else{
      li = $('<li class="page-item ">') 
      item='<a class="page-link prev" href="#">Anterior</a>'
}
li.append(item)
upbody.append(li)
 

for (var i = 1; i <= total_pages; i++) {
      
     var li = $('<li>');
//estoy en la misma pagina q el elemento q imprimo
     if (page==i) {
      li = $('<li class="page-item active" aria-current="page">')
      item='<span class="page-link">'+i+'</span>'
      li.append(item)
      upbody.append(li)
     }
     else{
      li = $('<li class="page-item">')
      item='<a class="page-link linkeable" href="#">'+i+'</a>'
      li.append(item)
      upbody.append(li)

     }
}
  
//ultimo item
if (page==total_pages) {
li = $('<li class="page-item disabled">')
item='<span class="page-link">Siguiente</span>'
}
else{
      li = $('<li class="page-item ">') 
      item='<a class="page-link next" href="#">Siguiente</a>'
}
li.append(item)
upbody.append(li)

 }


//Add short link
 $(document).on("click", ".linkeable", function(event){
event.preventDefault();
numPage=$(this).text();
if (!isNaN(numPage)) {
listar_url(numPage)
} 
});


 $(document).on("click", ".next", function(event){
event.preventDefault();
numPage=  parseInt($("#all_links_pagination li.active span.page-link").text())
numPage=numPage+1
listar_url(numPage)
});

 $(document).on("click", ".prev", function(event){
event.preventDefault();
numPage= parseInt($("#all_links_pagination li.active span.page-link").text())
numPage=numPage-1
listar_url(numPage)

});
 
function selectShopCategory() {
    $.ajax({
        type: 'POST',
        url: 'controllers/BusinessController.php?funcion=listBcategory',
        dataType: 'json',
        success: function(data) {
            // Limpiar el elemento <select>
            $('#busines_category').empty();

            // Agregar una opción predeterminada
            $('#busines_category').append($('<option>', {
                value: '',
                text: 'Seleccionar...'
            }));

            // Agregar las opciones del resultado de la solicitud
            $.each(data, function(index, value) {
                // Aquí, debes usar value.category_id y value.name para asignar el valor y el texto de las opciones
                $('#busines_category').append($('<option>', {
                    value: value.category_id,
                    text: value.name
                }));
            });
        },
        error: function(xhr, status, error) {
            // Manejo de errores
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

$('#submit_add_business').on('click', function(event) {
 var form = $('#addBusiness');
   if (form[0].checkValidity()) {
       add_business();
   } else {
       event.preventDefault();
       event.stopPropagation();
   }
   form.addClass('was-validated');
});
$('#busines_category').change(function() {
        var busines_category_val = $(this).val();
        $('#busines_category_val').val(busines_category_val);
    });
function add_business(){
   var formData = $('#addBusiness').serialize(); // Obtener los datos del formulario
     $.ajax({
      type: 'POST',
      url: 'controllers/BusinessController.php?funcion=anadir',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') {
          
           $.fn.generaToast('El registro del negocio fue exitoso','primary-success')
          
          //alertModal.show();
          //$('#alert_body').html('<p class="mb-0">El enlace se ha registrado</p>')
           
        } 
        else {
            if (response.message==='existe') {
          //alertModal.show();
          //$('#alert_body').html('<p class="mb-0">Este <strong>Alias</strong> ya está registrado</p>')
           $.fn.generaToast('La <strong>URL del negocio</strong> no está disponible','danger-subtle')
      
            }
            else if (response.message==='overplan') {
          falertModal("show", "<p><strong>Ops</strong></p><p>Parece que ya alcanzó el límite de negocios para su plan contratado. Puede mejorar su plan haciendo <a class='upgrade' href='#'>clic aquí</a></p>", "primary","Cerrar")
     
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

$(document).on('click', '[id^="lcopy_"]', function() {
      event.preventDefault();
    var fila = $(this).closest("tr");
    var texto = fila.find(".theBusiness_url a").attr("thebusiness_url");
    navigator.clipboard.writeText(texto);
    $.fn.generaToast('Enlace copiado','primary-success')

  });





 
 
$(document).on('click', '[id^="edit_"]', function() {
    event.preventDefault();
    var id= $(this).closest("tr").attr('id')
    var formData = "id="+id;  
    $.ajax({
      type: 'POST',
      url: 'controllers/BusinessController.php?funcion=detalles',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') { 
            
              window.location.replace("business.php");
         } 
        else {
              if (response.message==='notoken') {
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
  

 function falertModal(status, sms, btn1,txt_btn1, btn2, id_btn2,txt_btn2){

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



 







 


})(jQuery);


      