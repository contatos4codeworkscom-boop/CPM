document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect - Minimalista
    const header = document.querySelector('.header');
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Carrosséis corrigidos
    function initCarousels() {
        // Carrossel de métricas
        const metricsCarousel = document.querySelector('.metrics-carousel');
        if (metricsCarousel) {
            // Clonar elementos para loop infinito
            const metricCards = metricsCarousel.querySelectorAll('.metric-card');
            metricCards.forEach(card => {
                const clone = card.cloneNode(true);
                metricsCarousel.appendChild(clone);
            });
        }
        
        // Carrossel de features
        const featuresCarousel = document.querySelector('.features-carousel');
        if (featuresCarousel) {
            // Clonar elementos para loop infinito
            const featureItems = featuresCarousel.querySelectorAll('.feature-item');
            featureItems.forEach(item => {
                const clone = item.cloneNode(true);
                featuresCarousel.appendChild(clone);
            });
        }
    }
    
    // Smooth scroll para links internos
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
    
    // Animações de entrada - Minimalistas
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
        
        // Elementos para animar
        const animatedElements = document.querySelectorAll('.inscription-section, .whatsapp-section, .live-stream');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Hover effects minimalistas
    function initHoverEffects() {
        // Cards de métricas
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--color-surface-hover)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
        });
    }
    
    // Botões de ação
    function initActionButtons() {
        // Botão de inscrição
        const inscriptionBtn = document.querySelector('.inscription-cta');
        if (inscriptionBtn) {
            inscriptionBtn.addEventListener('click', function(e) {
                // Adicionar efeito de clique
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }
        
        // Botão WhatsApp
        const whatsappBtn = document.querySelector('.whatsapp-cta');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Adicionar efeito de clique
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Link do WhatsApp (substitua pelo link real)
                const whatsappUrl = 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK';
                window.open(whatsappUrl, '_blank');
            });
        }
        
        // Botão BID
        const bidBtn = document.querySelector('.bid-btn');
        if (bidBtn) {
            bidBtn.addEventListener('click', function(e) {
                // Adicionar efeito de clique
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }
    }
    
    // Loading state minimalista
    function initLoadingState() {
        // Remover loading após carregamento
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
    
    // Performance optimizations
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
        
        // Debounce para scroll
        let scrollTimeout;
        const originalHandleScroll = handleScroll;
        handleScroll = function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(originalHandleScroll, 10);
        };
    }
    
    // Inicializar todas as funcionalidades
    function init() {
        initCarousels();
        initSmoothScroll();
        initAnimations();
        initHoverEffects();
        initActionButtons();
        initLoadingState();
        initPerformanceOptimizations();
        handleScroll(); // Estado inicial
    }
    
    // Executar inicialização
    init();
    
    // Re-inicializar carrosséis em resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initCarousels, 250);
    });
});