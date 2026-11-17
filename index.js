const gameList = document.getElementById("gameList")
const gameSelect = document.getElementById("gameSelect")
const borrowerName = document.getElementById("borrowerName")
const borrowButton = document.getElementById("borrowButton")
const returnButton = document.getElementById("returnButton")
const message = document.getElementById("message")
const showMiss = document.getElementById("showMiss")
const hunt = document.getElementById("hunt")
const title = document.getElementById("newGame")
const players = document.getElementById("player")
const news = document.getElementById("new")

showMiss.addEventListener('change', () => {
    if (showMiss.checked) {
        hunt.textContent = 'Нажмите «Вернуть», если игру принесли обратно.';
    } else {
        hunt.textContent = '';
    }
    renderGames()
})

const games = [
    
]

news.addEventListener('click', () => {
    const name = title.value.trim();
    const count = Number(players.value);

    if (name === '') {
        message.textContent = 'Введите название игры';
        return;
    }
    if (!Number.isInteger(count) || count <= 0) {
        message.textContent = 'Введите число игроков';
        return;
    }

    const tutu = { title: name, players: count, borrower: null };
    games.push(tutu);

    title.value = '';
    players.value = '';
    message.textContent = 'Игра добавлена';
    renderGames();
})

borrowButton.addEventListener('click', () => {
    if (gameSelect.value === '0' && games[0].borrower === null) {
        games[0].borrower = borrowerName.value
        message.textContent = 'игра ' + games[0].title + ' отадана'
    } else if (gameSelect.value === '1' && games[1].borrower === null) {
        games[1].borrower = borrowerName.value
        message.textContent = 'игра ' + games[1].title + ' отадан'
    } else if (gameSelect.value === '2' && games[2].borrower === null) {
        games[2].borrower = borrowerName.value
        message.textContent = 'игра ' + games[2].title + ' отаданы'
    } else {
        message.textContent = 'ошибка'
    }
    renderGames()
})

returnButton.addEventListener('click', () => {
    if (gameSelect.value === '0' && games[0].borrower != null) {
        games[0].borrower = null
        message.textContent = 'игра ' + games[0].title + ' возвращена'
    } else if (gameSelect.value === '1' && games[1].borrower != null) {
        games[1].borrower = null
        message.textContent = 'игра ' + games[1].title + ' возвращен'
    } else if (gameSelect.value === '2' && games[2].borrower != null) {
        games[2].borrower = null
        message.textContent = 'игра ' + games[2].title + ' возвращены'
    } else {
        message.textContent = 'ошибка'
    }
    renderGames()
})

function renderGames() {
    gameList.textContent = ''

    const currentIndex = gameSelect.value;
    gameSelect.textContent = '';
    games.forEach((game, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = game.title;
        gameSelect.append(option);
    });
    if (currentIndex !== '' && Number(currentIndex) < games.length) {
        gameSelect.value = currentIndex;
    }

    games.forEach((ol) => {
        const items = document.createElement('li')
        if (showMiss.checked) {
            if (ol.borrower === null) {
                items.append(ol.title + ' ', ol.players + ' игрока(-ов). ', 'Свободно')
                gameList.append(items)
            }
        } else {
            if (ol.borrower === null) {
                items.append(ol.title + ' ', ol.players + ' игрока(-ов). ', 'Свободно')
            } else {
                items.append(ol.title + ' ', ol.players + ' игрока(-ов). ', ol.borrower)
            }
            gameList.append(items)
        }
    })
}
renderGames()