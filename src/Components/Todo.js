import { useState } from "react"

export default function Todo({ todo, due, color, priority, open }) {
    const [ checked, setChecked ] = useState(false),
    
    colors = [
        "black", "lightgray", "#246fe0", "#eb8909", "#d1453b"
    ],
    
    style = { 
        padding:'10px 5px 10px', 
        fontSize:'0.8em', 
        textAlign:'left', 
        overflow:'hidden', 
        borderBottom:'1px solid gainsboro' 
    },

    checkStyle= {
        color:colors[priority], 
        cursor:'pointer',
        margin:'-2px 10px 5px 0px',
        verticalAlign:'top',
    },

    todoStyle =  { 
        display:'inline-block', 
        width:'94%', 
        cursor:'pointer' ,
    },

    textStyle = {
        color: checked ? "gray" : 'black',
        textDecoration: checked ? 'line-through' : 'none'
    }

    function Checkmark() {
        if (checked) {
            return <i className="material-icons" style={checkStyle} onClick={()=>setChecked(false)}>check_circle</i>
        }
        return <i className="material-icons" style={checkStyle} onClick={()=>setChecked(true)}>radio_button_unchecked</i>
    }

    return (
        <div style={style}>
            <Checkmark/>
            <div onClick={open} style={todoStyle}><span style={textStyle}>{ todo }</span><br/><small style={{color:color}}>{due}</small></div>
        </div>
    )
}