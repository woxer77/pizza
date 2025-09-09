import type { Prisma } from '@prisma/client';
import { getCategories } from '@/services/db/categories';

export type CategoryWithProducts = Prisma.PromiseReturnType<typeof getCategories>[number];
