import React from 'react'

export default function Todo({ todo, due }) {
    return (
        <div style={{ padding:'10px 5px 10px', fontSize:'0.8em', textAlign:'left', overflow:'hidden', borderBottom:'1px solid gainsboro' }}>
            <i className="material-icons" style={{ color:'lightgray', fontSize:'1.5em', margin:'0px 10px 5px 0px',verticalAlign:'top'}}>panorama_fish_eye</i>
            <div style={{ display:'inline-block', width:'94%' }}>{ todo }<br/><small style={{color:'red'}}>{due}</small></div>
        </div>
    )
}
