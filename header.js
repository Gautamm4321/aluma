class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        site-header {
          display: block;
          width: 100%;
        }

        .nav {
          --nfg: 244, 241, 234;   /* Text & logo color (White default) */
          --nbg: 8, 8, 8;         /* Solid button text color (Black default) */
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: calc(env(safe-area-inset-top, 0px) + 18px) clamp(20px, 4vw, 60px) 18px;
          background: transparent;
          color: rgb(var(--nfg));
          transition: color 0.45s ease;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: rgb(var(--nfg));
        }

        .brand svg {
          width: 30px;
          height: auto;
        }

        .brand svg circle {
          fill: rgb(var(--nfg));
          transition: fill 0.45s ease;
        }

        .brand b {
          font-weight: 500;
          font-size: 15px;
          letter-spacing: 0.28em;
          color: rgb(var(--nfg));
          transition: color 0.45s ease;
        }

        .nav nav {
          display: flex;
          gap: 30px;
          margin-left: auto;
        }

        .nav nav a {
          text-decoration: none;
          font-size: 14px;
          opacity: 0.72;
          color: rgb(var(--nfg)) !important;
          transition: opacity 0.25s, color 0.45s ease;
        }

        .nav nav a:hover {
          opacity: 1;
        }

        .nav .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6em;
          height: 40px;
          padding: 0 18px; /* Exact match to index.html */
          border-radius: 999px;
          font: 500 14px/1 'Jost', sans-serif;
          letter-spacing: 0.01em;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          background: rgb(var(--nfg));
          color: rgb(var(--nbg)) !important;
          border: 1px solid rgb(var(--nfg));
          transition: background 0.3s, color 0.3s, border-color 0.3s, opacity 0.25s;
        }

        .nav .btn:hover {
          opacity: 0.88;
        }

        .menu-btn {
          display: none;
          position: relative;
          flex: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(var(--nfg), 0.4);
          background: transparent;
          cursor: pointer;
          transition: border-color 0.45s ease;
        }

        .menu-btn i {
          position: absolute;
          left: 13px;
          right: 13px;
          height: 1.5px;
          background: rgb(var(--nfg));
          transition: transform 0.35s ease, background 0.45s ease;
        }

        .menu-btn i:first-child { top: 17px; }
        .menu-btn i:last-child { top: 25px; }

        /* When drawer is open: keep header light on black overlay */
        .menu-open .nav {
          --nfg: 244, 241, 234 !important;
          --nbg: 8, 8, 8 !important;
        }

        .menu-open .menu-btn i:first-child { transform: translateY(4px) rotate(45deg); }
        .menu-open .menu-btn i:last-child { transform: translateY(-4px) rotate(-45deg); }

        .menu {
          position: fixed;
          inset: 0;
          z-index: 990;
          background: #080808;
          color: #F4F1EA;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: calc(env(safe-area-inset-top, 0px) + 96px) clamp(20px, 4vw, 60px) calc(env(safe-area-inset-bottom, 0px) + 28px);
          overflow-y: auto;
        }

        .menu[hidden] {
          display: none !important;
        }

        .menu nav {
          display: flex;
          flex-direction: column;
        }

        .menu nav a {
          display: flex;
          align-items: baseline;
          gap: 16px;
          text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(34px, 9.5vw, 56px);
          letter-spacing: -0.02em;
          line-height: 1.15;
          padding: 10px 0;
          border-bottom: 1px solid rgba(244, 241, 234, 0.12);
          color: #F4F1EA !important;
        }

        .menu nav a small {
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.1em;
          opacity: 0.45;
          min-width: 22px;
          color: #F4F1EA;
        }

        .menu-foot {
          display: grid;
          gap: 12px;
          margin-top: 32px;
        }

        .menu-foot .stores {
          display: flex;
          gap: 10px;
        }

        .menu-foot .stores .btn {
          flex: 1;
          height: 48px;
          border-radius: 999px;
          border: 1px solid rgba(244, 241, 234, 0.55);
          background: transparent;
          color: #F4F1EA;
          font: 500 15px/1 'Jost', sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .menu-foot > .btn.solid {
          height: 48px;
          border-radius: 999px;
          background: #F4F1EA;
          color: #080808;
          border: 1px solid #F4F1EA;
          font: 500 15px/1 'Jost', sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .menu-foot .small {
          font-size: 13px;
          line-height: 1.45;
          opacity: 0.7;
          margin-top: 6px;
          color: #F4F1EA;
        }

        @media (max-width: 760px), (max-aspect-ratio: 9/10) {
          .nav nav { display: none; }
          .nav { gap: 10px; }
          .nav > .btn { margin-left: auto; height: 44px; padding: 0 20px; }
          .nav-book .long { display: none; }
          .brand b { font-size: 13px; letter-spacing: 0.22em; }
          .menu-btn { display: block; }
        }
      </style>

      <header class="nav" id="mainNavBar">
        <a class="brand" href="index.html#top" aria-label="Aluma, back to top">
          <svg viewBox="0 0 116 96" aria-hidden="true">
            <circle cx="58" cy="25" r="23"></circle>
            <circle cx="25" cy="71" r="23"></circle>
            <circle cx="91" cy="71" r="23"></circle>
          </svg>
          <b>ALUMA.SALON</b>
        </a>
        <nav aria-label="Main">
          <a href="index.html#about">About</a>
          <a href="index.html#experience">Experience</a>
          <a href="index.html#services">Services</a>
          <a href="index.html#locations">Locations</a>
          <a href="menu.html">Menu</a>
          <a href="passes.html">Passes</a>
          <a href="index.html#app">App</a>
        </nav>
        <a class="btn sm solid nav-book" href="index.html#book">Book<span class="long"> appointment</span></a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu">
          <i></i><i></i>
        </button>
      </header>

      <div id="menu" class="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
        <nav aria-label="Mobile">
          <a href="index.html#about"><small>01</small>About</a>
          <a href="index.html#experience"><small>02</small>Experience</a>
          <a href="index.html#services"><small>03</small>Services</a>
          <a href="index.html#locations"><small>04</small>Locations</a>
          <a href="menu.html"><small>05</small>Menu</a>
          <a href="passes.html"><small>06</small>Passes</a>
          <a href="index.html#app"><small>07</small>App</a>
        </nav>
        <div class="menu-foot">
          <a class="btn solid" href="index.html#book">Book an appointment</a>
          <div class="stores">
            <a class="btn" href="https://play.google.com/store/apps/details?id=com.aluma.salon" target="_blank" rel="noopener">Google Play</a>
            <a class="btn" href="https://apps.apple.com/in/app/aluma-salon/id6498151574" target="_blank" rel="noopener">App Store</a>
          </div>
          <p class="small">One membership for hair and beauty. Now live in Bengaluru.</p>
        </div>
      </div>
    `;

    const nav = this.querySelector('#mainNavBar');
    const menuBtn = this.querySelector('.menu-btn');
    const menu = this.querySelector('#menu');

    /* ---------- Automatic Color Switching ---------- */
    const parseColor = (str) => {
      const match = str && str.match(/rgba?\(([^)]+)\)/);
      if (!match) return null;
      const parts = match[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
      return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
    };

    const getBgLuminance = () => {
      const yPos = nav.offsetHeight / 2;
      const elements = document.elementsFromPoint(window.innerWidth / 2, yPos) || [];

      for (const el of elements) {
        if (this.contains(el)) continue;
        const color = parseColor(getComputedStyle(el).backgroundColor);
        if (color && color.a >= 0.6) {
          return (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
        }
      }

      // Check for patch.html hero frame
      const hero = document.querySelector('.hero-split-frame');
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        return heroBottom > 70 ? 0 : 0.8; // 0 = dark (white text), 0.8 = sage (black text)
      }

      const bodyColor = parseColor(getComputedStyle(document.body).backgroundColor);
      if (bodyColor && bodyColor.a > 0.3) {
        return (0.299 * bodyColor.r + 0.587 * bodyColor.g + 0.114 * bodyColor.b) / 255;
      }
      return 0.8;
    };

    let currentTheme = '';
    const updateHeaderTheme = () => {
      if (document.documentElement.classList.contains('menu-open')) return;
      const lum = getBgLuminance();
      const theme = lum > 0.5 ? 'dark-text' : 'light-text';

      if (theme === currentTheme) return;
      currentTheme = theme;

      if (theme === 'dark-text') {
        // Light background -> Dark text (#080808)
        nav.style.setProperty('--nfg', '8,8,8');
        nav.style.setProperty('--nbg', '244,241,234');
      } else {
        // Dark background -> Light text (#F4F1EA)
        nav.style.setProperty('--nfg', '244,241,234');
        nav.style.setProperty('--nbg', '8,8,8');
      }
    };

    window.addEventListener('scroll', updateHeaderTheme, { passive: true });
    window.addEventListener('resize', updateHeaderTheme);
    updateHeaderTheme();

    /* ---------- Mobile Menu Drawer Toggle ---------- */
    if (menuBtn && menu) {
      const setMenu = (open) => {
        document.documentElement.classList.toggle('menu-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menu.hidden = !open;
        document.body.style.overflow = open ? 'hidden' : '';
        if (!open) {
          currentTheme = '';
          updateHeaderTheme();
        }
      };

      menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = !document.documentElement.classList.contains('menu-open');
        setMenu(isOpen);
        if (!isOpen) menuBtn.focus();
      });

      menu.addEventListener('click', (e) => {
        if (e.target.closest('a')) setMenu(false);
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.documentElement.classList.contains('menu-open')) {
          setMenu(false);
          menuBtn.focus();
        }
      });
    }
  }
}

customElements.define('site-header', SiteHeader);