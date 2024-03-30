import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodos } from "../features/todo/todoSlice";


function AddTodo() {
    const [input, setInput] = useState('');
    // const userInfo = useSelector(reducer => reducer.user);
    const dispatch = useDispatch();
    const ipRef = useRef(0);

    const addTodoHandler = (e) => {
        e.preventDefault();
        if (input && input !== '') {
            const response = dispatch(addTodos(input));
        response.then(r=>{
            if(r.meta.requestStatus==='fulfilled'){
                setInput('');
            }
        })
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