// console.log("braindead");

const logoToggle = function logoToggle() {
    $('#startLogo').fadeToggle(1000).fadeToggle(1000);
};

setInterval(logoToggle, 100);

// Variables
let input = null;
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
        return this.cards.shift();
    }

    discard(card) {
        return this.graveyard.push(card);
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

        this.name = name;
        this.deck = deck;
    }

    draw() {
        if (this.hand.length === 0) {
            this.hand.push(this.deck.draw());
        }
    }

    discard(card) {
        this.deck.discard(card); // DON'T UNDERSTAND THIS FUNCTION YET
    }

    playCard(input) {
        input = input - 1;
        return this.hand.splice(input, 1)[0]
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
        while (this.player.deck.length() > 0) {
            this.startRound();
        };
        this.bigWinner();
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
        const points = {
            player: 0,
            cpu: 0,
        }
        // ADD A PROMPT WITH A BUTTON HERE. MAYBE ADD A METHOD TO INITIALIZE THE PROMPT, WHICH THEN INITIALIZES THE DRAW
        this.player.draw();
        this.cpu.draw();

        while (this.player.hand.length > 0 || this.cpu.hand.length > 0) {
            // Needs logic for player choosing car - cpu random choice
            const playerCard = this.player.playCard(0);   // PROMPT FOR USER TO SELECT INDEX OF CARD IN HAND ( PROMPT VALUE - 1 FOR ZERO COUNT)
            const cpuCard = this.cpu.playCard(0);         // MATH.RANDOM TO CHOOSE CARD FOR COMPUTER

            if (playerCard.damage > cpuCard.damage) {
                playerCard.attack();
                console.log("Player wins!");
                points.player++;
            }
            if (playerCard.damage < cpuCard.damage) {
                cpuCard.attack();
                console.log("Cpu wins!");
                points.cpu++;
            }
            else {
                console.log("It's a tie");
            }
            this.player.discard(playerCard);
            this.cpu.discard(cpuCard);
        }

        if (points.player > points.cpu) {
            console.warn("Player Wins Round!");
            this.player.roundsWon++;
        }
        if (points.player < points.cpu) {
            console.warn("Cpu Wins Round!");
            this.cpu.roundsWon++;
        }
    }
};

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




const playerDeck = new Deck();
playerDeck.generateCards(pokemonData);

const cpuDeck = new Deck();
cpuDeck.generateCards(pokemonData);

const eggbert = new Player("Eggbert", playerDeck);
const cpu = new Player("CPU", cpuDeck);

const game = new Game(eggbert, cpu);
