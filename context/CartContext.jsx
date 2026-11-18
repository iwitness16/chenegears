"use client";
import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const key = `${action.item.handle}__${action.item.color}__${action.item.size}`;
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, qty: i.qty + (action.item.qty ?? 1) } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, key, qty: action.item.qty ?? 1 }],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.key !== action.key) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.key
            ? { ...i, qty: Math.max(1, action.qty) }
            : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "HYDRATE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

const STORAGE_KEY = "chene_cart";

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "HYDRATE", items: JSON.parse(saved) });
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const totalQty = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, totalQty, subtotal, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// Convenience helpers
export function useAddToCart() {
  const { dispatch } = useCart();
  return (item) => dispatch({ type: "ADD", item });
}
