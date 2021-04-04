// console.log("braindead");

const logoToggle = function logoToggle() {
    $('#startLogo').fadeToggle(1000).fadeToggle(1000);
};

setInterval(logoToggle, 100);



// Variables
let inputPlayer = null;
let inputCpu = null;
let playerCard = null;
let cpuCard = null;
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

// Class representing the Card Object
class Card {
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }

    attack() {
        return console.log(`*** ${this.name} causes ${this.damage} damage ***`);
    }
};

// Class representing the Deck Object

class Deck {
    constructor() {
        this.cards = [];
        this.graveyard = [];
    }

    generateCards(data) {
        for (const pokemon of pokemonData) {
            const pokemonCard = new Card(pokemon.name, pokemon.damage);
            this.cards.push(pokemonCard);
        }
        this.shuffle();
    }

    draw() {
        this.shuffle();
        return this.cards.splice(0, 3);
    }

    // This needs external citation for Dalton and the original author:
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

    length() {
        return this.cards.length;
    }
};


// Class representing the PLayer OBject

class Player {
    constructor(name, deck) {
        this.hand = [];
        this.roundsWon = 0;
        this.points = 0;

        this.name = name;
        this.deck = deck;
    }

    draw() {
        if (this.hand.length === 0 || this.hand[0].length === 0) {
            this.hand.push(this.deck.draw());
        }
    }

    discard(card) {
        this.hand.shift(card)
        return this.deck.graveyard.push(card);
    }

    playCard(input) {
        input = input - 1;
        return this.hand.splice(input, 1)[0]
    }

    length() {
        return this.hand.length;
    }
};

// Class representing the Game Object

class Game {
    constructor(player, cpu) {
        this.round = 0;

        this.player = player;
        this.cpu = cpu;
    }

    startGame() {
        console.warn("The Game has begun!");
        if (this.player.deck.length() > 0) {  // This while loop is breaking your code
            this.startRound();
        }
        else {
            this.bigWinner();
        }
    }

    bigWinner() {
        if (this.player.roundsWon > this.cpu.roundsWon) {
            console.warn("Player wins the Game!!");
        }

        else if (this.player.roundsWon < this.cpu.roundsWon) {
            console.warn("CPU wins the game!");
        }

        else {
            console.warn("The game is a tie!");
        }
    }

    startRound() {
        this.player.points = 0;
        this.cpu.points = 0;

        // ADD A PROMPT WITH A BUTTON HERE. MAYBE ADD A METHOD TO INITIALIZE THE PROMPT, WHICH THEN INITIALIZES THE DRAW
        console.log("press ENTER to draw cards!");


        for (let i = 0; i < 4; i++) {
            // playRound();
            if (this.player.hand[0].length === 3 || this.cpu.hand[0].length === 3) {
                inputPlayer = window.prompt(`YOUR HAND:\n(1) ${this.player.hand[0][0].name}\n(2) ${this.player.hand[0][1].name}\n(3) ${this.player.hand[0][2].name}`);
                playerCard = this.player.hand[0][inputPlayer - 1];
                inputCpu = Math.floor(Math.random() * 3)
                cpuCard = this.cpu.hand[0][inputCpu];
                if (playerCard.damage > cpuCard.damage) {
                    playerCard.attack();
                    console.log("Player wins!");
                    game.player.points++;
                }
                if (playerCard.damage < cpuCard.damage) {
                    cpuCard.attack();
                    console.log("Cpu wins!");
                    game.cpu.points++;
                }
                if (playerCard.damage === cpuCard.damage) {
                    console.log("It's a tie!");
                }
                game.player.deck.graveyard.push(game.player.hand[0].splice(inputPlayer - 1, 1));
                game.cpu.deck.graveyard.push(game.cpu.hand[0].splice(inputCpu, 1));
            }

            else if (this.player.hand[0].length === 2 || this.cpu.hand[0].length === 2) {
                inputPlayer = window.prompt(`YOUR HAND:\n(1) ${this.player.hand[0][0].name}\n(2) ${this.player.hand[0][1].name}`);
                playerCard = this.player.hand[0][inputPlayer - 1];
                inputCpu = Math.floor(Math.random() * 2)
                cpuCard = this.cpu.hand[0][inputCpu];
                if (playerCard.damage > cpuCard.damage) {
                    playerCard.attack();
                    console.log("Player wins!");
                    game.player.points++;
                }
                if (playerCard.damage < cpuCard.damage) {
                    cpuCard.attack();
                    console.log("Cpu wins!");
                    game.cpu.points++;
                }
                if (playerCard.damage === cpuCard.damage) {
                    console.log("It's a tie!");
                }
                game.player.deck.graveyard.push(game.player.hand[0].splice(inputPlayer - 1, 1));
                game.cpu.deck.graveyard.push(game.cpu.hand[0].splice(inputCpu, 1));
            }

            else if (this.player.hand[0].length === 1 || this.cpu.hand[0].length === 1) {
                inputPlayer = window.prompt(`YOUR HAND:\n(1) ${this.player.hand[0][0].name}`);
                playerCard = this.player.hand[0][0];
                cpuCard = this.cpu.hand[0][0];
                if (playerCard.damage > cpuCard.damage) {
                    playerCard.attack();
                    console.log("Player wins!");
                    game.player.points++;
                }
                if (playerCard.damage < cpuCard.damage) {
                    cpuCard.attack();
                    console.log("Cpu wins!");
                    game.cpu.points++;
                }
                if (playerCard.damage === cpuCard.damage) {
                    console.log("It's a tie!");
                }
                game.player.deck.graveyard.push(game.player.hand[0].shift());
                game.cpu.deck.graveyard.push(game.cpu.hand[0].shift());

            }



        }
        if (this.player.points > this.cpu.points) {
            console.warn("Player Wins Round!");
            console.log("press ENTER to draw new cards!");
            return this.player.roundsWon++;
        } else {
            console.warn("Cpu Wins Round!");
            console.log("press ENTER to draw new cards!");
            return this.cpu.roundsWon++;
        }
    };
}


/* 
1. Finish bigWinner method ***
2. Logic for player chooses which card to play
    - Prompt a window that says "Draw Cards" with a button that says "draw" (in the start round function?)
    - Use template literal to prompt the choices in their hand to the player, then take the user's numerical input to name the index of the care they are to play.
3. Logic for cpu random choice which card to play
    - in the same function, implement Math.floor(Math.random()) for a number between 0-3 for the computer's play
4. Finish tweaking to fit assignment's UI requirements
5. Citation for shuffle function
6. Go through and write docStrings / make sure you have a thorough understanding of Dalton's code
 */







// const playRound = function playRound() {
//     if (this.player.hand[0].length === 3 || this.cpu.hand[0].length === 3) {
//         input = window.prompt(`YOUR HAND:\n(1) ${this.player.hand[0][0].name}\n(2) ${this.player.hand[0][1].name}\n(3) ${this.player.hand[0][2].name}`);
//         playerCard = this.player.hand[input];
//         cpuCard = this.cpu.playCard(this.cpu.hand[0][Math.floor(Math.random() * 3 + 1)]);
//         compareCards();
//         game.player.discard(playerCard);
//         game.cpu.discard(cpuCard);
//     }

//     if (this.player.hand[0].length === 2 || this.cpu.hand[0].length === 2) {
//         input = window.prompt(`YOUR HAND:\n(1) ${this.player.hand[0][0].name}\n(2) ${this.player.hand[0][1].name}`);
//         playerCard = this.player.hand[input];
//         cpuCard = this.cpu.playCard(this.cpu.hand[0][Math.floor(Math.random() * 2 + 1)]);
//         compareCards();
//         game.player.discard(playerCard);
//         game.cpu.discard(cpuCard);
//     }

//     if (this.player.hand[0].length === 1 || this.cpu.hand[0].length === 1) {
//         input = window.prompt(`YOUR HAND:\n(1) ${this.player.hand[0][0].name}`);
//         playerCard = this.player.hand[input];
//         cpuCard = this.cpu.playCard(this.cpu.hand[0][Math.floor(Math.random() * 2 + 1)]);
//         compareCards();
//         game.player.discard(playerCard);
//         game.cpu.discard(cpuCard);
//     }

// }


// const compareCards = function compareCards() {
//     if (playerCard.damage > cpuCard.damage) {
//         playerCard.attack();
//         console.log("Player wins!");
//         game.player.points++;
//     }
//     if (playerCard.damage < cpuCard.damage) {
//         cpuCard.attack();
//         console.log("Cpu wins!");
//         game.cpu.points++;
//     }
//     if (playerCard.damage === cpuCard.damage) {
//         console.log("It's a tie!");
//     }

// }









const playerDeck = new Deck();
playerDeck.generateCards(pokemonData);

const cpuDeck = new Deck();
cpuDeck.generateCards(pokemonData);

const eggbert = new Player("Eggbert", playerDeck);
const cpu = new Player("CPU", cpuDeck);

const game = new Game(eggbert, cpu);

$('body').on("click", game.player.draw());
$('body').on("click", game.cpu.draw());
// $('body').on("click", game.startRound());