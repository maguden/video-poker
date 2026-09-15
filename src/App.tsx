import Card from './components/card';

function App() {
  return (

     <main>
       <h1>Video Poker</h1>
       <Card card={{ suit: 'hearts', rank: 'A' }} faceDown />
     </main>
     
  );
}

export default App;