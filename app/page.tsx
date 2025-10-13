"use client";
import { decrement, increment } from "@/redux/feature/counter/counterSlice";
import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectTasks } from "@/redux/feature/task/taskSlice";
import TaskCard from "./_components/TaskCard/page";
import TaskAdd from "./_components/TaskAdd/page";

export default function Home() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state: RootState) => state.counter);
  const tasks = useAppSelector(selectTasks);

  const handleIncrement = (amount: number) => {
    dispatch(increment(amount));
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <div className="mt-20 text-center space-x-4">
        <button
          onClick={() => handleIncrement(1)}
          className="bg-green-200 font-semibold text-xl px-4 py-2 rounded-md cursor-pointer"
        >
          Increment
        </button>
        <button className="text-xl font-semibold">{counter.count}</button>
        <button
          onClick={handleDecrement}
          className="bg-red-200 font-semibold text-xl px-4 py-2 rounded-md cursor-pointer"
        >
          Decrement
        </button>
        <button
          onClick={() => handleIncrement(5)}
          className="bg-green-200 font-semibold text-xl px-4 py-2 rounded-md cursor-pointer"
        >
          Increment by 5
        </button>
      </div>
      <div className="container mx-auto">
        <TaskAdd />
      </div>
      <div>
        {tasks.map((item, idx) => (
          <TaskCard key={idx} task={item} />
        ))}
      </div>
    </div>
  );
}
