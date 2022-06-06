import React from 'react'

export default function QuickTodo() {
  function addTask() {
    prompt("Task description:")
  }
  
  return (
    <div>
        <p className ="commands" onClick={addTask}><i className="material-icons">add</i>Add task</p>
    </div>
  )
}
