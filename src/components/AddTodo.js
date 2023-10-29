import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";


function AddTodo(){
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const addTodoHandler = (e) => {
        e.preventDefault();
        dispatch(addTodo(input));
        setInput('');
    }

    return(
        <>
        <form onSubmit={addTodoHandler}>
        <input className="todo-ip" type="text" value={input} placeholder="Add your next task..." onChange={(e)=>setInput(e.target.value)}/>
        <button className="todo-submitB" type="submit"> Add </button>
        </form>
        </>
    );
};

export default AddTodo;