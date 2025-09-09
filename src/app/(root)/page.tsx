import Products from '@/components/elements/products';
import FilterAside from '@/elements/filter-aside';
import TopBar from '@/elements/top-bar';
import { serializeData } from '@/helpers/utils';
import { Suspense } from 'react';

import { getCategories } from '@/services/db/categories';
import { Skeleton } from '@/ui/skeleton';

export default async function Home() {
  const categoriesRaw = await getCategories();
  const categories = serializeData(categoriesRaw);

  return (
    <div>
      <TopBar categories={categories} />
      <div className="container mx-auto mt-10 flex gap-[72px]">
        <Suspense fallback={<Skeleton />}>
          <FilterAside />
        </Suspense>
        <Products categories={categories} />
      </div>
    </div>
  );
}
