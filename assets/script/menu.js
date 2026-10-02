

const container_menus = document.getElementById("container-menus");
const container_perfil = document.getElementById("container-perfil");

const botao_notificacoes = document.getElementById("botao-notificacoes");
const botao_perfil = document.getElementById("botao-perfil");

botao_perfil.addEventListener('click', () =>{
    container_menus.style.display = "flex";
    container_perfil.style.display = "flex";
});