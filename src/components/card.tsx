import type { PlayingCard } from '../types/playingCard';
import "./card.css";

type CardProps = {
  card?: PlayingCard;
  faceDown?: boolean;
};

/* kobler kortets farge til symbolet */
const suitSymbols = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

/* Viser spillkort 
 Card inneholder verdi og farge.
 FaceDown bestemmer om baksiden skal vises.
 Returnerer baksiden hvis faceDown er true.
 Hvis ikke vises forsiden med verdi og symbol */
const Card = ({ card, faceDown = false }: CardProps) => {
    if (faceDown || !card) {
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
    </div>
  );
};

export default Card;
