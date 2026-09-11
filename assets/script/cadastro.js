document.addEventListener("DOMContentLoaded", () => {

    // Seleciona o formulário
    const form = document.querySelector("form");

    // Seleciona todas as etapas
    const etapas = form.querySelectorAll("fieldset");

    // Índice da etapa atual
    let etapaAtual = 0;


    // ==============================
    // MOSTRAR APENAS UMA ETAPA
    function mostrarEtapa(indice) {

        etapas.forEach((etapa, index) => {

            if (index === indice) {
                etapa.style.display = "";
            } else {
                etapa.style.display = "none";
            }

        });

        etapaAtual = indice;
    }

    // TELA INICIAL

    // Inicialmente mostra somente
    // a escolha do tipo de usuário
    mostrarEtapa(0);

    // CONFIRMAR TIPO DE USUÁRIO
    const botaoConfirmar = document.querySelector(
        "#confirmar-tipo-usuario"
    );

    botaoConfirmar.addEventListener("click", (event) => {

        // Impede o formulário de ser enviado
        event.preventDefault();

        // Verifica qual tipo foi selecionado
        const tipoUsuario = document.querySelector(
            'input[name="tipo-usuario"]:checked'
        );

        // Se nenhum tipo foi selecionado
        if (!tipoUsuario) {
            alert("Selecione um tipo de usuário.");
            return;
        }

        // Vai para a primeira etapa do cadastro
        mostrarEtapa(1);
    });

    // BOTÕES AVANÇAR
    const botoesAvancar = form.querySelectorAll(
        ".botao-avancar"
    );

    botoesAvancar.forEach((botao) => {

        botao.addEventListener("click", (event) => {

            event.preventDefault();

            // Verifica se ainda existem etapas
            if (etapaAtual < etapas.length - 1) {

                mostrarEtapa(etapaAtual + 1);

            }

        });

    });

    // BOTÕES VOLTAR
    const botoesVoltar = form.querySelectorAll(
        ".botao-voltar"
    );

    botoesVoltar.forEach((botao) => {

        botao.addEventListener("click", (event) => {

            event.preventDefault();

            // Não permite voltar antes da tela inicial
            if (etapaAtual > 0) {

                mostrarEtapa(etapaAtual - 1);

            }

        });

    });

});
