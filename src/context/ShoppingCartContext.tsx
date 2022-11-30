import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Props = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function getItemQuantity(id: number) {
    return cartItems.find((cart) => cart.id === id)?.quantity || 0;
  }

  function increaseQuantity(id: number) {
    setCartItems((prevItems) => {
      if (prevItems.find((prevItem) => prevItem.id == id) == null) {
        return [...prevItems, { id, quantity: 1 }];
      } else {
        return prevItems.map((prevItem) => {
          if (prevItem.id === id) {
            return { ...prevItem, quantity: prevItem.quantity + 1 };
          } else {
            return prevItem;
          }
        });
      }
    });
  }

  function decreaseQuantity(id: number) {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === id)?.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      } else {
        return prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  }

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  const cartQuantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
