<!-- app/views/home/homeIndex.php -->
<header id="homeHeader" class="header fixed-top ">
  <div class="container d-flex justify-content-between align-items-center h-100">
    <div class="d-flex align-items-center justify-content-between">
       
    </div><!-- End Logo -->

    
    <nav id="navbar" class="navbar d-lg-flex d-none">
      <ul class="d-flex align-items-center">
        <li class="nav-item me-3">
          <?php if (isset($_SESSION['userEmail'])){
            $user=explode("@", $_SESSION['userEmail']);

             echo 'Hola, '.$user[0];
          }?>
        </li>

         
          <?php if (isset($_SESSION['userID'])): ?>
             <li class="nav-item me-3">
            <a class="nav-link" href="admin">Dashboard</a>
          </li>
          <li class="nav-item me-3">
            <a id="logout" class="nav-link" href="#">Salir</a>
          </li>
            <?php else: ?> 
            <li class="nav-item me-3">
            <a  class="nav-link" href="login">Entrar</a>
          </li>
          <li class="nav-item me-3">
            <a class="nav-link" href="login/register">Crear Cuenta</a>
          </li>
            <?php endif ?>
        
          
           
          
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