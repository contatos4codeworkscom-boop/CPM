document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const inscriptionBtns = document.querySelectorAll('.inscription-btn, .primary-btn');
    
    // Header scroll effect
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle WhatsApp button click
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Replace with your actual WhatsApp group link
            const whatsappUrl = 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK';
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Initial call to set header state
    handleScroll();
});