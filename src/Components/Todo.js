import { useState } from "react"

export default function Todo({ id, todo, due, color, priority, project, open, browse, sync }) {
    const [ checked, setChecked ] = useState(priority === 2),
    
    colors = [
        "black", "lightgray", "#246fe0", "orange", "crimson"
    ],
    
    style = { 
        padding:'7px 4px', 
        fontSize:'0.8em', 
        textAlign:'left', 
        overflow:'hidden', 
        borderBottom:'1px solid gainsboro' ,
        userSelect:'none'
    },

    checkStyle= {
        color:colors[priority], 
        cursor:'pointer',
        margin:'-2px 10px 0px 0px',
        verticalAlign:'top',
    },

    todoStyle =  { 
        display:'inline-block', 
        width: 'calc(100% - 31px)', 
    },

    textStyle = {
        color: checked ? "gray" : 'black',
        cursor:'pointer',
        textDecoration: checked ? 'line-through' : 'none'
    },

    projectStyle = {
        float:'right', 
        color:'gray', 
        cursor:'pointer',
        display:'inline-block'
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
        if (priority === 4) {
            return <i className="material-icons" style={checkStyle} onClick={update}>cancel</i>
        }
        if (checked) {
            return <i className="material-icons" style={checkStyle} onClick={update}>check_circle</i>
        }
        return <i className="material-icons" style={checkStyle} onClick={update}>radio_button_unchecked</i>
    }

    function Content() {
        return (
            <div style={todoStyle}>
                <span onClick={open} style={textStyle}>{todo}</span><br/>
                <small style={{color}}>{due}</small>
                <span onClick={browse} style={projectStyle}>{project}</span>
            </div>
        )
    }

    return (
        <div style={style}>
            <Checkmark/><Content/>
        </div>
    )
}