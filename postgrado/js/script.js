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

function hideMecanismoIngresoPostgrado() {
  if (!formulario) {
    return;
  }

  const mecanismoInput = formulario.querySelector('select[name="mecanismo"], input[name="mecanismo"]');
  if (!mecanismoInput) {
    return;
  }

  const mecanismoWrap = mecanismoInput.closest('.full') || mecanismoInput.parentElement;
  if (!mecanismoWrap) {
    return;
  }

  mecanismoInput.value = '';
  mecanismoWrap.style.display = 'none';
}

if (formulario) {
  const observer = new MutationObserver(hideMecanismoIngresoPostgrado);
  observer.observe(formulario, { childList: true, subtree: true });
  hideMecanismoIngresoPostgrado();
}
