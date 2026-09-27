import { useGameStore } from "../store/gamestore";

/* Henter saldo fra zustand. 
 Tar ingen props og returnerer p-element med saldo.
 Visningen endres når coins endres i store */
export default function TotalCoins() {
    const coins = useGameStore((state) => state.coins);

    return <p className="game-balance">COINS: {coins}</p>
}