import type { CartWithRelations } from '@/shared/types/cart.interface';
import type { CalcCartItemPriceArgs } from '@/shared/types/common';
import type { CartState } from '@/shared/types/cart.interface';

export const calcCartItemPrice = ({
  product,
  size,
  doughType,
  ingredients,
  quantity
}: CalcCartItemPriceArgs): number => {
  const ingredientsPrice = ingredients.reduce((acc, ingred) => acc + ingred.price, 0);

  const total = product.basePrice + (size?.price ?? 0) + (doughType?.price ?? 0) + ingredientsPrice;
  return Number((total * quantity).toFixed(2));
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
    price: item.totalPrice,
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
