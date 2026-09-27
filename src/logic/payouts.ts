import type { PokerHand } from "../types/pokerHand";

/* Utbetalingsfaktor for hver hånd */
export const payouts: Record<PokerHand, number> = { "HIGH CARD": 0, "ONE PAIR": 1, "TWO PAIRS": 2, "THREE OF A KIND": 3, "STRAIGHT": 4, "FLUSH": 6, "FULL HOUSE": 9, "FOUR OF A KIND": 25, "STRAIGHT FLUSH": 50, "ROYAL FLUSH": 250, };
