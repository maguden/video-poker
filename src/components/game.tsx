import Card from "./card";
import type { PlayingCard } from "../types/playingCard";
import "./Game.css";

const testHand: PlayingCard[] = [
  { suit: "hearts", rank: "A" },
  { suit: "spades", rank: "K" },
  { suit: "diamonds", rank: "Q" },
  { suit: "clubs", rank: "J" },
  { suit: "hearts", rank: "10" },
];

export default function Game() {
  return (
    <section aria-label="Video Poker Game">
      <div className="hand">
        {testHand.map((card) => (
          <Card key={`${card.suit}-${card.rank}`} card={card} />
        ))}
      </div>
    </section>
  );
}
