import type { ICategory, IOption, IProduct } from '@/shared/types/common';

enum ProductSortOptions {
  POPULAR = 'popular',
  NEW = 'new',
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}

export const productSortOptions: IOption[] = Object.values(ProductSortOptions).map((value) => ({
  value,
  content: value
}));

export const TEMP_CATEGORIES: ICategory[] = [
  { id: 'pizza', name: 'pizzas' },
  { id: 'combo', name: 'combos' },
  { id: 'snack', name: 'snacks' },
  { id: 'cocktail', name: 'cocktails' },
  { id: 'drink', name: 'drink' },
  { id: 'dessert', name: 'desserts' },
  { id: 'salad', name: 'salads' },
  { id: 'pasta', name: 'pasta' }
];

export const products: IProduct[] = [
  {
    id: 0,
    name: 'Diablo',
    description:
      'Spicy chorizo, spicy jalapeño peppers, barbecue sauce, meatballs, tomatoes, sweet peppers, red onions, mozzarella',
    startPrice: 10,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 1,
    name: 'Margherita',
    description: 'Classic tomato sauce, fresh mozzarella, basil leaves, olive oil',
    startPrice: 8,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 2,
    name: 'Pepperoni',
    description: 'Tomato sauce, mozzarella cheese, pepperoni slices, oregano',
    startPrice: 9,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 3,
    name: 'Hawaiian',
    description: 'Tomato sauce, mozzarella cheese, ham, pineapple chunks',
    startPrice: 11,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 4,
    name: 'Quattro Stagioni',
    description: 'Tomato sauce, mozzarella, ham, mushrooms, artichokes, olives',
    startPrice: 13,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 5,
    name: 'Meat Lovers',
    description: 'Tomato sauce, mozzarella, pepperoni, sausage, bacon, ham',
    startPrice: 15,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 6,
    name: 'Vegetarian',
    description: 'Tomato sauce, mozzarella, bell peppers, mushrooms, onions, olives',
    startPrice: 10,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 7,
    name: 'BBQ Chicken',
    description: 'BBQ sauce, mozzarella, grilled chicken, red onions, cilantro',
    startPrice: 12,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 8,
    name: 'Mediterranean',
    description: 'Olive oil, mozzarella, sun-dried tomatoes, feta cheese, spinach, olives',
    startPrice: 11,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 9,
    name: 'Buffalo Chicken',
    description: 'Buffalo sauce, mozzarella, chicken, red onions, celery, blue cheese',
    startPrice: 13,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 10,
    name: 'Supreme',
    description: 'Tomato sauce, mozzarella, pepperoni, sausage, bell peppers, mushrooms, onions',
    startPrice: 14,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[0].id
  },
  {
    id: 11,
    name: 'Chicken Wings',
    description: 'Crispy chicken wings with choice of buffalo, BBQ, or honey mustard sauce',
    startPrice: 7,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[2].id
  },
  {
    id: 12,
    name: 'Mozzarella Sticks',
    description: 'Golden fried mozzarella sticks served with marinara sauce',
    startPrice: 6,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[2].id
  },
  {
    id: 13,
    name: 'Coca-Cola',
    description: 'Classic refreshing cola drink, 500ml',
    startPrice: 2,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[5].id
  },
  {
    id: 14,
    name: 'Orange Juice',
    description: 'Fresh squeezed orange juice, 400ml',
    startPrice: 3,
    image: '/pizza.png',
    categoryId: TEMP_CATEGORIES[5].id
  }
];
