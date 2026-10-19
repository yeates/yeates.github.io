// Minimal Modern Interactions
document.addEventListener('DOMContentLoaded', function() {

    // Avatar hover swap with preload
    const avatarImg = document.querySelector('header .avatar img');
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

    // GitHub star counters: <a class="gh-stars" data-repo="owner/name" hidden> placeholders in index.md.
    // Counts come from shields.io's cached JSON endpoint rather than api.github.com, whose
    // 60 req/h per-IP limit is often exhausted behind corporate/university NATs.
    // A counter stays hidden if its request fails.
    const byRepo = {};
    document.querySelectorAll('.gh-stars[data-repo]').forEach((el) => {
        (byRepo[el.dataset.repo] = byRepo[el.dataset.repo] || []).push(el);
    });

    Object.keys(byRepo).forEach((repo) => {
        fetch('https://img.shields.io/github/stars/' + repo + '.json')
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((data) => {
                if (!/^[\d.]+k?$/.test(data.value)) return;
                byRepo[repo].forEach((el) => {
                    el.innerHTML = '<i class="fab fa-github" aria-hidden="true"></i>' +
                        '<i class="fas fa-star" aria-hidden="true"></i>' + data.value;
                    el.setAttribute('aria-label', data.value + ' GitHub stars');
                    el.title = 'GitHub stars';
                    el.hidden = false;
                });
            })
            .catch(() => {});
    });
});
