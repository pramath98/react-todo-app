import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";


function AddTodo() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const ipRef = useRef(0);

    const addTodoHandler = (e) => {
        e.preventDefault();
        if (input && input !== '') {
            dispatch(addTodo(input));
            setInput('');
        } else {
            ipRef.current.style.border = '2px solid red';
        }
    }

    return (
        <>
            <form onSubmit={addTodoHandler} className="submit-form-add-todo">
                <input className="todo-ip" type="text" value={input} placeholder="Write your next task..." ref={ipRef} onChange={(e) => { ipRef.current.style.border = 'unset'; setInput(e.target.value) }} />
                <button className="todo-submitB" type="submit">+</button>
            </form>
        </>
    );
};

export default AddTodo;