import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    todos: [],
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { getState }) => {
    const userID = getState().user.userID;
    const response = await fetch(`http://localhost:5000/users/${userID}/fetchTodos`,
        {
            method: 'GET',
            credentials: 'include'
        });
    if (response.status === 200) {
        let todos = await response.json();
        let finalTodos = [];
        todos.todos.forEach(todo => {
            finalTodos.push({ id: nanoid(), text: todo })
        });
        return finalTodos;
    }
})
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            let localID = id;
            let updatedtext = text;
            let idx = null;
            let localState = [...state.todos];
            localState.map((todo, ix) => {
                if (localID === todo.id)
                    idx = ix;
            });
            localState[idx].text = updatedtext;
            state.todos = localState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = true;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, state => {
                state.loading = false;
                state.error = true;
            });
    }
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions; // exporting the actual actions which we can perfrom
export default todoSlice.reducer; //needs to be wired up with the store