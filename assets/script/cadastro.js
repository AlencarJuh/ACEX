const botaoVoltar = document.getElementById('botao-voltar');
const botaoAvancar = document.getElementById('botao-avancar');

const tipoUsuario = document.querySelector('.tipo-usuario');
const dadosPessoais = document.querySelector('.dados-pessoais');
const endereco = document.querySelector('.endereco');
const formacaoAcademica = document.querySelector('.formacao-academica');
const criarSenha = document.querySelector('.criar-senha');

tipoUsuario.style.display = "none";
dadosPessoais.style.display = "none";
endereco.style.display = "none";
formacaoAcademica.style.display = "none";
criarSenha.style.display = "none";

let etapa = 0;

botaoAvancar.addEventListener('click', () => {
  etapa += 1;
});

botaoVoltar.addEventListener('click', () => {
  etapa -= 1;
});

if (etapa == 0){
    tipoUsuario.style.display = "";

}