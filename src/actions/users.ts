'use server'

import prisma from "@/config/db";
import { currentUser } from "@clerk/nextjs/server"


export const GetCurrentUserFromMongoDb = async () => {
    try {
        //check if user already exists with clerk userid property
        const clerkUser = await currentUser();
        let mongoUser = null;
        mongoUser = await prisma.user.findUnique({
            where: {
                clerkUserId: clerkUser?.id
            }
        })
        if (mongoUser) {
            return {
                data: mongoUser
            }
        }

        //if user doesn't exist, create a new user
        let username = clerkUser?.username;
        if (!username) {
            username = clerkUser?.firstName + ' ' + clerkUser?.lastName;
        }

        //in case of no last name
        username = username?.replace('null', '');

        const newUser = {
            clerkUserId: clerkUser?.id,
            username,
            email: clerkUser?.emailAddresses[0].emailAddress,
            profilePic: clerkUser?.imageUrl
        }
        const result = await prisma.user.create(
            {
                data: newUser
            }
        )
        return { data: result }
    } catch (error: any) {
        error: error.message
    }
}