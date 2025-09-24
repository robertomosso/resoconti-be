import { z } from "zod";
import { ForeignLanguagesEnum, OfficesEnum } from "../const"

const dominio = process.env.DOMINIO || '';


export const RegisterFirstUserSchema = z.object({
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


export const RegisterUserSchema = z.object({
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


export const LoginSchema = z.object({
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


export const ChangePasswordSchema = z.object({
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


export const ReportSchema = z.object({
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
        .length(21, "userId deve essere un nanoid valido"),
});
export type ReportSchema = z.infer<typeof ReportSchema>;


export const SearchUsersSchema = z.object({
    userId: z
        .string()
        .length(21, "userId deve essere un nanoid valido")
        .or(z.literal(''))
        .optional()
        .nullable(),
    office: z
        .enum(Object.values(OfficesEnum) as [string, ...string[]])
        .or(z.literal(''))
        .optional()
        .nullable(),
    workExperience: z
        .string()
        .or(z.literal(''))
        .optional()
        .nullable(),
    programmingLanguages: z
        .array(z.string())
        .or(z.literal(''))
        .optional()
        .nullable(),
    frontendTechnologies: z
        .array(z.string())
        .or(z.literal(''))
        .optional()
        .nullable(),
    backendTechnologies: z
        .array(z.string())
        .or(z.literal(''))
        .optional()
        .nullable(),
    databases: z
        .array(z.string())
        .or(z.literal(''))
        .optional()
        .nullable(),
    softwareUsed: z
        .array(z.string())
        .or(z.literal(''))
        .optional()
        .nullable(),
    foreignLanguages: z
        .array(z.enum(Object.values(ForeignLanguagesEnum) as [string, ...string[]]))
        .or(z.literal(''))
        .optional()
        .nullable(),
});
export type SearchUsersSchema = z.infer<typeof SearchUsersSchema>;


export const UpdateUserSchema = z.object({
    userId: z
        .string()
        .length(21, "userId deve essere un nanoid valido"),
    name: z
        .string()
        .min(3, "Il nome è obbligatorio"),
    lastname: z
        .string()
        .min(3, "Il cognome è obbligatorio"),
    office: z
        .enum(Object.values(OfficesEnum) as [string, ...string[]])
        .optional(),
    referencePerson: z
        .string()
        .optional(),
    course: z
        .object({
            courseFrom: z
                .string()
                .regex(/^\d{4}-\d{2}-\d{2}$/)
                .or(z.literal(''))
                .optional(),
            courseTo: z
                .string()
                .regex(/^\d{4}-\d{2}-\d{2}$/)
                .or(z.literal(''))
                .optional(),
        })
        .optional(),
    hiringDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/),
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
        .array(z.enum(Object.values(ForeignLanguagesEnum) as [string, ...string[]]))
        .optional(),
});
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
