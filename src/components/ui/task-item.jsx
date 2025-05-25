import React from 'react';
import { Checkbox } from '../ui/checkbox'; 
import { Button } from '../ui/button';
import { Pencil, Trash } from 'lucide-react'; 

export default function TaskItem({ task, toggleCompleted, openEdit, openDelete }) {
  return (
    <div
      key={task.id}
      className="flex items-center justify-between px-4 py-2 border border-yellow-400 rounded-xl"
    >
      <div
        className="flex items-center w-full gap-2 text-lg font-medium cursor-pointer"
        onClick={() => toggleCompleted(task.id)}
      >
        <Checkbox
          checked={task.status === 'finished'}
          onCheckedChange={() => toggleCompleted(task.id)}
        />
        <p
          className={`transition-all duration-300 ease-in-out select-none ${
            task.status === 'finished'
              ? 'line-through italic text-gray-500'
              : ''
          }`}
        >
          {task.title}
        </p>
      </div>

      <div className="z-20 flex items-center gap-4">
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => openEdit(task)}
        >
          <Pencil />
        </Button>

        <Button
          variant="ghost"
          className="p-0 text-danger"
          onClick={() => openDelete(task)}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
