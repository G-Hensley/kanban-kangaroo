'use client';

import AddTaskForm from '@/app/components/addTaskForm';
import TaskColumn from '@/app/components/taskColumn';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { moveTask } from '@/app/store';
import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

export default function Home() {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.kanban);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      dispatch(
        moveTask({
          source: source.droppableId,
          destination: destination.droppableId,
          taskId: result.draggableId,
        })
      );
    }
  };

  // State to toggle the add task form
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div id="wrapper">
      <main className="flex flex-col items-center min-h-screen p-8 pb-20 gap-8">

        <h1 className="text-3xl md:text-5xl font-mono text-center">🦘 Kanban Kangaroo 🦘</h1>

        <button className={`${isFormOpen ? 'opacity-0' : 'opacity-100'} create-task-btn`} onClick={() => setIsFormOpen(true)}>Create Task</button>

        {isFormOpen && <AddTaskForm setIsFormOpen={setIsFormOpen} />}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-wrap gap-4 justify-center">
            {['todo', 'In Progress', 'completed'].map((columnId) => (
              <TaskColumn key={columnId} columnId={columnId} tasks={columns[columnId as keyof typeof columns]} />
            ))}
          </div>
        </DragDropContext>

      </main>
    </div>
  );
}
