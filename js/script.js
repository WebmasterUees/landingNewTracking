  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Menú Hamburguesa
  const hamburguerBtn = document.getElementById('hamburguerBtn');
  const menuPanel = document.getElementById('menuPanel');
  const menuClose = document.getElementById('menuClose');
  const menuLinks = document.querySelectorAll('.menu-link, .social-btn');
  const thankYouView = document.getElementById('thankYouView');
  const thankYouMenuContent = document.getElementById('thankYouMenuContent');
  const formulario = document.getElementById('formulario');
  let thankYouShown = false;

  function closeMenuPanel() {
    if (!menuPanel || !hamburguerBtn) {
      return;
    }

    menuPanel.classList.remove('active');
    hamburguerBtn.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function showThankYouPage() {
    if (thankYouShown || !thankYouView || !thankYouMenuContent) {
      return;
    }

    const panelLinks = menuPanel ? menuPanel.querySelector('.menu-links') : null;
    if (panelLinks && !thankYouMenuContent.hasChildNodes()) {
      thankYouMenuContent.appendChild(panelLinks);
    }

    closeMenuPanel();
    document.body.classList.add('thankyou-active');
    thankYouShown = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setupThankYouTrigger() {
    if (!formulario) {
      return;
    }

    const observerConfig = {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class']
    };

    const handleSuccess = () => {
      const okStatus = formulario.querySelector('.dm-lead-status.ok');
      if (okStatus && okStatus.textContent.trim().length > 0) {
        showThankYouPage();
      }
    };

    const statusObserver = new MutationObserver(handleSuccess);
    statusObserver.observe(formulario, observerConfig);

    const bindSubmitFallback = () => {
      const fullLeadForm = formulario.querySelector('.dm-lead-form');
      if (!fullLeadForm || fullLeadForm.dataset.thankyouBound === '1') {
        return;
      }

      fullLeadForm.dataset.thankyouBound = '1';
      fullLeadForm.addEventListener('submit', () => {
        // Fallback por si la clase ok tarda en reflejarse en el DOM.
        setTimeout(handleSuccess, 1200);
      });
    };

    const formObserver = new MutationObserver(bindSubmitFallback);
    formObserver.observe(formulario, { childList: true, subtree: true });
    bindSubmitFallback();
  }

  setupThankYouTrigger();

  if (hamburguerBtn && menuPanel && menuClose) {
    hamburguerBtn.addEventListener('click', () => {
      console.log('Menu clicked');
      menuPanel.classList.add('active');
      hamburguerBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', () => {
      console.log('Close clicked');
      closeMenuPanel();
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenuPanel();
      });
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuPanel.classList.contains('active')) {
        closeMenuPanel();
      }
    });
  }

// Lógica para cargar CSV y actualizar la página
fetch('data.csv')
  .then(response => response.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const data = parsed.data[0]; // Asumir primera fila

    // Actualizar elementos
    document.getElementById('page-title').textContent = data.PROGRAMA;
    document.getElementById('meta-description').content = data.META_DESCRIPCION;
    document.getElementById('eyebrow').textContent = data.TIPO + " " + data.MODALIDAD;
    document.getElementById('resolucion').textContent = data.RESOLUCION;
    document.getElementById('programa').textContent = data.PROGRAMA;
    document.querySelector('.bg-dynamic').style.backgroundImage = `url('${data.IMAGEN_FONDO}')`;
    document.querySelector('.bg-dynamic').style.backgroundAttachment = 'fixed';
    document.getElementById('titulo-obtener').textContent = data.TITULO_A_OBTENER;
    document.getElementById('duracion').textContent = data.DURACION;
    document.getElementById('descripcion').textContent = data.DESCRIPCION;
    document.getElementById('url-brochure').href = data.URL_BROCHURE;
    document.getElementById('url-sitioweb').href = data.URL_SITIOWEB;
    document.getElementById('form-script').setAttribute('data-programa', data.CODIGO_FORMULARIO);
    document.getElementById('form-script-mobile').setAttribute('data-programa', data.CODIGO_FORMULARIO);

    // Manejar DOBLE_TITULACION
    if (data.DOBLE_TITULACION && data.DOBLE_TITULACION.trim() !== '') {
      document.getElementById('doble-titulacion-titulo').textContent = data.DOBLE_TITULACION;
      document.getElementById('doble-titulacion-titulo').style.display = 'block';
      document.getElementById('doble-titulacion').textContent = data.DOBLE_TITULACION;
      document.getElementById('doble-titulacion-li').style.display = 'list-item';
    }

    // Para GTM
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `(function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({
        'gtm.start':
          new Date().getTime(), event: 'gtm.js'
      }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', '${data.PIXEL_GTM}');`;
    document.head.appendChild(gtmScript);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${data.PIXEL_GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);
  })
  .catch(error => console.error('Error loading CSV:', error));