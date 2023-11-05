import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";
import { updateTodo } from "../features/todo/todoSlice";
// import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function Todos() {
    const todos = useSelector(state => state.todos);
    console.log(todos);
    const dispatch = useDispatch();
    const [editDialog, setEditDialog] = useState(false);
    const [input, setInput] = useState('');
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
            {/* <Divider align='center'>
            <span className="p-tag">Todos</span>
            </Divider> */}
            <Dialog visible={editDialog} onHide={() => setEditDialog(false)}>
                {/* <form onSubmit={updateHandler}> */}
                    <input className="todo-ip" type="text" value={editText} placeholder="Edit your next task..." onChange={(e) => setEditText(e.target.value)} />
                    <button className="todo-submitB" onClick={updateHandler}> Update </button>
                {/* </form> */}
            </Dialog>
            <div className='todos-container'>
                {todos.map(todo => (

                    <Card key={todo.id} style={{ width: '25%', margin: '10px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{todo.text}</span>
                            <div>
                                <Button icon="pi pi-file-edit" onClick={(e) => editHandler(e, todo.id, todo.text)} rounded text severity="warn" aria-label="Edit" />
                                <Button onClick={() => dispatch(removeTodo(todo.id))} icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" />
                            </div>
                        </div>
                    </Card>
                    //  <div className='todo-item'>
                    //     <li onClick={() => dispatch(updateTodo({ id: todo.id, text: 'pramath' }))} key={todo.id}>{todo.text}</li> 
                    //      <div onClick={() => dispatch(removeTodo(todo.id))}>X</div> 
                    //  </div>
                ))}
            </div>
        </>
    )
}
export default Todos;