import React from "react";

export default function Todo() {
    const [inputTodo,setInputtodo] = React.useState("")
    /*const [todos,setTodos] = React.useState([])*/
    const [todos,setTodos] = React.useState(() => 
    JSON.parse(localStorage.getItem("todos")) || []
    )
    
    React.useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    function handleSubmit(event) {
        event.preventDefault()
        setTodos(prev => [...prev,{id:`${inputTodo}-${Date.now()}` ,inputTodo: `${[inputTodo]}`}])
    }
    return (
        <div>
            <div className="todoSection">
                <form>
                    <h1> CREATE A TODO</h1>
                    <h2> What's on your todo list?</h2>
                    <input placeholder="ex. Work Out" onChange = {(event) => setInputtodo(event.target.value)}></input><button type="Submit" onClick={handleSubmit} className="plusBut">+</button>
                </form>
                {todos.map((td) => (
                    <ul>
                        <li>
                            <label className ="container">
                                <span> {td.inputTodo}</span>
                                <input type="checkbox" checked="checked"></input>
                                <span class="checkmark"></span>
                            </label>
                            <button>Edit</button>
                            <button>Delete</button>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
}