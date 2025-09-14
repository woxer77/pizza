import { getCartDetails } from '@/helpers/cart.utils';
import Api from '@/services/api/api-client';
import type { CartState } from '@/shared/types/cart.interface';
import { create } from 'zustand';

export const useCartStore = create<CartState>()((set) => ({
  totalPrice: 0,
  items: [],
  loading: false,
  error: false,

  fetchItems: async () => {
    try {
      set({ loading: true, error: false });
      const cart = await Api.cart.getByToken();
      set(getCartDetails(cart));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const cart = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(cart));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  deleteItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const cart = await Api.cart.deleteItem(id);
      set(getCartDetails(cart));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  }
}));
