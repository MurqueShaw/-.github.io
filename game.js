let players = [];
let gameStarted = false;
let currentPlayer = null;
let deck = [];
let currentRound = 0;
let playerCards = [];

const startButton = document.getElementById("start-game");
const questionButton = document.getElementById("question-button");
const gameInfo = document.getElementById("game-info");
const playerList = document.getElementById("player-list");
const playerCardsDiv = document.getElementById("player-cards");

function addPlayer(playerName) {
    players.push(playerName);
    updatePlayerList();
}

function updatePlayerList() {
    playerList.innerHTML = players.map(player => `<div>${player}</div>`).join('');
    if (players.length >= 2 && !gameStarted) {
        startButton.disabled = false;
    }
}

function startGame() {
    gameStarted = true;
    startButton.disabled = true;
    currentPlayer = players[0];
    distributeCards();
    gameInfo.innerHTML = `Game started! ${currentPlayer}'s turn.`;
    nextRound();
}

function distributeCards() {
    deck = generateDeck();
    playerCards = players.map(() => []);
    for (let i = 0; i < 54; i++) {
        playerCards[i % players.length].push(deck[i]);
    }
    displayCards();
}

function generateDeck() {
    let suits = ['♠', '♣', '♦', '♥'];
    let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', 'Joker'];
    let deck = [];

    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push(`${rank}${suit}`);
        });
    });

    deck.push('Joker');
    deck.push('Joker');

    return deck.sort(() => Math.random() - 0.5); // Shuffle the deck
}

function displayCards() {
    playerCardsDiv.innerHTML = playerCards[players.indexOf(currentPlayer)].map(card => `<span>${card}</span>`).join(' ');
}

function nextRound() {
    currentRound++;
    gameInfo.innerHTML = `${currentPlayer}'s turn (Round ${currentRound})`;
}

startButton.addEventListener("click", startGame);
questionButton.addEventListener("click", () => {
    alert("Questioning the validity of the cards!");
    nextRound();
});

// Sample gameplay logic for player entering the game
addPlayer("Player1");
addPlayer("Player2");
