import Todo from './Todo'

export default function Section({ name, items, color }) {
    const list = items.map( todo => {
        const desc = todo.content.split("](")[0].replace("[","")
        return <Todo key={todo.id} todo={desc} due={todo.date.toLocaleDateString()} color={color} />
    })
    return (
        <>
            <div className="section">{name}</div>
            <div className="line"/>
            <div>{list}</div>
        </>
    )
}
