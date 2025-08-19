// CPM - JavaScript Ultra Moderno e Minimalista

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Configurações
    const config = {
        scrollThreshold: 50,
        animationDuration: 300,
        debounceDelay: 100
    };
    
    // Elementos principais
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    
    // ===== HEADER SCROLL EFFECT =====
    function initHeaderScroll() {
        let ticking = false;
        
        function updateHeader() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > config.scrollThreshold) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
        updateHeader(); // Estado inicial
    }
    
    // ===== SMOOTH SCROLL =====
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== INTERSECTION OBSERVER ANIMATIONS =====
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Animar seções
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
        
        // Animar elementos específicos
        const animatedElements = document.querySelectorAll('.stat-item, .feature, .benefit, .visual-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(el);
        });
    }
    
    // ===== HOVER EFFECTS =====
    function initHoverEffects() {
        // Cards de estatísticas
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Cards visuais
        const visualCards = document.querySelectorAll('.visual-card');
        visualCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Features e benefits
        const interactiveItems = document.querySelectorAll('.feature, .benefit');
        interactiveItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--gray-50)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
        });
    }
    
    // ===== BUTTON INTERACTIONS =====
    function initButtonInteractions() {
        const buttons = document.querySelectorAll('.cta-btn, .nav-btn, .action-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Efeito de clique
                this.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Ações específicas
                if (this.classList.contains('whatsapp-btn')) {
                    e.preventDefault();
                    const whatsappUrl = 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK';
                    window.open(whatsappUrl, '_blank');
                }
            });
        });
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    function initPerformanceOptimizations() {
        // Lazy loading para imagens
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Debounce para eventos de resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Recalcular posições se necessário
            }, config.debounceDelay);
        });
    }
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    function initAccessibility() {
        // Foco visível para navegação por teclado
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--gray-400)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
        
        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Pular para o conteúdo';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--black);
            color: var(--white);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // ===== UTILITY FUNCTIONS =====
    const utils = {
        // Debounce function
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle function
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        // Smooth scroll to element
        scrollToElement: function(element, offset = 0) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // ===== ERROR HANDLING =====
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
        });
        
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
    }
    
    // ===== ANALYTICS (PLACEHOLDER) =====
    function initAnalytics() {
        // Track button clicks
        const trackButtons = document.querySelectorAll('.cta-btn, .nav-btn');
        trackButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                console.log('Button clicked:', buttonText);
                // Aqui você pode adicionar seu código de analytics
            });
        });
        
        // Track scroll depth
        let maxScroll = 0;
        const trackScroll = utils.throttle(() => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track every 25%
                    console.log('Scroll depth:', maxScroll + '%');
                    // Aqui você pode adicionar seu código de analytics
                }
            }
        }, 1000);
        
        window.addEventListener('scroll', trackScroll);
    }
    
    // ===== INITIALIZATION =====
    function init() {
        try {
            initHeaderScroll();
            initSmoothScroll();
            initAnimations();
            initHoverEffects();
            initButtonInteractions();
            initPerformanceOptimizations();
            initAccessibility();
            initErrorHandling();
            initAnalytics();
            
            console.log('CPM - Site inicializado com sucesso! 🚀');
        } catch (error) {
            console.error('Erro na inicialização:', error);
        }
    }
    
    // Executar inicialização
    init();
    
    // ===== EXPOSE UTILITIES FOR DEBUGGING =====
    window.CPMUtils = utils;
});