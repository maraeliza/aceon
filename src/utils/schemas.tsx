import { RefinementCtx, z, ZodObject } from 'zod'

// Função para validar se a data de expiração é posterior à data de assinatura
const validateExpirationDate = (
  signatureDate: string,
  expirationDate: string,
): boolean => {
  const signature = new Date(signatureDate)
  const expiration = new Date(expirationDate)

  return expiration > signature
}

// Definindo o tipo explicitamente como um ZodObject
export const tenantSchema: ZodObject<{
  name: z.ZodString
  signature: z.ZodString
  expiration: z.ZodString
  cellphone: z.ZodOptional<z.ZodEffects<z.ZodString>>
  CNPJ: z.ZodString
  address: z.ZodOptional<z.ZodEffects<z.ZodString>>
  countryId: z.ZodNumber
  planId: z.ZodNumber
}> = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  signature: z.string().min(1, 'Data de assinatura é obrigatória'),
  expiration: z.string().min(1, 'Data de vencimento é obrigatória'),
  cellphone: z
    .string()
    .refine((val) => val === '' || /^\(\d{2}\)\s\d{5}-\d{4}$/.test(val), {
      message: 'Celular inválido',
    })
    .optional(),
  CNPJ: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
  address: z.string().refine((val) => val === '' || val.length > 3, {
    message: 'Digite ao menos 3 caracteres',
  }).optional(),
  countryId: z.number().min(1, 'Selecione um país'),
  planId: z.number().min(1, 'Selecione um plano'),
})

// Inferindo o tipo do schema
export type TenantForm = z.infer<typeof tenantSchema>
