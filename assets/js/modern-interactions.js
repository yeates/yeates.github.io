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

    // Publication image zoom / lightbox
    const zoomTargets = Array.from(document.querySelectorAll('.pub-image img'));
    const lightbox = document.querySelector('.image-lightbox');
    const lightboxMedia = lightbox ? lightbox.querySelector('.lightbox-media') : null;
    const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    let lastFocusedImage = null;

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('is-visible');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        if (lightboxMedia) {
            lightboxMedia.removeAttribute('src');
        }
        if (lastFocusedImage) {
            lastFocusedImage.focus();
            lastFocusedImage = null;
        }
    };

    const openLightbox = (img) => {
        if (!lightbox || !lightboxMedia) return;
        lastFocusedImage = img;
        const source = img.dataset.fullsize || img.src;
        lightboxMedia.setAttribute('src', source);
        lightboxMedia.setAttribute('alt', img.alt || 'Expanded publication illustration');
        if (lightboxCaption) {
            lightboxCaption.textContent = img.alt || 'Publication figure';
        }
        lightbox.classList.add('is-visible');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
        if (lightboxClose) {
            lightboxClose.focus();
        }
    };

    if (zoomTargets.length && lightbox && lightboxMedia) {
        zoomTargets.forEach((img) => {
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', `Expand ${img.alt || 'publication image'}`);
            img.setAttribute('aria-haspopup', 'dialog');
            img.addEventListener('click', () => openLightbox(img));
            img.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                    event.preventDefault();
                    openLightbox(img);
                }
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightbox.classList.contains('is-visible')) {
                closeLightbox();
            }
        });
    }
});