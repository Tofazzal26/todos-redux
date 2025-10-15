"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addUser,
  selectUser,
  userDelete,
} from "@/redux/feature/userSlice/userSlice";
import { Iuser } from "@/redux/types/Iuser";
const User = () => {
  const form = useForm();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(addUser(data as Iuser));
  };

  return (
    <div className="container mx-auto">
      <div>
        <div className="flex justify-between items-center my-10">
          <h2 className="text-xl">User</h2>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add User</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add User</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit" className="mt-4">
                          Add User
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          {user?.map((item, idx) => (
            <div
              key={idx}
              className="border-1 flex justify-center items-center flex-col border-gray-500 p-6 mt-10 rounded-xl w-[400px] h-[200px]"
            >
              <div>
                <div className="flex items-center justify-between gap-10">
                  <h2 className="text-2xl">{item.name}</h2>
                  <Trash2
                    className="text-red-500"
                    size={25}
                    onClick={() => dispatch(userDelete(item.id))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
