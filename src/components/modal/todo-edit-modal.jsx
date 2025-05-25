import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox' // pastikan komponen ini tersedia

export default function TodoEditModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [deadline, setDeadline] = useState("")

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setStatus(task.status)
      setDeadline(task.deadline)
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...task,
      title,
      description,
      status,
      deadline,
    })
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/30 backdrop-blur-3xl">
      <div className="w-full max-w-sm p-6 space-y-4 bg-white rounded-2xl">
        <h2 className="text-2xl font-semibold text-primary">Edit Todo</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={status === 'finished'}
              onCheckedChange={(checked) =>
                setStatus(checked ? 'finished' : 'pending')
              }
            />
            <label className="text-sm">Mark as Finished</label>
          </div>

          <Input
            type="date"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              className="bg-slate-200 hover:bg-slate-300"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">Save Update</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
