import React, { useEffect, useState, useLayoutEffect } from 'react'
import Todolist from './Components/Todolist';
import './App.css';

function App() {
  const [ todos, setTodos ] = useState([])
  const [ view, setView ] = useState(0)
  const [ status, setStatus ] = useState("Loading, please wait")

  const LOADING_VIEW = 0
  const TODAY_VIEW = 1
  const NEXT_VIEW = 2

    
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
                  .map(task => { return { id:task.id, content:task.content, due: task.due }})
                  .sort((a, b) => a.due && b.due && a.due.date > b.due.date ? 1 : -1)
              setTodos(items)
              console.log('items:', items.length)
              if (view === LOADING_VIEW) setView(TODAY_VIEW)
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

  function Content() {
    const today = new Date().setDate(new Date().getDate() - 1)
    const tomorrow = new Date().setDate(new Date().getDate() + 1)
    
    switch (view) {

      case TODAY_VIEW:
        const overdueTodos = todos.filter( item => item.due && new Date(item.due.date) < today )
        const todayTodos = todos.filter( item => item.due && new Date(item.due.date) >= today && new Date(item.due.date) < tomorrow )
        return (
            <div className="content">
              <div className="header">Today <span>{ new Date().toLocaleDateString() }</span></div>
              <div className="list">
                    <Todolist title={'Overdue'} color={'red'} items={ overdueTodos } />
                    <Todolist title={`Today - ${new Date().toString().substring(0,15)}`}  color={'green'} items={ todayTodos } />
              </div>
            </div>
        )

      case NEXT_VIEW:
        const upcomingTodos = todos.filter( item => item.due && new Date(item.due.date) >= tomorrow )
        const notTodos = todos.filter( item => !item.due )
        return (
            <div className="content">
              <div className="header">Upcoming</div>
              <div className="list">
                    <Todolist title={'Upcoming tasks'} color={'green'} items={ upcomingTodos } />
                    <Todolist title={'Not sheduled'} color={'green'} items={ notTodos } />
              </div>
            </div>
        )

      default:
        return (
            <div className='loading'>{ status }</div> 
        )
    }
  }

  return (
    <div className="app">
      <div className="navbar">
        <i className="material-icons">menu</i>
      </div>
      <div className="container">
        <div className="side">
          <p onClick={() => setView(TODAY_VIEW)}><i className="material-icons">event</i>Today</p>
          <p onClick={() => setView(NEXT_VIEW)}><i className="material-icons">date_range</i>Upcoming</p>
          <p><i className="material-icons">calendar_month</i>Calendar</p>
        </div>
        <div className="main" key={view}>
          <Content/>
        </div>
      </div>
    </div>
  );
}

export default App;
