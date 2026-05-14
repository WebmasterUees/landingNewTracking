const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((node) => {
  revealObserver.observe(node);
});

const formulario = document.getElementById('formulario');
const thankYouView = document.getElementById('thankYouView');
let thankYouShown = false;

function showThankYouPage() {
  if (thankYouShown || !thankYouView) {
    return;
  }

  document.body.classList.add('thankyou-active');
  thankYouShown = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupThankYouTrigger() {
  if (!formulario) {
    return;
  }

  window.addEventListener('dm:lead-success', showThankYouPage);

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
      setTimeout(handleSuccess, 1200);
    });
  };

  const formObserver = new MutationObserver(bindSubmitFallback);
  formObserver.observe(formulario, { childList: true, subtree: true });
  bindSubmitFallback();
}

setupThankYouTrigger();
