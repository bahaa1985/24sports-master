import React, { Fragment } from "react";
import { useState,useEffect,useRef } from "react";
import getEvents from '../api/getEvents'
import '../styles/events.css'
import goal from '../images/goal.png'
import penalty from '../images/letter-p.png'
import own_goal from '../images/own-goal.png'
import missed_penalty from '../images/missed-penalty.png'
import yellow_card from'../images/yellow.png'
import red_card from '../images/red.png'
import VAR from '../images/var.png'
import substitute from '../images/substitute.png'

function Events(props){
    
    const fixture=props.fixture
    const teams=props.teams   

    const [events,setEvents]=useState([])  
    const event_div=useRef(HTMLElement);
    useEffect(()=>{
        getEvents(fixture).then((result)=>{
           setEvents( result.data.response )
        })        
    },[fixture,teams])
    const eventsHome = events.filter((event)=>event.team.id===teams[0])
    const eventsAway = events.filter((event)=>event.team.id===teams[1])

    const GROUPED_EVENTS=events.reduce((group,elem)=>{
        const TIME=elem.time.elapsed;
        if(group[TIME]==null) group[TIME]=[];
        group[TIME].push(elem);
        return group;
    },[])
    // console.log('grouped events: ',GROUPED_EVENTS)

    const home_events_div=(player,assist,type,detail,index)=>{
        
    return(
            <div key={index} style={{display:'flex',justifyContent:'flex-end',margin:'5px auto'}}>
           {
             type==='Goal'&& detail=='Normal Goal' ? 
             <img src={goal}></img>:
             type==='Goal'&& detail=='Penalty' ?
             <img src={penalty}></img>:
             type==='Goal'&& detail== 'Own Goal' ?
             <img src={own_goal}></img>:
             type==='Goal'&& detail=='Missed penalty' ?
             <img src={missed_penalty}></img>:
             type==='Card'&& detail=='Yellow Card' ?
             <img src={yellow_card}></img>:
             type==='Card'&& detail=='Red Card' ?
             <img src={red_card}></img>:
             type==='subst'?
             <img src={substitute}></img>:                    
             type==='Var'?
             <div>
                <img src={VAR}></img>
                <div>{detail}</div>
            </div>:
             null
            }
            <div className="div-players">
                <label className="label-palyer">{player}</label><br></br>
                <label className="label-assist">{assist}</label>
            </div>            
            </div>)
    }

    const away_events_div=(player,assist,type,detail,index)=>{
        return(
            <div key={index} style={{display:'flex',justifyContent:'flex-start',margin:'5px auto'}}>           
            <div className="div-players">
                <label className="label-palyer">{player}</label><br></br>
                <label className="label-assist">{assist}</label>
            </div>           
           {
            type==='Goal'&& detail=='Normal Goal' ? 
            <img src={goal}></img>:
            type==='Goal'&& detail=='Penalty' ?
            <img src={penalty}></img>:
            type==='Goal'&& detail== 'Own Goal' ?
            <img src={own_goal}></img>:
            type==='Goal'&& detail=='Missed Penalty' ?
            <img src={missed_penalty}></img>:
            type==='Card'&& detail=='Yellow Card' ?
            <img src={yellow_card}></img>:
            type==='Card'&& detail=='Red card' ?
            <img src={red_card}></img>:
            type==='subst'?
            <img src={substitute}></img>:
            type==='Var' ?
            <div style={{display:'block'}}>
                <img src={VAR} title="var icons"></img>
                <div>{detail}</div>
            </div>:           
            null
            }
            </div>      )
    }

    let i=0;
    return(        
        <div className='events' >          
            {                
                GROUPED_EVENTS.map((event,index)=>{                    
                    return(
                       
                            <div ref={event_div} key={index} style={{display:'flex',justifyContent:'center',margin:'5px auto',width:'100%'}}>
                                {
                                    <div style={{width:'45%',float:'right'}}>
                                        {
                                            eventsHome.map((event) => {                                        
                                                return(
                                                    event.time.elapsed===index? 
                                                    home_events_div(event.player.name,event.assist.name,event.type,event.detail,i++):
                                                    null
                                                )                                                                                                                                
                                            })
                                        }
                                    </div>
                                    
                                }
                                <span style={{width:'10%'}}>{index}</span>
                                {
                                    <div style={{width:'45%',float:'left'}}>
                                        {
                                            eventsAway.map((event) => {                                                                                
                                                return(
                                                    event.time.elapsed===index? 
                                                    away_events_div(event.player.name,event.assist.name,event.type,event.detail,i++):
                                                    null
                                                )                                                                                        
                                            
                                            })
                                        }
                                    </div>                                    
                                }  
                            </div>
                    )
                })
            }
        </div>
    )}
                        

export default Events