// Minimal Modern Interactions
document.addEventListener('DOMContentLoaded', function() {

    // Avatar hover swap with preload
    const avatarImg = document.querySelector('header .image.avatar img');
    if (avatarImg && avatarImg.dataset.hover) {
        const originalSrc = avatarImg.getAttribute('src');
        const hoverSrc = avatarImg.dataset.hover;
        const preload = new Image();
        preload.src = hoverSrc;

        avatarImg.addEventListener('mouseenter', () => {
            avatarImg.setAttribute('src', hoverSrc);
        });
        avatarImg.addEventListener('mouseleave', () => {
            avatarImg.setAttribute('src', originalSrc);
        });
        avatarImg.addEventListener('focus', () => {
            avatarImg.setAttribute('src', hoverSrc);
        });
        avatarImg.addEventListener('blur', () => {
            avatarImg.setAttribute('src', originalSrc);
        });
    }
});
