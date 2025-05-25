import { Link, useNavigate } from 'react-router'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import { auth } from '../../lib/api/auth/auth'
import { toast, Slide } from 'react-toastify'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      toast.error('Username dan password harus diisi.', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'colored',
        transition: Slide,
      })
      return
    }

    setLoading(true)
    try {
      const response = await auth.register({ username, password })

      if (response.status && response.data && response.data.data) {
        toast.success('Registrasi berhasil!', {
          position: 'bottom-right',
          autoClose: 2000,
          theme: 'colored',
          transition: Slide,
        })

        setUsername('')
        setPassword('')

        const role = response.data.data.role
        if (role === 'admin') {
          navigate('/user-list')
        } else {
          navigate('/todo')
        }
      } else {
        toast.error(response.message || 'Registrasi gagal, coba lagi.', {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'colored',
          transition: Slide,
        })
      }
    } catch (err) {
      toast.error(err?.message || 'Terjadi kesalahan saat registrasi.', {
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
    <div className="flex flex-col w-full max-w-md gap-4">
      <section className="w-full max-w-md p-6 space-y-6 bg-white border rounded-2xl border-primary">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>
          <p>
            Already have an account?{' '}
            <Link to="/" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
      </section>
      <section className="w-full p-4 space-y-2 bg-white border h-fit rounded-xl border-primary">
        <Link
          to="/tech-stack"
          className="font-extrabold text-center hover:underline text-primary"
        >
          <h2>TECH STACK WEB</h2>
        </Link>
      </section>
    </div>
  )
}
