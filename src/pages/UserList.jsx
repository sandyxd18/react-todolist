import { useEffect, useState } from 'react'
import { admin } from '../lib/api/admin/user'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Ellipsis, UserCircle } from 'lucide-react'
import { Link } from 'react-router'
import UserOption from '../components/modal/user-option'
import { toast, Slide } from 'react-toastify'
import { getUser } from '../lib/api/token'
import UserDeleteConfirmation from '../components/modal/user-delete-confirmation'
import { auth } from '../lib/api/auth/auth'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activeUserId, setActiveUserId] = useState(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)

  const user = getUser()

  const fetchUsers = async () => {
    try {
      const data = await admin.getAllUsers()
      const users = data.filter((user) => user.role !== 'admin')
      setUsers(users)
    } catch (error) {
      toast.error(`Gagal mengambil data pengguna: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim()) {
      return toast.error('You must fill this field!', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
    try {
      await admin.createUser({ username, password })
      toast.success('User created successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
      setUsername('')
      setPassword('')
      fetchUsers()
    } catch (error) {
      toast.error(`Failed to create user: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  const handleDelete = async (id) => {
    try {
      await admin.deleteUser(id)
      if (id === activeUserId) setActiveUserId(null)
      fetchUsers()
      toast.info('User deleted successfully', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    } catch (error) {
      toast.error(`Failed to delete user: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  const handleOptionsClick = (id) => {
    setActiveUserId(id === activeUserId ? null : id)
  }

  const handleRequestDelete = (id) => {
    setDeleteUserId(id)
    setIsDeleteModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false)
    setDeleteUserId(null)
  }

  const handleConfirmDelete = async () => {
    if (!deleteUserId) return
    try {
      await admin.deleteUser(deleteUserId)
      setActiveUserId(null)
      setIsDeleteModalOpen(false)
      setDeleteUserId(null)
      fetchUsers()
      toast.info('User deleted successfully', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    } catch (error) {
      toast.error(`Failed to delete user: ${error.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const userLoggedIn = getUser()

  return (
    <div className="flex gap-x-10">
      <section className="w-full max-w-md p-6 space-y-6 bg-white border rounded-2xl border-primary">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-primary">User List</h1>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Add new User"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-40">
              Add +
            </Button>
          </form>
        </div>
        <div className="space-y-4 overflow-y-auto max-h-40">
          {users.map((user, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between px-4 py-2 border border-yellow-400 rounded-xl"
            >
              <p className="text-lg font-medium">{user.username}</p>
              <Button
                className="p-0"
                variant="ghost"
                onClick={() => handleOptionsClick(user.id)}
              >
                <Ellipsis />
              </Button>
              {activeUserId === user.id && (
                <div className="absolute right-0 z-10 top-12">
                  <UserOption
                    userId={user.id}
                    onResetPassword={() => handleDelete(user.id)}
                    onRequestDelete={handleRequestDelete}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col w-1/2 h-full gap-4">
        <div className="w-full px-4 py-2 bg-white border h-fit rounded-xl border-primary">
          <p className="flex items-center justify-center gap-4 text-xl font-semibold text-primary">
            {userLoggedIn.username}
            <UserCircle />
          </p>
        </div>
        <div className="w-full p-4 space-y-2 bg-white border h-fit rounded-xl border-primary">
          <Button className="w-full" asChild>
            <Link to={`/user/${user.id}/reset-password`}>Forgot Password</Link>
          </Button>
          <Button
            className="w-full bg-danger hover:bg-red-700"
            onClick={() => auth.logout()}
          >
            Sign Out
          </Button>
        </div>
      </section>

      {isDeleteModalOpen && (
        <UserDeleteConfirmation
          onClose={handleCloseModal}
          onSave={handleConfirmDelete}
        />
      )}
    </div>
  )
}
