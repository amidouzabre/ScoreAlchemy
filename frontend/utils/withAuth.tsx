

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: Record<string, unknown>) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Do nothing while loading
      if (!session) {
        router.push('/auth/login'); // Redirect to login if not authenticated
      }
    }, [session, status, router]);

    if (!session) {
      return null; // Optionally render a loading spinner or placeholder
    }

    return <Component {...props} />;
  };
}