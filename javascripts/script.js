$(document).ready(function() {
  // load
  setTimeout(function() {
    $('.loading-progress').find('.fill').addClass('complete');
    $('body').removeClass('loading');
    $('.loading-overlay')
      .delay(300)
      .queue(function() {
        heroAnimation();
        $(this).addClass('off').dequeue();
      });
  }, 2000);
  

  // Mobile Hover
  // var mobileHover = (function() {
  //   $('*').on('touchstart', function () {
  //       $(this).trigger('hover');
  //   }).on('touchend', function () {
  //       $(this).trigger('hover');
  //   });
  // })();

  var viewport = window.innerWidth;
      // mousedown = false;
  // $('html, body').stop().animate({
  //   scrollTop: 0
  // }, 400);
  if (viewport <= 576) {
    $('.skillbar-description').each(function() {
      if ($(this).is('.show')) {
        $(this).slideDown();
      }
    });
  }

  // Menu Trigger 
  var menuShow = false;
  $('.menu-trigger').on('click', function(e) {
    var  $menu = $('.nav-menu');
    if (!menuShow) {
      $menu.addClass('menu-open').removeClass('menu-close');
      $('.menu-overlay').css('display', 'block');
      menuShow = true;
    } else {
      $menu.addClass('menu-close').removeClass('menu-open');
      setTimeout(function() {
        $('.menu-overlay')[0].style = '';
      }, 280);
      menuShow = false;
    }
  });

  $('.menu-overlay').on('click', function(e) {
    e.stopPropagation();
    $('.nav-menu').addClass('menu-close').removeClass('menu-open');
    setTimeout(function() {
      $('.menu-overlay')[0].style = '';
    }, 280);
    menuShow = false;
  })
  
  // -------------------------------//
  // Hero text animation            //
  // -------------------------------//
  // heroTextAnimation();
  var heroAnimation = function () {
    setTimeout(function() {
      $('.loading-overlay').hide();
    }, 800);
    // typing animation
    new TypeIt('.hero-sub-text', {
        // what to type
        strings: [
          '$(Me).ready(function() {',
          '&nbsp;&nbsp;&nbsp;&nbsp; var goal = function(effort) {',
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; var result = (effort > 99) ? \'前端工程師\' : \'Try Harder!\';',
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return result;',
          '&nbsp;&nbsp;&nbsp;&nbsp; }',
          '&nbsp;&nbsp;&nbsp;&nbsp; goal(100);',
          '}); '
        ],
        nextStringDelay: 500
      })
      .options({
        speed: 100,
        deleteSpeed: 75
      })
      .go();

    var heroTextAnimation = (function() {
      for (var i = 0; i < 16; i++) {
        (function (i) {
          setTimeout(function () {
            if (i === 10) {
              $('.hero-primary').children().eq(i).addClass('animated rollIn');
            } else {
              $('.hero-primary').children().eq(i).addClass('animated bounceIn');
            }
          }, 100 * i)
        })(i);
      }
      setTimeout(function () {
        $('.hero-primary').children().each(function () {
          $(this).removeClass('bounceIn rollIn').css('opacity', '1');
        });
      }, 2400);
    })();

    $('.hero-primary').children().on('mouseenter', function (e) {
      $(e.target).addClass('rubberBand');
    });
    $('.hero-primary').children().on('mouseleave', function (e) {
      setTimeout(function () {
        $(e.target).removeClass('rubberBand');
      }, 1000)
    });

    setInterval(function () {
      var random = Math.floor(Math.random() * 15),
        target = $('.hero-primary').children().eq(random);
      target.addClass('rubberBand')
        .delay(1000)
        .queue(function () {
          $('.hero-primary').children().removeClass('rubberBand').dequeue();
        });
    }, 5000);
  }
  // -------------------------------//
  // Page scroll event              //
  // -------------------------------//
  // Desktop only
  // initial
  if (!mobileCheck()) {
    if ($(window).scrollTop() === 0) {
      $('body').addClass('stop-scrolling');
    } 
    document.addEventListener('mousewheel', scrollDown, { passive: false });
    document.addEventListener('DOMMouseScroll', scrollDown, { passive: false });
  }
  // Touch event
  var touchStart;
  $(document).on('touchstart', function(e) { //touchmove works for iOS, I don't know if Android supports it
    touchStart = e.originalEvent.touches[0].clientY;
  });
  $(document).on('touchend', function(e) { //touchmove works for iOS, I don't know if Android supports it
    var touchEnd = e.originalEvent.changedTouches[0].clientY;
    $('body').removeClass('stop-scrolling');
    if (touchStart > touchEnd && $(window).scrollTop() < $('.main').offset().top) {
      $('html, body').stop().animate({
        scrollTop: $('.main').offset().top
      }, 350);
    } else {
      return;
    }
  });
  // Window scroll event
  $(window).on('scroll', function(e) {
    var scroll = $(window).scrollTop(),
        main = $('.main').offset().top,
        windowHeight = $(window).height(),
        $navLink = $('.navigation a[href^="#"]');

    if (scroll === 0) {
      if (!mobileCheck()) {
        $('body').addClass('stop-scrolling').css('margin-right', '');
        document.addEventListener('mousewheel', scrollDown, { passive: false });
        document.addEventListener('DOMMouseScroll', scrollDown, { passive: false });
      }
      $('.navigation').addClass('hide');
    } else if (scroll >= main - 1) {
      $('.navigation').removeClass('hide')
        .queue(function() {
          $(this).css('willChange', 'unset').dequeue();
        });
    }
    // now position
    $navLink.each(function() {
      if (!$(this.hash).length) { return }
      var targetPos = $(this.hash).offset().top,
          targetHeight = $(this.hash).height();
      if (scroll >= targetPos - (windowHeight / 2) && scroll < (targetPos + targetHeight)) {
        $navLink.parent().removeClass('active');
        $(this).parent().addClass('active');
      } else {
        $(this).parent().removeClass('active');
      }
    });

    // section header animation
    $('section header').each(function() {
      var targetPos = $(this).offset().top,
          targetHeight = $(this).height(),
          $h2 = $(this).find('h2'),
          $divider = $(this).find('.divider'),
          $subtitle = $(this).find('.subtitle');
      if (scroll >= targetPos - windowHeight + 100 && scroll < (targetPos + targetHeight)) {
        $h2.css('opacity', '1').addClass('slideInUp animated')
          .delay(250)
          .queue(function() {
            $divider.css('opacity', '1').addClass('fadeInLeft animated');
            $(this).dequeue();
          })
          .delay(300)
          .queue(function() {
            $subtitle.css('opacity', '1').addClass('fadeInDown animated');
            $(this).dequeue();
          });
      }
    });

    // section animation
    $('.wp').each(function() {
      var animationName = $(this).data('animation') || 'none',
          animationDelay = $(this).data('delay') ? $(this).data('delay') : '0s',
          targetPos = $(this).offset().top,
          targetHeight = $(this).height();
      if (scroll >= targetPos - windowHeight + 100 && scroll < (targetPos + targetHeight)) {
        $(this).css('opacity', '1').addClass(animationName);
        $(this)[0].style.animationDelay = animationDelay;
      }
    });

    // progress bar
    $('.skillbar-rate').each(function() {
      var skillbarPos = $('.skillbar-wrap').offset().top,
          skillbarHeight = $('.skillbar-wrap').height(),
          rate = $(this).find('div').data('progress');
      if (scroll >= skillbarPos - windowHeight + 100 && scroll < skillbarPos + skillbarHeight) {
        $(this).find('div').css('width', rate + '%').dequeue();
      }
    });

    
    if (menuShow) {
      $('.nav-menu').addClass('menu-close').removeClass('menu-open');
      setTimeout(function() {
        $('.menu-overlay')[0].style = '';
      }, 280);
      menuShow = false;
    }







  });
  // Scroll down icon click event
  $('.scrolldown').on('click', scrollDown);
  // Nav scroll to content
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var $target = $(this.hash);
    if ($target.length) {
      $('html, body').stop().animate({
        scrollTop: $target.offset().top - 50
      }, 600);
    }
  });

  function scrollDown(e) {
    if ($(window).scrollTop() > $('.main').offset().top / 2) { return }
    var scroll = e.deltaY * -1 || e.wheelDelta || e.detail * -1;
    var scrollDown = (scroll < 0) ? true : false;
    if (scrollDown) {
      e.preventDefault();
      $('.hero-primary').addClass('animated bounceOutRight');
      $('.hero-sub').addClass('bounceOutUp');
      $('.navigation').css('willChange', 'transform, opacity');
      $('body').css('willChange', 'scroll-position')
        .delay(1000)
        .removeClass('stop-scrolling').css('margin-right', '-0.35rem')
        .queue(function() {
          $('html, body').stop().animate({
            scrollTop: $('.main').offset().top
          });
          $(this).dequeue();
        })
        .delay(250)
        .queue(function() {
          $(this).css('willChange', 'unset').dequeue();
        });
      // setTimeout(function() {
      //   $('body').removeClass('stop-scrolling').css('margin-right', '-0.35rem');
      //   $('html, body').stop().animate({
      //     scrollTop: $('.main').offset().top
      //   }, 250);
      // }, 1000);
    } else { 
      return;
    }
    setTimeout(function() {
      $('.hero-primary').removeClass('animated bounceOutRight');
      $('.hero-sub').removeClass('bounceOutUp');
    }, 1500);
    // mousedown = true;
  }

  // Check if Mobile Device 
  function mobileCheck() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
    } else {
       return false;
    }
  }

  // -------------------------------//
  // Profile                     //
  // -------------------------------//
  var randomBefore = 0,
      setTextSlider = startInterval(8, textSlider);
  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  if (isIE || isEdge) {
    $('.photo-wrap').css('margin-right', '30px');
  }

  $('#profile .hexbox').on('mouseenter', showText);
  $('#profile .hexbox').on('mouseleave', function() {
    setTextSlider = setInterval(textSlider, 8000);
  });
 
  function textSlider() {
    var random = Math.floor(Math.random() * 4);
    if (random === randomBefore) { 
      textSlider(); 
      return; 
    }
    var $text = $('#profile .hexbox').eq(random).data('title'),
        $target = $('.personality'),
        $relatedItem = $('#profile .hexbox').eq(random).parent();
    $('#profile .hexbox').parent().removeClass('active');
    $relatedItem.addClass('active');
    $target.removeClass('fadeInLeft');
    setTimeout(function() {
      $('.personality').text($text);
      $target.addClass('fadeInLeft');
    }, 100);

    randomBefore = random;
  }

  function showText(e) {
    var $text = $(e.target).data('title'),
        $target = $('.personality'),
        $relatedItem = $(e.target).parent();
    clearInterval(setTextSlider);
    $target.removeClass('fadeInLeft');
    $('#profile .hexbox').parent().removeClass('active');
    $relatedItem.addClass('active');
    setTimeout(function() {
      $target.text($text);
      $target.addClass('fadeInLeft');
    }, 100);
    e.stopPropagation();
  }

  function startInterval(seconds, callback) {
    callback();
    return setInterval(callback, seconds * 1000);
  }

  // -------------------------------//
  // Skillbar                       //
  // -------------------------------//
  $('.skillbar').on('mouseenter', function(e) {
    e.stopPropagation();
    var target = $(e.target).data('target');
    $('.skillbar').removeClass('active');
    $(e.target).addClass('active');
    $('.skillbar-description').removeClass('show');
    $('.skillbar-description').each(function() {
      if (viewport < 768) {
        $(this).slideUp();
      }
      if ($(this).is('#' + target)) {
        $(this).addClass('show');
        if (viewport < 768) {
          $(this).slideDown();
        }
      }
    });
  });

  // -------------------------------//
  // portfolio                     //
  // -------------------------------//

  $('#portfolio .more').on('click', function(e) {
    var target = $(e.target).data('target');
    if (mobileCheck()) {
      $('html, body').stop().animate({
        scrollTop: $('.portfolio-present').offset().top - 55
      });
    }
    $('.present-panel').removeClass('show');
    $('.present-panel').each(function() {
      if ($(this).is(target)) {
        $(this).css('willChange', 'transform, opacity')
        .delay(300)
        .addClass('show')
        .queue(function() {
          $(this).css('willChange', 'unset');
          $(this).dequeue();
        });
      }
    });
  });
  $('.back-to-porto').on('click', function() {
    $('html, body').stop().animate({
      scrollTop: $('#portfolio').offset().top
    });
  });
  
  // Totop btn
  $('.totop').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('totop-animation');
    $('html, body').css('willChange', 'scroll-position')
      .stop().delay(600).animate({
        scrollTop: 0
      }, 400)
      .delay(300)
      .queue(function() {
        $(this).css('willChange', 'unset').dequeue();
      });
  });
  $('.totop').on('animationend', function() {
    $('.totop').removeClass('totop-animation');
  });

  $('.carousel-indicators').on('click', function(e) { console.log(e.target) })









});

