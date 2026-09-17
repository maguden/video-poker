import type { PlayingCard, Rank, Suit } from "../types/playingCard";

const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

const ranks: Rank[] = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];


/* Lager en kortstokk med alle kortene */
export function createDeck(): PlayingCard[] {
    const deck: PlayingCard[] = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    return deck;
}

/* Tar i mot kortstokk og stokker den */
export function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}