
const seletorTema = document.getElementById("seletor-tema");
const elementoHTML = document.documentElement;

// Recupera a preferência salva ou utiliza o sistema como padrão
const temaSalvo = localStorage.getItem("tema") || "sistema";

// Aplica o tema selecionado
function aplicarTema(tema) {
    elementoHTML.setAttribute("data-tema", tema);
    localStorage.setItem("tema", tema);
}

// Define a opção selecionada ao abrir a página
if (["claro", "escuro", "sistema"].includes(temaSalvo)) {
    seletorTema.value = temaSalvo;
} else {
    seletorTema.value = "sistema";
}

// Aplica a preferência recuperada
aplicarTema(seletorTema.value);

// Detecta quando o usuário escolhe outra opção
seletorTema.addEventListener("change", function () {
    aplicarTema(seletorTema.value);
});