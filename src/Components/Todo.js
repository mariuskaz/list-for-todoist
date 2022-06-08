import { useState } from "react"

export default function Todo({ id, todo, due, color, priority, open, sync }) {
    const [ checked, setChecked ] = useState(priority === 2),
    
    colors = [
        "black", "lightgray", "#246fe0", "orange", "red"
    ],
    
    style = { 
        padding:'10px 5px 10px', 
        fontSize:'0.8em', 
        textAlign:'left', 
        overflow:'hidden', 
        borderBottom:'1px solid gainsboro' ,
        userSelect:'none'
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

    function update() {
        setChecked(!checked)

        let token = localStorage["todoist.token"] || "",
        headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data = {
            priority: priority !== 2 ? 2 : 1
        }

        fetch('https://api.todoist.com/rest/v1/tasks/' + id, { 
                method: 'POST',
                headers : headers,
                body: JSON.stringify(data)
        })

        .then(response => {
            sync()
        })
    }

    function Checkmark() {
        if (priority === 44) {
            return <i className="material-icons" style={checkStyle} onClick={update}>cancel</i>
        }
        if (checked) {
            return <i className="material-icons" style={checkStyle} onClick={update}>check_circle</i>
        }
        return <i className="material-icons" style={checkStyle} onClick={update}>radio_button_unchecked</i>
    }

    function Content() {
        return <div onClick={open} style={todoStyle}><span style={textStyle}>{ todo }</span><br/><small style={{color:color}}>{due}</small></div>
    }

    return (
        <div style={style}>
            <Checkmark/><Content/>
        </div>
    )
}