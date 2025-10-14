import { RootState } from "@/redux/store";
import { ITask } from "@/redux/types/Itask";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
interface InitialState {
  task: ITask[];
  filter: string;
}

const initialState: InitialState = {
  task: [],
  filter: "All",
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
    taskFilter: (
      state,
      action: PayloadAction<"All" | "High" | "Medium" | "Low">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => {
  const filter = state.todos.filter;
  if (filter === "Low") {
    return state.todos.task.filter((task) => task.priority === "Low");
  } else if (filter === "Medium") {
    return state.todos.task.filter((task) => task.priority === "Medium");
  } else if (filter === "High") {
    return state.todos.task.filter((task) => task.priority === "High");
  } else {
    return state.todos.task;
  }
};

export const { addTask, isCompleteToggle, taskDelete, taskFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
