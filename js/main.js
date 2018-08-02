//Выпадающий список

// Набор функций
var base = {
  // Поиск элементов по классу
  findClass: function(str, node) {
     if(document.getElementsByClassName) return (node || document).getElementsByClassName(str);
     else {
        var node = node || document, list = node.getElementsByTagName('*'), length = list.length, Class = str.split(/\s+/), classes = Class.length, array = [], i, j, key;
        for(i = 0; i < length; i++) {
          key = true;
          for(j = 0; j < classes; j++) if(list[i].className.search('\\b' + Class[j] + '\\b') == -1) key = false;
          if(key) array.push(list[i]);
        }
        return array;
     }
  },
  // Добавление обработчиков событий
  bind: function(node, type, listener) {
    if(node.addEventListener) node.addEventListener(type, listener, false);
    //@cc_on node.attachEvent('on' + type, function() { listener.call(node); });
  },
  // Реализация DOMContentLoaded
  init: [],
  ready: function() {
    if(!arguments.callee.done) {
      arguments.callee.done = true;
      if(this.timer) clearInterval(this.timer);
      var i, length = this.init.length;
      for(i = 0; i < length; i++) this.init[i]();
      this.init = [];
    }
  },
  check: function() {
    var _this = this, listener = function() {
      _this.ready();
    };
    if(document.addEventListener) document.addEventListener('DOMContentLoaded', listener, false);
    if(/KHTML|WebKit/i.test(navigator.userAgent)) this.timer = setInterval(function() {
      if(/loaded|complete/.test(document.readyState)) base.ready();
    }, 10);
    /*@cc_on document.write(unescape('%3CSCRIPT onreadystatechange="if(this.readyState==\'complete\') base.ready()" defer=defer src=\/\/:%3E%3C/SCRIPT%3E')); @*/
    this.bind(window, 'load', listener);
  }
};

// Функции для работы с панельками
var toggler = {
  process: function() {
    var i, list = base.findClass('toggler'), length = list.length;
    for(i = 0; i < length; i++) base.bind(list[i], 'click', this.toggle);
    list = base.findClass('content');
    length = list.length;
    for(i = 0; i < length; i++) list[i].style.display = 'none';
  },
  toggle: function() {
    var content = base.findClass('content', this.parentNode)[0], e = arguments[0] || window.event;
    if(content.style.display == 'block') {
      content.style.display = 'none';
      this.innerHTML = 'Показать больше информации ↓';
    }
    else {
      content.style.display = 'block';
      this.innerHTML = 'Скрыть информацию ↑';
    }
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  }
};

// ищем блоки с классом «toggle» по событию DOMContentLoaded
base.init.push(function() {
  toggler.process();
});

// Запускаем проверку готовности DOM
base.check();


function main() {

(function () {
   'use strict';

	// Hide .navbar first
	$(".navbar").hide();
	
	// Fade in .navbar
	$(function () {
		$(window).scroll(function () {
            // set distance user needs to scroll before we fadeIn navbar
			if ($(this).scrollTop() > 200) {
				$('.navbar').fadeIn();
			} else {
				$('.navbar').fadeOut();
			}
		});

	
	});
	
	// Preloader */
	  	$(window).load(function() {

   	// will first fade out the loading animation 
    	$("#status").fadeOut("slow"); 

    	// will fade out the whole DIV that covers the website. 
    	$("#preloader").delay(500).fadeOut("slow").remove();      

  	}) 

   // Page scroll
  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });

    // Show Menu on Book
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    })

  	$(document).ready(function() {
  	    $("#testimonial").owlCarousel({
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true
        });

  	});

  	// Portfolio Isotope Filter
    $(window).load(function() {
        var $container = $('.portfolio-items');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });
	
	

  // jQuery Parallax
  function initParallax() {
    $('#intro').parallax("100%", 0.3);
    $('#services').parallax("100%", 0.3);
    $('#aboutimg').parallax("100%", 0.3);	
    $('#testimonials').parallax("100%", 0.1);

  }
  initParallax();

  	// Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	

}());


}
main();