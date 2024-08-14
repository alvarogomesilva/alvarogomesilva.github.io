'use strict';


document.addEventListener('DOMContentLoaded', function () {

  setTimeout(function () {
    document.body.classList.add('loaded');
  }, 1500);

});


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "tudo") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// SEND EMAIL

let button = document.querySelector("[data-form-btn]");

function showLoad() {
  let message = document.querySelector('#message');
  message.innerHTML = 'Enviando...'; // Corrigido o texto para 'Enviando...'
  button.setAttribute("disabled", ""); // Desabilita o botão
}

function hideLoad() {
  let message = document.querySelector('#message');
  message.innerHTML = 'Enviar mensagem'; // Mensagem padrão
}

function checkFormValidity() {
  // Verifica se todos os campos do formulário estão preenchidos
  let allFilled = Array.from(form.elements).every(element => {
    return element.type === 'submit' || element.value.trim() !== '';
  });

  if (allFilled) {
    button.removeAttribute("disabled"); // Reabilita o botão se todos os campos estiverem preenchidos
  } else {
    button.setAttribute("disabled", ""); // Desabilita o botão se algum campo estiver vazio
  }
}

(function () {
  emailjs.init('C7kmb49c-DHnuG1UA'); // Substitua pela sua chave pública do EmailJS

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showLoad();

    // Envia o e-mail
    emailjs.sendForm('service_2tjn4k8', 'template_7wya64h', form)
      .then(function (response) {
        console.log('E-mail enviado com sucesso!');
        hideLoad();
        form.reset(); // Limpa o formulário após o envio
        button.setAttribute("disabled", ""); // Desabilita o botão após o envio
      }, function (error) {
        console.error('Erro ao enviar e-mail:', error);
        alert('Falha ao enviar mensagem.');
        hideLoad();
        button.setAttribute("disabled", ""); // Desabilita o botão após erro
      });
  });

  // Adiciona o listener para verificar a validade do formulário
  form.addEventListener('input', checkFormValidity);
})();
