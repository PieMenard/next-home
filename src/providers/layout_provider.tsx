'use client';

import { GetCurrentUserFromMongoDb } from '@/actions/users';
import { UserButton } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);

  const getHeader = () => {
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
    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };

  const getCurrentUser = async () => {
    try {
      const response: any = await GetCurrentUserFromMongoDb();
      console.log({ response });
      if (response.error) throw new Error(response.error.message);
      setCurrentUserData(response.data);
    } catch (error: any) {
      //   message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
    console.log({ currentUserData });
  }, []);

  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  );
};

export default LayoutProvider;
