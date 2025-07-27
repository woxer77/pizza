import FilterAside from '@/components/elements/filter-aside';
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
      <div className="container mx-auto h-[3000px]">
        <FilterAside />
      </div>
    </div>
  );
}
