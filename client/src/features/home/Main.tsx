"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProfileImg, BlogImg1, BlogImg2, BlogImg3 } from "@/assets/images/Main";
import { Input } from "@/components/ui/input";
import { CreateTaskIcon, SortIcon } from "@/assets/images/icons";
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Statuses, Tasks } from "@/types/types";
import AddTask from "@/components/common/add-task";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAllTask,
  handleDrag,
  updateTask,
} from "@/features/home/service/taskSlice";
import { RootState } from "@/lib/store";
import { getFirstName, getGreetingMessage } from "@/utils/helper";
import { getCookie } from "cookies-next";

export default function Home() {
  const [taskStatus, setTaskStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { tasks, statuses, statusOrder, loading, success } = useAppSelector(
    (state: RootState) => state.task
  );

  useEffect(() => {
    dispatch(getAllTask());
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    dispatch(handleDrag({ source, destination }));

    const destinationStatus = statuses[destination.droppableId];

    dispatch(updateTask({ draggableId, status: destinationStatus.title }));
  };

  const blogsData = [
    {
      id: 1,
      img: BlogImg1,
      title: "Introducing tags",
      desc: "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    },
    {
      id: 2,
      img: BlogImg2,
      title: "Share Notes Instantly",
      desc: "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    },
    {
      id: 3,
      img: BlogImg3,
      title: "Access Anywhere",
      desc: "Sync your notes across all devices. Stay productive whether youre on your phone, tablet, or computer.",
    },
  ];

  const greetingMessage = getGreetingMessage();
  const name = getCookie("name");

  const firstName = getFirstName(name);

  const renderTasks = (taskIds: string[]) =>
    taskIds.map((taskId, index) => {
      const task = tasks[taskId];

      return (
        <Draggable key={task?.id} draggableId={task?.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="py-[14px] px-[13px] bg-[#F9F9F9] border border-[#DEDEDE] rounded-[8px] mb-2"
            >
              <h3 className="text-base font-medium text-[#606060]">
                {task.title}
              </h3>
              <p className="text-sm font-normal text-[#797979]">
                {task.content}
              </p>
              <span className="block max-w-[55px] w-full py-[6px] px-2 text-xs font-normal text-white rounded-[8px] bg-[#FF6B6B] my-[13px]">
                {task.priority}
              </span>
              <div className="flex items-center gap-2">
                <span className="block size-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6V12H18"
                      stroke="#606060"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#606060"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-sm font-semibold text-[#606060]">
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm font-medium text-[#797979] mt-4">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </Draggable>
      );
    });

  const handleTaskClick = (value: string) => {
    setTaskStatus(value);
    setIsModalOpen(true);
  };

  const createNewTaskHandler = () => {
    setTaskStatus("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="ml-64 bg-[#F7F7F7]  py-2 pl-4 pr-8 h-screen">
        <div className="flex items-center mb-4">
          <h1 className="text-5xl font-semibold text-blacks">
            {`${greetingMessage}  ${firstName}`}
          </h1>
          <span className="flex items-center gap-2 ml-auto">
            Help & feedback
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#080808"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 9.00001C9 5.49998 14.5 5.50001 14.5 9.00001C14.5 11.5 12 10.9999 12 13.9999"
                stroke="#080808"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 18.0099L12.01 17.9988"
                stroke="#080808"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {blogsData.map((item, index) => (
            <div
              key={index}
              className="p-4 flex items-center gap-[10px] bg-white border border-[#F4F4F4] rounded-[8px]"
            >
              <div className="aspect-[76/70] max-w-[76px] w-full">
                <Image
                  src={item.img}
                  alt="Profile Image"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#757575]">
                  {item.title}
                </h3>
                <p className="text-sm font-normal text-[#868686]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-4 flex items-center">
          <div className="relative bg-white max-w-[196px] w-full py-2 pl-2 pr-8 border border-[#E9E9E9] rounded-[8px]">
            <div className="absolute w-6 h-6 right-2 top-1/2 -translate-y-1/2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 17L21 21"
                  stroke="#797979"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"
                  stroke="#797979"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <Input
              type="text"
              className="p-0 h-auto outline-none border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-[14px] py-[10px] px-2 bg-[#F4F4F4] rounded-[8px]">
              <span className="block text-base font-normal text-[#797979]">
                Calendar view
              </span>
              <span className="block size-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 10V6C3 4.89543 3.89543 4 5 4H7"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 2V6"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-center gap-[14px] py-[10px] px-2 bg-[#F4F4F4] rounded-[8px]">
              <span className="block text-base font-normal text-[#797979]">
                Automation
              </span>
              <span className="block size-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 15C12.8747 15 15 12.949 15 8C15 12.949 17.1104 15 22 15C17.1104 15 15 17.1104 15 22C15 17.1104 12.8747 15 8 15Z"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 6.5C5.13376 6.5 6.5 5.18153 6.5 2C6.5 5.18153 7.85669 6.5 11 6.5C7.85669 6.5 6.5 7.85669 6.5 11C6.5 7.85669 5.13376 6.5 2 6.5Z"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-center gap-[14px] py-[10px] px-2 bg-[#F4F4F4] rounded-[8px]">
              <span className="block text-base font-normal text-[#797979]">
                Filter
              </span>
              <span className="block size-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.99951 3H19.9996C20.5519 3 20.9996 3.44764 20.9996 3.99987L20.9998 5.58569C20.9999 5.85097 20.8945 6.10538 20.7069 6.29295L14.2924 12.7071C14.1049 12.8946 13.9995 13.149 13.9995 13.4142V19.7192C13.9995 20.3698 13.3881 20.8472 12.757 20.6894L10.757 20.1894C10.3118 20.0781 9.99951 19.6781 9.99951 19.2192V13.4142C9.99951 13.149 9.89415 12.8946 9.70662 12.7071L3.2924 6.29289C3.10486 6.10536 2.99951 5.851 2.99951 5.58579V4C2.99951 3.44772 3.44722 3 3.99951 3Z"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-center gap-[14px] py-[10px] px-2 bg-[#F4F4F4] rounded-[8px]">
              <span className="block text-base font-normal text-[#797979]">
                Share
              </span>
              <span className="block size-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                    stroke="#797979"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.5 6.5L8.5 10.5"
                    stroke="#797979"
                    stroke-width="1.5"
                  />
                  <path
                    d="M8.5 13.5L15.5 17.5"
                    stroke="#797979"
                    stroke-width="1.5"
                  />
                </svg>
              </span>
            </div>
            <Button
              className="p-2 text-base font-medium text-white bg-[linear-gradient(180deg,#4C38C2_0%,#2F2188_100%)] border border-image[linear-gradient(360deg,#4B36CC_0%,#9C93D4_107.69%)] shadow-[0px_1px_8px_0px_#00000040,inset_0px_12px_16px_0px_#BABABA33] rounded-[8px]"
              onClick={createNewTaskHandler}
            >
              Create new
              <span className="block size-6 ml-2">
                <CreateTaskIcon />
              </span>
            </Button>
          </div>
        </div>

        {/* TODO */}

        {/* <div className="p-4 flex flex-row"> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-wrap">
            {statusOrder?.map((order) => {
              const status = statuses[order];

              return (
                <div
                  key={status.id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
                >
                  <div className="flex items-center mb-2">
                    <span className="block text-xl font-normal text-[#555555]">
                      {status.title}
                    </span>
                    <span className="block size-6 ml-auto">
                      <SortIcon />
                    </span>
                  </div>

                  <Droppable droppableId={status.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="max-h-80 overflow-y-auto scrollable-content  border-gray-200 p-2"
                      >
                        {renderTasks(status.taskIds)}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <Button
                    className="flex items-center !justify-start p-2 bg-[linear-gradient(180deg,#3A3A3A_0%,#202020_100%)] rounded-[8px] w-full mt-3"
                    onClick={() => handleTaskClick(status.title)}
                  >
                    <span className="text-base font-normal">Add new</span>
                    <span className="block size-6 !ml-auto">
                      <svg
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.75 12H12.75M12.75 12H18.75M12.75 12V6M12.75 12V18"
                          stroke="#E3E1E1"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>
        </DragDropContext>

        <AddTask
          taskStatus={taskStatus}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        {/* </div>  */}

        {/* </div> */}
        {/* </DragDropContext> */}
      </div>
    </>
  );
}
