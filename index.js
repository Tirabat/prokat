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
const cop = document.getElementById("cop")

showMiss.addEventListener('change', () => {
    if (showMiss.checked) {
        hunt.textContent = 'Нажмите «Вернуть», если игру принесли обратно.'
    } else {
        hunt.textContent = ''
    }
    renderGames()
})

const games = [

]

news.addEventListener('click', () => {
    const name = title.value.trim()
    const count = Number(players.value)
    const countCop = Number(cop.value)

    if (name === '') {
        message.textContent = 'Введите название игры'
        return
    }
    if (!Number.isInteger(count) || count <= 0) {
        message.textContent = 'Введите число игроков'
        return
    }
    if (!Number.isInteger(countCop) || countCop <= 0) {
        message.textContent = 'Введите количество копий'
        return
    }

    const tutu = { title: name, players: count, borrower: [], cop: countCop, initialCop: countCop }
    games.push(tutu)

    title.value = ''
    players.value = ''
    cop.value = ''
    message.textContent = 'Игра добавлена'
    renderGames()
})

borrowButton.addEventListener('click', () => {
    const game = games[Number(gameSelect.value)]
    if (!game) {
        message.textContent = 'Сначала добавьте игру'
        return
    }
    const name = borrowerName.value.trim()
    if (name === '') {
        message.textContent = 'Введите имя'
        return
    }
    if (game.cop <= 0){
        message.textContent = 'Все игры уже были выданы'
        return
    }
    game.cop  = game.cop - 1
    games[Number(gameSelect.value)].borrower.push(name)
    message.textContent = 'Игра выдана'
    renderGames()
})

returnButton.addEventListener('click', () => {
    const game = games[Number(gameSelect.value)]
    if (!game) {
        message.textContent = 'Сначала добавьте игру'
        return;
    }
    if (game.cop >= game.initialCop){
        message.textContent = 'Все игры уже были возвращены'
        return
    }
    game.cop  = game.cop + 1
    game.borrower.pop()
    message.textContent = 'Игра возвращена'
    renderGames()
})

function renderGames() {
    gameList.textContent = ''

    const currentIndex = gameSelect.value
    gameSelect.textContent = ''
    games.forEach((game, index) => {
        const option = document.createElement('option')
        option.value = index
        option.textContent = game.title
        gameSelect.append(option)
    })
    if (currentIndex !== '' && Number(currentIndex) < games.length) {
        gameSelect.value = currentIndex;
    }

    games.forEach((ol) => {
        const items = document.createElement('li')
        if (showMiss.checked) {
            if (ol.borrower.length === 0) {
                items.append(ol.title + ' ', ol.players + ' игрока(-ов). ', 'Свободно. ', 'Осталось в количестве ' + ol.cop )
                gameList.append(items)
            }
        } else {
            if (ol.borrower.length === 0) {
                items.append(ol.title + ' ', ol.players + ' игрока(-ов). ', 'Свободно. ', 'Осталось в количестве ' + ol.cop )
            } else {
                items.append(ol.title + ' ', ol.players + ' игрока(-ов). ', 'Занял(-а, -или) ' + ol.borrower + '. ', 'Осталось в количестве ' +  ol.cop )
            }
            gameList.append(items)
        }
    })
}
renderGames()