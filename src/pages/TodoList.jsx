import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { UserCircle } from 'lucide-react'
import TodoEditModal from '../components/modal/todo-edit-modal'
import TodoDeleteConfirmation from '../components/modal/todo-delete-confirmation'
import { task } from '../lib/api/tasks/taks'
import { toast, Slide } from 'react-toastify'
import { auth } from '../lib/api/auth/auth'
import { getUser } from '../lib/api/token'
import TaskItem from '../components/ui/task-item'
import { Link } from 'react-router'

export default function TodoList() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)
  const user = getUser()

  const fetchTasks = async () => {
    try {
      const res = await task.getAll()
      if (res.status && Array.isArray(res.data)) {
        setTasks(res.data)

        if (res.data.length === 0) {
          toast.info('Belum ada tugas saat ini.', {
            position: 'bottom-right',
            autoClose: 3000,
            theme: 'colored',
            transition: Slide,
            toastId: 'empty-tasks-info', 
          })
        }
      } else {
        toast.error('Failed to load tasks: Invalid response', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
      }
    } catch (error) {
      toast.error(`Failed to get tasks: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const toggleCompleted = async (id) => {
    const t = tasks.find((t) => t.id === id)
    if (!t) return

    const status = t.status === 'finished' ? 'pending' : 'finished'
    try {
      const res = await task.update(id, { ...t, status })
      if (res.status) {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)))
        toast.info(`Task marked as ${status}`, {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
      } else {
        toast.error('Failed to update task status: Server error', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
      }
    } catch (error) {
      toast.error(`Failed to update task status: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  const addTask = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Enter task title first', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
      return
    }
    try {
      const res = await task.create({ title, description })
      if (res.status) {
        fetchTasks()
        toast.success('Task added successfully', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
        setTitle('')
        setDescription('')
      } else {
        toast.error('Failed to add task: Server error', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
      }
    } catch (error) {
      toast.error(`Failed to add task: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  const logout = async () => {
    try {
      await auth.logout()
      toast.info('Success logout', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  const openEdit = (task) => {
    setCurrentTask(task)
    setEditOpen(true)
  }

  const saveEdit = async (updatedTask) => {
    try {
      const res = await task.update(updatedTask.id, updatedTask)
      if (res.status) {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
        toast.success('Task updated successfully', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
        setEditOpen(false)
        setCurrentTask(null)
      } else {
        toast.error('Failed to update task: Server error', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
      }
    } catch (error) {
      toast.error(`Failed to update task: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  const openDelete = (task) => {
    setCurrentTask(task)
    setDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!currentTask) return
    try {
      const res = await task.delete(currentTask.id)
      if (res.status) {
        setTasks(tasks.filter((t) => t.id !== currentTask.id))
        toast.success('Task deleted successfully', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
        setDeleteOpen(false)
        setCurrentTask(null)
      } else {
        toast.error('Failed to delete task: Server error', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
      }
    } catch (error) {
      toast.error(`Failed to delete task: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  return (
    <div className="flex gap-x-10">
      <section className="w-full p-6 space-y-6 bg-white border rounded-2xl border-primary max-w-3/4">
        <h1 className="text-3xl font-bold text-primary">To-Do List</h1>

        <form onSubmit={addTask} className="space-y-4">
          <Input
            type="text"
            placeholder="Add new task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Description your task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button className="w-full" type="submit">
            Add +
          </Button>
        </form>

        <div className="space-y-4 overflow-y-auto max-h-40">
          {tasks.map((task, i) => (
            <TaskItem
              key={i}
              task={task}
              toggleCompleted={toggleCompleted}
              openEdit={openEdit}
              openDelete={openDelete}
            />
          ))}
        </div>

        {editOpen && (
          <TodoEditModal
            task={currentTask}
            onClose={() => {
              setEditOpen(false)
              setCurrentTask(null)
            }}
            onSave={saveEdit}
          />
        )}

        {deleteOpen && (
          <TodoDeleteConfirmation
            onClose={() => setDeleteOpen(false)}
            onSave={confirmDelete}
          />
        )}
      </section>

      <section className="flex flex-col h-full gap-4">
        <div className="w-full px-4 py-2 bg-white border h-fit rounded-xl border-primary">
          <p className="flex items-center justify-center gap-4 text-lg font-semibold text-primary">
            {user?.username}
            <UserCircle />
          </p>
        </div>

        <div className="w-full p-4 space-y-2 bg-white border h-fit rounded-xl border-primary">
          <Button
            className="w-full bg-danger hover:bg-red-700"
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>
      </section>
    </div>
  )
}
