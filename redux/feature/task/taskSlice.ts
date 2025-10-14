import { RootState } from "@/redux/store";
import { ITask } from "@/redux/types/Itask";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
interface InitialState {
  task: ITask[];
}

const initialState: InitialState = {
  task: [],
};

type DraftTask = Pick<ITask, "title" | "description" | "priority" | "dueDate">;
const createTask = (taskData: DraftTask): ITask => {
  return { id: nanoid(), isComplete: false, ...taskData };
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const taskData = createTask(action.payload);
      state.task.push(taskData);
    },
    isCompleteToggle: (state, action: PayloadAction<string>) => {
      state.task.forEach((item) =>
        item.id === action.payload ? (item.isComplete = !item.isComplete) : item
      );
    },
    taskDelete: (state, action: PayloadAction<string>) => {
      state.task = state.task.filter((item) => item.id != action.payload);
    },
  },
});

export const selectTasks = (state: RootState) => {
  return state.todos.task;
};

export const { addTask, isCompleteToggle, taskDelete } = taskSlice.actions;

export default taskSlice.reducer;
