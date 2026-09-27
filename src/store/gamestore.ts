import { create } from "zustand";
import type { PlayingCard } from "../types/playingCard";
import { createDeck, shuffleDeck } from "../logic/deck";
import { evaluateHand } from "../logic/evaluateHand";
import { payouts } from "../logic/payouts";
import type { Player } from "../types/players";
import { persist } from "zustand/middleware"

/* Spilldata og handlinger */
type GameState = {
  coins: number;
  bet: number;
  deck: PlayingCard[];
  playerHand: PlayingCard[];
  discardedCards: PlayingCard[];
  selectedIndices: number[];
  lastWinnings: number;
  players: Player[];
  activePlayerId: string | null;
  phase: "idle" | "changing" | "finished";
  toggleCard: (index: number) => void;
  dealCards: () => void;
  exchangeCards: () => void;
  setBet: (bet: number) => void;
  newGame: () => void;
  addPlayer: (name: string) => void;
  selectPlayer: (id: string) => void;
};

/* Felles tilstand i zustand, get leser, og set oppdaterer,
 * Persist lagrer data i localStorage slik at data beholdes etter reload. */
export const useGameStore = create<GameState>()(persist((set, get) => ({
  players: [],
  activePlayerId: null,
  coins: 100,
  bet: 5,
  deck: [],
  playerHand: [],
  discardedCards: [],
  selectedIndices: [],
  phase: "idle",
  lastWinnings: 0,

  /* Oppretter spiller med 100 mynter */
  addPlayer: (name) => {
    const trimmedName = name.trim();
    if (trimmedName === "") {
      return;
    }

    const player: Player = {
      id: crypto.randomUUID(),
      name: trimmedName,
      coins: 100,
    };

    set((state) => ({ players: [...state.players, player], }));
  },

  /* Tar i mot ID og bytter aktiv spiller.
   Lagrer forrige spillers saldo, henter ny saldo og nullstiller.
   Avviser bytte av spiller under startet spill, ukjent ID, eller allerede valgt spiller */
  selectPlayer: (id) => {
    const state = get();

    if (state.phase === "changing" || id === state.activePlayerId) {
      return;
    }

    const player = state.players.find((player) => player.id === id);

    if (!player) {
      return;
    }

    const players = state.players.map((player) => {
      if (player.id === state.activePlayerId) {
        return { ...player, coins: state.coins };
      }

      return player;
    });

    set({ players, activePlayerId: id, coins: player.coins, bet: 5, deck: [], playerHand: [], discardedCards: [], selectedIndices: [], lastWinnings: 0, phase: "idle", });
  },

  /*  Tar imot ønsket innsats.
   * Godtar bare positive heltall som ikke overstiger saldo. 
   * Innsatsen kan ikke endres under aktivt spill */
  setBet: (bet) => {
    const state = get();

    if (state.phase === "changing") {
      return;
    }

    if (!Number.isInteger(bet) || bet < 1 || bet > state.coins) {
      return;
    }

    set({ bet });
  },

  /* Velger eller fjernet kort, valg er bare tillat før kortbytte */
  toggleCard: (index) => {
    set((state) => {

      if (state.phase !== "changing") {
          return state;
        }
        
      if (!Number.isInteger(index) || index < 0 || index >= state.playerHand.length) {
        return state;
      }

    return {
        selectedIndices: state.selectedIndices.includes(index)
        ? state.selectedIndices.filter((selected) => selected !== index)
        : [...state.selectedIndices, index],
    };
});
},

/* Nullstiller kort, kortvalg og siste gevinst, beholder saldo og innsats */
newGame: () => {
  if (get().phase !== "finished") {
    return;
  }

  set({ deck: [], playerHand: [], discardedCards: [], selectedIndices: [], phase: "idle", lastWinnings: 0,});
},

/* Oppretter og stokker kortene, og deler ut fem kort.
 * Trekker innsats fra aktiv saldo, og spillerens saldo i spillerlisten.
 * Krever valgt spiller og nok mynter.
 * Lagrer resten av stokken og endrer til "changing" */
    dealCards: () => {
       const state = get();

        if (state.activePlayerId === null || state.phase === "changing" || state.coins < state.bet) {
          return;
        }

        const deck = createDeck();
        const shuffledDeck = shuffleDeck(deck);
        const hand = shuffledDeck.slice(0, 5);
        set({ 
          coins: state.coins - state.bet,

          players: state.players.map((player) =>
          player.id === state.activePlayerId
            ? { ...player, coins: state.coins - state.bet }
            : player
          ),

         deck: shuffledDeck.slice(5), playerHand: hand, discardedCards: [], selectedIndices: [], phase: "changing" 
        });
      },

    /* Bytter ut valgte kort med kort fra kortstokken og registrerer kortene som ble kastet.
     * Vurderer ferdig hånd og beregner utbetaling.
     * Oppdaterer saldo begge steder og avslutter runden med "finished" */
    exchangeCards: () => {
        set((state) => {
            if (state.phase !== "changing") {
                return state;
            }

            let nextCardIndex = 0;
            
            const discardedCards = state.playerHand.filter((_, index) => state.selectedIndices.includes(index));

            const playerHand = state.playerHand.map((card, index) => {
                if (!state.selectedIndices.includes(index)) return card;
                return state.deck[nextCardIndex++]!;
            });

            const pokerHand = evaluateHand(playerHand);
            const winnings = payouts[pokerHand] * state.bet;

            console.log("utbetaling:", pokerHand, state.bet, winnings, state.coins + winnings,);

            return {  playerHand, deck: state.deck.slice(nextCardIndex), discardedCards, selectedIndices: [], phase: "finished", coins: state.coins + winnings, lastWinnings: winnings,
              players: state.players.map((player) => player.id === state.activePlayerId ? { ...player, coins: state.coins + winnings }
             :player
             ),
            };
        });
    },
}), {name:"video-poker-storage",
})
);
