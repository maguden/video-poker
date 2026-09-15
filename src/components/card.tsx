import type { PlayingCard } from '../types/playingCard';
import "./card.css";

type CardProps = {
  card: PlayingCard;
};

const suitSymbols = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const Card = ({ card }: CardProps) => {
  return (
    <div className={`card ${card.suit}`}>
      <span className="rank">{card.rank}</span>
      <span className="suit">{suitSymbols[card.suit]}</span>
      <span className="rank rank--bottom">{card.rank}</span>
    </div>
  );
};

export default Card;
