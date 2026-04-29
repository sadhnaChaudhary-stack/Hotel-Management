/* ============================================
   HOTEL LUXE - Main JavaScript
============================================ */

$(document).ready(function () {

  /* ---- Navbar scroll effect ---- */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('.navbar-custom').addClass('scrolled');
    } else {
      $('.navbar-custom').removeClass('scrolled');
    }
  });

  /* ---- Hero particles generator ---- */
  function generateParticles() {
    var container = $('.hero-particles');
    if (!container.length) return;
    for (var i = 0; i < 18; i++) {
      var size    = Math.random() * 10 + 4;
      var left    = Math.random() * 100;
      var delay   = Math.random() * 8;
      var duration= Math.random() * 10 + 8;
      var particle = $('<div class="particle"></div>').css({
        width:    size + 'px',
        height:   size + 'px',
        left:     left + '%',
        animationDelay:    delay + 's',
        animationDuration: duration + 's'
      });
      container.append(particle);
    }
  }
  generateParticles();

  /* ---- Scroll-reveal animation ---- */
  function revealOnScroll() {
    $('.animate-on-scroll').each(function () {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();
      if (elementTop < viewportBottom - 80) {
        $(this).addClass('visible');
      }
    });
  }
  revealOnScroll();
  $(window).on('scroll', revealOnScroll);

  /* ---- Smooth scroll for anchor links ---- */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 70 }, 700);
    }
  });

  /* ---- Active nav link ---- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.navbar-custom .nav-link').each(function () {
    var href = $(this).attr('href');
    if (href === currentPage) $(this).addClass('active');
  });

  /* ---- Room Detail: Image thumb switcher ---- */
  $(document).on('click', '.detail-thumb', function () {
    var newSrc = $(this).find('img').attr('src');
    $('.detail-gallery-main img').fadeOut(200, function () {
      $(this).attr('src', newSrc).fadeIn(300);
    });
    $('.detail-thumb').removeClass('active');
    $(this).addClass('active');
  });

  /* ---- Rooms filter (client-side demo) ---- */
  $('#filterForm').on('submit', function (e) {
    e.preventDefault();
    var type = $('#roomType').val();
    var maxPrice = parseInt($('#maxPrice').val()) || 99999;

    $('.room-card-wrapper').each(function () {
      var cardType  = $(this).data('type') || '';
      var cardPrice = parseInt($(this).data('price')) || 0;
      var show = true;
      if (type && type !== '' && cardType !== type) show = false;
      if (cardPrice > maxPrice) show = false;
      if (show) {
        $(this).fadeIn(400);
      } else {
        $(this).fadeOut(300);
      }
    });

    // Update count
    var visible = $('.room-card-wrapper:visible').length;
    $('#roomsCount').text(visible);
  });

  /* ---- Rooms: sort ---- */
  $('#sortSelect').on('change', function () {
    var val = $(this).val();
    var $container = $('#roomsGrid');
    var $items = $container.children('.room-card-wrapper').get();

    $items.sort(function (a, b) {
      var pa = parseInt($(a).data('price')) || 0;
      var pb = parseInt($(b).data('price')) || 0;
      if (val === 'price-asc') return pa - pb;
      if (val === 'price-desc') return pb - pa;
      return 0;
    });

    $.each($items, function (i, item) { $container.append(item); });
  });

  /* ---- Wishlist toggle ---- */
  $(document).on('click', '.btn-wishlist', function () {
    var $icon = $(this).find('i');
    if ($icon.hasClass('far')) {
      $icon.removeClass('far').addClass('fas').css('color', '#e74c3c');
      $(this).find('span').text(' Saved to Wishlist');
    } else {
      $icon.removeClass('fas').addClass('far').css('color', '');
      $(this).find('span').text(' Add to Wishlist');
    }
  });

  /* ---- Counter animation ---- */
  function animateCounters() {
    $('.counter-num').each(function () {
      var $el    = $(this);
      var target = parseInt($el.data('target')) || 0;
      var current = 0;
      var step   = Math.ceil(target / 60);
      var timer  = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        $el.text(current);
      }, 25);
    });
  }

  // Trigger counter when stats section is visible
  var counterDone = false;
  $(window).on('scroll', function () {
    if (counterDone) return;
    var $stats = $('.hero-stats');
    if (!$stats.length) return;
    if ($(window).scrollTop() + $(window).height() > $stats.offset().top) {
      animateCounters();
      counterDone = true;
    }
  });
  animateCounters(); // also run immediately for hero

  /* ---- Tooltip init ---- */
  $('[data-bs-toggle="tooltip"]').tooltip();

  /* ---- Book Now date validation ---- */
  var today = new Date().toISOString().split('T')[0];
  $('input[type="date"]').attr('min', today);

  $('input#checkIn').on('change', function () {
    var checkIn = $(this).val();
    $('input#checkOut').attr('min', checkIn);
  });

  /* ---- Preloader ---- */
 
});



