!(function($) {
  "use strict";
const selectMediaModal = new bootstrap.Modal('#selectMediaModal')
const $selectMediaModal= $('#selectMediaModal')
var editBusinessData=''

$(document).ready(function(){
  selectShopCategory();
  getOne();
  
 });
 function getOne() {
    var businessID =$('#businessID').val()
    var formData = 'businessID=' + businessID;
     $.ajax({
      type: 'POST',
      url: 'controllers/BusinessController.php?funcion=getOne',
      data: formData,
      dataType: 'json',
      success: function(response) {
        if(response.status == 'success') {
            $('#busines_name').val(response.row[0].name)
            $('#busines_url').val(response.row[0].url)
            $('#busines_description').val(response.row[0].descripcion)
            var is_active = response.row[0].is_active ? true: false
            $('#isActive').prop('checked', is_active);
            $('.isActive').text(is_active ? 'Activa': 'Inactiva');
            $('#busines_category option[value="' + response.row[0].category + '"]').prop('selected', true);
            $('#busines_category_val').val(response.row[0].category);

            if (response.logourl!="") {
               
                updateProfileImgURL(response.logoid)
                $('.businessPhoto .p1').css("background-image", 'url("'+response.logourl+'")');


            }
            if (response.banerurl!="") {
                 updateBannerImgURL(response.bannerid)
                $('#bannerImg').css("background-image", 'url("'+response.banerurl+'")');
            }
          // $.fn.generaToast('El registro del negocio fue exitoso','primary-success')
          
          //alertModal.show();
          //$('#alert_body').html('<p class="mb-0">El enlace se ha registrado</p>')
           editBusinessData = $('#editBusiness').serialize()
           editBusinessData= serializadoAJSON(editBusinessData)
        } 
        else {
            if (response.message==='existe') {
          //alertModal.show();
          //$('#alert_body').html('<p class="mb-0">Este <strong>Alias</strong> ya está registrado</p>')
          // $.fn.generaToast('La <strong>URL del negocio</strong> no está disponible','danger-subtle')
      
            }
            else if (response.message==='overplan') {
          //falertModal("show", "<p><strong>Ops</strong></p><p>Parece que ya alcanzó el límite de negocios para su plan contratado. Puede mejorar su plan haciendo <a class='upgrade' href='#'>clic aquí</a></p>", "primary","Cerrar")
     
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
 
function selectShopCategory() {
    $.ajax({
        type: 'POST',
        url: 'controllers/BusinessController.php?funcion=listBcategory',
        dataType: 'json',
        success: function(data) {
            // Limpiar el elemento <select>
            $('#busines_category').empty();

            

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
          falertModal("show", "<p><strong>Ops</strong></p><p>Parece que ya alcanzó el límite de negocios para su plan contratado. Puede mejorar su plan haciendo <a class='upgrade' href='#'>click aquí</a></p>", "primary","Cerrar")
     
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

 
$('#changeProfileImg').on('click', function(event) {
    selectMediaModal.show()
    $('#mediaSelected').attr('target', 'profile')
    listMedias()
})

$('#changeBaner').on('click', function(event) {
    selectMediaModal.show()
     $('#mediaSelected').attr('target', 'baner')
    listMedias()
})

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
var tbody = $('#selectMediaModal .allmedias');
 // Vaciar el contenido actual de la tabla
 if (rows.length != 0) {tbody.empty();}
 
 
// Iterar sobre cada fila de datos y construir una nueva fila de la tabla
var htmlActions=''
const siteurl=site_url
  $.each(rows, function(index, row, siteurl) { 
    var media_url=row.media_url
    var thumbnail_url= getURLtamanio(media_url, "medium")
    thumbnail_url = site_url+'/'+thumbnail_url;
    var col = $('<div id="'+row.media_id+'" class="  col-4 col-md-2">');
 


 

    // Agregar cada celda de la fila  
    col.append($('<div class="thumbnail mb-3"><img class="img-fluid" id="imgID_'+row.media_id+'" src="'+thumbnail_url+'" media_url="'+site_url+'/'+row.media_url+'"></div>')) 
  
    

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
 
 
$(document).on('click', '[id^="imgID_"]', function() {
   event.preventDefault();
  var id = $(this).attr('id').substring(6);
  $('[id^="imgID_"]').css('border', '2px transparent'); 
  $(this).css('border', '2px solid var(--primario_oscuro)');
  $('#selectMedia_guardar').removeClass('disabled');
  $('#mediaSelected').val($(this).attr('media_url'));
  $('#mediaSelectedID').val(id);

 
})
$(document).on('click', '#selectMedia_guardar', function() {
selectMediaModal.hide()
})

$selectMediaModal.on('hidden.bs.modal', event => {
$('#selectMedia_guardar').addClass('disabled');
var target =$('#mediaSelected').attr('target')
var mediaSelectedID = $('#mediaSelectedID').val()

if ( target=='profile') {
updateProfileImgURL(mediaSelectedID) 
$('.businessPhoto .p1').css("background-image", 'url("'+$('#mediaSelected').val()+'")');

}
else if (target=='baner') {
$('#bannerImgURL').val(mediaSelectedID) 
updateBannerImgURL(mediaSelectedID) 
$('#bannerImg').css("background-image", 'url("'+$('#mediaSelected').val()+'")');
}

 })

  function getURLtamanio(media_url, tamano) {
    var extension = media_url.split('.').pop();
    var nombreSinExtension = media_url.replace(/\.[^.]*$/, '');
    var urlTamanio = nombreSinExtension + '-' + tamano + '.' + extension;
    return urlTamanio;}






//ver cambios en el form del edit para activar guardar

$('#isActive').on('change', function() {//cambio en el estado
var is_active
 if ($('#isActive').is(':checked')) {
    is_active = 'Activa'
} else {
    is_active = 'Inactiva'
} 
 $('.isActive').text(is_active);
})
 
function updateProfileImgURL(newValue) {
    $('#profileImgURL').val(newValue);
    $('#submit_edit_business').removeClass('disabled');
} 
function updateBannerImgURL(newValue) {
    $('#bannerImgURL').val(newValue);
    $('#submit_edit_business').removeClass('disabled');
}         

$('#editBusiness').on('change', function() {

$('#submit_edit_business').removeClass('disabled')


});




})(jQuery);


      