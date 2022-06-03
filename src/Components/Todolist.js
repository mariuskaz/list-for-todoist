import React, { useEffect, useState } from 'react'
import Todo from './Todo'

export default function Todolist() {
    const [ todos, setTodos ] = useState([])
    
    function sync() {
        let token = "none",
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
                console.log('user:', data.user.email)
                const items = data.items
                    .filter(item => item.responsible_uid === data.user.id || item.project_id === data.user.inbox_project)
                    .filter(item => item.due)
                    .map(task => { return { id:task.id, content:task.content, due: task.due, date: new Date(task.due.date) }})
                    .filter( item => item.date <= new Date())
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
        todos.map( todo => {
            const desc = todo.content.split("](")[0].replace("[","")
            const due = todo.due ? todo.due.date.substring(0,10) : "not sheduled"
            return <Todo key={todo.id} todo={desc} due={due} />
        })
    )
}
