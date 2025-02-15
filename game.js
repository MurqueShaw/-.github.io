class Card {
    constructor(rank, suit) {
        this.rank = rank;  // 牌的数字或字母
        this.suit = suit;  // 牌的花色
    }
}

// 定义花色的排序顺序：黑桃 > 红心 > 梅花 > 方块
function suitRank(suit) {
    if (suit === 'S') return 4; // 黑桃
    if (suit === 'H') return 3; // 红心
    if (suit === 'C') return 2; // 梅花
    if (suit === 'D') return 1; // 方块
    return 0;
}

// 定义牌面的排序顺序：2, 3, 4, ..., T, J, Q, K, A
function rankValue(rank) {
    if (rank === '2') return 2;
    if (rank === '3') return 3;
    if (rank === '4') return 4;
    if (rank === '5') return 5;
    if (rank === '6') return 6;
    if (rank === '7') return 7;
    if (rank === '8') return 8;
    if (rank === '9') return 9;
    if (rank === 'T') return 10; // 十
    if (rank === 'J') return 11; // J
    if (rank === 'Q') return 12; // Q
    if (rank === 'K') return 13; // K
    if (rank === 'A') return 14; // A
    return 0;
}

// 比较两个牌的大小，首先按花色排序，其次按牌面排序
function cardCompare(a, b) {
    if (suitRank(a.suit) !== suitRank(b.suit)) {
        return suitRank(a.suit) - suitRank(b.suit); // 按花色排序
    }
    return rankValue(a.rank) - rankValue(b.rank); // 按牌面排序
}

// 玩家类
class Player {
    constructor(name) {
        this.name = name;
        this.hand = []; // 玩家手中的牌
    }

    // 玩家发牌时的排序方法
    sortHand() {
        this.hand.sort(cardCompare);  // 按花色和牌面排序
    }

    // 添加牌
    addCard(card) {
        this.hand.push(card);
    }

    // 显示手牌
    showHand() {
        console.log(`${this.name}'s hand:`);
        this.hand.forEach(card => {
            console.log(card.rank + card.suit);
        });
    }
}

// 游戏类
class Game {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;  // 当前出牌的玩家
        this.started = false;
    }

    // 添加玩家
    addPlayer(player) {
        this.players.push(player);
    }

    // 开始游戏
    startGame() {
        if (this.players.length >= 2 && this.players.length <= 8) {
            this.started = true;
            this.shufflePlayers();
            this.dealCards();
            console.log("Game has started!");
        } else {
            console.log("Game cannot start. Number of players must be between 2 and 8.");
        }
    }

    // 洗牌
    shufflePlayers() {
        console.log("Shuffling players...");
        this.players = this.players.sort(() => Math.random() - 0.5);
    }

    // 发牌
    dealCards() {
        const allCards = [];
        const suits = ['S', 'H', 'C', 'D'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

        // 创建一副牌
        suits.forEach(suit => {
            ranks.forEach(rank => {
                allCards.push(new Card(rank, suit));
            });
        });

        // 洗牌
        allCards.sort(() => Math.random() - 0.5);

        // 每个玩家发牌
        let cardIndex = 0;
        this.players.forEach(player => {
            player.addCard(allCards[cardIndex++]);
            player.addCard(allCards[cardIndex++]);
            player.addCard(allCards[cardIndex++]);
            player.addCard(allCards[cardIndex++]);
        });

        // 每个玩家排序手牌
        this.players.forEach(player => {
            player.sortHand();
        });

        // 显示每个玩家的手牌
        this.players.forEach(player => {
            player.showHand();
        });
    }
}

// 示例：创建游戏，添加玩家并开始游戏
let game = new Game();
let player1 = new Player("Player 1");
let player2 = new Player("Player 2");
let player3 = new Player("Player 3");

game.addPlayer(player1);
game.addPlayer(player2);
game.addPlayer(player3);

game.startGame();
