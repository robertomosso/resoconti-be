import { z } from "zod";

const dominio = process.env.DOMINIO || '';

export const registerAdminSchema = z.object({
    nome: z
        .string()
        .min(3, "Il nome è obbligatorio"),
    cognome: z
        .string()
        .min(3, "Il cognome è obbligatorio"),
    email: z
        .string()
        .email()
        .refine(email => email.endsWith(dominio), {
            message: 'Email non valida',
        }),
    fileId: z
        .string()
        .optional(),
    role: z
        .literal('admin'),
});

export const registerUserSchema = z.object({
    nome: z
        .string()
        .min(3, "Il nome è obbligatorio"),
    cognome: z
        .string()
        .min(3, "Il cognome è obbligatorio"),
    email: z
        .string()
        .email()
        .refine(email => email.endsWith(dominio), {
            message: 'Email non valida',
        }),
    fileId: z
        .string(),
    // non dovrebbe servire settare il role in quanto è impostato di default a true su schema.prisma
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

const linguaSchema = z.object({
    lingua: z
        .string()
        .min(1, "Il nome della lingua è obbligatorio"),
    parlato: z
        .number()
        .int()
        .min(1)
        .max(5),
    scritto: z
        .number()
        .int()
        .min(1)
        .max(5),
});

export const profiloLavorativoSchema = z.object({
    sede: z
        .enum(['PESCARA', 'TERAMO', 'ROMA', 'MILANO', 'TORINO', 'MESSINA'])
        .optional(),
    dataAssunzione: z
        .date()
        .optional(),
    corsoDal: z
        .date()
        .optional(),
    corsoAl: z
        .date()
        .optional(),
    referente: z
        .string()
        .optional(),
    linguaggiProgrammazione: z
        .array(z.string()),
    tecnologieFrontend: z
        .array(z.string()),
    tecnologieBackend: z
        .array(z.string()),
    database: z
        .array(z.string()),
    softwareUtilizzati: z
        .array(z.string()),
    lingueStraniere: z
        .array(linguaSchema)
});

export const resocontoSchema = z.object({
    dataInizio: z
        .date(),
    dataFine: z
        .date(),
    tipoAttivita: z
        .string(),
    attivita: z
        .string()
        .max(100),
    descrizione: z
        .string()
        .max(500),
    personaRiferimento: z
        .string()
        .max(100),
    cliente: z
        .string()
        .max(100),
    colleghiSI: z
        .string()
        .max(500)
        .optional(),
    note: z
        .string()
        .max(500)
        .optional(),
    userId: z
        .string()
        .uuid(),
})