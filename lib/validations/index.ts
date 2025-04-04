import z from "zod"

export const variableSchema = z.object({
    name: z.string().nullable(),
    value: z.string().nullable(),
})

export const nameFieldSchema = z.object({
    name: z.string(),
})

export const valueFieldSchema = z.object({
    value: z.string(),
})

export const formulaFieldSchema = z.object({
    formula: z.string().nullable(),
})