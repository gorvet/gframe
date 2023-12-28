// alertToast.js

function alertToast(toastOptions) {
// Valores por defecto
const defaultOptions = {
	position: 'bottom-end',  
	timer: 5000,
	icon:'success',
	title:'Nada que mostrar' 
// Otros valores por defecto aquí
};
// Fusionar los valores por defecto con los proporcionados
const options = { ...defaultOptions, ...toastOptions };
const Toast = Swal.mixin({
	toast: true,
	position: options.position,
	showConfirmButton: false,
	timer: options.timer,
	didOpen: (toast) => {
		toast.onmouseenter = Swal.stopTimer;
		toast.onmouseleave = Swal.resumeTimer;
	}
});
Toast.fire({
	icon: options.icon,
	title: options.title
});
}


function showLoader(show) {
	if (show==false) {
		Swal.close();
	}
	else{
		Swal.fire({
			background: "transparent",
			backdrop:"transparent",
			allowOutsideClick: false,
			showConfirmButton: false,
			showCancelButton: false,
			customClass: {
				container: 'no-shadow',
				loader: 'newSize'
			},
			willOpen: () => {
				Swal.showLoading();
			},
		});
	}

}

function swalAlert(swalOptions) {

	const defaultOptions = {
		confirmButtonText: "Cerrar",
		customClass: {
			confirmButton: "btn btn-primary",
			denyButton: "btn btn-tercero",
			cancelButton: "btn btn-secondary",
		},
	};
  const options = mergeDeep(defaultOptions, swalOptions);
  return Swal.fire(options);
}


function mergeDeep(target, source) {
  if (typeof target !== 'object' || typeof source !== 'object') {
    return source;
  }

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] instanceof Object) {
        Object.assign(source[key], mergeDeep(target[key], source[key]));
      }
    }
  }

  Object.assign(target || {}, source);
  return target;
}