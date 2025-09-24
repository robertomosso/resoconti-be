import prisma from "../../prisma-client"
import { SearchUsersSchema, UpdateUserSchema } from "../../schemas/zod.schema";


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

export const searchUsers = async (body: SearchUsersSchema) => {
    const where: any = {};

    if (body.userId) {
        where.id = body.userId;
    }

    if (
        body.office ||
        body.workExperience ||
        body.programmingLanguages?.length ||
        body.frontendTechnologies?.length ||
        body.backendTechnologies?.length ||
        body.databases?.length ||
        body.softwareUsed?.length ||
        body.foreignLanguages?.length
    ) {
        where.workProfile = {};

        if (body.office) {
            where.workProfile.office = { contains: body.office, mode: 'insensitive' };
        }
        if (body.workExperience) {
            // where.workProfile.hiringDate = workExperience; // da adattare
        }
        if (body.programmingLanguages?.length) {
            where.workProfile.programmingLanguages = { hasSome: body.programmingLanguages };
        }
        if (body.frontendTechnologies?.length) {
            where.workProfile.frontendTechnologies = { hasSome: body.frontendTechnologies };
        }
        if (body.backendTechnologies?.length) {
            where.workProfile.backendTechnologies = { hasSome: body.backendTechnologies };
        }
        if (body.databases?.length) {
            where.workProfile.databases = { hasSome: body.databases };
        }
        if (body.softwareUsed?.length) {
            where.workProfile.softwareUsed = { hasSome: body.softwareUsed };
        }
        if (body.foreignLanguages?.length) {
            where.workProfile.foreignLanguages = { hasSome: body.foreignLanguages };
        }
    }

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            lastname: true,
            workProfile: true,
        },
        where
    });

    return users;
}

export const updateUser = async (body: UpdateUserSchema) => {
    const user = await prisma.user.update({
        where: { id: body.userId },
        data: {
            name: body.name,
            lastname: body.lastname,
            workProfile: {
                upsert: {
                    create: {
                        office: body.office ?? '',
                        referencePerson: body.referencePerson,
                        courseFrom: body.course?.courseFrom ? new Date(body.course.courseFrom) : undefined,
                        courseTo: body.course?.courseTo ? new Date(body.course.courseTo) : undefined,
                        hiringDate: new Date(body.hiringDate),
                        programmingLanguages: body.programmingLanguages,
                        frontendTechnologies: body.frontendTechnologies,
                        backendTechnologies: body.backendTechnologies,
                        databases: body.databases,
                        softwareUsed: body.softwareUsed,
                        foreignLanguages: body.foreignLanguages,
                    },
                    update: {
                        office: body.office ?? '',
                        referencePerson: body.referencePerson,
                        courseFrom: body.course?.courseFrom ? new Date(body.course.courseFrom) : undefined,
                        courseTo: body.course?.courseTo ? new Date(body.course.courseTo) : undefined,
                        hiringDate: body.hiringDate ? new Date(body.hiringDate) : undefined,
                        programmingLanguages: body.programmingLanguages,
                        frontendTechnologies: body.frontendTechnologies,
                        backendTechnologies: body.backendTechnologies,
                        databases: body.databases,
                        softwareUsed: body.softwareUsed,
                        foreignLanguages: body.foreignLanguages,
                    }
                }
            }
        }
    })

    return user;
}