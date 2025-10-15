import { cn } from "@/lib/utils";
import { isCompleteToggle, taskDelete } from "@/redux/feature/task/taskSlice";
import { selectUser } from "@/redux/feature/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ITask } from "@/redux/types/Itask";
import { Trash2 } from "lucide-react";
import React from "react";

interface IProps {
  task: ITask;
}

const TaskCard = ({ task }: IProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  console.log(user);

  return (
    <div className="container mx-auto mt-10">
      <div className="border-[1px] border-gray-400 rounded-md p-5">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn("size-3 bg-red-500 rounded-full", {
                  "bg-green-500": task.priority === "Low",
                  "bg-yellow-500": task.priority === "Medium",
                  "bg-red-500": task.priority === "High",
                })}
              ></div>
              <h2 className={cn("", { "line-through": task.isComplete })}>
                {task.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Trash2
                className="text-red-500"
                size={19}
                onClick={() => dispatch(taskDelete(task.id))}
              />
              <input
                type="checkbox"
                className="size-4"
                onClick={() => dispatch(isCompleteToggle(task.id))}
              />
            </div>
          </div>
          <div>
            <h2 className="text-sm">
              Assign To :{" "}
              {user?.find((item) => item.id === task.assignTo)?.name || "N/A"}{" "}
            </h2>
          </div>
          <p className="mt-4">{task.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
