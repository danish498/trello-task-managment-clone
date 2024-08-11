"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priorityData, statusData } from "@/data";
import { useAppDispatch } from "@/lib/hooks";
import { createTask } from "@/features/home/service/taskSlice";

interface AddTaskProps {
  isOpen: boolean;
  onClose: () => void;
  taskStatus: string;
}

export interface FormDataStatus {
  status: string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
}

const AddTask: React.FC<AddTaskProps> = ({ isOpen, taskStatus, onClose }) => {
  const [date, setDate] = useState<Date | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [formData, setFormData] = useState<FormDataStatus>({
    status: "",
    title: "",
    description: "",
    priority: "",
    deadline: "",
  });

  const dispatch = useAppDispatch();

  const filteredStatus = taskStatus
    ? statusData.filter((status) => status.title === taskStatus)
    : statusData;

  useEffect(() => {
    const filteredStatus = taskStatus
      ? statusData.filter((status) => status.title === taskStatus)
      : statusData;

    if (filteredStatus.length === 1) {
      setSelectedStatus(filteredStatus[0].title);
      setFormData((prevFormData) => ({
        ...prevFormData,
        status: filteredStatus[0].title,
      }));
    }
  }, [taskStatus]);

  const handleStatusChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: value,
    }));
  };

  const handleDayClick = (date: Date) => {
    setDate(date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      deadline: format(date, "MM/dd/yyyy"),
    }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      priority: value,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createTask(formData));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Select
                  value={selectedStatus}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {filteredStatus.map((status) => (
                        <SelectItem
                          key={status.title}
                          value={status.title}
                          className="focus-visible:ring-transparent"
                        >
                          {status.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                className="col-span-3"
                placeholder="Enter Title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <div className="col-span-3">
                <Select onValueChange={handlePriorityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the task priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {priorityData.map((priority) => (
                        <SelectItem
                          key={priority.title}
                          value={priority.title}
                          className="focus-visible:ring-transparent"
                        >
                          {priority.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deadline" className="text-right">
                Deadline
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onDayClick={handleDayClick}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
