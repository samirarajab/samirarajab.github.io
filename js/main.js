;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

		});

	};

	// Page Nav
	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-fh5co-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};

	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#fh5co-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top fh5co-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter-section').length > 0 ) {
			$('#fh5co-counter-section').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};

	// Document on load.
	$(function(){

		parallax();
		burgerMenu();
		clickMenu();
		windowScroll();
		navigationSection();
		counterWayPoint();
		contentWayPoint();

		// EmailJS form
		(function initEmailForm() {

			console.log('Inicializando EmailJS...');

			if (typeof emailjs === 'undefined') {
				console.error('EmailJS não foi carregado.');
				return;
			}

			emailjs.init("dlY8ZFVmeC6kyqwcp");

			const form = document.getElementById('contact-form');

			if (!form) {
				console.error('Formulário #contact-form não encontrado.');
				return;
			}

			console.log('Formulário encontrado.');

			const nameInput = document.getElementById('name');
			const emailInput = document.getElementById('email');
			const phoneInput = document.getElementById('phone');
			const messageInput = document.getElementById('message');
			const submitButton = document.getElementById('btn-submit');
			const status = document.getElementById('form-status');


			// =========================
			// Formatação do telefone
			// =========================

			phoneInput.addEventListener('input', function() {

				let value = this.value.replace(/\D/g, '');

				// Limita a 11 números
				value = value.substring(0, 11);

				if (value.length <= 10) {

					// (XX) XXXX-XXXX
					value = value.replace(
						/^(\d{2})(\d{4})(\d{0,4}).*/,
						'($1) $2-$3'
					);

				} else {

					// (XX) XXXXX-XXXX
					value = value.replace(
						/^(\d{2})(\d{5})(\d{0,4}).*/,
						'($1) $2-$3'
					);
				}

				this.value = value;
			});


			// =========================
			// Funções de validação
			// =========================

			function showError(message) {

				status.textContent = message;
				status.classList.add('error');

			}


			function clearStatus() {

				status.textContent = '';
				status.classList.remove('error');
				status.classList.remove('success');

			}


			function validateEmail(email) {

				return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

			}


			function validatePhone(phone) {

				const numbers = phone.replace(/\D/g, '');

				// Aceita:
				// 10 dígitos: (XX) XXXX-XXXX
				// 11 dígitos: (XX) XXXXX-XXXX

				return numbers.length === 10 || numbers.length === 11;

			}


			// =========================
			// Envio do formulário
			// =========================

			form.addEventListener('submit', function(event) {

				event.preventDefault();

				clearStatus();

				const name = nameInput.value.trim();
				const email = emailInput.value.trim();
				const phone = phoneInput.value.trim();
				const message = messageInput.value.trim();


				// Nome
				if (name.length < 3) {

					showError('Por favor, informe seu nome completo.');

					nameInput.focus();

					return;
				}


				// E-mail
				if (!validateEmail(email)) {

					showError('Por favor, informe um e-mail válido. Exemplo: nome@exemplo.com');

					emailInput.focus();

					return;
				}


				// Telefone
				if (!validatePhone(phone)) {

					showError('Por favor, informe um telefone válido com DDD (somente números).');

					phoneInput.focus();

					return;
				}


				// Mensagem
				if (message.length < 10) {

					showError('Por favor, escreva uma mensagem com pelo menos 10 caracteres.');

					messageInput.focus();

					return;
				}


				// =========================
				// Enviando
				// =========================

				submitButton.disabled = true;
				submitButton.value = 'Enviando...';

				console.log('Enviando formulário...');

				console.log('Nome:', name);
				console.log('Email:', email);
				console.log('Telefone:', phone);
				console.log('Mensagem:', message);

				console.log('Dados enviados pelo formulário:');

				const formData = new FormData(form);

				for (const [key, value] of formData.entries()) {
					console.log(key, ':', value);
				}

				emailjs.sendForm(
					'service_samira',
					'template_samira',
					form
				)
				.then(function(response) {

					console.log(
						'E-mail enviado:',
						response.status,
						response.text
					);

					status.textContent =
						'Mensagem enviada com sucesso! Retornarei em breve.';

					status.classList.add('success');

					form.reset();

				})
				.catch(function(error) {

					console.error('Erro ao enviar:', error);

					showError(
						'Não foi possível enviar sua mensagem. Tente novamente.'
					);

				})
				.finally(function() {

					submitButton.disabled = false;
					submitButton.value = 'Enviar';

				});

			});

		}());

	});

}());