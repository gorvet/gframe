 
!(function($) {
  "use strict";
 
 $(window).on('load', function() {
 
 if (window.location.pathname.includes('login.php')) {
  // está en la página login.php
  // modifique el atributo href 
  $('#blogin').attr('href', '#');
  $('#bregister').attr('href', '#');
  // modifique el atributo href de los elementos con la clase "scrollto"
  $('.scrollto').each(function() {
    var href = $(this).attr('href');
    $(this).attr('href', 'index.php' + href);
  });
  }
   else{
    
  // está en la página login.php
  // modifique el atributo href 
  $('#blogin').attr('href', 'login.php');
  $('#bregister').attr('href', 'login.php?f=c');
  // modifique el atributo href de los elementos con la clase "scrollto"
 $('.scrollto[href*="index.php"]').each(function() {
    var href = $(this).attr('href');
    href = href.replace('index.php', '');
    $(this).attr('href', href);
  });
  }
    
 });

 

})(jQuery);


      