import type { Prisma } from '@prisma/client';
import { getCategories } from '@/lib/categories';

export type CategoryWithProducts = Prisma.PromiseReturnType<typeof getCategories>[number];
