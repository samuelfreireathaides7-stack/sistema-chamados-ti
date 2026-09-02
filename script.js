const form = document.getElementById('form-chamado');
const listaChamados = document.getElementById('lista-chamados');
const emptyState = document.getElementById('empty-state');
const contadorTotal = document.getElementById('contador-total');
const contadorUrgentes = document.getElementById('contador-urgentes');

let totalChamados = 0;
let totalUrgentes = 0;

function atualizarContadores() {
    contadorTotal.textContent = totalChamados;
    contadorUrgentes.textContent = totalUrgentes;
}

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    // Pega os valores dos campos
    const titulo = document.getElementById('titulo').value;
    const prioridade = document.getElementById('prioridade').value;
    const descricao = document.getElementById('descricao').value;

    // Se for o primeiro chamado, remove a mensagem de lista vazia
    if (emptyState) {
        emptyState.style.display = 'none';
    }

    // Define o texto e classe da prioridade
    let textoPrioridade = 'Baixa';
    let classePrioridade = 'badge-baixa';
    
    if (prioridade === 'alta') {
        textoPrioridade = 'Urgente';
        classePrioridade = 'badge-alta';
        totalUrgentes++;
    } else if (prioridade === 'media') {
        textoPrioridade = 'Média';
        classePrioridade = 'badge-media';
    }

    totalChamados++;
    atualizarContadores();

    // Cria o elemento visual do chamado
    const novoItem = document.createElement('li');
    novoItem.className = 'ticket-item';
    
    novoItem.innerHTML = `
        <div class="ticket-header-row">
            <h4>${titulo}</h4>
            <span class="badge-prioridade ${classePrioridade}">${textoPrioridade}</span>
        </div>
        <p class="ticket-desc">${descricao}</p>
        <div class="ticket-footer">
            <span>Registrado agora</span>
            <button class="btn-concluir" onclick="removerChamado(this, '${prioridade}')">
                <i class="fa-solid fa-check"></i> Concluir
            </button>
        </div>
    `;

    // Adiciona no topo da lista
    listaChamados.prepend(novoItem);
    form.reset();
});

// Função para concluir/remover o chamado da lista
function removerChamado(botao, prioridade) {
    const item = botao.closest('.ticket-item');
    item.remove();
    
    totalChamados--;
    if (prioridade === 'alta') {
        totalUrgentes--;
    }
    atualizarContadores();

    // Se a lista ficar vazia, traz o aviso de volta
    if (totalChamados === 0 && emptyState) {
        emptyState.style.display = 'block';
    }
}