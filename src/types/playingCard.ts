/* De fire mulige fargene */
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

/* De fire mulige korttypene */
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

/* Beskriver kort med farge og verdi */
export type PlayingCard = {
  suit: Suit;
  rank: Rank;
};