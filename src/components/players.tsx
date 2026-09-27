import { useState } from "react";
import { useGameStore } from "../store/gamestore";
import "./players.css"

/* Viser skjema for å opprette spiller, og liste for aktive spillere.
 * Navnefeltet bruker lokal tilstand, spillerdata hentes fra zustand */
export default function Players() {
    const [name, setName] = useState("");
    const addPlayer = useGameStore((state) => state.addPlayer);
    const players = useGameStore((state) => state.players);
    const activePlayerId = useGameStore((state) => state.activePlayerId);
    const selectPlayer = useGameStore((state) => state.selectPlayer);
    const phase = useGameStore((state) => state.phase);

    return (
        <section className="players">
            <div className="players-panel">
            <h2>PLAYERS</h2>
            {/* Innsending hindrer reload, oppretter spiller og tømmer felt */}
            <form onSubmit={(event) => {event.preventDefault(); addPlayer(name); setName("");}} >
                <label>PLAYER NAME:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                </label>

                <button type="submit" disabled={name.trim() === ""}>CREATE PLAYER</button>
            </form>
            {/* Viser spillere og markerer den aktive. Spillerbytte er ikke lov under "changing" */}
            <ul> 
                {players.map((player) => (
                    <li key={player.id}>
                        <button type="button" disabled={phase === "changing"} onClick={() => selectPlayer(player.id)} aria-pressed={player.id === activePlayerId}>
                            {player.name}
                            {player.id === activePlayerId && " - SELECTED"}
                        </button>
                    </li>
                ))}
            </ul>
            </div>  
        </section>
    );
}