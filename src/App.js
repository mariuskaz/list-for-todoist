import React, { useEffect, useState, useLayoutEffect } from 'react'
import Todolist from './Components/Todolist';
import './App.css';

function App() {
  const [ todos, setTodos ] = useState([])
  const [ status, setStatus ] = useState("Loading, please wait...")
  const today = new Date().setDate(new Date().getDate() - 1)
  const tomorrow = new Date().setDate(new Date().getDate() + 1)
  const overdueTodos = todos.filter( item =>  item.date < today )
  const todayTodos = todos.filter( item => item.date >= today && item.date < tomorrow )
  const upcomingTodos = todos.filter( item =>  item.date >= tomorrow )
    
  function fetchTodoist() {
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
        setStatus("Connection error: " + error.message)
      })

  }

  useEffect( () => {
      fetchTodoist()
  }, [])

  const onVisibilityChange = () => {
    if (document.visibilityState === 'visible') fetchTodoist()
  }
  
  useLayoutEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [])

  // https://blog.logrocket.com/react-suspense-data-fetching/

  return (
    <div className="app">
      <div className="navbar">
        <i className="material-icons">menu</i>
      </div>
      <div className="container">
        <div className="side">
          <p><i className="material-icons">event</i>Today</p>
          <p><i className="material-icons">date_range</i>Next 7 days</p>
          <p><i className="material-icons">calendar_month</i>Calendar</p>
        </div>
        <div className="main">
        { todos.length === 0 ?
          <div className='loading'>{ status }</div> :
          <div className="content">
            <div className="header">Today <span>{ new Date().toLocaleDateString() }</span></div>
            <div className="list">
                  <Todolist title={'Overdue'} color={'red'} items={ overdueTodos } />
                  <Todolist title={`Today - ${new Date().toString().substring(0,15)}`}  color={'green'} items={ todayTodos } />
                  <Todolist title={'Upcoming'} color={'green'} items={ upcomingTodos } />
            </div>
          </div>
        }            
        </div>
      </div>
    </div>
  );
}

export default App;
