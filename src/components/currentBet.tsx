import { useGameStore } from "../store/gamestore";

/* Henter innsats, saldo og spillfase fra zustand. */
export default function CurrentBet() {
  const coins = useGameStore((state) => state.coins);
  const bet = useGameStore ((state) => state.bet);
  const phase = useGameStore((state) => state.phase);
  const setBet = useGameStore((state) => state.setBet);
    return (
       <div className="bet-controls">
        <button type="button" aria-label="Decrease bet" disabled={phase === "changing" || bet <= 5} onClick={() => setBet(bet - 5)}>-</button>
        <span>BET: {bet}</span>
        <button type="button" aria-label="Increase bet" disabled={phase === "changing" || bet + 5 > coins} onClick={() => setBet(bet + 5)}>+</button>
      </div>
    );
}
