<div id="reset_step" class="col-lg-9 col-xl-8 col-xxl-  "> 
        <div class="login-card card">
          <div class="card-header text-center p-3">
            <h1>Nueva contraseña</h1>
          </div>
          <div class="card-body p-4 mt-3">
            <form method="post" id="reset" class="needs-validation " novalidate>
              <input type="hidden" class="csrfToken" name="csrfToken" value="<?php echo $_SESSION['csrfToken']; ?>">
              <input type="hidden" id="rpuser_token" name="rpuser_token" value="">
               <div class="mb-3 col-sm-12">
                <label class="form-label" for="reset_password">Contraseña</label>
                <div class="input-group">
                  <input class="form-control pswd" type="text" name="reset_password" id="reset_password"  autocomplete="off" required>
                  <span class="showPassword input-group-text">Ocultar</span>

                </div>
                <div class="passwordMeter"></div>

              </div>
               
               
              
            </form>
            <div class="mb-3">
                <button  id="submit_reset" class="btn btn-primary d-block w-100 mt-3">Establecer</button>
              </div>
              <div class="col-auto text-center">
                
                  <a class="tologin" href="<?php echo site_url ?>/login">Acceder</a> | <a class="toregister" href="<?php echo site_url ?>/login/register">Registrarse</a>
              </div>
          </div>
        </div>
      </div>