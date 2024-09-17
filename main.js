const campoCep = document.querySelector('#cep');
const campoErroCep = document.querySelector('#cepError');
const campoRua = document.querySelector('#street');
const campoNumero = document.querySelector('#number');
const campoBairro = document.querySelector('#neighborhood');
const campoCidade = document.querySelector('#city');
const campoEstado = document.querySelector('#state');
const campoCarregando = document.querySelector('img#loading');
const campoFormulario = document.querySelector('form');

campoCep.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      let cep = campoCep.value;
      
      if (/\d{5}-?\d{3}/.test(cep)) {
        carregarInfoCep(cep);
      } else {
        mostrarErroCep();
      }
    }
  });
  

function carregarInfoCep(cep) {
  campoCarregando.classList.toggle('hidden');
  campoFormulario.classList.toggle('loading');
  let url = `https://viacep.com.br/ws/${cep}/json/`;
  fetch(url)
    .then(res => res.json())
    .then(infoCep => {
      if (infoCep.erro) {
        limparCamposEndereco();
      } else {
        campoFormulario.classList.toggle('loading');
        campoCarregando.classList.toggle('hidden');
        campoRua.value = infoCep.logradouro;
        campoBairro.value = infoCep.bairro;
        campoCidade.value = infoCep.localidade;
        campoEstado.value = infoCep.uf;

        campoNumero.focus();
        limparErroCep();
      }
    })
    .catch(error => {
      mostrarErroCep();
    });
}

function limparErroCep() {
  campoCep.classList.remove('input-cep-error');
  campoErroCep.classList.add('hidden');
}

function mostrarErroCep() {
  campoCep.classList.add('input-cep-error');
  campoErroCep.classList.remove('hidden');
  limparCamposEndereco();
}

function limparCamposEndereco() {
  campoRua.value = '';
  campoNumero.value = '';
  campoBairro.value = '';
  campoCidade.value = '';
  campoEstado.value = '';
}