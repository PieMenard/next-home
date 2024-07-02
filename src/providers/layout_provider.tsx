'use client';

import { GetCurrentUserFromMongoDb } from '@/actions/users';
import Loader from '@/components/loader';
import { UserButton } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { Button, Dropdown, MenuProps } from 'antd';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const userMenu = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Properties',
    path: '/user/properties',
  },
  {
    name: 'Account',
    path: '/user/account',
  },
  {
    name: 'Subscriptions',
    path: '/user/subscriptions',
  },
];
const adminMenu = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Properties',
    path: '/admin/properties',
  },
  {
    name: 'Users',
    path: '/admin/users',
  },
];

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuToShow, setMenuToShow] = useState(userMenu);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = ['sign-in', 'sign-up'].includes(pathname.split('/')[1]);

  const items: MenuProps['items'] = menuToShow.map((item) => ({
    key: item.path, // Unique key for each item
    label: item.name,
    onClick: () => {
      router.push(item.path);
    },
  }));

  const getHeader = () => {
    if (isPublicRoute) return null;
    return (
      <div className="lg:px-20 px-5">
        <div className="bg-primary p-3 flex justify-between items-center rounded-b">
          <h1 className="text-xl text-white font-bold">Next Home</h1>

          <div className="bg-white py-2 px-5 rounded-sm flex items-center gap-5">
            <Dropdown menu={{ items }}>
              <Button className="text-primary hover:text-primary" type="link">
                {currentUserData?.username}
              </Button>
            </Dropdown>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  };

  const getContent = () => {
    if (isPublicRoute) return children;
    if (loading) return <Loader />;
    return <div className="py-5 lg:px-20 px-5">{children}</div>;
  };

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response: any = await GetCurrentUserFromMongoDb();
      if (response.error) throw new Error(response.error.message);
      setCurrentUserData(response.data);
      if (response.data.isAdmin) {
        setMenuToShow(adminMenu);
      }
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
