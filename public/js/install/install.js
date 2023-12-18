!(function($) {
  "use strict";

  var uMail, dbUser, dbName;
  var toLogin = getNewURL('login')+'/login'// obtener la ruta
$(window).on('load', function() {

  uMail=dbUser=dbName=dbServer="";

// Comprobar si hay config.php
$.ajax({
  type: 'POST',
  url: 'app/controllers/InstallController.php',
  data: 'action=if_config',
  dataType: "json",
  success: function(response) { // hay config.php
   if(response.status == 'success') {
    if_db()// Comprobar si la base de datos está vacía
  } 
  else {
   step1()// no  hay config.php -> Iniciar el asistente
 }
},
error:  function(xhr, status, error) {
  step1() // Si hay error quedarme en la pantalla 1 del asistente
}
}); 

// Comprobar si la base de datos está vacía
function if_db(){
 $.ajax({
  type: 'POST',
  url: 'app/controllers/InstallController.php',
  data: 'action=if_db',
  dataType: "json",
  success: function(response) {
    if (response.success == true) {
       step9() // notificar base de datos en uso 
    } else {
       step6() // notificar la existencia de config.php pero base de datos vacía
    }
   },
  error: function() {
    step31() // notificar error de conexion
  }
}); 
}


});

/*******************/

$('#iNext1').on('click', function() { step2() })

// Comprobamos la conexión a la base de datos
$('#iNext2').on('click', function(event) {
 var form = $('#dbDatas');
 if (form[0].checkValidity()) {
   testDBConection();
 } else {
   event.preventDefault();
   event.stopPropagation();
 }
 form.addClass('was-validated');
});

function testDBConection(){
  var alertOptions = {icon: 'error', title:''};
  var formData = $('#dbDatas').serialize(); // Obtener los datos del formulario
  dbUser=$('#dbUser').val();
  dbName =$('#dbName').val();
  dbServer =$('#dbServer').val();
  showLoader()
  $.ajax({
    type: 'POST',
    url: 'app/controllers/InstallController.php',
    data: formData +'&action=testDBConnection',
    dataType: 'json',
    success: function(response) {
     showLoader(false)
     if(response.status == 'success') {
      configCreate()
    } else { 
      if (response.message===1045 ) {
        step3()
      }
      else if (response.message===1049) {
        step4()
      }
      else {step3()}
    }
},
error: function(xhr, status, error) {
  showLoader(false)
  alertOptions.title = ajaxError(status, error)
  alertToast(alertOptions);
}
});
}


function configCreate(){
  $.ajax({
    type: "POST",
    url: 'app/controllers/InstallController.php',
    data: { dbName: $('#dbName').val(),dbUser: $('#dbUser').val(),dbPass: $('#dbPass').val(),dbServer: $('#dbServer').val(),action:'configCreate'},
    success: function() {
     step5()
   },
   error: function() {
    step7()
  }
});

}

$('#iNext5').on('click', function(event) {
 var form = $('#uData');
 if (form[0].checkValidity()) {
   installer();
 } else {
   event.preventDefault();
   event.stopPropagation();
 }
 form.addClass('was-validated');
});

function installer(){
  var alertOptions = {icon: 'error', title:''};
  $.ajax({
    type: "POST",
    url: 'app/controllers/InstallController.php',
    data: {uMail: $('#uMail').val(),uPass: $('#uPass').val(),action:'installer'},
    success: function(response) {
     if(response.status == 'success') {
      step8()
    } else {
      if (response.message==1045) {
        step3()
      }
      else if (response.message==1049) {
        step4()
      }
      else if (response.message=='42S01') {
        step10()
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







/********************/
function step1(){ $('#step1').removeClass('d-none').siblings().addClass('d-none');}
function step2(){ $('#step2').removeClass('d-none').siblings().addClass('d-none');}

function step3(){ 
  if (dbServer!='') {
  dbServer = '('+dbServer+')'
  }
 var swalOptions = {
  icon: 'error',
  title: 'Error al establecer una conexión con la Base de Datos',
  html: '<p>Esto significa que la información proporcionada no es correcta, o no se ha podido establecer contacto con el servidor de la Base de Datos porque esté caído.</p><ul class="mb-3"><li>¿Seguro que tienes el nombre de usuario y la contraseña correctos?</li><li>¿Seguro que has escrito el hostname '+dbServer+' correcto?</li><li>¿Seguro que funciona el servidor de la Base de Datos?</li><li>Verifica si hay firewalls que puedan bloquear la conexión.</li></ul>',
  confirmButtonText:'Volver a intentar',
  customClass: {
    popup: 'col-md-7 col-12 install-card card install-card-popup',
    htmlContainer: 'text-start'
  }
};
swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
            step2() 
          }  
        }); 

}
function step31(){ 
  if (dbServer!='') {
  dbServer = '('+dbServer+')'
  }
 var swalOptions = {
  icon: 'error',
  title: 'Error al establecer una conexión con la Base de Datos',
  html: '<p>Al parecer ya existe el archivo <code>config.php</code> pero su información no es correcta, o no se ha podido establecer contacto con el servidor de la Base de Datos porque esté caído.</p><ul class="mb-3"><li>Verifica si funciona el servidor de la Base de Datos</li><li>Verifica si hay firewalls que puedan bloquear la conexión.</li></ul>',
  confirmButtonText:'Volver a intentar',
  customClass: {
    popup: 'col-md-7 col-12 install-card card install-card-popup',
    htmlContainer: 'text-start'
  }
};
swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
            step2() 
          }  
        }); 

}
function step4(){
 var swalOptions = {
  icon: 'error',
  title: 'No se ha podido seleccionar la Base de Datos',
  html: '<p>El nombre de usuario y contraseña están correctos, pero no se ha podido seleccionar la Base de Datos <i>'+dbName+'</i>.</p><ul class="mb-3"><li>¿Estás seguro de que existe?</li><li>¿Tiene el usuario <i>'+dbUser+'</i> permisos para usar la Base de Datos <i>'+dbName+'</i>?</li></ul><p>Si no sabes cómo configurar una Base de Datos, deberías <strong>contactar con tu proveedor de alojamiento.</strong></p>',
  confirmButtonText:'Volver a intentar',
  customClass: {
    popup: 'col-md-7 col-12 install-card card install-card-popup',
    htmlContainer: 'text-start'
  }
};
swalAlert(swalOptions)
}


function step5(){ 
  $('#step5').removeClass('d-none').siblings().addClass('d-none');
  $('#uPass').val(generatePassword());
  updateMeterPassword($("#uPass").val(),$("#uMail").val()); 
}

function step6(){
var swalOptions = {
  icon: 'warning',
  title: 'El archivo <code>config.php</code> ya existe',
  html: '<p>Si necesitas recuperar algunos de los elementos de configuración de este archivo bórralo primero.</p>',
  confirmButtonText:'Ejecutar la instalación',
  customClass: {
    popup: 'col-md-7 col-12 install-card card install-card-popup',
    htmlContainer: 'text-start'
  }
};
swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
            step5() 
          }  
        }); 
}



function step7(){ 
var swalOptions = {
  icon: 'error',
  title: 'No se ha podido crear el archivo <code>config.php</code>',
  html: '<p>Intente de nuevo o puede créarlo de forma manual usando el <code>config-sample.php</code></p>',
  confirmButtonText:'Volver a intentar',
  customClass: {
    popup: 'col-md-7 col-12 install-card card install-card-popup',
    htmlContainer: 'text-start'
  }
};
swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
            step2() 
          }  
        }); 
}



function step8(){
 uMail= $('#uMail').val()
var swalOptions = {
  icon: 'success',
  title: '¡Lo lograste!',
  html: '<p><strong>G-Frame</strong> ya está instalado. ¡Gracias, y que lo disfrutes! Para acceder utiliza las credenciales proporcinadas durante la instalación.</p><p><strong>Nombre de usuario: </strong><span>'+uMail+'</span></p><p><strong>Contraseña: </strong>La contraseña que has elegido.</p>',
  confirmButtonText:'Acceder',
  customClass: {
    popup: 'col-md-7 col-12 install-card card install-card-popup',
    htmlContainer: 'text-start'
  }
};
swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
             window.location.href = toLogin;// Al login
          }  
        }); 
}

function step9(){ 
var swalOptions = {
  icon: 'warning',
  title: 'La Base de Datos está en uso',
  html: '<p>Parece que ya has instalado <strong>G-Frame</strong> o se ha seleccionando una Base de Datos en uso. Para volver a instalarlo, por favor, primero vacía las tablas de tu Base de Datos antigua o selecciona una Base de Datos nueva.</p>',
  confirmButtonText:'Acceder',
  showDenyButton: true,
  denyButtonText: 'Reinstalar',
  customClass: {
    popup: 'col-md-7 col-12 install-card card install-card-popup',
    htmlContainer: 'text-start'
  } 
}
swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
             window.location.href = toLogin;// Al login
          }
          else if (result.isDenied) {
             step2()
          }  
        }); 

}
function step10(){ 
  var swalOptions = {
  icon: 'error',
  title: 'No se ha podido instalar G-Frame.',
  html: '<p>Esto se debe a que probablemente la Base de Datos seleccionada no está vacía. Por favor reinicie la instalación y seleccione una Base de Datos nueva.</p>',
  confirmButtonText:'Reiniciar la instalación',
  customClass: {
    popup: 'col-md-7 col-12 install-card card install-card-popup',
    htmlContainer: 'text-start'
  } 
}
swalAlert(swalOptions).then((result) => {
          if (result.isConfirmed) {
             step2() 
          }  
        }); 


}

/***************************/

$('#uPass').on('keyup focusout focus', function() {
  updateMeterPassword($("#uPass").val(),$("#uMail").val())
  var extensionValida = passwordValidate($("#uPass").val(),$("#uMail").val());
  if (!extensionValida) {
    this.setCustomValidity('Por favor, contraseña');
  } else {
    this.setCustomValidity('');
  }
})

showPassword('.pswd', '.showPassword')




})(jQuery);


