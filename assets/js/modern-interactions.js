// Minimal Modern Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll reveal - 保留这个，因为它让内容优雅地出现
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
    
    // Observe all sections and items for smooth reveal
    document.querySelectorAll('section, .publication-item, .experience-item, .news-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Avatar hover swap with preload
    const avatarImg = document.querySelector('header .image.avatar img');
    if (avatarImg && avatarImg.dataset.hover) {
        const originalSrc = avatarImg.getAttribute('src');
        const hoverSrc = avatarImg.dataset.hover;
        // Preload hover image
        const preload = new Image();
        preload.src = hoverSrc;

        avatarImg.addEventListener('mouseenter', () => {
            avatarImg.setAttribute('src', hoverSrc);
        });
        avatarImg.addEventListener('mouseleave', () => {
            avatarImg.setAttribute('src', originalSrc);
        });
        // For keyboard accessibility
        avatarImg.addEventListener('focus', () => {
            avatarImg.setAttribute('src', hoverSrc);
        });
        avatarImg.addEventListener('blur', () => {
            avatarImg.setAttribute('src', originalSrc);
        });
    }
});