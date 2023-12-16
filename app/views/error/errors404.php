 
	<div class="container py-5">
		<div class="row justify-content-center">
			 <div class="col-12 col-lg-8 d-flex justify-content-center pb-3">

				<img src="<?php echo site_url.  '/public/img/logo.png' ?>" class="img-fluid logo-404">
			</div>
			<div id="p404" class="col-12 col-lg-8 ">
				<div class="card  ">
					<span  class="d-block fs-error">404</span>
					<p class="lead border-bottom">¡Opps, algo salió mal!</p>
					
					<?php if ($this->metasController->getMetaTag('info'))
					 {
					 	echo '<p class="lead2">'.$this->metasController->getMetaTag('info').'</p>';
					
					} else { 
						echo '
						<p class="lead2">La página que estás buscando no se encuentra</p>
						<p class="text-center">Asegúrate de que la dirección sea correcta. Si crees que se trata de un error, <a href="#">contacta con nosotros</a>.</p>';
					 } ?>
					 
					
					<a class="btn btn-primary  mx-auto d-block" href="<?php echo site_url?>">Regresar al Inicio</a>
					 
				</div>
			</div>
		</div>
	</div>
 