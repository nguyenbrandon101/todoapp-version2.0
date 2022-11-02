import React from "react";

export default function Todo() {
    const [inputTodo,setInputtodo] = React.useState("")
    /**checkbox state */
    const [checkers,setChecked] = React.useState(false)
    const [todos,setTodos] = React.useState(() => 
    JSON.parse(localStorage.getItem("todos")) || []
    )
    
    React.useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos,checkers])
    /** Handle the submit todo task */
    function handleSubmit(event) {
        event.preventDefault()
        setTodos(prev => [...prev,{id:`${inputTodo}-${Date.now()}` ,inputTodo: `${[inputTodo]}`, checkers: `${checkers}`}])
    }
    /** START WORKING HERE */
    /** handle the checkbox */
    function handleCheck(td,event) {
        let updateCheck = todos.map(task => {
            if (task.id === td.id) {
                return ({...task, checkers: !task.checkers})
            }
            return task
        })
        setTodos(updateCheck)
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
                                <span style={{textDecoration: td.checkers ?'none': 'line-through' }}> {td.inputTodo}</span>
                                <i onClick={() => handleCheck(td)}>h</i>
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
