// passwordUtils.js


// Generar una contraseña aleatoria
function generatePassword() 
{
	var common = "abcdefghijklmnopqrstuvwxyz";
	var capnumber = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var symbol = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
	var password = "";
	for (var i = 0; i < 12; i++) {
		var commonCharacter = common.charAt(Math.floor(Math.random() * common.length));
		var capnumberCharacter = capnumber.charAt(Math.floor(Math.random() * capnumber.length));
		var symbolCharacter = symbol.charAt(Math.floor(Math.random() * symbol.length));
		password += commonCharacter+capnumberCharacter+symbolCharacter;
	}
	return password;
}

// Evaluar la fortaleza de una contraseña
function evaluatePassword(password , email)
 {
	var scores = 0;

// Evaluar longitud
if (password.length >= 8) {
	scores += 1;
	if (password.length >= 12) {
		scores += 1;
	}
	if (password.length >= 16) {
		scores += 1;
	}
}
else{scores += -3;}

// Evaluar complejidad
if (/[a-z]/.test(password)) {
	scores += 1;
}
else{scores += -1;}
if (/[A-Z]/.test(password)) {
	scores += 1;
}
else{ scores += -100;}

if (/[0-9]/.test(password)) {
	scores += 1;
}
else{ scores += -100;}

if (/[^a-zA-Z0-9]/.test(password)) {
	scores += 1;
}
else{ scores += -100;}



if (email!='') {

	var parts = email.split("@");
	var domain = parts[1].split(".");
	if ( password.includes(parts[0]) || password.includes(domain[0])) {
		scores += -100;
	}
	else{scores += 1; 
	}
}
else{scores += 1;} 
return scores;
}

// Actualizar el medidor de contraseñas
function updateMeterPassword(password,email) {
	if (password) {
		var scores = evaluatePassword(password,email);
		$(".passwordMeter").removeClass("d-none");
	}
	else{ $(".passwordMeter").addClass("d-none");}

	$(".passwordMeter").removeClass("weak medium strong");
	if (scores <= 2) {
		$(".passwordMeter").addClass("weak").text("Débil");
	} else if (scores <= 6) {
		$(".passwordMeter").addClass("medium").text("Media");
	} else {
		$(".passwordMeter").addClass("strong").text("Fuerte");
	}

}


 
function passwordValidate(password, email) {
  
  if (password) {
  var puntuacion = evaluatePassword(password,email);
  if (puntuacion>=6) {var isStrong=true}
    else{isStrong=false}
  }
return isStrong;
}

// Mostrar u ocultar la contraseña
function showPassword(inputSelector, buttonSelector) {
    const $input = $(inputSelector);
    const $button = $(buttonSelector);

    $button.on('click', function() {
      const tipo = $input.attr('type');
      if (tipo === 'password') {
        $input.attr('type', 'text');
        $button.text('Ocultar');
      } else {
        $input.attr('type', 'password');
        $button.text('Mostrar');
      }
    });
  }


