import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

function Todos() {
    const todos = useSelector(state => state.todos);
    console.log(todos);
    const dispatch = useDispatch();

    return (
        <>
            <div>Todos</div>
            {todos.map(todo => (
                <div className='todo-item'>
                    <div id={todo.id}>{todo.text}</div>
                    <div onClick={() => dispatch(removeTodo(todo.id))}>X</div>
                </div>
            ))}
        </>
    )
}
export default Todos;