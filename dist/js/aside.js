  document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.toggle-sublist');
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        const sublist = this.nextElementSibling;
        sublist.classList.toggle('is-hidden');
      });
    });
  });