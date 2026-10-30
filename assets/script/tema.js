const elementoHTML = document.documentElement;

// Recupera a preferência salva
const temaSalvo = localStorage.getItem("tema") || "sistema";

// Valida a preferência
const temasValidos = ["claro", "escuro", "sistema"];

const temaInicial = temasValidos.includes(temaSalvo)
    ? temaSalvo
    : "sistema";

// Aplica o tema
function aplicarTema(tema) {
    elementoHTML.setAttribute("data-tema", tema);

    localStorage.setItem("tema", tema);
}

// Aplica a preferência ao carregar a página
aplicarTema(temaInicial);

// Configura os seletores de tema existentes na página
const seletoresTema = document.querySelectorAll(".seletor-tema");

seletoresTema.forEach(function (seletor) {

    // Exibe a preferência atual
    seletor.value = temaInicial;

    // Detecta a mudança de opção
    seletor.addEventListener("change", function () {
        aplicarTema(seletor.value);

        // Atualiza outros seletores da mesma página
        seletoresTema.forEach(function (outroSeletor) {
            outroSeletor.value = seletor.value;
        });
    });

});