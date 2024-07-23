import { z } from 'zod';

const QueryFind = z.object({
  page: z.string().nullable().default('0').transform(Number),
  take: z.string().nullable().default('10').transform(Number),
  query: z.string().nullable(),
});

const Token = z.object({
  accessToken: z.string().nullable(),
});

export type QueryFind = z.infer<typeof QueryFind>;
export type TokenSchema = z.infer<typeof Token>;

export { QueryFind };
