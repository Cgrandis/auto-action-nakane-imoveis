import { useUser } from '@/app/lib/auth/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminProtectedPage({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.slug !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || user.slug !== 'admin') return null;

  return <>{children}</>;
}