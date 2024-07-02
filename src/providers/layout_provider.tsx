'use client';

import { GetCurrentUserFromMongoDb } from '@/actions/users';
import Loader from '@/components/loader';
import { UserButton } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  const isPublicRoute = ['sign-in', 'sign-up'].includes(pathname.split('/')[1]);

  const getHeader = () => {
    if (isPublicRoute) return null;
    return (
      <div className="lg:px-20 px-5">
        <div className="bg-primary p-3 flex justify-between items-center rounded-b">
          <h1 className="text-xl text-white font-bold">Next Home</h1>

          <div className="bg-white py-2 px-5 rounded-sm flex items-center gap-5">
            <span>{currentUserData?.username}</span>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  };

  const getContent = () => {
    if (isPublicRoute) return children;
    {
      loading && <Loader />;
    }
    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response: any = await GetCurrentUserFromMongoDb();
      if (response.error) throw new Error(response.error.message);
      setCurrentUserData(response.data);
    } catch (error: any) {
      return {
        message: 'Could not retrieve user',
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, []);

  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  );
};

export default LayoutProvider;
