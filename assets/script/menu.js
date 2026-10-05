// Containers
const container_menus = document.getElementById("container-menus");
const container_notificacoes = document.getElementById("container-notificacoes");
const container_configuracoes = document.getElementById("container-configuracoes");
const container_perfil = document.getElementById("container-perfil");

// Botões
const botoes_fechar = document.querySelectorAll(".botao-fechar");
const botao_notificacoes = document.getElementById("botao-notificacoes");
const botao_configuracoes = document.getElementById("botao-configuracoes");
const botao_perfil = document.getElementById("botao-perfil");

// Função para fechar os popups
function fecharMenus() {
    container_menus.style.display = "none";
    container_notificacoes.style.display = "none";
    container_configuracoes.style.display = "none";
    container_perfil.style.display = "none";
}

// Notificações
botao_notificacoes.addEventListener("click", () => {
    container_menus.style.display = "flex";
    container_notificacoes.style.display = "flex";
});

// Configurações
botao_configuracoes.addEventListener("click", () => {
    container_menus.style.display = "flex";
    container_configuracoes.style.display = "flex";
});

// Perfil
botao_perfil.addEventListener("click", () => {
    container_menus.style.display = "flex";
    container_perfil.style.display = "flex";
});

// Fecha somente se clicar no fundo, fora dos popups
container_menus.addEventListener("click", (event) => {
    if (event.target === container_menus) {
        fecharMenus();
    }
});

// Botão de Fechar
botoes_fechar.forEach((botao) =>{
    botao.addEventListener("click", fecharMenus)
});