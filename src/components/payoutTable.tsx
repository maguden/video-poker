import { payouts } from "../logic/payouts";

/* Viser hender og utbetalingsfaktorer */
export default function PayoutTable() {
    return (
        <table className="payout-table">
            <thead>
                <tr>
                  <th scope="col">HAND</th>
                  <th scope="col">PAYOUT (x)</th>  
                </tr>
            </thead>

            <tbody>
                {Object.entries(payouts).map(([hand, multiplier]) => (
                    <tr key={hand}>
                        <th scope="row">{hand}</th>
                        <td>{multiplier}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}