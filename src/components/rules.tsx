import PayoutTable from "./payoutTable";
import "./rules.css"

/* Viser spillereglene og gjenbruker payoutTable til utbetalingsoversikt */
export default function Rules() {
    return (
        <section className="rules">
            <div className="rules-panel">
            <h2>HOW TO PLAY</h2>

            <ol>
                <li>Create or select a player. New players start with 100 coins.</li>
                <li>Choose your bet and press DRAW. The bet is deducted from your coins</li>
                <li>Select the cards you want to change.</li>
                <li>Press DRAW to replace them, or KEEP ALL if you want to hold your hand</li>
                <li>Press NEW GAME to prepare for the next round </li>
            </ol>

            <p>
                Payouts equal your bet multiplied by the value in the payout table.
                One pair returns your bet. High card pays nothing. 
            </p>

            <PayoutTable />
            </div>
        </section>
    );
}