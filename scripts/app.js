console.log("[app.js] loaded");

const logoToggle = function logoToggle() {
    $('p').fadeToggle(1000).fadeToggle(1000);
};

setInterval(logoToggle, 100);



/* You're going to have 3 functions:
    1. The function that's automatically invoked, that intializes the game
    2. The function that draws cards into the player decks and prompts the player to start a round
    3. The function that prompts the player's hand and sets off the actual logic of the game



 */



const pokemonData = [
    {
        name: "Bulbasaur",
        damage: 60
    }, {
        name: "Caterpie",
        damage: 40
    }, {
        name: "Charmander",
        damage: 60
    }, {
        name: "Clefairy",
        damage: 50
    }, {
        name: "Jigglypuff",
        damage: 60
    }, {
        name: "Mankey",
        damage: 30
    }, {
        name: "Meowth",
        damage: 60
    }, {
        name: "Nidoran - female",
        damage: 60
    }, {
        name: "Nidoran - male",
        damage: 50
    }, {
        name: "Oddish",
        damage: 40
    }, {
        name: "Pidgey",
        damage: 50
    }, {
        name: "Pikachu",
        damage: 50
    }, {
        name: "Poliwag",
        damage: 50
    }, {
        name: "Psyduck",
        damage: 60
    }, {
        name: "Rattata",
        damage: 30
    }, {
        name: "Squirtle",
        damage: 60
    }, {
        name: "Vulpix",
        damage: 50
    }, {
        name: "Weedle",
        damage: 40
    }
];
let hand = [];







/* CLASSES ******************************* */
class card {
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.graveyard = [];
    }
    generateCards(data) {
        for (const pokemon of data) {
            const pokemonCard = new card(pokemon.name, pokemon.damage);
            this.cards.push(pokemonCard);
        }
        this.shuffle();
    }

    draw() {
        this.shuffle();
        return this.cards.splice(0, 3);
    }

    shuffle() {
        let length = this.cards.length;
        let element;
        let index;

        while (length) {
            index = Math.floor(Math.random() * length--);
            element = this.cards[length];
            this.cards[length] = this.cards[index];
            this.cards[index] = element;
        }
    }
}

class Player {
    constructor(name, deck) {
        this.hand = [];
        this.roundsWon = 0;
        this.points = 0;

        this.name = name;
        this.deck = deck;
    }

    draw() {
        if (this.hand.length === 0 || this.hand.length === 0) {
            hand = this.deck.draw();
            console.log(hand);
            for (let i = 0; i < hand.length; i++) {
                this.hand.push(hand[i]);

            }
        }
    }

    playCard(input) {
        input = input - 1;
        return this.hand.splice(input, 1)[0];
    }
}

/* game needs to contain/access the information:
1. all the cards possible to play - data (deck) player.deck
2. the cards that have already been played (discard) - data player.graveyard
3. how many cards are left to be played - data player.deck
4. Rounds won - data player.roundsWon
5. Current round(?) - this.round   .checkHand()
6. deal cards - .drawCards()
7. determine winner - .checkHand()
9. stop the game when there are no cards left - .checkHand()
 */
class Game {
    constructor(player, cpu) {
        this.round = 0

        this.player = player;
        this.cpu = cpu;
    }

    startGame() {
        console.log('Welcome to Pokemon the Card Game... The Game!\nPress ENTER to Draw Cards\nPress the SPACEBAR to check your hand\nThen enter (1) (2) or (3) in the input to play a card\n\nClick the picture and hit ENTER to get started!');

    }
}



/* FUNCTIONS ***************************** */





/* Check hand must:
display cards in hand
take an input to select card
random select a computer card
compare those cards
discard those cards
add points to winner of hand
log the winner of that hand
check how many cards are in the player's hand:
    prompt the player to check their hand again...
OR
    if the hand is empty compare the points
    add 1 to roundsWon of winner
    add 1 to round number inside Game Object
    log the current score and winner of Round
    Check if cards in hand > 0
    IF cards in hand > 0
        prompt the player to draw more cards
    IF NOT
        run endGame()
 */
const checkHand = function checkHand(key) {
    if (key.keyCode == '32') {

        if (game.player.deck.cards.length > 0) {
            while (game.player.hand.length > 0) {
                if (game.player.hand.length === 3 || game.cpu.hand.length === 3) {
                    inputPlayer = window.prompt(`YOUR HAND:\n(1) NAME: ${game.player.hand[0].name} - DAMAGE: ${game.player.hand[0].damage}\n(2) NAME: ${game.player.hand[1].name} - DAMAGE: ${game.player.hand[1].damage}\n(3) NAME: ${game.player.hand[2].name} - DAMAGE: ${game.player.hand[2].damage}`);
                    playerCard = game.player.hand[inputPlayer - 1];
                    inputCpu = Math.floor(Math.random() * 3)
                    cpuCard = game.cpu.hand[inputCpu];
                    compareCards();
                    console.log("Press the SPACEBAR to check your hand");
                    game.player.deck.graveyard.push(game.player.hand.splice(inputPlayer - 1, 1));
                    game.cpu.deck.graveyard.push(game.cpu.hand.splice(inputCpu, 1));
                    break;
                }

                else if (game.player.hand.length === 2 || game.cpu.hand.length === 2) {
                    inputPlayer = window.prompt(`YOUR HAND:\n(1) NAME: ${game.player.hand[0].name} - DAMAGE: ${game.player.hand[0].damage}\n(2) NAME: ${game.player.hand[1].name} - DAMAGE: ${game.player.hand[1].damage}`);
                    playerCard = game.player.hand[inputPlayer - 1];
                    inputCpu = Math.floor(Math.random() * 2)
                    cpuCard = game.cpu.hand[inputCpu];
                    compareCards();
                    console.log("Press the SPACEBAR to check your hand");
                    game.player.deck.graveyard.push(game.player.hand.splice(inputPlayer - 1, 1));
                    game.cpu.deck.graveyard.push(game.cpu.hand.splice(inputCpu, 1));
                    break;
                }

                else if (game.player.hand.length === 1 || game.cpu.hand.length === 1) {
                    inputPlayer = window.prompt(`YOUR HAND:\n(1) NAME: ${game.player.hand[0].name} - DAMAGE: ${game.player.hand[0].damage}`);
                    playerCard = game.player.hand[0];
                    cpuCard = game.cpu.hand[0];
                    compareCards();
                    game.player.deck.graveyard.push(game.player.hand.shift());
                    game.cpu.deck.graveyard.push(game.cpu.hand.shift());
                    roundResult();
                    game.player.points = 0;
                    game.cpu.points = 0;
                    break;
                }
            }

        }
        if (game.player.deck.cards.length === 0) {
            while (game.player.hand.length > 0) {
                if (game.player.hand.length === 3 || game.cpu.hand.length === 3) {
                    inputPlayer = window.prompt(`YOUR HAND:\n(1) NAME: ${game.player.hand[0].name} - DAMAGE: ${game.player.hand[0].damage}\n(2) NAME: ${game.player.hand[1].name} - DAMAGE: ${game.player.hand[1].damage}\n(3) NAME: ${game.player.hand[2].name} - DAMAGE: ${game.player.hand[2].damage}`);
                    playerCard = game.player.hand[inputPlayer - 1];
                    inputCpu = Math.floor(Math.random() * 3)
                    cpuCard = game.cpu.hand[inputCpu];
                    compareCards();
                    console.log("Press the SPACEBAR to check your hand");
                    game.player.deck.graveyard.push(game.player.hand.splice(inputPlayer - 1, 1));
                    game.cpu.deck.graveyard.push(game.cpu.hand.splice(inputCpu, 1));
                    break;
                }

                else if (game.player.hand.length === 2 || game.cpu.hand.length === 2) {
                    inputPlayer = window.prompt(`YOUR HAND:\n(1) NAME: ${game.player.hand[0].name} - DAMAGE: ${game.player.hand[0].damage}\n(2) NAME: ${game.player.hand[1].name} - DAMAGE: ${game.player.hand[1].damage}`);
                    playerCard = game.player.hand[inputPlayer - 1];
                    inputCpu = Math.floor(Math.random() * 2)
                    cpuCard = game.cpu.hand[inputCpu];
                    compareCards();
                    console.log("Press the SPACEBAR to check your hand");
                    game.player.deck.graveyard.push(game.player.hand.splice(inputPlayer - 1, 1));
                    game.cpu.deck.graveyard.push(game.cpu.hand.splice(inputCpu, 1));
                    break;
                }

                else if (game.player.hand.length === 1 || game.cpu.hand.length === 1) {
                    inputPlayer = window.prompt(`YOUR HAND:\n(1) NAME: ${game.player.hand[0].name} - DAMAGE: ${game.player.hand[0].damage}`);
                    playerCard = game.player.hand[0];
                    cpuCard = game.cpu.hand[0];
                    compareCards();
                    game.player.deck.graveyard.push(game.player.hand.shift());
                    game.cpu.deck.graveyard.push(game.cpu.hand.shift());
                    finalRoundResult()
                    game.player.points = 0;
                    game.cpu.points = 0;
                    break;
                }
            }

        }
        if (game.player.deck.cards.length === 0 && game.player.hand.length === 0) {
            if (game.player.roundsWon > game.cpu.roundsWon) {
                console.error("Player wins the Game!!");
                console.log(`FINAL SCORE:\nPlayer: ${game.player.roundsWon} Rounds Won\nCpu: ${game.cpu.roundsWon} Rounds Won`);
                console.log("Refresh page to play again!");
            }

            else if (game.player.roundsWon < game.cpu.roundsWon) {
                console.error("CPU wins the game!");
                console.log(`FINAL SCORE:\nPlayer: ${game.player.roundsWon} Rounds Won\nCpu: ${game.cpu.roundsWon} Rounds Won`);
                console.log("Refresh page to play again!");
            }

            else {
                console.error("The game is a tie!");
                console.log(`FINAL SCORE:\nPlayer: ${game.player.roundsWon} Rounds Won\nCpu: ${game.cpu.roundsWon} Rounds Won`);
                console.log("Refresh the page to play again!");
            }
        }
    }
}

document.addEventListener('keypress', checkHand);



const compareCards = function compareCards() {
    if (playerCard.damage > cpuCard.damage) {
        console.log(`** Player played ${playerCard.name}! **\n** Cpu played ${cpuCard.name}! **\n\nPlayer wins!`);
        game.player.points++;
    }
    if (playerCard.damage < cpuCard.damage) {
        console.log(`** Player played ${playerCard.name}! **\n** Cpu played ${cpuCard.name}! **\n\nCpu wins!`);
        game.cpu.points++;
    }
    if (playerCard.damage === cpuCard.damage) {
        console.log(`** Player played ${playerCard.name}! **\n** Cpu played ${cpuCard.name}! **\n\nIt's a tie!`);
    }
}





const roundResult = function roundResult() {
    if (game.player.hand.length === 0) {
        if (game.player.points > game.cpu.points) {
            game.player.roundsWon++;
            console.warn("Player Wins Round!");
            console.log(`Player Score: ${game.player.roundsWon} Rounds Won\nCpu Score: ${game.cpu.roundsWon} Rounds Won`);
            console.log("Press ENTER to draw new cards!");
        }
        if (game.player.points < game.cpu.points) {
            game.cpu.roundsWon++;
            console.warn("Cpu Wins Round!")
            console.log(`Player Score: ${game.player.roundsWon} Rounds Won\nCpu Score: ${game.cpu.roundsWon} Rounds Won`);
            console.log("Press ENTER to draw new cards!");

        }
        if (game.player.points === game.cpu.points) {
            console.warn("The Round Is A Tie!");
            console.log(`Player Score: ${game.player.roundsWon} Rounds Won\nCpu Score: ${game.cpu.roundsWon} Rounds Won`);
            console.log("Press ENTER to draw new cards!");
        }
    }
}

const finalRoundResult = function finalRoundResult() {
    if (game.player.hand.length === 0) {
        if (game.player.points > game.cpu.points) {
            console.warn("Player Wins Round!");
            return game.player.roundsWon++;
        }
        if (game.player.points < game.cpu.points) {
            console.warn("Cpu Wins Round!")
            return game.cpu.roundsWon++;
        }
        else {
            console.warn("The Round Is A Tie!");
        }
    }
}













/* Draw cards must
    take three cards from the deck
    add them to the player's hand
    prompt the payer to check their hand
 */

const drawCards = function drawCards(key) {
    if (key.keyCode == '13') {
        game.player.draw();
        game.cpu.draw();
        console.log('press SPACEBAR to check your hand');
    }
}
document.addEventListener('keypress', drawCards);




/* OBJECT DECLARATIONS/ METHOD INVOCATIONS ***************************** */
const playerdeck = new Deck();
playerdeck.generateCards(pokemonData);

const cpuDeck = new Deck();
cpuDeck.generateCards(pokemonData);

const player1 = new Player("Human", playerdeck);
const cpu = new Player("Cpu", cpuDeck)
const game = new Game(player1, cpu);

game.startGame();