'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'

export default function ResetPasswordClient() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      alert('Passwords do not match')
      return
    }

    try {
      await axios.post('/auth/password-reset/confirm/', {
        token,
        password,
        confirm_password: confirm,
      })
      alert('Password updated successfully')
    } catch (err) {
      console.error('Reset failed', err)
      alert('Something went wrong while resetting password.')
    }
  }

  return (
    <form
      onSubmit={handleReset}
      className="bg-white p-8 rounded-xl max-w-md w-full space-y-6 shadow-2xl"
    >
      <h2 className="text-center text-2xl font-bold text-blue-600">
        Reset Password
      </h2>

      <Input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />

      <Button type="submit" className="w-full bg-[#facc15] text-blue-600">
        Update Password
      </Button>
    </form>
  )
}
