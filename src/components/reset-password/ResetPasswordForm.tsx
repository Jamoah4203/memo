"use client";

import { useState } from 'react';
import axios from 'axios';

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords don't match");
      return;
    }
    if (!token) {
      setMessage("Invalid or missing reset token");
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/auth/password-reset/', {
        token,
        password,
        confirm_password: confirm,
      });
      setMessage('Password updated successfully! You can now login.');
    } catch (error) {
      setMessage('Failed to reset password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="input"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        required
        className="input"
      />
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Updating...' : 'Update Password'}
      </button>
      {message && <p className="text-center mt-2 text-red-500">{message}</p>}
    </form>
  );
}
