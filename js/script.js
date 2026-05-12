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

function resolvePathAliases(pathValue) {
  const aliases = {
    'grado/ciencias-de-la-computacion': 'grado/computacion',
    'ciencias-de-la-computacion': 'computacion'
  };

  return aliases[pathValue] || pathValue;
}

function setTextById(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = clean(value);
  }
}

function setHrefById(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.href = clean(value);
  }
}

function setElementVisibleById(id, isVisible) {
  const el = document.getElementById(id);
  if (!el) {
    return;
  }

  el.style.display = isVisible ? '' : 'none';
}

function isPostgradoFormContext() {
  if (window.location.pathname.includes('/postgrado/')) {
    return true;
  }

  const scriptEl = document.getElementById('form-script');
  const nivel = scriptEl ? clean(scriptEl.getAttribute('data-nivel')).toLowerCase() : '';
  return nivel === 'postgrado';
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
    subtree: true
  };

  const handleSuccess = () => {
    const okStatus = formulario.querySelector('.dm-lead-status.ok');
    if (okStatus && okStatus.textContent.trim().length > 0) {
      showThankYouPage();
    }
  };

  let statusCheckQueued = false;
  const statusObserver = new MutationObserver(() => {
    if (statusCheckQueued) {
      return;
    }

    statusCheckQueued = true;
    requestAnimationFrame(() => {
      statusCheckQueued = false;
      handleSuccess();
    });
  });
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

function findFieldWrapperByName(fieldName) {
  if (!formulario) {
    return null;
  }

  const input = formulario.querySelector(`[name="${fieldName}"]`);
  if (!input) {
    return null;
  }

  return input.closest('.full') || input.parentElement;
}

function setFieldLabel(wrapper, nextText) {
  if (!wrapper) {
    return;
  }

  const label = wrapper.querySelector('label');
  if (label) {
    label.textContent = nextText;
  }
}

function normalizeLeadFieldLayout() {
  if (!formulario) {
    return;
  }

  const cedulaInput = formulario.querySelector('input[name="cedula"]');
  const ciudadInput = formulario.querySelector('input[name="ciudad"]');
  const mecanismoInput = formulario.querySelector('select[name="mecanismo"], input[name="mecanismo"]');

  const cedulaWrap = findFieldWrapperByName('cedula');
  const ciudadWrap = findFieldWrapperByName('ciudad');
  const mecanismoWrap = mecanismoInput ? (mecanismoInput.closest('.full') || mecanismoInput.parentElement) : null;

  setFieldLabel(cedulaWrap, 'Numero de identificacion');

  if (cedulaInput) {
    cedulaInput.setAttribute('inputmode', 'numeric');
    cedulaInput.setAttribute('autocomplete', 'off');
  }

  if (cedulaWrap) {
    cedulaWrap.classList.remove('full');
  }

  if (ciudadWrap) {
    ciudadWrap.classList.remove('full');
  }

  if (mecanismoWrap) {
    if (isPostgradoFormContext()) {
      mecanismoWrap.style.display = 'none';
      if (mecanismoInput) {
        mecanismoInput.value = '';
      }
    } else {
      mecanismoWrap.style.display = '';
      mecanismoWrap.classList.add('full');
    }
  }
}

function replaceWhatsappIconFallback() {
  if (!formulario) {
    return;
  }

  const icon = formulario.querySelector('i.bi.bi-whatsapp.dm-choice-icon');
  if (icon || formulario.dataset.whatsappIconFixed === '1') {
    return;
  }

  const whatsappChoice = Array.from(formulario.querySelectorAll('.dm-choice'))
    .find((choice) => /whatsapp/i.test(choice.textContent || ''));
  if (!whatsappChoice) {
    return;
  }

  const iconHost = whatsappChoice.querySelector('.dm-choice-icon')
    ? whatsappChoice.querySelector('.dm-choice-icon').parentElement
    : whatsappChoice;

  if (!iconHost || iconHost.querySelector('.dm-choice-icon')) {
    return;
  }

  const referenceIcon = formulario.querySelector('i.dm-choice-icon[class*="bi-"]');
  const fallbackIcon = document.createElement('i');
  fallbackIcon.className = referenceIcon
    ? referenceIcon.className.replace(/bi-[a-z0-9-]+/gi, 'bi-whatsapp')
    : 'bi bi-whatsapp dm-choice-icon';
  iconHost.prepend(fallbackIcon);
  formulario.dataset.whatsappIconFixed = '1';
}

if (formulario) {
  let layoutUpdateQueued = false;
  const layoutObserver = new MutationObserver(() => {
    if (layoutUpdateQueued) {
      return;
    }

    layoutUpdateQueued = true;
    requestAnimationFrame(() => {
      layoutUpdateQueued = false;
      normalizeLeadFieldLayout();
      replaceWhatsappIconFallback();
    });
  });
  layoutObserver.observe(formulario, { childList: true, subtree: true });

  normalizeLeadFieldLayout();
  replaceWhatsappIconFallback();
}

if (hamburguerBtn && menuPanel && menuClose) {
  hamburguerBtn.addEventListener('click', () => {
    menuPanel.classList.add('active');
    hamburguerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  menuClose.addEventListener('click', () => {
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

// Lógica para cargar CSV según el nivel y actualizar la página según la carpeta actual.
const programsCsvUrl = window.location.pathname.includes('/postgrado/')
  ? '/informacion/programas-CSV/programas-postgrado.csv'
  : '/informacion/programas-CSV/programas-grado.csv';

fetch(programsCsvUrl)
  .then(response => response.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const currentPage = getCurrentPageKeys();
    const aliasFolder = resolvePathAliases(currentPage.folder);
    const aliasPathname = resolvePathAliases(currentPage.pathname);

    const data = parsed.data.find((row) => {
      const rowPath = normalizePathValue(row.PATH);

      return rowPath === currentPage.folder
        || rowPath === currentPage.pathname
        || rowPath === aliasFolder
        || rowPath === aliasPathname;
    });

    if (!data) {
      console.warn(`No CSV row found for path: ${currentPage.pathname}`);
      return;
    }

    const hiddenPrograma = clean(data.PROGRAMA_OCULTO || data.PROGRAMA);
    const hiddenNivel = clean(data.NIVEL || data.TIPO);
    const hiddenModalidad = clean(data.MODALIDAD);
    const widgetPrograma = hiddenPrograma || clean(data.CODIGO_FORMULARIO);

    // Actualizar elementos
    setTextById('page-title', data.PROGRAMA);
    const metaDescription = document.getElementById('meta-description');
    if (metaDescription) {
      metaDescription.content = clean(data.META_DESCRIPCION);
    }
    setTextById('eyebrow', `${clean(data.TIPO)} ${clean(data.MODALIDAD)}`.trim());
    setTextById('resolucion', data.RESOLUCION);
    setTextById('programa', data.title);

    const backgroundEl = document.querySelector('.bg-dynamic');
    if (backgroundEl) {
      backgroundEl.style.backgroundImage = `url('${clean(data.IMAGEN_FONDO)}')`;
      backgroundEl.style.backgroundAttachment = 'fixed';
    }

    setTextById('titulo-obtener', data.TITULO_A_OBTENER);
    setTextById('duracion', data.DURACION);
    setTextById('descripcion', data.DESCRIPCION);
    const brochureUrl = clean(data.URL_BROCHURE);
    const isPostgrado = clean(data.TIPO).toLowerCase() === 'postgrado' || isPostgradoFormContext();
    const showBrochureLink = !isPostgrado && brochureUrl.length > 0;
    setHrefById('url-brochure', brochureUrl);
    setElementVisibleById('url-brochure', showBrochureLink);
    setHrefById('url-sitioweb', data.URL_SITIOWEB);
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
