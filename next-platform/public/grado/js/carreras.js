const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

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
  return clean(value).replace(/^\/+|\/+$/g, '').toLowerCase();
}

function getCurrentCareerSlug() {
  const params = new URLSearchParams(window.location.search);
  return normalizePathValue(params.get('carrera'));
}

function applyWidgetDataset(scriptEl, { programa, nivel, modalidad }) {
  if (!scriptEl) return;
  scriptEl.setAttribute('data-programa', clean(programa));
  scriptEl.setAttribute('data-nivel', clean(nivel));
  scriptEl.setAttribute('data-modalidad', clean(modalidad));
}

function configureAndRemountWidget(scriptId, values) {
  const scriptEl = document.getElementById(scriptId);
  if (!scriptEl) return;
  applyWidgetDataset(scriptEl, values);
  const freshScript = document.createElement('script');
  Array.from(scriptEl.attributes).forEach((attr) => {
    freshScript.setAttribute(attr.name, attr.value);
  });
  scriptEl.parentNode.replaceChild(freshScript, scriptEl);
}

function closeMenuPanel() {
  if (!menuPanel || !hamburguerBtn) return;
  menuPanel.classList.remove('active');
  hamburguerBtn.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function showThankYouPage() {
  if (thankYouShown || !thankYouView || !thankYouMenuContent) return;
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
  if (!formulario) return;
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
    if (!fullLeadForm || fullLeadForm.dataset.thankyouBound === '1') return;
    fullLeadForm.dataset.thankyouBound = '1';
    fullLeadForm.addEventListener('submit', () => {
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
    menuPanel.classList.add('active');
    hamburguerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  menuClose.addEventListener('click', () => {
    closeMenuPanel();
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenuPanel();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuPanel.classList.contains('active')) {
      closeMenuPanel();
    }
  });
}

fetch('./programas-CSV/programas.csv')
  .then((response) => response.text())
  .then((csvText) => {
    const parsed = Papa.parse(csvText, { header: true });
    const currentCareer = getCurrentCareerSlug();
    if (!currentCareer) {
      throw new Error('No CSV key found: carrera');
    }

    const data = parsed.data.find((row) => normalizePathValue(row.PATH) === currentCareer);
    if (!data) {
      throw new Error(`No CSV row found for carrera: ${currentCareer}`);
    }

    const hiddenPrograma = clean(data.PROGRAMA_OCULTO || data.PROGRAMA);
    const hiddenNivel = clean(data.NIVEL || data.TIPO);
    const hiddenModalidad = clean(data.MODALIDAD);
    const widgetPrograma = hiddenPrograma || clean(data.CODIGO_FORMULARIO) || clean(data.title);

    document.getElementById('page-title').textContent = data.title || 'Programa';
    document.getElementById('meta-description').content = data.META_DESCRIPCION || '';
    document.getElementById('eyebrow').textContent = `${data.TIPO || ''} ${data.MODALIDAD || ''}`.trim();
    document.getElementById('resolucion').textContent = data.RESOLUCION || '';
    document.getElementById('programa').textContent = data.title || '';
    document.querySelector('.bg-dynamic').style.backgroundImage = `url('${data.IMAGEN_FONDO || ''}')`;
    document.querySelector('.bg-dynamic').style.backgroundAttachment = 'fixed';
    document.getElementById('titulo-obtener').textContent = data.TITULO_A_OBTENER || '';
    document.getElementById('duracion').textContent = data.DURACION || '';
    document.getElementById('descripcion').textContent = data.DESCRIPCION || '';
    document.getElementById('url-brochure').href = data.URL_BROCHURE || '#';
    document.getElementById('url-sitioweb').href = data.URL_SITIOWEB || '#';

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

    if (data.DOBLE_TITULACION && data.DOBLE_TITULACION.trim() !== '') {
      document.getElementById('doble-titulacion-titulo').textContent = data.DOBLE_TITULACION;
      document.getElementById('doble-titulacion-titulo').style.display = 'block';
      document.getElementById('doble-titulacion').textContent = data.DOBLE_TITULACION;
      document.getElementById('doble-titulacion-li').style.display = 'list-item';
    }
  })
  .catch((error) => console.error('Error loading CSV:', error));
