// app/reset-password/page.tsx
import { Suspense } from 'react'
// Update the import path if the component is located elsewhere, for example:
// Update the import path to match the actual file location and filename (case-sensitive)
import ResetPasswordClient from '../../components/reset-password/ResetPasswordForm'
// If the file is named 'resetPasswordClient.tsx' or similar, update the import accordingly:
// import ResetPasswordClient from '../../components/reset-password/resetPasswordClient'

export const dynamic = 'force-dynamic'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
      <Suspense fallback={<div>Loading reset form...</div>}>
        <ResetPasswordClient />
      </Suspense>
    </div>
  )
}