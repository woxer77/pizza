import type { IOption } from '@/shared/types/common';
import { ProductSortBy, type ProductSortByValue } from '@/shared/types/product.interface';

export const productSortOptions: IOption<ProductSortByValue>[] = Object.values(ProductSortBy).map((value) => ({
  value,
  content: value
}));

export const products = [
  // Pizzas
  {
    name: 'Cheese',
    description: 'Classic cheese pizza with stretchy mozzarella and house tomato sauce.',
    image: '/pizza/cheese.jpg',
    basePrice: 8.5,
    categoryId: 'pizza'
  },
  {
    name: 'Chorizo',
    description: 'Spicy chorizo slices, tomato sauce and mozzarella.',
    image: '/pizza/chorizo.jpg',
    basePrice: 9.5,
    categoryId: 'pizza'
  },
  {
    name: 'Double Chicken',
    description: 'Double portion of tender chicken, mozzarella and creamy sauce.',
    image: '/pizza/double-chicken.jpg',
    basePrice: 10.5,
    categoryId: 'pizza'
  },
  {
    name: 'Four Cheese',
    description: 'Blend of mozzarella, blue cheese, parmesan and cheddar.',
    image: '/pizza/four-cheese.jpg',
    basePrice: 10.0,
    categoryId: 'pizza'
  },
  {
    name: 'Ham and Cheese',
    description: 'Smoked ham, mozzarella and light creamy base.',
    image: '/pizza/ham-and-cheese.jpg',
    basePrice: 9.0,
    categoryId: 'pizza'
  },
  {
    name: 'Ham and Mushrooms',
    description: 'Ham, fresh mushrooms, mozzarella and tomato sauce.',
    image: '/pizza/ham-and-mushrooms.jpg',
    basePrice: 9.2,
    categoryId: 'pizza'
  },
  {
    name: 'Pepperoni',
    description: 'Pepperoni slices, rich tomato sauce and extra mozzarella.',
    image: '/pizza/pepperoni.jpg',
    basePrice: 9.8,
    categoryId: 'pizza'
  },

  // Combos
  {
    name: 'Pizza and Drink',
    description: 'Any standard pizza paired with a drink at a bundle price.',
    image: '/combo/pizza-and-drink.jpg',
    basePrice: 13.5,
    categoryId: 'combo'
  },
  {
    name: 'Three 25cm Pizzas',
    description: 'Set of three 25 cm pizzas for sharing.',
    image: '/combo/three-25sm-pizzas.jpg',
    basePrice: 27.0,
    categoryId: 'combo'
  },
  {
    name: 'Three 30cm Pizzas',
    description: 'Three medium (30 cm) pizzas with discount.',
    image: '/combo/three-30sm-pizzas.jpg',
    basePrice: 33.0,
    categoryId: 'combo'
  },
  {
    name: 'Three 35cm Pizzas',
    description: 'Three large (35 cm) pizzas for a group.',
    image: '/combo/three-35sm-pizzas.jpg',
    basePrice: 39.0,
    categoryId: 'combo'
  },
  {
    name: 'Two Pizzas',
    description: 'Two standard pizzas at a special price.',
    image: '/combo/two-pizzas.jpg',
    basePrice: 19.0,
    categoryId: 'combo'
  },

  // Desserts
  {
    name: 'Cheese Pancakes',
    description: 'Soft cottage cheese pancakes with a sweet sauce.',
    image: '/dessert/cheese-pancakes.jpg',
    basePrice: 4.5,
    categoryId: 'dessert'
  },
  {
    name: 'Cheesecake New York',
    description: 'Classic dense New York style cheesecake.',
    image: '/dessert/cheesecake-new-york.jpg',
    basePrice: 5.5,
    categoryId: 'dessert'
  },
  {
    name: 'Chocolate Cookie',
    description: 'Large soft baked chocolate cookie.',
    image: '/dessert/chocolate-cookie.jpg',
    basePrice: 2.2,
    categoryId: 'dessert'
  },
  {
    name: 'Fondant',
    description: 'Warm chocolate fondant with molten center.',
    image: '/dessert/fondant.jpg',
    basePrice: 5.0,
    categoryId: 'dessert'
  },
  {
    name: 'Tiramisu',
    description: 'Classic tiramisu with mascarpone and espresso.',
    image: '/dessert/tiramisu.jpg',
    basePrice: 5.2,
    categoryId: 'dessert'
  },

  // Drinks
  {
    name: 'Cappuccino',
    description: 'Espresso with silky milk foam.',
    image: '/drink/cappuccino.jpg',
    basePrice: 3.2,
    categoryId: 'drink'
  },
  {
    name: 'Latte',
    description: 'Mild espresso-based milk drink.',
    image: '/drink/latte.jpg',
    basePrice: 3.4,
    categoryId: 'drink'
  },
  {
    name: 'Strawberry Milk Shake',
    description: 'Creamy strawberry milkshake.',
    image: '/drink/strawberry-milk-shake.jpg',
    basePrice: 4.5,
    categoryId: 'drink'
  },

  // Sauces
  {
    name: 'Barbecue',
    description: 'Smoky barbecue dipping sauce.',
    image: '/sauce/barbecue.jpg',
    basePrice: 1.0,
    categoryId: 'sauce'
  },
  {
    name: 'Cheese Sauce',
    description: 'Creamy melted cheese dip.',
    image: '/sauce/cheese.jpg',
    basePrice: 1.2,
    categoryId: 'sauce'
  },
  {
    name: 'Garlic',
    description: 'Savory garlic sauce.',
    image: '/sauce/garlic.jpg',
    basePrice: 1.0,
    categoryId: 'sauce'
  },
  {
    name: 'Thousand Island',
    description: 'Classic Thousand Island dressing.',
    image: '/sauce/thousand-island.jpg',
    basePrice: 1.1,
    categoryId: 'sauce'
  },

  // Snacks
  {
    name: 'Chicken Roll',
    description: 'Warm roll filled with seasoned chicken.',
    image: '/snack/chicken-roll.jpg',
    basePrice: 4.2,
    categoryId: 'snack'
  },
  {
    name: 'Country Potato',
    description: 'Oven-baked country-style potato wedges.',
    image: '/snack/country-potatoe.jpg',
    basePrice: 3.5,
    categoryId: 'snack'
  },
  {
    name: 'Fries',
    description: 'Crispy golden French fries.',
    image: '/snack/fries.jpg',
    basePrice: 3.0,
    categoryId: 'snack'
  },
  {
    name: 'Nuggets',
    description: 'Crunchy breaded chicken nuggets.',
    image: '/snack/nuggets.jpg',
    basePrice: 4.8,
    categoryId: 'snack'
  },
  {
    name: 'Shrimps',
    description: 'Breaded fried shrimp with light seasoning.',
    image: '/snack/shrimps.jpg',
    basePrice: 6.9,
    categoryId: 'snack'
  }
];
