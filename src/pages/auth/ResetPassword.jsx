import { useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useNavigate, useParams } from 'react-router'
import { getToken } from '../../lib/api/token'
import { admin } from '../../lib/api/admin/user'
import { toast, Slide } from 'react-toastify'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password.trim() || !confirm.trim()) {
      toast.error('Password dan Confirm Password harus diisi.', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
      return
    }

    if (password !== confirm) {
      toast.error('Password dan Confirm Password tidak cocok.', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
      return
    }

    const token = getToken()
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
      return
    }

    setLoading(true)
    try {
      await admin.changeUserPassword(id, confirm)
      toast.info('Password berhasil diupdate!', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'colored',
        transition: Slide,
      })

      navigate(-1)
    } catch (err) {
      toast.error(err.message || 'Terjadi kesalahan saat mereset password.', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full max-w-md p-6 mx-auto space-y-6 bg-white border rounded-2xl border-primary">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">Reset Password</h1>
        <p>Reset password dengan user ID: {id}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          disabled={loading}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Updating...' : 'Reset Password'}
        </Button>
      </form>
    </section>
  )
}
