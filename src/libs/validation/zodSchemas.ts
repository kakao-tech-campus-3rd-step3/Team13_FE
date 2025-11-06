import { z, type infer as ZodInfer } from 'zod';

import { validationMessages as msg } from './messages';

const trimmed = () => z.string().transform((value) => value.trim());

export const nicknameSchema = trimmed()
  .min(1, { message: msg.required })
  .max(31, { message: msg.nickname.tooLong });

export const descriptionSchema = trimmed()
  .max(255, { message: msg.description.tooLong })
  .optional()
  .or(z.literal(''));

export const emailSchema = trimmed()
  .min(1, { message: msg.required })
  .email({ message: msg.email.invalid });

export const localPartSchema = trimmed().min(1, {
  message: msg.localPart.required,
});

export const verifyCodeSchema = trimmed().regex(/^\d{6}$/, {
  message: msg.code.invalid,
});

export const imageUrlSchema = trimmed()
  .url({ message: msg.imageUrl.invalid })
  .max(255, { message: msg.imageUrl.tooLong });

export const profileFormSchema = z.object({
  nickname: nicknameSchema,
  description: descriptionSchema,
  email: emailSchema,
  imageUrl: imageUrlSchema.optional(),
});

export type ProfileFormValues = ZodInfer<typeof profileFormSchema>;
