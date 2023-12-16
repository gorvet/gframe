/**
  * Template Name: landing - v1.0.0
  * Author: Juank de Gorvet
*/
!(function($) {
  "use strict";

    // Preloader
  // $(window).on('load', function() {
  //   if ($('#preloader').length) {
  //     $('#preloader').delay(100).fadeOut('slow', function() {
  //       $(this).remove();
  //     });
  //   }
  // });


  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() + 0;
  $(document).on('click', '.navbar a, .navbar-mobile a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;
        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.navbar, .navbar-mobile').length) {
          //$('.navbar .active, .navbar-mobile .active').removeClass('active');
          $(this).closest('a').addClass('active');
        }

        if ($('body').hasClass('navbar-mobile-active')) {
          $('body').removeClass('navbar-mobile-active');
          $('.mobile-nav-toggle i').toggleClass('gicon-menu gicon-cerrar');
          $('.navbar-mobile-overly').fadeOut();
        }
        return false;
      }
    }
  });


  // Activate smooth scroll on page load with hash links
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('#navbar').length) {
    var $mobile_nav = $('#navbar').clone().prop({
      class: 'navbar-mobile d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="gicon-menu"></i></button>');
    $('body').append('<div class="navbar-mobile-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('navbar-mobile-active');
      $('.mobile-nav-toggle i').toggleClass('gicon-menu gicon-cerrar');
      $('.navbar-mobile-overly').toggle();
    });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.navbar, .navbar-mobile');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {

           //main_nav.find('a').parent().not('dropdown').removeClass('active');
           main_nav.find('a').parent().not('.dropdown').children().removeClass('active');
           
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
      }
      if (cur_pos < 300) {
        $(".navbar ul:first li:first a ").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }




      $(document).on('click', '.navbar-mobile .dropdown > a', function(e) {
        e.preventDefault();
      //  $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
      $(this).toggleClass('active');
     });


    $(document).click(function(e) {
      var container = $(".navbar-mobile, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('navbar-mobile-active')) {
          $('body').removeClass('navbar-mobile-active');
          $('.mobile-nav-toggle i').toggleClass('gicon-menu gicon-cerrar');
          $('.navbar-mobile-overly').fadeOut();
        }
      }
    });
 } 
else if ($(".navbar-mobile, .mobile-nav-toggle").length) {
    $(".navbar-mobile, .mobile-nav-toggle").hide();
  }



  // Back to top button
  // $(window).scroll(function() {
  //   if ($(this).scrollTop() > 100) {
  //     $('.back-to-top').addClass('active');
  //   } else {
  //     $('.back-to-top').removeClass('active');
  //   }
  // });

  // $('.back-to-top').click(function() {
  //   $('html, body').animate({
  //     scrollTop: 0
  //   }, 1500, 'easeInOutExpo');
  //   return false;
  // });

 
  //  $(window).scroll(function() {
  //   if ($(this).scrollTop() > 300) {
  //     $('.support_button').addClass('active');
  //   } else {
  //     $('.support_button').removeClass('active');
  //   }
  // });



 
  // Initi AOS
  // function aos_init() {
  //   AOS.init({
  //        duration: 1000,
  //     easing: 'ease-in-out',
  //     once: true,
  //     mirror: false,
    
  //   });
  // }
  // $(window).on('load', function() {
  //   aos_init();
  // });
 

 
 


})(jQuery);