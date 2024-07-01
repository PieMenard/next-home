import { GetCurrentUserFromMongoDb } from '@/actions/users';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  await GetCurrentUserFromMongoDb();
  const loggedInUser = await currentUser();

  let username = loggedInUser?.username;
  if (!username) {
    username = loggedInUser?.firstName + ' ' + loggedInUser?.lastName;
  }

  //in case of no last name
  username = username?.replace('null', '');

  return (
    <div className="flex items-center flex-col gap-10 h-screen">
      <UserButton afterSignOutUrl="/sign-in" />
      <div>Clerk user id: {loggedInUser?.id}</div>
      <div>Username: {username}</div>
      <div>Email: {loggedInUser?.emailAddresses[0].emailAddress}</div>
    </div>
  );
}
