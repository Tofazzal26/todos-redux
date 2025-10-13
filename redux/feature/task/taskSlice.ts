import { RootState } from "@/redux/store";
import { ITask } from "@/redux/types/Itask";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  task: ITask[];
}

const initialState: InitialState = {
  task: [
    {
      id: "1",
      title: "Initialize frontend",
      description: "create a frontend app",
      dueDate: "2025-11",
      isComplete: false,
      priority: "High",
    },
    {
      id: "2",
      title: "Github Initial State",
      description: "create a Github Repo",
      dueDate: "2025-11",
      isComplete: false,
      priority: "Medium",
    },
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const selectTasks = (state: RootState) => {
  return state.todos.task;
};

export default taskSlice.reducer;
