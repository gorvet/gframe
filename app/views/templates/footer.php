 


<!-- Dinamic JS File -->
<?php 
$jsScripts = $this->metasController->getJsScripts();
 
foreach ($jsScripts as $jsScript): ?>
  <script type="text/javascript" src="<?= site_url.$jsScript ?>"></script>
<?php endforeach; ?>
</body>
</html>