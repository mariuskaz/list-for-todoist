import Todo from './Todo'

export default function TodosList({ title, items, color, sync }) {
    const listview = items.map( todo => {
        const id = todo.id
        const desc = todo.content.split("](")[0].replace("[","")
        const due = todo.due ? new Date(todo.due.date).toLocaleDateString() : "not sheduled"
        const priority = todo.priority
        const project = todo.project
        return <Todo key={todo.id} 
                sync={sync}
                open={()=>openTask(todo.id)} 
                id={id} todo={desc} due={due} 
                color={color} priority={priority}
                project={project} />
    })

    function openTask(id) {
        console.log('taskId', id)
        window.open(`https://todoist.com/showTask?id=${id}`)
    }

    return (
        <>
            <div className="section">{ title }</div>
            <div className="line"/>
            <div>{ listview }</div>
        </>
    )
}
