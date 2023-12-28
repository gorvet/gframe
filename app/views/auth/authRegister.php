
<div id="register_step" class="col-lg-9 col-xl-8 col-xxl-6  "> 
        <div class="login-card card">
          <div class="card-header text-center p-3">
            <h1>Crear cuenta</h1>
          </div>
          <div class="card-body p-4 mt-3">
            <form method="post" id="register" class="needs-validation " novalidate>
              <input type="hidden" calss="csrfToken" name="csrfToken" value="<?php echo $_SESSION['csrfToken']; ?>">
              <div class="mb-3">
                <label class="form-label" for="register_email"> Correo electrónico</label>
                <input class="form-control" type="email" name="register_email"  id="register_email" autocomplete="off" autofocus required pattern="^[a-z0-9_\-.]+@[a-z0-9_\-.]+\.[a-z]{2,3}$">
              </div>
              <div class="mb-3 col-sm-12">
                <label class="form-label" for="register_password">Contraseña</label>
                <div class="input-group">
                  <input class="form-control pswd" type="text" name="register_password" id="register_password"  autocomplete="off" required>
                  <span class="showPassword input-group-text">Ocultar</span>
                </div>
                <div class="passwordMeter"></div>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="cover-register-checkbox" checked required>
                <label class="form-label" for="cover-register-checkbox">Acepto los <a href="#">términos y condiciones</a> de uso</label>
              </div>
              
            </form>
            <div class="mb-3">
                <button  id="submit_register" class="btn btn-primary d-block w-100 mt-3">Crear cuenta</button>
              </div>
              <div class="col-auto text-center">
                <span class="mb-0">¿Ya eres usuario?</span> 
                 <a class="tologin"  href="<?php echo site_url ?>/login">Acceder</a> 
              </div>
          </div>
        </div>
      </div>