import { z } from "zod";

const dominio = process.env.DOMINIO || '';

export const registerFirstUserSchema = z.object({
    name: z
        .string()
        .min(3, "Il nome è obbligatorio"),
    lastname: z
        .string()
        .min(3, "Il cognome è obbligatorio"),
    email: z
        .string()
        .email()
        .refine(email => email.endsWith(dominio), {
            message: 'Email non valida',
        }),
    password: z
        .string()
        .min(8)
        .max(16),
    fileId: z
        .string()
        .optional(),
});

export const registerUserSchema = z.object({
    name: z
        .string()
        .min(3, "Il nome è obbligatorio"),
    lastname: z
        .string()
        .min(3, "Il cognome è obbligatorio"),
    email: z
        .string()
        .email()
        .refine(email => email.endsWith(dominio), {
            message: 'Email non valida',
        }),
    role: z
        .enum(['ADMIN', 'USER']),
    fileId: z
        .string()
        .optional(),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email()
        .refine(email => email.endsWith(dominio), {
            message: 'Email non valida',
        }),
    password: z
        .string()
        .min(8)
        .max(16),
});

export const changePasswordSchema = z.object({
    email: z
        .string()
        .email()
        .refine(email => email.endsWith(dominio), {
            message: 'Email non valida',
        }),
    currentPassword: z
        .string()
        .min(8)
        .max(16),
    newPassword: z.
        string()
        .min(8)
        .max(16),
});

const languageSchema = z.object({
    language: z
        .string()
        .min(1, "Il nome della lingua è obbligatorio"),
    spoken: z
        .number()
        .int()
        .min(1)
        .max(5),
    written: z
        .number()
        .int()
        .min(1)
        .max(5),
});

export const workProfileSchema = z.object({
    office: z
        .enum(['PESCARA', 'TERAMO', 'ROMA', 'MILANO', 'TORINO', 'MESSINA'])
        .optional(),
    hiringDate: z
        .date()
        .optional(),
    courseFrom: z
        .date()
        .optional(),
    courseTo: z
        .date()
        .optional(),
    referencePerson: z
        .string()
        .optional(),
    programmingLanguages: z
        .array(z.string()),
    frontendTechnologies: z
        .array(z.string()),
    backendTechnologies: z
        .array(z.string()),
    databases: z
        .array(z.string()),
    softwareUsed: z
        .array(z.string()),
    foreignLanguages: z
        .array(languageSchema)
});

export const reportSchema = z.object({
    startDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/), // accetta solo yyyy-mm-dd
    endDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/),
    activityType: z
        .string(),
    activity: z
        .string()
        .max(100),
    description: z
        .string()
        .max(500),
    referencePerson: z
        .string()
        .max(100),
    customer: z
        .string()
        .max(100),
    colleaguesSI: z
        .string()
        .max(500)
        .optional(),
    notes: z
        .string()
        .max(500)
        .optional(),
    userId: z
        .string()
        .uuid(),
})