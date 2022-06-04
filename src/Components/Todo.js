export default function Todo({ todo, due, color, open }) {
    return (
        <div style={{ padding:'10px 5px 10px', fontSize:'0.8em', textAlign:'left', overflow:'hidden', borderBottom:'1px solid gainsboro' }}>
            <i className="material-icons" style={{ color:'lightgray', fontSize:'1.5em', margin:'0px 10px 5px 0px',verticalAlign:'top'}}>panorama_fish_eye</i>
            <div onClick={open} style={{ display:'inline-block', width:'94%', cursor:'pointer' }}>{ todo }<br/><small style={{color:color}}>{due}</small></div>
        </div>
    )
}