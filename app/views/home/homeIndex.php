<!-- app/views/home/homeIndex.php -->
<header id="homeHeader" class="header fixed-top ">
  <div class="container d-flex justify-content-between align-items-center h-100">
    <div class="d-flex align-items-center justify-content-between">
       
    </div><!-- End Logo -->

    
    <nav id="navbar" class="navbar d-lg-flex d-none">
      <ul class="d-flex align-items-center">
        <li class="nav-item me-3">
          <?php if (isset($_SESSION['userEmail'])){
             echo 'Hola, '. $_SESSION['userEmail'];
          }?>
        </li>
        <li class="nav-item me-3">
          <a class="scrollto active nav-link" href="#">Inicio</a></li>
          <li class="nav-item me-3">
            <a class="nav-link scrollto" href="admin">Admin</a>
          </li>
          <li class="nav-item me-3">
            <?php if (isset($_SESSION['userID'])): ?>
              <a id="bregister" class="nav-link" href="#">Salir</a>
            <?php else: ?> 
            <a id="blogin" class="nav-link" href="login">Entrar</a>

            <?php endif ?>
          </li>
           
          <li class="nav-item me-3">
            <a id="bregister" class="nav-link" href="login/register">Crear Cuenta</a>
          </li>
        </ul>
      </nav><!-- End Icons Navigation -->
    </div>
  </header> 

  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <div class="container">
        <div class="inner cover">
          <h1 class="cover-heading">G-Frame</h1>
          <p class="lead">Algo maravilloso se construye aquí.</p>


        </div>
      </div>
    </div>
  </div>