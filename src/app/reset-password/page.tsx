export const dynamic = 'force-dynamic'; // Must be first

// Update the import path below to the correct location of ResetPasswordForm
import ResetPasswordForm from '../../components/reset-password/ResetPasswordForm';

export default function ResetPasswordPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token || '';

  return <ResetPasswordForm token={token} />;
}
