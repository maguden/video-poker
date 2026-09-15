import type { PlayingCard } from '../types/playingCard';
import "./card.css";

type CardProps = {
  card: PlayingCard;
  faceDown?: boolean;
};

const suitSymbols = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const Card = ({ card, faceDown = false }: CardProps) => {
    if (faceDown) {
        return (
            <div 
                className="card card--back"
                role="img"
                aria-label="Kort med baksiden opp"
            />
        );
    }

  return (
    <div className={`card ${card.suit}`}>
      <span className="rank">{card.rank}</span>
      <span className="suit">{suitSymbols[card.suit]}</span>
      <span className="rank rank--bottom">{card.rank}</span>
    </div>
  );
};

export default Card;
