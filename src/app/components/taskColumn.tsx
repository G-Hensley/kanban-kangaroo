'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '@/app/store';
import { CiMenuKebab } from "react-icons/ci";
import { useState } from 'react';
import { VscTrash } from 'react-icons/vsc';
import { FaRegEdit } from "react-icons/fa";

interface ColumnProps {
  columnId: string;
  tasks: Task[];
}

export default function TaskColumn({ columnId, tasks }: ColumnProps) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className='bg-neutral-900 p-4 rounded-lg w-64'>
      <h2 className='text-xl font-semibold mb-2 capitalize text-center'>
        {columnId}
      </h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='min-h-[200px]'>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='bg-neutral-800 p-2 rounded-lg mb-2 shadow-md flex flex-col gap-2 relative'>
                    <div className='flex justify-between items-center'>
                      
                      <p className='font-semibold'>{task.name}</p>
                      <button onClick={handleMenuClick} className='text-white hover:text-neutral-400 transition-colors cursor-pointer'>
                        <CiMenuKebab className='text-2xl' />
                      </button>

                      {isMenuOpen && (
                        <div 
                          className='absolute flex gap-4 bottom-0 bg-neutral-900 border-2 border-neutral-700 p-2 rounded-lg 
                          shadow-md right-1/2 translate-x-1/2'
                        >
                          <button
                            className='text-white hover:text-neutral-400 transition-colors cursor-pointer active:text-xl'>
                            <FaRegEdit className='text-2xl' />
                          </button>
                          <button 
                            className='text-red-400 hover:text-red-500 transition-colors cursor-pointer active:text-red-400'>
                            <VscTrash className='text-2xl' />
                          </button>
                        </div>
                      )}

                    </div>
                    <p className='text-sm'>{task.description}</p>

                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
