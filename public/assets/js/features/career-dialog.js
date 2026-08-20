export function initCareerDialogs() {
  const dialogs = Array.from(document.querySelectorAll('[data-career-dialog]'));
  if (!dialogs.length) return;

  let opener = null;

  function closeDialog(dialog) {
    if (dialog?.open) dialog.close();
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const openButton = target.closest('[data-career-dialog-open]');
    if (openButton instanceof HTMLButtonElement) {
      const dialogId = openButton.dataset.careerDialogOpen;
      const dialog = dialogId ? document.getElementById(dialogId) : null;
      if (dialog instanceof HTMLDialogElement) {
        opener = openButton;
        dialog.showModal();
        document.body.classList.add('career-dialog-open');
      }
      return;
    }

    const closeButton = target.closest('[data-career-dialog-close]');
    if (closeButton) closeDialog(closeButton.closest('dialog'));
  });

  dialogs.forEach((dialog) => {
    // El pseudo-elemento ::backdrop no recibe eventos. Un click cuya coordenada
    // queda fuera de la caja visible del dialog equivale a click en el backdrop.
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (outside) closeDialog(dialog);
    });

    dialog.addEventListener('close', () => {
      document.body.classList.remove('career-dialog-open');
      if (opener instanceof HTMLButtonElement && opener.isConnected) opener.focus();
      opener = null;
    });
  });
}
