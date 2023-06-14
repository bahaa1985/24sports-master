import React from "react";
import getStatistics from "../api/getStatistics";
import '../styles/statistics.css'
import { useEffect,useState } from "react";

function Statistics(props){
    const home_team=props.teams[0]
    const away_team=props.teams[1]
    const fixture=props.fixture
    const [homeStatistics,setHomeStatistics]=useState([])
    const [awayStatistics,setAwayStatistics]=useState([])
    
    let statistic_obj={
        "home":0,
        "away":0,
        "type":''
    }
    



    
    
    useEffect(()=>{
        getStatistics(fixture,home_team).then((result)=>{
            setHomeStatistics(result.data.response[0].statistics)
        });                                      
        console.log('home effect!')
    },[fixture,home_team])

    useEffect(()=>{
        getStatistics(fixture,away_team).then((result)=>{
            setAwayStatistics(result.data.response[0].statistics)
        });
        console.log('away effect!')
    },[fixture,away_team])
  
    let total,max,factor=0;
    let screen_width=window.innerWidth
    let progress_width=(45*screen_width)/100

    const statistics_arr=Array.from(Array(16),()=>({
        "home":0,
        "away":0,
        "type":''
    }))

    return(
        <div>                              
            {
                homeStatistics.map((item,index)=>{
                    statistics_arr[index].type=item.type;
                    item.value===null? statistics_arr[index].home=0 :
                    typeof(item.value)===String && item.value.contains('%')? statistics_arr[index].home=item.value.substring(item.value.length-1) : 
                    statistics_arr[index].home=item.value;                
                })
            }
            {
                awayStatistics.map((item,index)=>{              
                    item.value===null? statistics_arr[index].away=0 :
                    typeof(item.value)===String && item.value.contains('%')? statistics_arr[index].away=item.value.substring(item.value.length-1) : 
                    statistics_arr[index].away=item.value; 
                })
            }
            {console.log('st_arr',...statistics_arr)}
            {
                statistics_arr.map((item,index)=>{                                
                    total=item.home+item.away;
                    return(
                        <div key={index} >
                            <div>{item.type}</div>
                                <div className="statistics-details">
                                    <span>{item.home}</span>
                                <div>
                                    <progress className="progress-home" max={total} value={item.home} width={progress_width+'px'}></progress>
                                </div>
                                <div>
                                    <progress className="progress-away" max={total} value={item.away} width={progress_width+'px'}></progress>
                                </div>
                                <span>{item.away}</span>
                            </div>
                        </div>
                    )
                })
            }               
       
        </div>
    )
}


export default Statistics