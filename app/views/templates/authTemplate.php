<!-- ======= auth  Section ======= -->
<main>
  <section class="container-fluid">
    <div class="row align-content-center">
      
  	<div class="col-sm-10 col-md-6  align-self-center mx-auto py-3">
    	<div class="row justify-content-center g-0">
        <?php echo $content; ?>
     
    </div>
  </div>
  <div class="col-12 mx-auto text-center">
    <a  href="<?php echo site_url ?>">← Ir al Inicio</a>
  </div>      
   
</div>
</section>
   <!-- Modal -->
<div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content ">
      <div  class="modal-body d-grid">
        <div id="alert_body"></div>
        <a   class="btn btn-primary btn-modal" data-bs-dismiss="modal">Cerrar</a>
      </div>
    </div>
  </div>
</div>
</main>