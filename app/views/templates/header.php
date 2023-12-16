<!DOCTYPE html>
<html lang="es">
<head>
   <meta charset="utf-8">
   <meta content="width=device-width, initial-scale=1.0" name="viewport">



   <title><?= $this->metasController->getMetaTag('title') ?></title>

   <!-- Favicons -->
   <link href="<?php echo site_url . '/public/img/favicon.png' ?>" rel="icon">
   <link href="<?php echo site_url . '/public/img/apple-touch-icon.png' ?>" rel="apple-touch-icon">

   <!-- Dinamic CSS File -->
   <?php $cssLinks = $this->metasController->getCssLinks();
   foreach ($cssLinks as $cssLink): ?>
    <link rel="stylesheet" type="text/css" href="<?= site_url.$cssLink ?>">
   <?php endforeach; ?>


 
 

</head>
<body>
 












