import { RootState } from "@/redux/store";
import { Iuser } from "@/redux/types/Iuser";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  user: Iuser[];
}

const initialState: InitialState = {
  user: [
    {
      id: "adwa",
      name: "Tofazzal Hossain",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Iuser>) => {
      const id = nanoid();
      const userData = { ...action.payload, id };
      state.user.push(userData);
    },
    userDelete: (state, action: PayloadAction<string>) => {
      state.user = state.user.filter((item) => item.id != action.payload);
    },
  },
});

export const selectUser = (state: RootState) => {
  return state.users.user;
};

export const { addUser, userDelete } = userSlice.actions;

export default userSlice.reducer;
