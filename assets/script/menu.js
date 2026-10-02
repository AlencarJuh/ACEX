// Containers
const container_menus = document.getElementById("container-menus");
const container_notificacoes = document.getElementById("container-notificacoes");
const container_configuracoes = document.getElementById("container-configuracoes");
const container_perfil = document.getElementById("container-perfil");

// Botões
const botao_notificacoes = document.getElementById("botao-notificacoes");
const botao_configuracoes = document.getElementById("botao-configuracoes");
const botao_perfil = document.getElementById("botao-perfil");

// Pop Up de configurações do perfil
botao_notificacoes.addEventListener('click', () =>{
    container_menus.style.display = "flex";
    container_notificacoes.style.display = "flex";
});

// Pop Up de configurações do perfil
botao_configuracoes.addEventListener('click', () =>{
    container_menus.style.display = "flex";
    container_configuracoes.style.display = "flex";
});

// Pop Up de configurações do perfil
botao_perfil.addEventListener('click', () =>{
    container_menus.style.display = "flex";
    container_perfil.style.display = "flex";
});

container_menus.addEventListener('click', () =>{
    container_menus.style.display = "none";
    container_notificacoes.style.display = "none";
    container_configuracoes.style.display = "none";
    container_perfil.style.display = "none";
});