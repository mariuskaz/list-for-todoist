import Todo from './Todo'

export default function TodosList({ title, items, color, sync }) {
    const listview = items.map( todo => {
        const id = todo.id
        const desc = todo.content.split("](")[0].replace("[","")
        const due = todo.due ? new Date(todo.due.date).toLocaleDateString() : "not sheduled"
        const priority = todo.priority
        const project = todo.project.name.length <= 28 ? todo.project.name : todo.project.name.substring(0,28).trim() + '...'
        const projectId = todo.project.id
        return <Todo key={todo.id} 
                sync={sync}
                open={()=>openLink('task', id)}
                browse={()=>openLink('project', projectId)}  
                id={id} 
                todo={desc} 
                due={due} 
                color={color} 
                priority={priority}
                project={project} />
    })

    function openLink(type, id) {
        window.open(`https://todoist.com/app/${type}/${id}`)
    }

    return (
        <>
            <div className="section">{ title }<span>{ items.length }</span></div>
            <div className="line"/>
            <div>{ listview }</div>
        </>
    )
}
