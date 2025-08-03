import type { IOption } from '@/shared/types/common';
import { ProductSortBy, type IProduct } from '@/shared/types/product.interface';
import { TEMP_CATEGORIES } from './category.constants';

export const productSortOptions: IOption<ProductSortBy>[] = Object.values(ProductSortBy).map((value) => ({
  value,
  content: value
}));
export const products: IProduct[] = [
  // Pizzas (4 items)
  {
    id: 0,
    name: 'Diablo',
    description:
      'Spicy chorizo, spicy jalapeño peppers, barbecue sauce, meatballs, tomatoes, sweet peppers, red onions, mozzarella',
    basePrice: 10,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[0]
  },
  {
    id: 1,
    name: 'Margherita',
    description: 'Classic tomato sauce, fresh mozzarella, basil leaves, olive oil',
    basePrice: 8,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[0]
  },
  {
    id: 2,
    name: 'Pepperoni',
    description: 'Tomato sauce, mozzarella cheese, pepperoni slices, oregano',
    basePrice: 9,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[0]
  },
  {
    id: 3,
    name: 'Hawaiian',
    description: 'Tomato sauce, mozzarella cheese, ham, pineapple chunks',
    basePrice: 11,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[0]
  },

  // Combos (3 items)
  {
    id: 4,
    name: 'Family Combo',
    description: 'Large pizza, 6 wings, 2 drinks, and garlic bread',
    basePrice: 25,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[1]
  },
  {
    id: 5,
    name: 'Date Night Combo',
    description: 'Medium pizza, 2 drinks, and dessert for two',
    basePrice: 18,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[1]
  },
  {
    id: 6,
    name: 'Student Combo',
    description: 'Small pizza, drink, and side snack',
    basePrice: 12,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[1]
  },

  // Snacks (3 items)
  {
    id: 7,
    name: 'Chicken Wings',
    description: 'Crispy chicken wings with choice of buffalo, BBQ, or honey mustard sauce',
    basePrice: 7,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[2]
  },
  {
    id: 8,
    name: 'Mozzarella Sticks',
    description: 'Golden fried mozzarella sticks served with marinara sauce',
    basePrice: 6,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[2]
  },
  {
    id: 9,
    name: 'Garlic Bread',
    description: 'Crispy bread with garlic butter and herbs',
    basePrice: 4,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[2]
  },

  // Cocktails (2 items)
  {
    id: 10,
    name: 'Mojito',
    description: 'Classic mojito with mint, lime, and rum',
    basePrice: 8,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[3]
  },
  {
    id: 11,
    name: 'Piña Colada',
    description: 'Tropical cocktail with pineapple and coconut',
    basePrice: 9,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[3]
  },

  // Drinks (3 items)
  {
    id: 12,
    name: 'Coca-Cola',
    description: 'Classic refreshing cola drink, 500ml',
    basePrice: 2,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[4]
  },
  {
    id: 13,
    name: 'Orange Juice',
    description: 'Fresh squeezed orange juice, 400ml',
    basePrice: 3,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[4]
  },
  {
    id: 14,
    name: 'Sparkling Water',
    description: 'Refreshing sparkling mineral water, 500ml',
    basePrice: 2,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[4]
  },

  // Desserts (2 items)
  {
    id: 15,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    basePrice: 6,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[5]
  },
  {
    id: 16,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with chocolate frosting',
    basePrice: 5,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[5]
  },

  // Salads (3 items)
  {
    id: 17,
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce, croutons, parmesan, caesar dressing',
    basePrice: 7,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[6]
  },
  {
    id: 18,
    name: 'Greek Salad',
    description: 'Tomatoes, cucumbers, olives, feta cheese, olive oil',
    basePrice: 8,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[6]
  },
  {
    id: 19,
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, basil, balsamic glaze',
    basePrice: 9,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[6]
  },

  // Pasta (4 items)
  {
    id: 20,
    name: 'Spaghetti Carbonara',
    description: 'Classic pasta with eggs, cheese, pancetta, and black pepper',
    basePrice: 12,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[7]
  },
  {
    id: 21,
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with garlic, chili, and herbs',
    basePrice: 10,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[7]
  },
  {
    id: 22,
    name: 'Fettuccine Alfredo',
    description: 'Creamy parmesan sauce with butter and garlic',
    basePrice: 11,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[7]
  },
  {
    id: 23,
    name: 'Lasagna',
    description: 'Layered pasta with meat sauce, cheese, and herbs',
    basePrice: 14,
    image: '/pizza.png',
    category: TEMP_CATEGORIES[7]
  }
];
