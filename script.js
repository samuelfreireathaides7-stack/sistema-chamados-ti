// Captura o formulário e a lista de chamados do HTML
const form = document.getElementById('form-chamado');
const listaChamados = document.getElementById('lista-chamados');

// Ouve o evento de envio (submit) do formulário
form.addEventListener('submit', function(evento) {
    // Evita que a página recarregue sozinha ao enviar
    evento.preventDefault();

    // Pega os valores digitados nos campos
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;

    // Cria um novo item de lista (li) para o chamado
    const novoItem = document.createElement('li');
    novoItem.innerHTML = `<strong>${titulo}</strong>: ${descricao}`;

    // Adiciona o novo chamado dentro da lista na tela
    listaChamados.appendChild(novoItem);

    // Limpa os campos do formulário para o próximo cadastro
    form.reset();
});