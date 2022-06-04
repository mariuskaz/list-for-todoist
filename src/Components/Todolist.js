import Todo from './Todo'

export default function Todolist({ title, items, color }) {
    const listview = items.map( todo => {
        const desc = todo.content.split("](")[0].replace("[","")
        return <Todo key={todo.id} open={()=>openTask(todo.id)} todo={desc} due={todo.date.toLocaleDateString()} color={color} />
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
