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
    </div>
  );
}
