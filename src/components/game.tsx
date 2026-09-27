import { evaluateHand } from "../logic/evaluateHand";
import Card from "./card";
import { useGameStore } from "../store/gamestore";
import "./game.css";
import CurrentBet from "./currentBet";
import TotalCoins from "./totalCoins";


/* viser spillet med kort, kontroller, innsats, saldo og meldinger.
 Henter spilltillstand og handlinger fra zustand */
export default function Game() {
  const coins = useGameStore((state) => state.coins);
  const bet = useGameStore ((state) => state.bet);
  const playerHand = useGameStore((state) => state.playerHand);
  const selectedIndices = useGameStore((state) => state.selectedIndices);
  const toggleCard = useGameStore((state) => state.toggleCard);
  const dealCards = useGameStore((state) => state.dealCards);
  const phase = useGameStore((state) => state.phase);
  const exchangeCards = useGameStore((state) => state.exchangeCards);
  const newGame = useGameStore((state) => state.newGame);
  const lastWinnings = useGameStore((state) => state.lastWinnings); 

return (
  <section className="game" aria-label="video Poker Game">
    {/* viser baksiden av kortene før spillet er i gang */}
    <div className="hand">
      {phase === "idle" && [0, 1, 2, 3, 4].map((index) => ( <Card key={index} faceDown />))}
      {playerHand.map((card, index) => {
        const isSelected = selectedIndices.includes(index);

         return (
          <button
            key={`${card.suit}-${card.rank}`}
            className="card-choice"
            type="button"
            disabled={phase !== "changing"}
            aria-pressed={isSelected}
            aria-label={`Select card ${index + 1} to change`}
            onClick={() => toggleCard(index)}
          >
          <Card card={card} />
         </button>
        );
      })}
    </div>

    {/* Spillfasen bestemmer hvilke knapper som vises */}
    <div className="game-controls">
      {phase === "idle" && (<button type="button" className="game-button" onClick={dealCards} disabled={coins < bet}>DRAW</button>)}
      {phase === "changing" && (<button type="button" className="game-button" onClick={exchangeCards}>{selectedIndices.length > 0 ? "DRAW" : "KEEP ALL"}</button>)}
      {phase === "finished" && (<button type="button" className="game-button" onClick={newGame}>NEW GAME</button>)}
      <CurrentBet />
      <TotalCoins />
    </div>
    {/* Viser spillinstruksjoner underveis, med gevinst etter spillt runde */}
   <p className="game-message" aria-label="Instructions for playing">
     {phase === "idle" && "PLACE YOUR BET AND PRESS ¨DRAW¨ TO DEAL CARDS"}
     {phase === "changing" && "SELECT CARDS TO CHANGE"}
     {phase === "finished" && (<>{evaluateHand(playerHand)} {lastWinnings > 0 && (<span className="game-winnings"> +{lastWinnings}</span>)}</>)}
   </p>
  </section>
);
}

  