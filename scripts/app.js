// console.log('sanity check');


// console.log(`testing testing 123`);

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

/* 
Card - hold info about the Pokemon:
  - name - data 
  - damage - data
Deck - hold a collection of cards (factory):
  - cards [] - collection
  - discard [] - collection
  - draw - action
  - discard the card - action
  - shuffle - action
  - check the length - action (consider using full med small or something to obscure this)
Player - has a deck and can play cards from the deck
  - deck
    -- view cards
    -- view discard
  - hand of cards < 3 (bc a hand of cards is three cards)
      -- [] another collection
  - rounds won - number
  - draw
    -- deck - draw
  - play card
    -- look at the hand and pick a card to play
Game - hold all the core game logic
  - players
    -- cpu - Player
    -- player - Player NOTE the major differenc here is that the cpu will randomly select a card, whereas the player will choose a card
  - rounds (or Gameplay)
    // == Draw Phase == //
    -- create a tracker of cpu vs player points (rounds won?)
    -- players draw cards until they have 3 cards in hand
    // == Battle Phase == //
    -- each player chooses a card:
      -- cpu random
      -- player picks
    -- compare the damage of each chosen card
    // == resolution == //
    -- pick the winner based on highest damage
    -- discard current card
  - Once hands reach zero cards, compare the amt of wins
    // == Check if hand is empty == //
  - Whoever has most wins at the end of all 3 cards wins the round
    // == Check if deck has more cards == //
  - repeat until no more cards in deck
 */



/* 
Card - hold info about the Pokemon:
  - name - data 
  - damage - data
 */


/**
 * Class representing a Card Object
 */
class Card {
    /**
     * Creates a Card Object
     * @param {string} name The name of the Pokemon
     * @param {number} damage The damage of the Pokemon
     */
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }

    /**
     * Logs the attack of the Pokemon and returns the damage value
     * @returns damage of card
     */
    attack() {
        console.log(`${this.name} causes ${this.damage} damage!`);
        return this.damage;
    }
};



/* 
Deck - hold a collection of cards (factory):
  - cards [] - collection
  - graveyard [] - collection
  - draw - action
  - discard the card - action
  - shuffle - action
  - check the length - action
*/

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


    /**
     * You need to notate this, it's in dalton's notes (also don't forget it was altered by Dalton)
     */
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

    length() {  // This can be handy when writing a boolean later on
        return this.cards.length;
    }

};


/* 
Player - has a deck and can play cards from the deck
  - deck
    -- view cards
    -- view discard
  - hand of cards < 3 (bc a hand of cards is three cards)
      -- [] another collection
  - rounds won - number
  - draw
    -- deck - draw
  - play card
    -- look at the hand and pick a card to play
 */

class Player {
    constructor(name, deck) {
        // default
        this.hand = [];
        this.roundsWon = 0;
        // assigned
        this.name = name;
        this.deck = deck;
    }

    draw() {
        while (this.hand.length < 3) {
            this.hand.push(this.deck.draw());
        }
    }

    discard(card) {
        this.deck.discard(card);
    }

    playCard(index) {
        return this.hand.splice(index, 1)[0];
    }

    wins() {
        this.roundsWon += 1;
    }
};

/* 
Game - hold all the core game logic
  - players
    -- cpu - Player
    -- player - Player NOTE the major differenc here is that the cpu will randomly select a card, whereas the player will choose a card
  - rounds (or Gameplay)
    // == Draw Phase == //
    -- create a tracker of cpu vs player points (rounds won?)
    -- players draw cards until they have 3 cards in hand
    // == Battle Phase == //
    -- each player chooses a card:
      -- cpu random
      -- player picks
    -- compare the damage of each chosen card
    // == resolution == //
    -- pick the winner based on highest damage
    -- discard current card
  - Once hands reach zero cards, compare the amt of wins
    // == Check if hand is empty == //
  - Whoever has most wins at the end of all 3 cards wins the round
    // == Check if deck has more cards == //
  - repeat until no more cards in deck
 */

class Game {
    constructor(player, cpu) {
        // default
        this.round = 0;
        // assigned
        this.player = player;
        this.cpu = cpu;

    }

    start() {
        console.warn("The Game has begun!");
        while (this.player.deck.length() > 0) {
            this.startRound()
        };
    }
    // logic to look at rounds won and decide who won the tournament


    startRound() {
        this.player.draw();
        this.cpu.draw();
        while (this.player.hand.length > 0 || this.cpu.hand.length > 0) {
            this.battle();
        }
    }
    battle() {
        while (this.player.hand.length > 0 || this.cpu.hand.length > 0) {
            // battle phase
            const playerCard = this.player.playCard(0); // <-- these shouldn't be hard coded 
            const cpuCard = this.cpu.playCard(0);

            // resolution phase
            if (playerCard.damage > cpuCard.damage) { // maybe work in some way to do a draw
                console.log("Player Wins!");
                playerCard.attack();
            } else if (cpuCard.damage > playerCard.damage) {
                console.log("Cpu Wins!");
                cpuCard.attack();
            } else {
                console.log("It's a tie!");
                this.player.draw();
                this.cpu.draw();
                this.player.discard(playerCard);
                this.cpu.discard(cpuCard);
                return this.battle();
            }

            this.player.discard(playerCard);
            this.cpu.discard(cpuCard);
        }
        // if (playerPoints > cpuPoints) {
        //     console.warn("Player wins round!");
        //     this.player.roundsWon++;
        // } else {
        //     console.warn("Cpu Wins Round!");
        //     this.player.roundsWon++;
        // }
    }
}







const playerDeck = new Deck();
playerDeck.generateCards(pokemonData);

const cpuDeck = new Deck();
cpuDeck.generateCards(pokemonData);

const eggbert = new Player("Eggbert", playerDeck);
const cpu = new Player("CPU", cpuDeck);

const game = new Game(eggbert, cpu);