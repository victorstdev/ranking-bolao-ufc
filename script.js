// Agora os dados são carregados de `apostadores.json`.
// Se quiser editar os dados, atualize o arquivo `apostadores.json`.

function renderRanking(apostadores) {
    const board = document.getElementById('rankingBoard');
    board.innerHTML = '';
    // 1. Ordenar a lista do maior para o menor (cria uma cópia para não modificar o original)
    const players = [...apostadores].sort((a, b) => b.cinturoes - a.cinturoes);

    // 2. Criar os elementos HTML
    let currentRank = 1;

    players.forEach((player, index) => {
        // Lógica de empate: se o player atual tem os mesmos cinturoes do anterior, mantém o rank
        if (index > 0 && player.cinturoes < players[index - 1].cinturoes) {
            currentRank = index + 1;
        }
        // Se for empate, currentRank não muda

        const li = document.createElement('li');

        // Adiciona classe especial se for o 1º lugar isolado ou empatado no topo
        const isFirst = currentRank === 1;
        li.className = `ranking-item ${isFirst ? 'first-place' : ''}`;

        // Lógica da imagem (se tiver link usa img, senão usa inicial)
        let avatarContent;
        if (player.foto) {
            avatarContent = `<img src="${player.foto}" alt="${player.nome}">`;
        } else {
            avatarContent = `<span class="avatar-initial">${player.nome.charAt(0)}</span>`;
        }

        li.innerHTML = `
            <div class="rank-number">${currentRank}</div>
            <div class="avatar">${avatarContent}</div>
            <div class="player-info">${player.nome}</div>
            <div class="player-points">
                ${player.cinturoes}<span class="pts-label"></span>
            </div>
        `;

        board.appendChild(li);
    });
}

// Executa a função ao carregar a página
// Carrega o JSON com os apostadores e renderiza o ranking.
fetch('apostadores.json')
    .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    })
    .then(data => renderRanking(data))
    .catch(err => {
        console.error('Erro ao carregar apostadores.json:', err);
        // Se necessário, exibir mensagem ao usuário
        const board = document.getElementById('rankingBoard');
        board.innerHTML = '<li class="error">Falha ao carregar dados dos apostadores.</li>';
    });