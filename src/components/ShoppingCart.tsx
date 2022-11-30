import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/currencyFormatter";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";

type Props = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: Props) => {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} {...cartItem} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((acc, curr) => {
                const item = storeItems.find(
                  (storeItem) => storeItem.id === curr.id
                );
                return acc + (item?.price || 0) * curr.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
