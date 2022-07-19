import { useRef, useState } from 'react'

export default function QuickTodo({ due, sync }) {
  const [ active, setActive ] = useState(false)
  const input = useRef()

  function handleInput(event) {
    if (event.key === "Enter") {
      pushTask()
    } else if (event.key === "Escape") {
      setActive(false)
    } 
  }

  function pushTask() {
    let task = { content: input.current.value, due_string: due || "" },
    token = localStorage["todoist.token"] || "none",
    headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }

    fetch('https://api.todoist.com/rest/v1/tasks', { 
        method: 'POST',
        headers : headers,
        body: JSON.stringify(task)
    })

    .then(response => {
      sync()
    })

    setActive(false)
  }

  function InputBox() {
    if (active) return (
      <div>
        <textarea rows="4"
          className ="input-box" 
          placeholder="Type task description" 
          onKeyDownCapture={(e) => handleInput(e)} 
          onBlur={() => setActive(false)}
          ref={input} autoFocus/>
        <div className="buttons dark-theme" 
          onMouseDown={pushTask}>Save</div>
        <div className="buttons">Cancel</div>
      </div>
    )
    return <p className ="commands" onClick={() => setActive(true)}><i className="material-icons">add</i>Add task</p>
  }

  return <InputBox/>

}