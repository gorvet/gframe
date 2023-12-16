 
!(function($) {
  "use strict";
var uMail, dbUser, dbName;
// Initiate los valores
  $(window).on('load', function() {
 uMail=dbUser=dbName=0;
  step1()

//comprobar si hay config
 $.ajax({
  url: "actions-install.php?funcion=if_config",
  data: { archivo: "config.php" },
  dataType: "json",
  success: function(response) {
    if (response.existe) {
      if_db()
    } else {
       step1()
    }
  },
  error: function() {
    step1()
  }
}); 

//comprobar si ya se instaló

function if_db(){

   $.ajax({
  url: "actions-install.php?funcion=if_db",
  data: {},
  dataType: "json",
  success: function(response) {
    if (response.message) {
      step9()
    } else {
      step6()
    }
  },
  error: function() {
    step3()
  }
}); 



}


   });



 
 
 
$('#iNext2').on('click', function(event) {
 var form = $('#dbDatas');
   if (form[0].checkValidity()) {
       testar();
   } else {
       event.preventDefault();
       event.stopPropagation();
   }
   form.addClass('was-validated');
});

function testar(){
  var formData = $('#dbDatas').serialize(); // Obtener los datos del formulario
     dbUser=$('#dbUser').val();
     dbName =$('#dbName').val();

    $.ajax({
      type: 'POST',
      url: 'actions-install.php?funcion=test_connection',
      data: formData,
      dataType: 'json',
      success: function(response) {
         if(response.status == 'success') {
          configurar()
         
        } else { 
            if (response.message===1045 ) {
              step3()
            }
            else if (response.message===1049) {
              $('#dbSelect').text(dbName)
              $('#dbSelect2').text(dbName)
              $('#userSelect').text(dbUser)
              step4()
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
 
function step1(){ $('#step1').removeClass('d-none').siblings().addClass('d-none');}
function step2(){ $('#step2').removeClass('d-none').siblings().addClass('d-none');}
function step3(){ $('#step3').removeClass('d-none').siblings().addClass('d-none');}
function step4(){ $('#step4').removeClass('d-none').siblings().addClass('d-none');}
function step5(){ 
  $('#step5').removeClass('d-none').siblings().addClass('d-none');
  $('#uPass').val(generarContrasena());
  actualizarMedidorContrasena(); 
}
function step6(){ $('#step6').removeClass('d-none').siblings().addClass('d-none');}
function step7(){ $('#step7').removeClass('d-none').siblings().addClass('d-none');}
function step8(){ $('#step8').removeClass('d-none').siblings().addClass('d-none');}
function step9(){ $('#step9').removeClass('d-none').siblings().addClass('d-none');}
function step10(){ $('#step10').removeClass('d-none').siblings().addClass('d-none');}

$('#iNext1').on('click', function() { step2() })
$('#iNext3').on('click', function() { step2() })
$('#iNext4').on('click', function() { step2() }) 
$('#iNext6').on('click', function() { step5() })
$('#iNext7').on('click', function() { step2() })
$('#iNext10').on('click', function() {// reiniciar la instalación

  $.ajax({
    url: 'actions-install.php?funcion=eliminar_config',
    type: 'POST',
    data: {},
    success: function() {
       step1() 
    },
    error: function() {
      alert('Hubo un error al reiniciar la instalación');
    }
  });
 
})


$('.finish-installation').on('click', function() {//terminar la instalacion y redirigir al home

  $.ajax({
    url: 'actions-install.php?funcion=finalizar',
    type: 'POST',
    data: {},
    success: function() {
      window.location.replace("index.php");
    },
    error: function() {
      alert('Hubo un error al finalizar la instalación');
    }
  });
 
})
 




$('#iNext5').on('click', function(event) {
   var form = $('#uData');
   if (form[0].checkValidity()) {
       instalar();
   } else {
       event.preventDefault();
       event.stopPropagation();
   }
   form.addClass('was-validated');
});

 $('#uPass').on('keyup', function() {
   var extensionValida = validarFortaleza();
   if (!extensionValida) {
    this.setCustomValidity('Por favor, ingrese un contraseña .... válido');
  } else {
    this.setCustomValidity('');
  }
});

function validarFortaleza() {
  var contrasena = $("#uPass").val();
  if (contrasena) {
  var puntuacion = evaluarContrasena(contrasena);
  if (puntuacion>=6) {var isStrong=true}
    else{isStrong=false}
  }
return isStrong;
}

function configurar(){
  $.ajax({
    url: 'actions-install.php?funcion=crear_config',
    method: "POST",
    data: { nombreArchivo: 'config.php',dbName: $('#dbName').val(),dbUser: $('#dbUser').val(),dbPass: $('#dbPass').val(),dbServer: $('#dbServer').val()},
    
    success: function() {
     step5()
    },
    error: function() {
    step7()
    }
  });
 
}
function instalar(){
  $.ajax({
    url: 'actions-install.php?funcion=install',
    method: "POST",
    data: {uMail: $('#uMail').val(),uPass: $('#uPass').val()},
    success: function(response) {
         if(response.status == 'success') {
          step8()
          $('#username').text( $('#uMail').val())
          
        } else {
            if (response.message==1045) {
              step3()
            }
            else if (response.message==1049) {
              $('#dbSelect').text(dbName)
              $('#dbSelect2').text(dbName)
              $('#userSelect').text(dbUser)
              step4()
            }
              else if (response.message=='42S01') {
              $('#dbSelect1').text(dbName)
              step10()
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

function generarContrasena() {
  var comun = "abcdefghijklmnopqrstuvwxyz";
  var maynum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var simbol = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  var contrasena = "";
  for (var i = 0; i < 9; i++) {
    var caractercomun = comun.charAt(Math.floor(Math.random() * comun.length));
    var caractermaynum = maynum.charAt(Math.floor(Math.random() * maynum.length));
    var caractersimbol = simbol.charAt(Math.floor(Math.random() * simbol.length));
    contrasena += caractercomun+caractermaynum+caractersimbol;
  }
  return contrasena;
}


$('#uPass').on('keyup focusout focus', function() {
  actualizarMedidorContrasena()
})
 
function evaluarContrasena(contrasena) {
  var puntuacion = 0;

  // Evaluar longitud
  if (contrasena.length >= 8) {
    puntuacion += 1;
    if (contrasena.length >= 12) {
      puntuacion += 1;
    }
    if (contrasena.length >= 16) {
      puntuacion += 1;
    }
  }
  else{puntuacion += -3;}

  // Evaluar complejidad
  if (/[a-z]/.test(contrasena)) {
    puntuacion += 1;
  }
  else{puntuacion += -1;}
  if (/[A-Z]/.test(contrasena)) {
    puntuacion += 1;
  }
  else{ puntuacion += -100;}

  if (/[0-9]/.test(contrasena)) {
    puntuacion += 1;
  }
  else{ puntuacion += -100;}

  if (/[^a-zA-Z0-9]/.test(contrasena)) {
    puntuacion += 1;
  }
  else{ puntuacion += -100;}

  

  if ($("#uMail").val()!='') {
    var email =$("#uMail").val();
    var partes = email.split("@");
    var dominio = partes[1].split(".");
    if ( contrasena.includes(partes[0]) || contrasena.includes(dominio[0])) {
       puntuacion += -100;
     }
    else{puntuacion += 1; 
     }
}
  return puntuacion;
}

function actualizarMedidorContrasena() {
  var contrasena = $("#uPass").val();
  if (contrasena) {
  var puntuacion = evaluarContrasena(contrasena);
  $("#medidor-contrasena").removeClass("d-none");
  }
  else{ $("#medidor-contrasena").addClass("d-none");}
 
  $("#medidor-contrasena").removeClass("debil media fuerte");
  if (puntuacion <= 2) {
    $("#medidor-contrasena").addClass("debil").text("Débil");
  } else if (puntuacion <= 6) {
    $("#medidor-contrasena").addClass("media").text("Media");
  } else {
    $("#medidor-contrasena").addClass("fuerte").text("Fuerte");
  }

}

$("#mostrar-ocultar-contrasena").on('click', function() {
    var tipo = $("#uPass").attr("type");
    if (tipo == "password") {
      $("#uPass").attr("type", "text");
      $(this).text("Ocultar");
    } else {
      $("#uPass").attr("type", "password");
      $(this).text("Mostrar");
    }
  });

})(jQuery);


      