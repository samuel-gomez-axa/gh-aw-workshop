(function () {
    var THEME_KEY = 'gh-aw-workshop-color-mode';

    function applyPictureTheme(theme) {
        var sources = document.querySelectorAll('picture source[media]');
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
            if (typeof source.dataset.themeOriginalMedia === 'undefined') {
                source.dataset.themeOriginalMedia = source.media;
            }

            var originalMedia = source.dataset.themeOriginalMedia;
            if (theme === 'auto') {
                source.media = originalMedia;
                continue;
            }

            var schemeMatch =
                /\(\s*prefers-color-scheme\s*:\s*(light|dark)\s*\)/i.exec(
                    originalMedia,
                );
            if (!schemeMatch) continue;
            if (schemeMatch[1].toLowerCase() !== theme) {
                source.media = 'not all';
                continue;
            }

            var responsiveMedia = originalMedia
                .replace(
                    /\s+and\s+\(\s*prefers-color-scheme\s*:\s*(?:light|dark)\s*\)/gi,
                    '',
                )
                .replace(
                    /\(\s*prefers-color-scheme\s*:\s*(?:light|dark)\s*\)\s+and\s+/gi,
                    '',
                )
                .replace(
                    /\(\s*prefers-color-scheme\s*:\s*(?:light|dark)\s*\)/gi,
                    '',
                )
                .trim();
            source.media = responsiveMedia || 'all';
        }
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-color-mode', theme);
        applyPictureTheme(theme);
        var buttons = document.querySelectorAll('[data-theme]');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute(
                'aria-pressed',
                buttons[i].dataset.theme === theme ? 'true' : 'false',
            );
        }
    }

    var stored = localStorage.getItem(THEME_KEY);
    applyTheme(stored === 'light' || stored === 'dark' ? stored : 'auto');
    document.addEventListener('DOMContentLoaded', function () {
        applyPictureTheme(
            document.documentElement.getAttribute('data-color-mode') || 'auto',
        );
    });

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-theme]');
        if (!btn) return;
        var theme = btn.dataset.theme;
        localStorage.setItem(THEME_KEY, theme);
        applyTheme(theme);
    });
})();
