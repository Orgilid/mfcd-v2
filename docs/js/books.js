  function openPdfModal(url) {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    frame.src = url + '#toolbar=0'; // toolbar=0 нь татах товчийг нуухад тусалдаг
    modal.classList.add('is-active');
  }

  function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    modal.classList.remove('is-active');
    frame.src = '';
  }