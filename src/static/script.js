const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const navItems = document.querySelectorAll('.nav-item');


// Abrir menu pelo botão hamburguer
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

}


// Fechar menu pelo X
if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

}


// Fechar clicando fora do menu
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
});


// Fechar menu quando voltar para desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});


const newChatBtn = document.querySelector('.new-chat-btn');

if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        userInput.value = '';
        userInput.focus();
        sidebar.classList.remove('active');
    });

}


userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});



function gerarIdUnico() {
    if (
        typeof crypto !== 'undefined' && crypto.randomUUID
    ){
        return crypto.randomUUID();

    }
    return Date.now() + '-' + Math.random().toString(36) .substr(2, 9);

}


function adicionarMensagemNaTela(texto, classeCss) {
    const idUnico = 'msg-' + gerarIdUnico();
    
    if (classeCss.includes('bot-message')) {
        const divContainer = document.createElement('div');

        divContainer.className = 'bot-message-container';

        divContainer.id = 'container-' + idUnico;

        const divNome = document.createElement('div');

        divNome.className = 'agent-name';

        divNome.textContent = 'Agente Lumina';


        const divMensagem = document.createElement('div');

        divMensagem.className = `message ${classeCss}`;

        divMensagem.textContent = texto;

        divMensagem.id = idUnico;

        divContainer.appendChild(divNome);

        divContainer.appendChild(divMensagem);

        chatMessages.appendChild(divContainer);

        return idUnico;

    }

    const divMensagem = document.createElement('div');

    divMensagem.className = `message ${classeCss}`;

    divMensagem.textContent = texto;

    divMensagem.id = idUnico;


    chatMessages.appendChild(divMensagem);

    return idUnico;

}

async function sendMessage() {

    const textoDigitado = userInput.value.trim();

    if (!textoDigitado) {

        return;

    }


    adicionarMensagemNaTela(textoDigitado,'user-message');

    userInput.value = '';

    rolarParaBaixo();


    const idCarregando = adicionarMensagemNaTela('Pensando...', 'bot-message loading');

    rolarParaBaixo();

    try {

        // Requisição para Flask
        const respostaServidor =
            await fetch('/chat', {method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({message: textoDigitado})
            });


        const dados = await respostaServidor.json();

        const mensagemCarregando = document.getElementById(idCarregando);

        if (mensagemCarregando) {

            const container = mensagemCarregando.closest('.bot-message-container');

            if (container) {
                container.remove();
            } else {
                mensagemCarregando.remove();
            }
        }

        if (dados.response) {

            adicionarMensagemNaTela(dados.response,'bot-message');
        } else {
            adicionarMensagemNaTela('Erro: ' + (dados.error || 'Resposta inválida.'),'bot-message error');
        }

    } catch (erro) {

        console.error(erro);
        const mensagemCarregando = document.getElementById(idCarregando);

        if (mensagemCarregando) {
            const container = mensagemCarregando.closest('.bot-message-container');

            if (container) {
                
                container.remove();

            } else {

                mensagemCarregando.remove();

            }

        }

        adicionarMensagemNaTela('Erro de conexão com o servidor.','bot-message error');

    }

    rolarParaBaixo();

}

function rolarParaBaixo() {

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


document.addEventListener('DOMContentLoaded', () => {

        const mensagemInicial = 'Olá! Sou o assistente virtual da Lumina. Como posso te ajudar com os cursos, matrículas ou suporte acadêmico hoje?';

        adicionarMensagemNaTela(mensagemInicial,'bot-message');

        rolarParaBaixo();

    }
);