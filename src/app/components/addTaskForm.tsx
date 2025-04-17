'use client';

import { useState } from 'react';
import { addTask } from '@/app/store';
import { useAppDispatch } from '@/app/hooks';
import './addTaskForm.css';

export default function AddTaskForm({ setIsFormOpen }: { setIsFormOpen: (isOpen: boolean) => void }) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handle form submission and close the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');

    // Validate the form
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }

    // Add the task to the store
    dispatch(
      addTask({
        id: Date.now().toString(),
        name: title,
        description,
      })
    )

    // Clear the form
    setTitle('');
    setDescription('');
    setError(null);

    // Close the form
    setIsFormOpen(false);
  };

  return (
    <div className='min-h-screen w-full absolute top-0 left-0 flex justify-center items-center bg-neutral-950/90'>
      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col gap-4 min-w-80 bg-neutral-900 p-4 rounded-md shadow-lg'
      >

        <input 
          type='text' 
          placeholder='Task Title' 
          className='w-full p-2 rounded-md border-2 border-neutral-700'
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea 
          name="description" 
          id="description" 
          placeholder='Task Description'
          rows={3}
          className='w-full p-2 rounded-md border-2 border-neutral-700 resize-none' 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-4 justify-between">
          <button type='submit' className='add-task-btn w-fit shadow-md hover:shadow-lg'>
            Add Task
          </button>
          <button type='button' className='cancel-task-btn w-fit shadow-md hover:shadow-lg' onClick={() => setIsFormOpen(false)}>
            Cancel
          </button>
        </div>

        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
      </form>
    </div>
  );
}
