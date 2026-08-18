// Seleciona os elementos principais da tela
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

// Permite enviar a mensagem apertando a tecla "Enter" no teclado
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Função principal que envia a mensagem para o Flask
async function sendMessage() {
    const textoDigitado = userInput.value.trim();
    
    // Se o campo estiver vazio, não faz nada
    if (!textoDigitado) return;

    // 1. Mostra a mensagem do usuário na tela
    adicionarMensagemNaTela(textoDigitado, 'user-message');
    userInput.value = '';
    rolarParaBaixo();

    // 2. Mostra o aviso de "Pensando..." enquanto o agente processa
    const idCarregando = adicionarMensagemNaTela('Pensando...', 'bot-message loading');
    rolarParaBaixo();

    try {
        // 3. Faz a requisição POST para a rota /chat do Flask
        const respostaServidor = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: textoDigitado })
        });

        const dados = await respostaServidor.json();
        
        // Remove o balão de "Pensando..."
        document.getElementById(idCarregando).remove();

        // 4. Exibe a resposta do agente ou uma mensagem de erro
        if (dados.response) {
            adicionarMensagemNaTela(dados.response, 'bot-message');
        } else {
            adicionarMensagemNaTela('Erro: ' + (dados.error || 'Resposta inválida.'), 'bot-message error');
        }

    } catch (erro) {
        // Se houver falha na conexão com o servidor
        document.getElementById(idCarregando).remove();
        adicionarMensagemNaTela('Erro de conexão com o servidor.', 'bot-message error');
    }

    rolarParaBaixo();
}

// Função auxiliar para criar e inserir novos balões de mensagem no chat
function adicionarMensagemNaTela(texto, classeCss) {
    const divMensagem = document.createElement('div');
    divMensagem.className = `message ${classeCss}`;
    divMensagem.textContent = texto;
    
    // Cria um ID único baseado no tempo para conseguir remover o "Pensando..." depois
    const idUnico = 'msg-' + Date.now();
    divMensagem.id = idUnico;
    
    chatMessages.appendChild(divMensagem);
    return idUnico;
}

// Função para manter o chat sempre rolando para a última mensagem embaixo
function rolarParaBaixo() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}