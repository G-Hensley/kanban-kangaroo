'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import  { Task }  from '@/app/store';

interface ColumnProps {
  columnId: string;
  tasks: Task[];
}

export default function TaskColumn({ columnId, tasks }: ColumnProps) {
  return (
    <div className="bg-neutral-900 p-4 rounded-lg w-64">
      <h2 className="text-xl font-semibold mb-2 capitalize text-center">{columnId}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-neutral-800 p-2 rounded-lg mb-2 shadow-md"
                  >
                    <p className="font-semibold">{task.name}</p>
                    <p className="text-sm">{task.description}</p>
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