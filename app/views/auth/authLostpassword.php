<div id="recovery_step" class="col-lg-9 col-xl-8 col-xxl- "> 
        <div class="login-card card">
          <div class="card-header text-center p-3">
            <h1>Recuperar cuenta</h1>
          </div>
          <div class="card-body p-4 mt-3">
            <form method="post" id="recovery" class="needs-validation " novalidate>
              <input type="hidden" class="csrf_token" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
              <div class="mb-3">
                <label class="form-label" for="recovery_email">Correo electrónico</label>
                <input class="form-control" type="email" name="recovery_email"  id="recovery_email" autocomplete="on" autofocus required pattern="^[a-z0-9_\-.]+@[a-z0-9_\-.]+\.[a-z]{2,3}$"> 
 
              </div>
               
               
              
            </form>
            <div class="mb-3">
                <button  id="submit_recovery" class="btn btn-primary d-block w-100 mt-3">Recuperar </button>
              </div>
              <div class="col-auto text-center">
                
                 <a class="tologin" href="<?php echo site_url ?>/login">Acceder</a> | <a class="toregister" href="<?php echo site_url ?>/login/register">Registrarse</a>
              </div>
          </div>
        </div>
      </div>