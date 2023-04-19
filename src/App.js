import { useState } from 'react';
import './App.css';
import Standings from './presentation/standings'
import Results from './presentation/results'
import Statistics from './presentation/statistics'

function App() {

  let [leagueId,setLeagueId]=useState(0)
  let [season,setSeason]=useState(0) 
  const year=2022;

  return (
    <div className="App">
     <div>
      <button onClick={()=>{setLeagueId(2);setSeason(year)}}>UFL</button>
      <button onClick={()=>{setLeagueId(39);setSeason(year)}}>EPL</button>
      <button onClick={()=>{setLeagueId(140);setSeason(year)}}>La Liga</button>
      <button onClick={()=>{setLeagueId(135);setSeason(year)}}>Le Calcio</button>
      <button onClick={()=>{setLeagueId(78);setSeason(year)}}>Bundesliga</button>
      <button onClick={()=>{setLeagueId(61);setSeason(year)}}>Liga Un</button>
     </div>
    {/* <Standings league={leagueId} season={season}/> */}
    <Results league={leagueId} season={season}/>
    {/* <Statistics fixture={867946} teams={[52, 42]}/> */}
    </div>
  );
}

export default App;
