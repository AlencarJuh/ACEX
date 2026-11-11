
document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS DO HTML

    const mesAnoAtual = document.getElementById("mes-ano-atual");
    const diasMes = document.getElementById("dias-mes");

    const botaoAnterior = document.getElementById("mes-anterior");
    const botaoPosterior = document.getElementById("mes-posterior");

    const formEvento = document.getElementById("form-evento");
    const nomeEvento = document.getElementById("nome-evento");
    const dataEvento = document.getElementById("data-evento");

    const listaEventos = document.getElementById("lista-eventos");
    const mensagemEvento = document.getElementById("mensagem-evento");

    const botaoAdicionar = document.getElementById("adicionar");
    const botaoSelecionar = document.getElementById("selecionar");
    const botaoExcluir = document.getElementById("excluir");


    // DATA ATUAL E CALENDÁRIO

    const hoje = new Date();

    let mesAtual = hoje.getMonth();
    let anoAtual = hoje.getFullYear();

    let dataSelecionada = formatarData(hoje);

    // Recupera os eventos armazenados.
    let eventos = JSON.parse(
        localStorage.getItem("eventosFSAberCampo")
    ) || [];


    // FORMATA DATA PARA YYYY-MM-DD

    function formatarData(data) {

        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }


    // CONVERTE DATA PARA FORMATO BRASILEIRO

    function converterData(data) {

        const [ano, mes, dia] = data.split("-").map(Number);

        return new Date(ano, mes - 1, dia);
    }


    // SALVA OS EVENTOS NO LOCALSTORAGE

    function salvarEventos() {

        localStorage.setItem(
            "eventosFSAberCampo",
            JSON.stringify(eventos)
        );

    }


    // GERA O CALENDÁRIO

    function gerarCalendario() {

        diasMes.innerHTML = "";

        const primeiroDia = new Date(
            anoAtual,
            mesAtual,
            1
        ).getDay();

        const ultimoDia = new Date(
            anoAtual,
            mesAtual + 1,
            0
        ).getDate();

        const meses = [
            "Janeiro", "Fevereiro", "Março",
            "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro",
            "Outubro", "Novembro", "Dezembro"
        ];

        // Atualiza o cabeçalho.

        mesAnoAtual.textContent =
            `${meses[mesAtual]} de ${anoAtual}`;


        // Espaços antes do primeiro dia do mês.

        for (let i = 0; i < primeiroDia; i++) {

            const espaco = document.createElement("span");

            espaco.classList.add("dia-vazio");

            diasMes.appendChild(espaco);

        }


        // Cria os dias do mês.

        for (let dia = 1; dia <= ultimoDia; dia++) {

            const botao = document.createElement("button");

            const dataCompleta = new Date(
                anoAtual,
                mesAtual,
                dia
            );

            const dataFormatada = formatarData(dataCompleta);

            botao.type = "button";
            botao.textContent = dia;
            botao.classList.add("dia-calendario");

            // Destaca o dia atual.

            if (dataFormatada === formatarData(hoje)) {
                botao.classList.add("hoje");
            }

            // Destaca o dia selecionado.

            if (dataFormatada === dataSelecionada) {
                botao.classList.add("selecionado");
            }

            // Identifica dias que possuem eventos.

            if (eventos.some(evento => evento.data === dataFormatada)) {
                botao.classList.add("evento");
            }

            // Seleciona um dia do calendário.

            botao.addEventListener("click", () => {

                dataSelecionada = dataFormatada;

                dataEvento.value = dataSelecionada;

                gerarCalendario();

            });

            diasMes.appendChild(botao);

        }

    }


    // NAVEGAÇÃO ENTRE MESES

    botaoAnterior.addEventListener("click", () => {

        mesAtual--;

        if (mesAtual < 0) {

            mesAtual = 11;
            anoAtual--;

        }

        gerarCalendario();

    });


    botaoPosterior.addEventListener("click", () => {

        mesAtual++;

        if (mesAtual > 11) {

            mesAtual = 0;
            anoAtual++;

        }

        gerarCalendario();

    });


    // CRIA UM NOVO EVENTO

    formEvento.addEventListener("submit", (event) => {

        event.preventDefault();

        const nome = nomeEvento.value.trim();
        const data = dataEvento.value;

        if (!nome || !data) {

            mensagemEvento.textContent =
                "Preencha todos os campos.";

            return;

        }

        const novoEvento = {

            id: Date.now().toString(),
            nome: nome,
            data: data

        };

        eventos.push(novoEvento);

        salvarEventos();

        // Atualiza o calendário e a lista.

        gerarCalendario();
        mostrarEventos();

        // Limpa o formulário.

        nomeEvento.value = "";
        mensagemEvento.textContent = "Evento salvo com sucesso!";

        // Mantém a data selecionada.

        dataSelecionada = data;

        // Atualiza o calendário caso o evento tenha
        // sido criado em outro mês.

        const dataCriada = converterData(data);

        mesAtual = dataCriada.getMonth();
        anoAtual = dataCriada.getFullYear();

        gerarCalendario();

    });


    // EXIBE OS EVENTOS PRÓXIMOS

    function mostrarEventos() {

        listaEventos.innerHTML = "";

        // Mostra somente eventos de hoje em diante.

        const hojeFormatado = formatarData(hoje);

        const eventosProximos = eventos
            .filter(evento => evento.data >= hojeFormatado)
            .sort((a, b) => a.data.localeCompare(b.data));

        if (eventosProximos.length === 0) {

            const mensagem = document.createElement("div");

            mensagem.classList.add("sem-lembretes");

            const texto = document.createElement("p");

            texto.textContent =
                "Você não possui nenhum evento próximo.";

            mensagem.appendChild(texto);
            listaEventos.appendChild(mensagem);

            return;

        }


        eventosProximos.forEach(evento => {

            const data = converterData(evento.data);

            const dataFormatada = data.toLocaleDateString(
                "pt-BR",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            );

            // Container do evento.

            const lembrete = document.createElement("div");

            lembrete.classList.add("lembrete");

            // Checkbox para seleção.

            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.classList.add("selecionar-evento");
            checkbox.value = evento.id;

            // Data do evento.

            const titulo = document.createElement("b");

            titulo.textContent =
                dataFormatada.charAt(0).toUpperCase() +
                dataFormatada.slice(1);

            // Nome do evento.

            const descricao = document.createElement("p");

            descricao.textContent = evento.nome;

            // Montagem.

            lembrete.appendChild(checkbox);
            lembrete.appendChild(titulo);

            const linha = document.createElement("hr");

            lembrete.appendChild(linha);
            lembrete.appendChild(descricao);

            listaEventos.appendChild(lembrete);

        });

    }


    // BOTÃO ADICIONAR LEMBRETE

    botaoAdicionar.addEventListener("click", () => {

        document.getElementById("nome-evento").focus();

        if (!dataEvento.value) {
            dataEvento.value = dataSelecionada;
        }

    });


    // SELECIONAR TODOS OS EVENTOS

    botaoSelecionar.addEventListener("click", () => {

        const checkboxes = document.querySelectorAll(
            ".selecionar-evento"
        );

        const todosSelecionados = [...checkboxes].every(
            checkbox => checkbox.checked
        );

        checkboxes.forEach(checkbox => {

            checkbox.checked = !todosSelecionados;

        });

        botaoSelecionar.textContent = todosSelecionados
            ? "Selecionar tudo"
            : "Desmarcar tudo";

    });


    // EXCLUIR EVENTOS SELECIONADOS

    botaoExcluir.addEventListener("click", () => {

        const selecionados = [
            ...document.querySelectorAll(".selecionar-evento:checked")
        ].map(checkbox => checkbox.value);

        if (selecionados.length === 0) {

            mensagemEvento.textContent =
                "Selecione pelo menos um evento para excluir.";

            return;

        }

        eventos = eventos.filter(
            evento => !selecionados.includes(evento.id)
        );

        salvarEventos();

        mostrarEventos();
        gerarCalendario();

        mensagemEvento.textContent =
            "Evento(s) excluído(s) com sucesso!";

    });


    // INICIALIZAÇÃO

    dataEvento.value = dataSelecionada;

    gerarCalendario();
    mostrarEventos();

});