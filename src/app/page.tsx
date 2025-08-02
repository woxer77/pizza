import FilterAside from '@/elements/filter-aside';
import Products from '@/elements/products';
import TopBar from '@/elements/top-bar';

import { products } from '@/constants/product.constants';

export default function Home() {
  return (
    <div>
      <TopBar />
      <div className="container mx-auto mt-10 flex gap-[72px]">
        <FilterAside />
        <Products products={products} />
      </div>
    </div>
  );
}
