import FilterAside from '@/elements/filter-aside';
import TopBar from '@/elements/top-bar';

import ProductsContainer from '@/containers/products-container';

export default function Home() {
  return (
    <div>
      <TopBar />
      <div className="container mx-auto mt-10 flex gap-[72px]">
        <FilterAside />
        <ProductsContainer />
      </div>
    </div>
  );
}
