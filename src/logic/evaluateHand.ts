import type { PlayingCard } from "../types/playingCard";
import type { PokerHand } from "../types/pokerHand";

/* Tar i mot kort og sjekker score, returnerer beste hånd */
export function evaluateHand(hand:PlayingCard[]): PokerHand {
    if (hand.length !== 5) {
        return "HIGH CARD";
    }
    
    let pairCards = 0;
    let hasThree = false;
    let hasFour = false;

    /* Flush */
    const isFlush = hand.every((card) => card.suit === hand[0]?.suit);

    /* Gjør alle verdier om til tall*/
    const rankOrder = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", ];

    const values = hand
    .map((card) => rankOrder.indexOf(card.rank) + 2)
    .sort((a, b) => a - b);

    /* Ser om hvert tall er høyere enn foorige */
    const isRegularStraight = values.every((value, index) => index === 0 || value === values[index - 1]! + 1 );
    
    /* Ess kan være 1 */
    const isLowStraight = values.join(",") === "2,3,4,5,14";
    const isStraight = isRegularStraight || isLowStraight;

    
    for (const card of hand) {
        const matchingCards = hand.filter((otherCard) => otherCard.rank === card.rank);

        if (matchingCards.length === 2) {
            pairCards++;
        }

        if (matchingCards.length === 3) {
            hasThree = true;
        }

        if (matchingCards.length === 4) {
            hasFour = true;
        }
    }

    /* Ser etter sterkeste hånd */
    if (isStraight && isFlush && values[0] === 10) {
        return "ROYAL FLUSH";
    }

    if (isStraight && isFlush) {
        return "STRAIGHT FLUSH";
    }

    if (hasFour) {
        return "FOUR OF A KIND"
    }

    if (hasThree && pairCards === 2) {
        return "FULL HOUSE"
    }

    if (isFlush) {
        return "FLUSH";
    }

    if (isStraight) {
        return "STRAIGHT";
    }

    if (hasThree) {
        return "THREE OF A KIND"
    }

    if (pairCards === 4) {
        return "TWO PAIRS"
    }

    if (pairCards === 2) {
        return "ONE PAIR"
    }

    return "HIGH CARD";
}

