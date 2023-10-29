import { createSlice,nanoid } from "@reduxjs/toolkit";
const initialState = {
    todos:[],
};
export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo: (state,action)=>{
            const todo = {
                id: nanoid(),
                text:action.payload,
            }
            state.todos.push(todo);
        },
        removeTodo: (state,action)=>{
            state.todos=state.todos.filter((todo)=>todo.id !== action.payload)
        },
        updateTodo: (state,action)=>{
            const {id,text}=action.payload;
            let localID=id;
            let updatedtext=text;
            let idx=null;
            let localState=[...state.todos];
            localState.map((todo,ix)=>{
                if(localID===todo.id)
                    idx=ix;
            });
            localState[idx].text=updatedtext;
            state.todos=localState;
        }
    }
});

export const {addTodo,removeTodo,updateTodo} = todoSlice.actions; // exporting the actual actions which we can perfrom
export default todoSlice.reducer; //needs to be wired up with the store