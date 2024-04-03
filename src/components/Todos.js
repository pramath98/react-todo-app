import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from "react-redux";
import { fetchTodos, updateTodos,deleteTodos } from "../features/todo/todoSlice";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function Todos() {
    const { todos, loading, error } = useSelector(reducer => reducer.todos);
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
        dispatch(updateTodos({ id: editId, text: editText }));
        // dispatch(updateTodo({ id: editId, text: editText }));
        setEditId('');
        setEditText('');
        setEditDialog(false);
    }

    const deleteHandler = (todoID) => {
        dispatch(deleteTodos(todoID));
        setEditDialog(false);
    }

    useEffect(() => {
        const datas = dispatch(fetchTodos());
        console.log(datas);
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }
    else if (error) {
        return <div>There's a problem fetching todos right now!</div>
    }else if(!todos.length){
        return <div>Best time to start is now!</div>
    }
     else {
        return (
            <>
                <Dialog visible={editDialog} onHide={() => setEditDialog(false)}>
                    <div className='todo-edit-container'>
                        <input className="todo-ip" type="text" value={editText} placeholder="Edit your next task..." onChange={(e) => setEditText(e.target.value)} />
                        <button className="todo-submitB" onClick={updateHandler}> <i className="pi pi-check" style={{ fontSize: "1rem" }}></i> </button>
                    </div>
                </Dialog>
                <div className='todos-container'>
                    {todos.map(todo => (
                        <Card key={todo.id} style={{ width: '60%', margin: '10px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className='todo-text'>{todo.text}</span>
                                <div>
                                    <Button icon="pi pi-file-edit" onClick={(e) => editHandler(e, todo.id, todo.text)} rounded text severity="warn" aria-label="Edit" />
                                    <Button onClick={()=>deleteHandler(todo)} icon="pi pi-file-excel" rounded text severity="danger" aria-label="Cancel" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </>
        )
    }

}
export default Todos;