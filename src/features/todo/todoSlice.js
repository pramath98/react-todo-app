import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    todos: [],
    loading: true,
    error: false,
};
const baseURI = process.env.REACT_APP_API_BASE_URL;


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { getState }) => {
    const userID = getState().user.userID;
    const response = await fetch(`${baseURI}/api/users/${userID}/fetchTodos`,
        {
            method: 'GET',
            credentials: 'include'
        });
    if (response.status === 200) {
        let todos = await response.json();
        let finalTodos = [];
        todos.todos.forEach(todo => {
            finalTodos.push(todo)
        });
        return finalTodos;
    } else if (response.status === 401) {
        throw response;
    }
});

const saveTodos = async (todo, userID) => {
    return await fetch(`${baseURI}/api/users/${userID}/addTodos`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'todoItem': todo })
        });
};

export const addTodos = createAsyncThunk('todos/addTodos', async (text, { getState }) => {
    const todo = {
        id: nanoid(),
        text
    }
    const userID = getState().user.userID;
    try {
        let resp=await saveTodos(todo, userID);
        if(resp.status===404) throw 'error while updating';
        return todo;
    } catch (e) {
        console.log('error while adding todo in the server', e);
    }
});

const updateTodosAsync = async (todos, userID) => {
    return await fetch(`${baseURI}/api/users/${userID}/updateTodos`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'todoItems': todos })
        });
}

export const updateTodos = createAsyncThunk("todos/updateTodos", async ({ id, text, completed }, { getState }) => {

    let reduxTodos = getState().todos.todos;
    let localState = reduxTodos.map(todo => ({ ...todo }));
    const userID = getState().user.userID;
    // localState[idx].text = text;
    try {
        localState.forEach((todo) => {
            if (todo.id === id) {
                todo.text = text;
                todo.completed = completed;
            }
        });
        await updateTodosAsync(localState, userID);
        return localState;
    } catch (e) {
        console.log("error while updating todo in the server", e);
    }
});

const deleteTodosAsync = async (todos, userID) => {
    return await fetch(`${baseURI}/api/users/${userID}/deleteTodos`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'todoItems': todos })
        });
}

export const deleteTodos = createAsyncThunk("todos/deleteTodos", async ({ id }, { getState }) => {
    let reduxTodos = getState().todos.todos;
    let localstate = reduxTodos.map(todo => ({ ...todo }));
    const userID = getState().user.userID;
    try {
        localstate = localstate.filter(item => item.id !== id);
        await deleteTodosAsync(localstate, userID);
        return localstate;
    } catch (e) {
        console.error('error occured while deleting todo:', e);
    }
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, state => {
                state.loading = false;
                state.error = true;
            })
            .addCase(addTodos.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(addTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(addTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(updateTodos.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updateTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(updateTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(deleteTodos.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(deleteTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    }
});

// export const { updateTodo } = todoSlice.actions; // exporting the actual actions which we can perfrom
export default todoSlice.reducer; //needs to be wired up with the store