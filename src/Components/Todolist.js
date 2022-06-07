import Todo from './Todo'

export default function TodoList({ title, items, color }) {
    const listview = items.map( todo => {
        const desc = todo.content.split("](")[0].replace("[","")
        const due = todo.due ? new Date(todo.due.date).toLocaleDateString() : "not sheduled"
        const priority = todo.priority
        return <Todo key={todo.id} open={()=>openTask(todo.id)} todo={desc} due={due} color={color} priority={priority} />
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
