import Game from "./components/game"
import PayoutTable from "./components/payoutTable";
import Players from "./components/players";
import { Routes, Route, Link, } from "react-router";
import Rules from "./components/rules";

/* Hovedkomponent som samler header, navigasjon og appens tre sider */
function App() {
  return (
     <main>
      <header className="game-header">
        <div className="header-left">
        <details className="payout-toggle">
          <summary>PAYOUTS</summary>
          <div className="payout-panel">
            <PayoutTable />
          </div>
        </details>
        <Link to="/rules">RULES</Link>
        </div>
        <h1><Link to="/">Video Poker</Link></h1>
        <nav className="game-nav">
         <Link to="/">GAME</Link>
         <Link to="/players">PLAYERS</Link>
      </nav>
      </header>
  
      <Routes>
         <Route path="/" element={<Game />} />
         <Route path="/players" element={<Players />} />
         <Route path="/rules" element={<Rules />} />
      </Routes>
     </main>
     
  );
}

export default App;