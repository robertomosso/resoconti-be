import prisma from "../../prisma-client"


export const hasUser = async () => {
    return await prisma.user.count();
}

export const getUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            name: true,
            lastname: true,
            workProfile: true,
        },
        where: {
            id: userId
        },
    });

    return user;
}

export const getUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            lastname: true,
        }
    });

    return users;
}