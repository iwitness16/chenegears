"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

function QtyControl({ item }) {
  const { dispatch } = useCart();
  return (
    <div className="cart-qty">
      <button
        aria-label="Decrease quantity"
        onClick={() =>
          item.qty === 1
            ? dispatch({ type: "REMOVE", key: item.key })
            : dispatch({ type: "UPDATE_QTY", key: item.key, qty: item.qty - 1 })
        }
      >
        −
      </button>
      <span>{item.qty}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => dispatch({ type: "UPDATE_QTY", key: item.key, qty: item.qty + 1 })}
      >
        +
      </button>
    </div>
  );
}

export default function CartClient() {
  const { items, subtotal, dispatch } = useCart();

  const shipping = subtotal >= 150 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-inner">
          <h1 className="cart-empty-title">YOUR CART IS EMPTY</h1>
          <p className="cart-empty-sub">Looks like you haven't added anything yet.</p>
          <Link href="/collections/waders" className="btn btn-tan">
            SHOP NOW
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* ── Header row ── */}
      <div className="cart-heading-row">
        <h1 className="cart-heading">YOUR CART</h1>
        <Link href="/" className="cart-continue">← Continue shopping</Link>
      </div>

      <div className="cart-layout">
        {/* ── Line items ── */}
        <div className="cart-items">
          {/* Table header */}
          <div className="cart-row cart-row--head">
            <span>PRODUCT</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>

          {items.map((item) => (
            <div key={item.key} className="cart-row cart-row--item">
              {/* Thumbnail + details */}
              <div className="cart-product">
                <div className="cart-thumb">
                  {item.image && (
                    <Link href={`/products/${item.handle}`}>
                      <img src={item.image} alt={item.title} />
                    </Link>
                  )}
                </div>
                <div className="cart-product-info">
                  <Link href={`/products/${item.handle}`} className="cart-product-name">
                    {item.title}
                  </Link>
                  {item.color && (
                    <p className="cart-product-meta">Color: {item.color}</p>
                  )}
                  {item.size && (
                    <p className="cart-product-meta">Size: {item.size}</p>
                  )}
                  <p className="cart-product-price">${item.price.toFixed(2)}</p>
                  <button
                    className="cart-remove"
                    onClick={() => dispatch({ type: "REMOVE", key: item.key })}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Qty */}
              <QtyControl item={item} />

              {/* Line total */}
              <span className="cart-line-total">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* ── Order summary sidebar ── */}
        <aside className="cart-summary">
          <h2 className="cart-summary-heading">ORDER SUMMARY</h2>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping === 0 && (
            <p className="cart-free-ship">✓ Free shipping on orders over $150</p>
          )}
          {shipping > 0 && (
            <p className="cart-free-ship cart-free-ship--bar">
              Add ${(150 - subtotal).toFixed(2)} more for free shipping
            </p>
          )}

          <div className="cart-summary-divider" />

          <div className="cart-summary-row cart-summary-row--total">
            <span>ESTIMATED TOTAL</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <p className="cart-summary-taxes">Taxes and discounts calculated at checkout.</p>

          <Link href="/checkout" className="btn btn-tan cart-checkout-btn">
            PROCEED TO CHECKOUT
          </Link>
          <Link href="/collections/waders" className="cart-keep-shopping">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
