import { z } from 'zod';

const QueryFind = z.object({
  page: z.string().nullable().default('0').transform(Number),
  take: z.string().nullable().default('10').transform(Number),
  query: z.string().nullable(),
});

export type QueryFind = z.infer<typeof QueryFind>;

export { QueryFind };
