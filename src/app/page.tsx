import FilterAside from '@/elements/filter-aside';
import Products from '@/elements/products';
import TopBar from '@/elements/top-bar';

const TEMP_CATEGORIES = [
  { name: 'meat' },
  { name: 'spicy' },
  { name: 'sweet' },
  { name: 'vegetarian' },
  { name: 'chicken' },
  { name: 'pineapple' },
  { name: 'cheese' },
  { name: 'tomato' }
];

export default function Home() {
  return (
    <div>
      <TopBar categories={TEMP_CATEGORIES} />
      <div className="container mx-auto mt-10 flex gap-[72px]">
        <FilterAside />
        <Products />
      </div>
    </div>
  );
}
