import React,{ Fragment, ReactDOM } from 'react'
import { useState,useEffect,useRef } from 'react'
import getResults from '../api/getResults'
import  '../styles/results.css'
import Events from './events'
import Statistics from './statistics'



function Results(props){
    const [results,setResults]=useState([])
    const [fixture,setFixture]=useState(0)
    const [teams,setTeams]=useState([])
    const [tab,setTab]=useState('')
    const [displayed,setDisplay]=useState(false)
   
    const league=props.league
    const season=props.season
          
    useEffect(()=>{                                                  
        getResults(league,season).then((result)=>{                                 
            setResults( result.data.response )
        });
    },[league,season])
            
    const groupedResults=results.reduce((group,elem)=>{            
        const date= new Date(elem.fixture.date).toDateString()  
        if(group[date]==null) group[date]=[]
        group[date].push(elem)
        return group
    },{})

    let i=0;
    return(
        <div>
            {               
               Object.keys(groupedResults).sort((a,b)=>Date.parse(a)-Date.parse(b)).map((elem,day_index)=>{
                              
                return(
                    <div>                
                        <div key={day_index} className="fixture-date"> {elem} </div>                                     
                        {groupedResults[elem].map((elem,fixture_index)=>{
                            return(
                                <div key={fixture_index}>
                                    <div className="fixture-teams" key={elem.fixture.id}>                                                                                                                      
                                            <img src={elem.teams.home.logo}></img>
                                            <span className='team'>{elem.teams.home.name}</span>
                                            <span className='result'>{elem.goals.home}</span>                                
                                            <span className='result'>{elem.goals.away}</span>
                                            <span className='team'>{elem.teams.away.name}</span>
                                            <img src={elem.teams.away.logo}></img>                                                                                                                                                       
                                    </div>                                     
                                    <div>
                                        <span onClick={()=>{setTab('events');
                                                            setFixture(elem.fixture.id);
                                                            setTeams([elem.teams.home.id,elem.teams.away.id]);}}>Events</span>
                                        <span onClick={()=>{setTab('statistics');
                                                            setFixture(elem.fixture.id);
                                                            setTeams([elem.teams.home.id,elem.teams.away.id]);}}>Statistics</span>
                                        <Fragment> 
                                            {
                                                //to display events, statistics panes belo the fixture, 
                                                //depending on what user click:
                                                tab==='events' && fixture===elem.fixture.id?
                                                <Events fixture={fixture} teams={teams}/>:
                                                tab==='statistics' && fixture===elem.fixture.id? 
                                                <Statistics fixture={fixture} teams={teams}/>: null
                                            }                                       
                                            
                                        </Fragment>                                    
                                    </div>
                                </div>

                            )
                        })}                         
                        </div>                                 
                    )               
                })
            }
                                                         
        </div>
    )
}

export default Results