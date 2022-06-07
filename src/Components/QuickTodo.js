import React, { useRef, useState } from 'react'

export default function QuickTodo({ due, sync }) {
  const [ active, setActive] = useState(false)

  function addTask(event) {
    if (event.key === "Enter") {
      let task = { content: event.target.value, due_string: due || "" },
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


    } else if (event.key === "Escape") {
      setActive(false)
    }

  }

  function Content() {
    if (active) 
      return <textarea rows="3" cols="50" autoFocus placeholder="Task description" className ="inputbox" type="text" onKeyUp={(e) => addTask(e)} onBlur={() => setActive(false)}  />
    return <p className ="commands" onClick={() => {setActive(true)}}><i className="material-icons">add</i>Add task</p>
  }
  return (
    <div>
      <Content/>
    </div>
  )
}
