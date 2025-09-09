import type { CartWithRelations } from '@/shared/types/cart.interface';
import type { CalculatePriceArgs } from '@/shared/types/common';
import type { CartState } from '@/shared/types/cart.interface';

export const calculatePrice = ({
  product,
  sizeId,
  sizes,
  doughTypeId,
  doughTypes,
  ingredientIds
}: CalculatePriceArgs): string => {
  const sizePrice = sizes.find((size) => size.id === sizeId)?.price ?? 0;
  const doughTypePrice = doughTypes.find((doughType) => doughType.id === doughTypeId)?.price ?? 0;
  const ingredientsPrice = product.ingredients.reduce((acc, ingred) => {
    if (ingredientIds.includes(ingred.id)) {
      return acc + ingred.price;
    }
    return acc;
  }, 0);

  const total = product.basePrice + sizePrice + doughTypePrice + ingredientsPrice;
  return total.toFixed(2);
};

export const getCartDetails = (cart: CartWithRelations) => {
  if (!cart) {
    return {
      totalPrice: 0,
      items: []
    };
  }

  const items = cart.items.map((item) => ({
    id: item.id,
    name: item.productVariation.product.name,
    quantity: item.quantity,
    price: Number((item.totalPrice * item.quantity).toFixed(2)),
    image: item.productVariation.product.image,
    sizeId: item.productVariation.sizeId,
    doughTypeId: item.productVariation.doughTypeId,
    ingredients: item.ingredients.map((ingred) => ({
      name: ingred.name,
      price: ingred.price
    }))
  }));

  const cartDetails: Pick<CartState, 'totalPrice' | 'items'> = {
    totalPrice: cart.totalPrice,
    items
  };

  return cartDetails;
};
