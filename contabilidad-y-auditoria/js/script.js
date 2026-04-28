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

function clean(v) {
  return String(v ?? '').trim();
}

function normalizePathValue(value) {
  return clean(value)
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();
}

function getCurrentPageKeys() {
  const normalizedPath = normalizePathValue(
    window.location.pathname.replace(/index\.html?$/i, '')
  );
  const segments = normalizedPath.split('/').filter(Boolean);

  return {
    folder: segments[segments.length - 1] || '',
    pathname: normalizedPath
  };
}

function applyWidgetDataset(scriptEl, { programa, nivel, modalidad }) {
  if (!scriptEl) {
    return;
  }

  scriptEl.setAttribute('data-programa', clean(programa));
  scriptEl.setAttribute('data-nivel', clean(nivel));
  scriptEl.setAttribute('data-modalidad', clean(modalidad));
}

function configureAndRemountWidget(scriptId, values) {
  const scriptEl = document.getElementById(scriptId);
  if (!scriptEl) {
    return;
  }

  applyWidgetDataset(scriptEl, values);

  const freshScript = document.createElement('script');
  Array.from(scriptEl.attributes).forEach((attr) => {
    freshScript.setAttribute(attr.name, attr.value);
  });

  scriptEl.parentNode.replaceChild(freshScript, scriptEl);
}

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

// Lógica para cargar CSV maestro y actualizar la página según la carpeta actual.
fetch('../programas-CSV/programas.csv')
  .then(response => response.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const currentPage = getCurrentPageKeys();
    const data = parsed.data.find((row) => {
      const rowPath = normalizePathValue(row.PATH);

      return rowPath === currentPage.folder || rowPath === currentPage.pathname;
    });

    if (!data) {
      throw new Error(`No CSV row found for path: ${currentPage.pathname}`);
    }

    const hiddenPrograma = clean(data.PROGRAMA_OCULTO || data.PROGRAMA);
    const hiddenNivel = clean(data.NIVEL || data.TIPO);
    const hiddenModalidad = clean(data.MODALIDAD);
    const widgetPrograma = hiddenPrograma || clean(data.CODIGO_FORMULARIO);

    // Actualizar elementos
    document.getElementById('page-title').textContent = data.PROGRAMA;
    document.getElementById('meta-description').content = data.META_DESCRIPCION;
    document.getElementById('eyebrow').textContent = data.TIPO + " " + data.MODALIDAD;
    document.getElementById('resolucion').textContent = data.RESOLUCION;
    document.getElementById('programa').textContent = data.title;
    document.querySelector('.bg-dynamic').style.backgroundImage = `url('${data.IMAGEN_FONDO}')`;
    document.querySelector('.bg-dynamic').style.backgroundAttachment = 'fixed';
    document.getElementById('titulo-obtener').textContent = data.TITULO_A_OBTENER;
    document.getElementById('duracion').textContent = data.DURACION;
    document.getElementById('descripcion').textContent = data.DESCRIPCION;
    document.getElementById('url-brochure').href = data.URL_BROCHURE;
    document.getElementById('url-sitioweb').href = data.URL_SITIOWEB;
    configureAndRemountWidget('form-script', {
      programa: widgetPrograma,
      nivel: hiddenNivel,
      modalidad: hiddenModalidad
    });
    configureAndRemountWidget('form-script-mobile', {
      programa: widgetPrograma,
      nivel: hiddenNivel,
      modalidad: hiddenModalidad
    });

    // Manejar DOBLE_TITULACION
    if (data.DOBLE_TITULACION && data.DOBLE_TITULACION.trim() !== '') {
      document.getElementById('doble-titulacion-titulo').textContent = data.DOBLE_TITULACION;
      document.getElementById('doble-titulacion-titulo').style.display = 'block';
      document.getElementById('doble-titulacion').textContent = data.DOBLE_TITULACION;
      document.getElementById('doble-titulacion-li').style.display = 'list-item';
    }
  })
  .catch(error => console.error('Error loading CSV:', error));
