import Card from "./card";
import { useGameStore } from "../store/gamestore";
import "./game.css";

/* viser hånd og knapp for utdeling */
export default function Game() {
  const playerHand = useGameStore((state) => state.playerHand);
  const dealCards = useGameStore((state) => state.dealCards);

return (
  <section aria-label="Video Poker Game">
    <div className="hand">
      {playerHand.map((card) => (
        <Card key={`${card.suit}-${card.rank}`} card={card} />
      ))}
    </div>

    <button type="button" onClick={dealCards}>
      Deal cards
    </button>

  </section>
);
}