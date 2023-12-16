<!-- ======= Header ======= -->
<header id="header" class="header fixed-top d-flex align-items-center">
  <?php //echo $navbar; ?>
</header><!-- End Header -->
<aside id="sidebar" class="sidebar">
  <?php  $path  = dirname($_SERVER['SCRIPT_NAME']); ?>
  <?php 
  include 'app/views/admin/aside.php';?>
  <?php //echo $adminSidebar; ?>
  <?php //echo $commonSidebar; ?>
</aside>
<main id="main" class="main">
  <div class="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->
  <section class="section dashboard">
    <div class="row">
      <?php echo $content; ?>
    </div>
  </section>
</main><!-- End #main -->