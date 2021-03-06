import './App.css';
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import TodosList from './Components/TodosList';
import QuickTodo from './Components/QuickTodo';
import Spinner from './Components/Spinner';

function App() {
  const [ todos, setTodos ] = useState([])
  const [ view, setView ] = useState(0)
  const [ status, setStatus ] = useState("Loading")
  const [ scroll, setScroll ] = useState({})
  const [ toggle, setToggle ] = useState(false)
  const listview = useRef()
  const sidebar = useRef()

  const TODAY_VIEW = 1
  const UPCOMING_VIEW = 2
  const NODATE_VIEW = 3
  const CALENDAR_VIEW = 4

  function fetchTodoist() {
      let token = localStorage["todoist.token"] || prompt("Todoist API token:"),
      url = "https://api.todoist.com/sync/v8/sync",

      headers = {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
      },

      params = {
          sync_token: '*',
          resource_types: ["user","items","projects"]
      }

      console.log("sync...")

      fetch(url, { 
          method: 'POST',
          headers : headers,
          body: JSON.stringify(params)
      })
  
      .then(res => {
          res.json().then(data => {
            if (!localStorage["todoist.token"]) 
                localStorage.setItem("todoist.token", token)
                
            let  projects = {}
            data.projects.forEach( project => projects[project.id] = project.name )

            const items = data.items
                .filter(item => item.responsible_uid === data.user.id || item.project_id === data.user.inbox_project)
                .map(task => { return { id:task.id, content:task.content, due:task.due, priority:task.priority, project: { id:task.project_id, name:projects[task.project_id] } }})
                .sort((a, b) => a.due && b.due && a.due.date > b.due.date ? 1 : -1)
                
            setTodos(items)
            console.log('items:', items.length)
            if (view === 0) setView(TODAY_VIEW)
          })
      })

      .catch(error => {
        setStatus("Connection error: " + error.message)
      })

  }

  useEffect( () => {
      fetchTodoist()
  }, [])

  useEffect( () => {
     if (scroll[view]) listview.current.scrollTop  = scroll[view]
  }, [scroll, view])

  const onVisibilityChange = () => {
    if (document.visibilityState === 'visible') fetchTodoist()
  }
  
  useLayoutEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => document.removeEventListener("visibilitychange", onVisibilityChange)
  })

  function changeView(view_id) {
    const top = listview.current.scrollTop || 0
    setScroll( values => { return {...values, [view] : top} })
    setView(view_id)
    document.scrollTop  = scroll[view] || 0
    if (toggle) sidebar.current.style.marginLeft = "-280px"
  }

  function toggleMenu() {
    const margin = sidebar.current.style.marginLeft
    sidebar.current.style.marginLeft = margin === "0px" ? "-280px" :  "0px"
    setToggle(true)
  }

  function Content() {
    const today = new Date().setHours(0,0,0)
    const tommorow = new Date().setHours(24,0,0)
    const upcoming = new Date().setHours(48,0,0)

    switch (view) {

      case TODAY_VIEW:
        const overdueTodos = todos.filter( item => item.due && new Date(item.due.date) < today ).sort((a, b) => a.due && b.due && a.due.date > b.due.date ? 1 : -1)
        const todayTodos = todos.filter( item => item.due && new Date(item.due.date) >= today && new Date(item.due.date) < tommorow ).reverse()
        return (
            <div className="content">
              <div className="header">Today <span style={{color:"gray"}}>{ new Date().toLocaleDateString() }</span></div>
              <div className="list">
                    <TodosList title={'Overdue'} color={'red'} items={overdueTodos} sync={fetchTodoist} />
                    <TodosList title={`${new Date().toString().substring(0,10)} - Today`}  color={'green'} items={todayTodos} sync={fetchTodoist} />
                    <QuickTodo sync={fetchTodoist} due="today"/>
              </div>
            </div>
        )

      case UPCOMING_VIEW:
        const tommorowTodos = todos.filter( item => item.due && new Date(item.due.date) >= tommorow && new Date(item.due.date) < upcoming )
        const upcomingTodos = todos.filter( item => item.due && new Date(item.due.date) >= upcoming )
        return (
            <div className="content">
              <div className="header">Upcoming</div>
              <div className="list">
                    <TodosList title={'Tomorrow'} color={'green'} items={tommorowTodos} sync={fetchTodoist} />
                    <QuickTodo sync={fetchTodoist} due="tomorrow"/>
                    <TodosList title={'Next week'} color={'green'} items={upcomingTodos} sync={fetchTodoist} />
                    <QuickTodo sync={fetchTodoist} due="monday"/>
              </div>
            </div>
        )

      case NODATE_VIEW:
        const notTodos = todos.filter( item => !item.due ).reverse()
        return (
            <div className="content">
              <div className="header">Not sheduled</div>
              <div className="list">
                    <TodosList title={'No due date'} color={'green'} items={notTodos} sync={fetchTodoist} />
                    <QuickTodo sync={fetchTodoist} />
              </div>
            </div>
        )

      case CALENDAR_VIEW:
        return (
          <div>

          </div>
        )

      default:
        return (
            <Spinner text={status}/> 
        )
    }
  }

  return (
    <div className="app">
      <div className="navbar">
        <i className="material-icons-sharp app-menu" onClick={toggleMenu}>menu</i>
      </div>
      <div className="container">
        <div className="side" ref={sidebar}>
          <p onClick={() => changeView(TODAY_VIEW)}><i className="material-icons">event</i>Today</p>
          <p onClick={() => changeView(UPCOMING_VIEW)}><i className="material-icons">date_range</i>Upcoming</p>
          <p onClick={() => changeView(NODATE_VIEW)}><i className="material-icons">inbox</i>Not sheduled</p>
          <p><i className="material-icons">calendar_month</i>Calendar</p>
        </div>
        <div className="main" ref={listview}>
          <Content/>
        </div>
      </div>
    </div>
  );
}

export default App;
