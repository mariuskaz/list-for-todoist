import { useState } from 'react'

export default function QuickTodo({ due, sync }) {
  const [ active, setActive] = useState(false)

  function pushTask(event) {
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

  function InputBox() {
    if (active) return <textarea rows="4" cols="111" autoFocus placeholder="Type text and press Enter" className ="input-box"  onKeyPress={(e) => pushTask(e)} onBlur={() => setActive(false)}  />
    else return <p className ="commands" onClick={() => {setActive(true)}}><i className="material-icons">add</i>Add task</p>
  }

  return <InputBox/>

}