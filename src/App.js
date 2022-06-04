import React, { useEffect, useState } from 'react'
import Todolist from './Components/Todolist';
import './App.css';

function App() {
  const [ todos, setTodos ] = useState([])
  const today = new Date().setDate(new Date().getDate() - 1)
  const tomorrow = new Date().setDate(new Date().getDate() + 1)
  const overdueTodos = todos.filter( item =>  item.date < today )
  const todayTodos = todos.filter( item => item.date >= today && item.date < tomorrow )
  const upcomingTodos = todos.filter( item =>  item.date >= tomorrow )
    
  function sync() {
      let token = localStorage["todoist.token"],
      url = "https://api.todoist.com/sync/v8/sync",

      headers = {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
      },

      params = {
          sync_token: '*',
          resource_types: ["user","items"]
      }

      console.log("sync...")
      
      fetch(url, { 
          method: 'POST',
          headers : headers,
          body: JSON.stringify(params)
      })
  
      .then(res => {
          res.json().then(data => {
              console.log(data.user.email)
              const items = data.items
                  .filter(item => item.responsible_uid === data.user.id || item.project_id === data.user.inbox_project)
                  .filter(item => item.due)
                  .map(task => { return { id:task.id, content:task.content, due: task.due, date: new Date(task.due.date) }})
                  .sort((a, b) => a.due.date > b.due.date ? 1 : -1)
              setTodos(items)
              console.log('items:', items.length)
          })
      })

      .catch(error => {
          alert("Connection failed!");
      })

  }

  useEffect( () => {
      sync()
  }, [])

  return (
    <>
      <div className="navbar">
        <i className="material-icons">menu</i>
      </div>
      <div className="container">
        <div className="side">
          <p>Today</p>
          <p>Next 7 days</p>
          <p>Calendar
          </p>
        </div>
        <div className="main">
          <div className="content">
            <div className="header">Today <span>{ new Date().toLocaleDateString() }</span></div>
            <div className="list">
                  <Todolist name={'Overdue'} color={'red'} items={ overdueTodos } />
                  <Todolist name={`Today - ${new Date().toString().substring(0,15)}`}  color={'green'} items={ todayTodos } />
                  <Todolist name={'Upcoming'} color={'green'} items={ upcomingTodos } />
            </div>
          </div>      
        </div>
      </div>
    </>
  );
}

export default App;
