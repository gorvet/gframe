<!DOCTYPE html>

<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="<?= $this->getMetaTag('description') ?>" name="description">
    <meta content="<?= $this->getMetaTag('keywords') ?>" name="keywords">
    <!-- <meta name="author" content="Juank de Gorvet" /> 
    <meta name="copyright" content="Netcomp" />-->

    <meta content="<?= $this->getMetaTag('site_name') ?>" name="twitter:title">
    <meta content="<?= $this->getMetaTag('description') ?>" name="twitter:description"  >
    <meta content="assets/img/apple-touch-icon.png" name="twitter:image" >
    <!--   <meta name="twitter:creator" content="@Juank_de_Gorvet"> 
 -->
    <meta content="article" property="og:type" />
    <meta content="<?= $this->getMetaTag('site_name') ?>" property="og:title" >
    <meta content="<?= $this->getMetaTag('description') ?>" property="og:description"/>
    <meta content="assets/img/apple-touch-icon.png" property="og:image"> 
    <meta content="https://netcomp.llc" property="og:url" />
    <meta content="<?= $this->getMetaTag('site_name') ?>" property="og:site_name" />
 
    <title>asd</title>

    <!-- Favicons -->
    <link href="public/img/favicon.png" rel="icon">
    <link href="public/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Vendor CSS Files -->
    <!-- <link href="public/vendor/aos/aos.css" rel="stylesheet"> -->
    <link href="public/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="public/vendor/gicon/style.css" rel="stylesheet">
    <!-- <link href="public/vendor/venobox/venobox.min.css" rel="stylesheet">
    <link href="public/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet"> -->

    <!-- Dinamic CSS File -->
    <?php foreach ($this->cssLinks as $cssLink): ?>
        <link rel="stylesheet" type="text/css" href="<?= $cssLink ?>">
    <?php endforeach; ?>
  
    <!-- Common CSS File -->
    <link href="public/css/common.css" rel="stylesheet">

  </head>
<body>
 


<header>
 
</header>










