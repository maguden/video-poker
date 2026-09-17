import { create } from "zustand";
import type { PlayingCard } from "../types/playingCard";
import { createDeck, shuffleDeck } from "../logic/deck";

type GameState = {
  deck: PlayingCard[];
  playerHand: PlayingCard[];
  discardedCards: PlayingCard[];
  dealCards: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  deck: [],
  playerHand: [],
  discardedCards: [],
  dealCards: () => {
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);
    const hand = shuffledDeck.slice(0, 5);
    set({ deck: shuffledDeck.slice(5), playerHand: hand, discardedCards: [] });
  },
}));
