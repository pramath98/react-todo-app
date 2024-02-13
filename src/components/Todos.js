import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";
import { updateTodo } from "../features/todo/todoSlice";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function Todos() {
    const todos = useSelector(reducer => reducer.todos.todos);
    console.log(todos);
    const dispatch = useDispatch();
    const [editDialog, setEditDialog] = useState(false);
    const [editId, setEditId] = useState('');
    const [editText, setEditText] = useState('');

    const editHandler = (e, id, text) => {
        e.preventDefault();
        setEditId(id);
        setEditText(text);
        setEditDialog(true);
    }

    const updateHandler = () => {
        dispatch(updateTodo({ id: editId, text: editText }));
        setEditId('');
        setEditText('');
        setEditDialog(false);
    }

    return (
        <>
            <Dialog visible={editDialog} onHide={() => setEditDialog(false)}>
                    <input className="todo-ip" type="text" value={editText} placeholder="Edit your next task..." onChange={(e) => setEditText(e.target.value)} />
                    <button className="todo-submitB" onClick={updateHandler}> Update </button>
            </Dialog>
            <div className='todos-container'>
                {todos.map(todo => (
                    <Card key={todo.id} style={{ width: '25%', margin: '10px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className='todo-text'>{todo.text}</span>
                            <div>
                                <Button icon="pi pi-file-edit" onClick={(e) => editHandler(e, todo.id, todo.text)} rounded text severity="warn" aria-label="Edit" />
                                <Button onClick={() => dispatch(removeTodo(todo.id))} icon="pi pi-file-excel" rounded text severity="danger" aria-label="Cancel" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}
export default Todos;