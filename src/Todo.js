import React from "react";

export default function Todo() {
    const [inputTodo,setInputtodo] = React.useState("")
    /**checkbox state */
    const [checkers,setChecked] = React.useState(false)
    /** Check for edit */
    const [edit,setEdit] = React.useState(false)
    /** updating edit */
    const [Eupdate,setEupdate] = React.useState("")
    const [todos,setTodos] = React.useState(() => 
    JSON.parse(localStorage.getItem("todos")) || []
    )
    
    React.useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
    /** Handle the submit todo task */
    function handleSubmit(event) {
        event.preventDefault()
        setTodos(prev => [...prev,{id:`${inputTodo}-${Date.now()}` ,inputTodo: `${[inputTodo]}`, checkers: `${checkers}`, edit: `${edit}`}])
        setInputtodo("")
    }
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
    /** Handle delete */
    function handleDelete(td) {
        /* for each todo if the id does not match then we update the todos with ids that dont match */
        setTodos(todos.filter((todo => todo.id !== td.id)))
    }
    /** Handle edit */
    function handleEdit(td,event) {
        let upDateEdit = todos.map(task => {
            if (task.id === td.id) {
                return ({...task, edit: !task.edit})
            }
            return task
        })
        setTodos(upDateEdit)
    }

    function updateEdit(td) {
        let upDateEdit = todos.map(task => {
            if (task.id === td.id) {
                return ({...task, edit: !task.edit,inputTodo: Eupdate})
            }
            return task
        })
        setTodos(upDateEdit)
    }
    /** Reset button */
    function handleReset() {
        setTodos([])
    }
    return (
        <div>
            <div className="todoSection">
                <form>
                    <h1> CREATE A TODO</h1>
                    <h2> What's on your todo list?</h2>
                    <input placeholder="ex. Work Out" onChange = {(event) => setInputtodo(event.target.value)} value = {inputTodo}></input><button type="Submit" onClick={handleSubmit} className="plusBut">+</button>
                </form>
                {todos.map((td) => (
                    <ul>
                        <li>
                            <label className ="container">
                                <span style={{textDecoration: td.checkers ?'none': 'line-through' }}> {td.inputTodo}</span>
                                <span onClick={() => handleCheck(td)} class="checkmark"></span>
                            </label>
                            <button onClick={(event) => handleEdit(td)}>Edit</button>
                            <button onClick={() => handleDelete(td)}>Delete</button>
                            {td.edit == true && <input onChange={(event) => setEupdate(event.target.value)}></input>}
                            {td.edit == true && <button onClick={()=>{updateEdit(td)}}type="Submit">Done Editing</button>}
                        </li>
                    </ul>
                ))}
                <button className="resetBut" onClick = {handleReset}>New Day / Reset</button>
            </div>
        </div>
    )
}
