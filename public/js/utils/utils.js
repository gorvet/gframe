// utils.js
// varias funciones facilitadoras

// devuelve la url hasta la parte marcada
function getNewURL(ixOF) {
	var currentURL = window.location.href;
  var cleanUrl = currentURL.split('?')[0];
// Divide la URL en partes usando la barra diagonal como separador
var parts = cleanUrl.split('/');
// Reconstruye la URL hasta /ixOF/
var newUrl = parts.slice(0, parts.indexOf(ixOF) ).join('/');
return newUrl
}

// Carga la página de error en la vista actual
function toErrorView(errorType) {  
	$.ajax({
		type: 'POST',
		url: '../index.php',
		data: 'errorType=' + errorType,
		dataType:'html',
		cache: false,
		success: function(response) 
                {// Actualiza el contenido en el cliente
                	document.open();
                	document.write(response);
                	document.close();

                }
            });
}

// Procesa los errores ajax
function ajaxError(status, error){

        if (status == 'timeout') {
          alertToast = {title: 'La solicitud ha tardado demasiado en responder.'};
        } else if (status == 'error') {
          alertToast = {title: 'Se ha producido un error en la solicitud: ' + error};
        } else if (status == 'abort') {
          alertToast = {title: 'La solicitud ha sido cancelada.'};
        } else if (status == 'parsererror') {
          alertToast = {title: 'No se puede analizar la respuesta JSON.'};
        } else {
          alertToast = {title: 'Ha ocurrido un error desconocido: ' + error};
        }
 return alertToast     
}