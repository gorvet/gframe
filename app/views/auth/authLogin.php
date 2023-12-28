<div class="col-lg-9 col-xl-8  "> 
        <div class="login-card card">
          <div class="card-header text-center p-3">
            <h1>Iniciar sesión</h1>
          </div>
          <div class="card-body p-4 mt-3">
            <form method="post" id="login" class="needs-validation " novalidate>
              <input type="hidden" class="csrfToken" name="csrfToken" value="<?php echo $_SESSION['csrfToken']; ?>">
              <div class="mb-3">
                <label class="form-label" for="login_email"> Correo electrónico</label>
                <input class="form-control" type="email" name="login_email"  id="login_email" autocomplete="on" autofocus required pattern="^[a-z0-9_\-.]+@[a-z0-9_\-.]+\.[a-z]{2,3}$"> 
              </div>
              <div class="mb-3 col-sm-12">
                <label class="form-label" for="login_password">Contraseña</label>
                <div class="input-group">
                  <input class="form-control pswd" type="text" name="login_password" id="login_password"  autocomplete="off" required>
                <span class="showPassword input-group-text">Ocultar</span>

                </div>
              </div>
              <div class="mb-3 col-sm-12">
                <a  href="<?php echo site_url ?>/login/lostpassword">Olvidé mi contraseña</a>
              </div>
            </form>
            <div class="mb-3">
                <button  id="submit_login" class="btn btn-primary d-block w-100 mt-3">Acceder </button>
              </div>
              <div class="col-auto text-center">
                <span class="mb-0">¿No tienes cuenta?</span> 
                 <a class="toregister" href="<?php echo site_url ?>/login/register">Crear una cuenta</a> 
              </div>
          </div>
        </div>
      </div>
