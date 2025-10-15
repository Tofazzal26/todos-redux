"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addTask, taskFilter } from "@/redux/feature/task/taskSlice";
import { ITask } from "@/redux/types/Itask";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { selectUser } from "@/redux/feature/userSlice/userSlice";

const TaskAdd = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm();
  const user = useAppSelector(selectUser);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formattedData = {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
    };

    dispatch(addTask(formattedData as ITask));
    console.log(data);
  };

  return (
    <div className="flex justify-between items-center my-10">
      <div>
        <h2>Task</h2>
      </div>
      <div>
        <Tabs defaultValue="All">
          <TabsList>
            <TabsTrigger
              onClick={() => dispatch(taskFilter("All"))}
              value="All"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              onClick={() => dispatch(taskFilter("High"))}
              value="High"
            >
              High
            </TabsTrigger>
            <TabsTrigger
              onClick={() => dispatch(taskFilter("Medium"))}
              value="Medium"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger
              onClick={() => dispatch(taskFilter("Low"))}
              value="Low"
            >
              Low
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          placeholder="Write description..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Priority */}
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign To</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Assign to" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {user?.map((item, idx) => (
                                <SelectItem key={idx} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Due Date */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-full justify-between font-normal"
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(date);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" className="mt-4">
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TaskAdd;
