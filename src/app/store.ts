// app/store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Export the Task interface
export interface Task {
  id: string;
  name: string;
  description: string;
}

interface KanbanState {
  columns: {
    todo: Task[];
    'In Progress': Task[];
    completed: Task[];
  };
}

const initialState: KanbanState = {
  columns: {
    todo: [],
    'In Progress': [],
    completed: [],
  },
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action: { payload: Task }) => {
      state.columns.todo.push(action.payload);
    },
    moveTask: (state, action: { payload: { source: string; destination: string; taskId: string } }) => {
      const { source, destination, taskId } = action.payload;
      const task = state.columns[source as keyof typeof state.columns].find(
        (t) => t.id === taskId
      );
      if (task) {
        state.columns[source as keyof typeof state.columns] = state.columns[
          source as keyof typeof state.columns
        ].filter((t) => t.id !== taskId);
        state.columns[destination as keyof typeof state.columns].push(task);
      }
    },
  },
});

export const { addTask, moveTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;

export const store = configureStore({
  reducer: {
    kanban: kanbanSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;