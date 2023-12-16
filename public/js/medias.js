!(function($) {
  "use strict";
const editMediaModal = new bootstrap.Modal('#editMediaModal')

$(document).ready(function(){
   listMedias();
 });


 // Agregar eventos para el arrastrar y soltar
$('#drop-zone').on('dragover', function (e) {
    e.preventDefault();
$(this).addClass('dragover');
});
 $('#drop-zone').on('dragleave', function () {
    $(this).removeClass('dragover');
});
$('#drop-zone').on('drop', function (e) {
    e.preventDefault();
    $(this).removeClass('dragover');
    addFiles(e.originalEvent.dataTransfer.files);
});

// Agregar evento para el botón "Seleccionar Archivo"
$('#select-button').on('click', function () {
    $('#file-input').click();
});
 // Agregar evento cuando se selecciona un archivo
$('#file-input').on('change', function () {
addFiles($(this)[0].files);
});

// Función para manejar los archivos seleccionados
function addFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
            if (file.type.match('image/jpeg') || file.type.match('image/png')) {
                if (file.size <= 1024 * 1024) { // 1 MB en bytes
                    // Crear objeto FormData para enviar el archivo al servidor
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('csrf_token', $('#csrf_token').val());
                    formData.append('csrf_timestamp', $('#csrf_timestamp').val());

                    // Enviar el archivo al servidor usando AJAX con jQuery
                     $.ajax({
                         url: 'controllers/MediaController.php?funcion=anadir',
                         type: 'POST',
                         data: formData,
                         contentType: false,
                         processData: false,
                         success: function (response) {
                           if(response.status == 'success') {
                            listMedias()
                            $.fn.generaToast('El archivo <strong>'+file.name+'</strong> se ha guardado','primary-success')
                           }
                             else {

            if (response.message==='notyou') {
             $.fn.alertModal("show", "<p>No tiene permisos para administrar este negocio.</p>", "primary","Cerrar")
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
                else {
                     $.fn.generaToast('<p>El archivo ' + file.name + ' es demasiado grande. Máximo 1 MB permitido.</p>','danger-subtle')
                      }
            } 
            else {
            
             $.fn.alertModal("show", "<p>Formato de archivo no válido. Solo se permiten archivos JPG y PNG.</p>", "primary","Cerrar")

            
            }
        }
    }
}
function listMedias(page) {
 
 if (!page) {page=1}
 var formData = "page="+page;  
    $.ajax({
      type: 'POST',
       url: 'controllers/MediaController.php?funcion=listar',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') { 
        creaListado(response.rows, response.total_pages, response.page, response.site_url)
        
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

function creaListado(rows,total_pages,page, site_url){

// Obtener el elemento tbody de la tabla
var tbody = $('#all_medias');
 // Vaciar el contenido actual de la tabla
 if (rows.length != 0) {tbody.empty();}
  
 
// Iterar sobre cada fila de datos y construir una nueva fila de la tabla
var htmlActions=''
const siteurl=site_url
  $.each(rows, function(index, row, siteurl) { 
    var media_url=row.media_url
    var thumbnail_url= getURLtamanio(media_url, "medium")
    thumbnail_url = site_url+'/'+thumbnail_url;
    var col = $('<div id="'+row.media_id+'" class="  col-6 col-md-3">');
 


 

    // Agregar cada celda de la fila  
    col.append($('<div class="thumbnail mb-3"><img class="img-fluid" id="imgID_'+row.media_id+'" src="'+thumbnail_url+'"></div>')) 
  
    

    // Agregar la fila a la tabla
    tbody.append(col);
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
var numPage=$(this).text();
if (!isNaN(numPage)) {
listMedias(numPage)
} 
});


 $(document).on("click", ".next", function(event){
event.preventDefault();
var numPage = $("#all_items_pagination li.active span.page-link").text()
numPage=parseInt(numPage)
numPage=numPage+1
listMedias(numPage)
});

 $(document).on("click", ".prev", function(event){
event.preventDefault();
var numPage = $("#all_items_pagination li.active span.page-link").text()
numPage=parseInt(numPage)
numPage=numPage-1
listMedias(numPage)

});
 
 
 

/*funcinonalidad de editar link*/
$(document).on('click', '[id^="imgID_"]', function() {
   event.preventDefault();
  var id = $(this).attr('id').substring(6);
  $("#media_id").val(id);
    getOneMedia()
  
})


function getOneMedia() {
 
 var formData = $('#editMedia').serialize() 
     $.ajax({
      type: 'POST',
       url: 'controllers/MediaController.php?funcion=getone',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') { 
     
   $("#upload_date").text(response.date_created);
   $("#file_weight").text(response.file_weight);
   $("#file_size").text(response.file_size);
   $("#img_details").attr('src', response.site_url+'/'+response.media.media_url);
   $("#img_url").text(response.site_url+'/'+response.media.media_url);
   $("#img_url").attr('href',response.site_url+'/'+response.media.media_url); 
   $("#img_name").val(response.media.name);
   $("#alt_text").val(response.media.alt_text);       
  editMediaModal.show()     
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
 
 
    // Variables para almacenar los valores originales
    var originalAltText = '';
    var originalImgName = '';
 
    // Función para comprobar cambios y habilitar/deshabilitar el botón
    function comprobarCambios($campo, originalValor) {
        $campo.on('focus', function() {
            // Al obtener el enfoque, guarda el valor actual en la variable originalValor
            originalValor = $campo.val();
        });

        $campo.on('input', function() {
            var nuevoValor = $campo.val();
            
            // Verificar si el valor ha cambiado
            if (nuevoValor !== originalValor) {
                $('#editMedia_guardar').removeClass('disabled');
            } else {
                $('#editMedia_guardar').addClass('disabled');
            }
        });
    }

    // Llamar a la función para ambos campos
    comprobarCambios($('#alt_text'), originalAltText);
    comprobarCambios($('#img_name'), originalImgName);
 
 $('#editMedia_guardar').on('click', function() {
    var formData = $('#editMedia').serialize() 
     $.ajax({
      type: 'POST',
       url: 'controllers/MediaController.php?funcion=editar',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') { 
        
        editMediaModal.hide()   
        $.fn.generaToast('Se guardaron los cambios','primary-success')

        } 
        else {
            if (response.message==='notyou') {
             $.fn.alertModal("show", "<p>No tiene permisos para administrar este negocio.</p>", "primary","Cerrar")
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
});

// Agregar evento para el botón "Seleccionar Archivo"
$('#delmedia').on('click', function () {
$.fn.alertModal("show", "<p>Estás a punto de borrar permanentemente esta imagen. Esta acción es irreversible.</p>", "secondary","Cancelar", "danger", "cdelmedia", "Borrar")

});
 
 $(document).on("click", "#cdelmedia", function(event){
borrarMedia() 

});
function borrarMedia() {
 
 var formData = $('#editMedia').serialize() 
     $.ajax({
      type: 'POST',
       url: 'controllers/MediaController.php?funcion=borrar',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') { 
        $.fn.alertModal("hide") 
        editMediaModal.hide() 
        $.fn.generaToast('Archivo eliminado','primary-success')
        listMedias()
        } 

        else {
            if (response.message==='notyou') {
             $.fn.alertModal("hide") 
             $.fn.alertModal("show", "<p>No tiene permisos para administrar este negocio.</p>", "primary","Cerrar")
           }
           if (response.message==='noID') {
             $.fn.alertModal("hide") 
             $.fn.alertModal("show", "<p>Este archivo no existe.</p>", "primary","Cerrar")
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
 


 function getURLtamanio(media_url, tamano) {
    var extension = media_url.split('.').pop();
    var nombreSinExtension = media_url.replace(/\.[^.]*$/, '');
    var urlTamanio = nombreSinExtension + '-' + tamano + '.' + extension;
    return urlTamanio;}

 




 const $editMediaModal= $('#editMediaModal')
$editMediaModal.on('hidden.bs.modal', event => {
$('#editMedia_guardar').addClass('disabled');
 })

 


})(jQuery);


      