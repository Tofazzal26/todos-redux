import { Trash2 } from "lucide-react";
import React from "react";

const User = () => {
  return (
    <div className="container mx-auto">
      <div>
        <div className="flex justify-between items-center my-10">
          <h2 className="text-xl">User</h2>
          <div>Add</div>
        </div>
        <div>
          <div className="border-1 flex justify-center items-center flex-col border-gray-500 p-6 mt-10 rounded-xl w-[400px] h-[200px]">
            <div>
              <div className="flex items-center justify-between gap-10">
                <h2 className="text-2xl">Tofazzal Hossain</h2>
                <Trash2 className="text-red-500" size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
