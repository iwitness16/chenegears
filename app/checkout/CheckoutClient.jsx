"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/Logo";

const PAYMENT_OPTIONS = [
  { value: "", label: "— Select payment method —" },
  { value: "Apple Pay",  label: "Apple Pay"  },
  { value: "Cash App",   label: "Cash App"   },
  { value: "Zelle",      label: "Zelle"      },
  { value: "Venmo",      label: "Venmo"      },
  { value: "Gift Card",  label: "Gift Card"  },
  { value: "Chime",      label: "Chime"      },
];

function fmt(n) { return `$${parseFloat(n ?? 0).toFixed(2)}`; }

export default function CheckoutClient() {
  const { items, subtotal, dispatch } = useCart();

  const shippingCost = subtotal >= 150 ? 0 : 9.99;
  const tax   = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  // Single-step form state
  const [form, setForm]             = useState({ name: "", email: "", phone: "", address: "", paymentMethod: "" });
  const [submitting, setSubmitting] = useState(false);
  const [orderRef, setOrderRef]     = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmed, setConfirmed]   = useState(false);
  const [errors, setErrors]         = useState({});

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required.";
    if (!form.email.trim())   e.email   = "Email is required.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.paymentMethod)  e.paymentMethod = "Please select a payment method.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setEmailError("");

    try {
      const res = await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name:    form.name,
            email:   form.email,
            phone:   form.phone,
            address: form.address,
            paymentMethod: form.paymentMethod,
          },
          shipping: {
            address1: form.address,
            address2: "",
            city: "", state: "", zip: "",
            method: "standard",
          },
          items: items.map((i) => ({
            title: i.title, color: i.color, size: i.size,
            qty: i.qty, price: i.price, image: i.image,
          })),
          subtotal, shippingCost, tax, total,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setEmailError("Order placed! Confirmation email could not be sent.");
        setOrderRef("CHN-" + Date.now().toString(36).toUpperCase());
      } else {
        setOrderRef(data.orderRef);
      }
      dispatch({ type: "CLEAR" });
      setConfirmed(true);
    } catch {
      dispatch({ type: "CLEAR" });
      setOrderRef("CHN-" + Date.now().toString(36).toUpperCase());
      setConfirmed(true);
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Empty cart ── */
  if (items.length === 0 && !confirmed) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-inner">
          <h1 className="cart-empty-title">NOTHING TO CHECK OUT</h1>
          <p className="cart-empty-sub">Your cart is empty.</p>
          <Link href="/collections/waders" className="btn btn-tan">SHOP NOW</Link>
        </div>
      </div>
    );
  }

  /* ── Confirmation ── */
  if (confirmed) {
    return (
      <div className="co-confirm">
        <div className="co-confirm-inner">
          <div className="co-confirm-icon">✓</div>
          <h1 className="co-confirm-title">ORDER CONFIRMED</h1>
          {orderRef && (
            <p className="co-confirm-ref">Order reference: <strong>{orderRef}</strong></p>
          )}
          {emailError ? (
            <p className="co-confirm-sub co-confirm-sub--warn">{emailError}</p>
          ) : (
            <p className="co-confirm-sub">
              A confirmation has been sent to <strong>{form.email}</strong>.
              We'll be in touch shortly.
            </p>
          )}
          <p className="co-confirm-contact">
            Questions?{" "}
            <a href="mailto:chenegears@gmail.com" className="co-confirm-email">chenegears@gmail.com</a>
            {" · "}
            <a href="https://wa.me/13312241929" className="co-confirm-email">WhatsApp</a>
          </p>
          <div className="co-confirm-actions">
            <Link href="/" className="btn btn-tan">BACK TO HOME</Link>
            <Link href="/collections/waders" className="btn btn-outline">KEEP SHOPPING</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="co-page">
      {/* Header */}
      <header className="co-header">
        <Logo />
        <div className="co-steps">
          <span className="co-step co-step--active">Checkout</span>
        </div>
      </header>

      <div className="co-layout">
        {/* Form */}
        <div className="co-form-col">
          <form onSubmit={handleSubmit} noValidate>

            {/* Contact & Address */}
            <section className="co-section">
              <h2 className="co-section-title">Your details</h2>
              <div className="co-fields">

                <div className="co-field">
                  <label className="co-label" htmlFor="name">Full name *</label>
                  <input id="name" name="name" type="text" autoComplete="name" required
                    value={form.name} onChange={update} className={`co-input${errors.name ? " co-input--error" : ""}`}
                    placeholder="Jane Smith" />
                  {errors.name && <p className="co-field-error">{errors.name}</p>}
                </div>

                <div className="co-field">
                  <label className="co-label" htmlFor="email">Email address *</label>
                  <input id="email" name="email" type="email" autoComplete="email" required
                    value={form.email} onChange={update} className={`co-input${errors.email ? " co-input--error" : ""}`}
                    placeholder="jane@email.com" />
                  {errors.email && <p className="co-field-error">{errors.email}</p>}
                </div>

                <div className="co-field">
                  <label className="co-label" htmlFor="phone">Phone number</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel"
                    value={form.phone} onChange={update} className="co-input"
                    placeholder="+1 (555) 000-0000" />
                </div>

                <div className="co-field">
                  <label className="co-label" htmlFor="address">Shipping address *</label>
                  <textarea id="address" name="address" autoComplete="street-address" required rows={3}
                    value={form.address} onChange={update}
                    className={`co-input co-textarea${errors.address ? " co-input--error" : ""}`}
                    placeholder="1835 Nonconnah Blvd, Suite 173, Memphis, TN 38132" />
                  {errors.address && <p className="co-field-error">{errors.address}</p>}
                </div>

              </div>
            </section>

            {/* Payment */}
            <section className="co-section">
              <h2 className="co-section-title">Payment method</h2>
              <p className="co-secure-note"><span className="co-lock">🔒</span> Secure checkout</p>
              <div className="co-field">
                <label className="co-label" htmlFor="paymentMethod">Select how you'll pay *</label>
                <select id="paymentMethod" name="paymentMethod" required
                  value={form.paymentMethod} onChange={update}
                  className={`co-select co-select--lg${errors.paymentMethod ? " co-input--error" : ""}`}>
                  {PAYMENT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {errors.paymentMethod && <p className="co-field-error">{errors.paymentMethod}</p>}
                {form.paymentMethod && (
                  <p className="co-payment-note">
                    After placing your order, payment instructions for <strong>{form.paymentMethod}</strong> will be sent to your email.
                  </p>
                )}
              </div>
            </section>

            <button type="submit" className="btn btn-tan co-next-btn" disabled={submitting}>
              {submitting ? "PLACING ORDER…" : `PLACE ORDER — ${fmt(total)}`}
            </button>

          </form>
        </div>

        {/* Summary */}
        <aside className="co-summary">
          <h2 className="co-summary-heading">ORDER SUMMARY</h2>
          <div className="co-summary-items">
            {items.map((item) => (
              <div key={item.key} className="co-summary-item">
                <div className="co-summary-thumb">
                  {item.image && <img src={item.image} alt={item.title} />}
                  <span className="co-summary-qty">{item.qty}</span>
                </div>
                <div className="co-summary-info">
                  <p className="co-summary-name">{item.title}</p>
                  {item.color && <p className="co-summary-meta">{item.color}{item.size ? ` / ${item.size}` : ""}</p>}
                </div>
                <span className="co-summary-price">{fmt(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="co-summary-divider" />
          <div className="co-summary-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
          <div className="co-summary-row"><span>Shipping</span><span>{shippingCost === 0 ? "FREE" : fmt(shippingCost)}</span></div>
          <div className="co-summary-row"><span>Tax (est.)</span><span>{fmt(tax)}</span></div>
          <div className="co-summary-divider" />
          <div className="co-summary-row co-summary-row--total"><span>TOTAL</span><span>{fmt(total)}</span></div>
        </aside>
      </div>
    </div>
  );
}
