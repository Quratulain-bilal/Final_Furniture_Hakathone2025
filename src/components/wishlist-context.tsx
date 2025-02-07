'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  lastAction: 'ADD' | 'REMOVE' | null;
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string };

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (!state.items.some(item => item.id === action.payload.id)) {
        return {
          ...state,
          items: [...state.items, action.payload],
          lastAction: 'ADD'
        };
      }
      return state;
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        lastAction: 'REMOVE'
      };
    default:
      return state;
  }
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [], lastAction: null });

  useEffect(() => {
    if (state.lastAction === 'ADD') {
      toast.success('Added to wishlist!');
    } else if (state.lastAction === 'REMOVE') {
      toast.info('Removed from wishlist');
    }
  }, [state.lastAction]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

