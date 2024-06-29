import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="flex items-center flex-col gap-10 h-screen">
      <UserButton />
    </div>
  );
}
