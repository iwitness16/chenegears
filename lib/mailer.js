/**
 * lib/mailer.js
 * Nodemailer transporter + order email templates.
 * Only imported from server-side code (API Route Handlers).
 */
import "server-only";
import nodemailer from "nodemailer";

// ── Transporter ───────────────────────────────────────────────────────────────

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,  // Gmail App Password (no spaces)
  },
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n) {
  return `$${parseFloat(n ?? 0).toFixed(2)}`;
}

function orderNumber() {
  return "CHN-" + Date.now().toString(36).toUpperCase();
}

// ── Shared base template ──────────────────────────────────────────────────────

function base(bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Chêne Gear</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111;">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f3;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e2e2de;">

      <!-- Header -->
      <tr>
        <td style="background:#000;padding:28px 40px;">
          <p style="margin:0;font-size:22px;font-weight:700;letter-spacing:.18em;color:#ffffff;text-transform:uppercase;">
            CHÊNE
          </p>
          <p style="margin:4px 0 0;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#c4ab83;">
            GEAR
          </p>
        </td>
      </tr>

      <!-- Body -->
      ${bodyHtml}

      <!-- Footer -->
      <tr>
        <td style="background:#0a0a0a;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;color:#666;letter-spacing:.08em;">
            © 2026 Chêne Gear® &nbsp;·&nbsp;
            <a href="mailto:chenegears@gmail.com" style="color:#c4ab83;text-decoration:none;">chenegears@gmail.com</a>
          </p>
          <p style="margin:0;font-size:10px;color:#444;letter-spacing:.06em;">
            1835 Nonconnah Blvd Suite 173, Memphis, TN 38132
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>

</body>
</html>`;
}

// ── Items table rows ──────────────────────────────────────────────────────────

function itemRows(items) {
  return items.map((item) => `
    <tr style="border-bottom:1px solid #f0f0ec;">
      <td style="padding:14px 0;vertical-align:middle;">
        ${item.image
          ? `<img src="${item.image}" width="56" height="56" alt="${item.title}"
               style="display:block;object-fit:cover;border:1px solid #eee;" />`
          : `<div style="width:56px;height:56px;background:#f5f5f3;"></div>`
        }
      </td>
      <td style="padding:14px 16px;vertical-align:middle;">
        <p style="margin:0 0 2px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">${item.title}</p>
        ${item.color ? `<p style="margin:0;font-size:12px;color:#888;">${item.color}${item.size ? ` / ${item.size}` : ""}</p>` : ""}
        <p style="margin:4px 0 0;font-size:12px;color:#888;">Qty: ${item.qty}</p>
      </td>
      <td style="padding:14px 0;vertical-align:middle;text-align:right;font-size:13px;font-weight:700;white-space:nowrap;">
        ${fmt(item.price * item.qty)}
      </td>
    </tr>
  `).join("");
}

// ── Customer confirmation email ───────────────────────────────────────────────

export function buildCustomerEmail({ orderRef, customer, shipping, items, subtotal, shippingCost, tax, total }) {
  const body = `
    <!-- Greeting -->
    <tr>
      <td style="padding:36px 40px 20px;">
        <p style="margin:0 0 8px;font-size:22px;font-weight:700;letter-spacing:.06em;">
          Order confirmed ✓
        </p>
        <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">
          Hi ${customer.name ?? customer.firstName ?? "there"}, thanks for your order! We'll send you payment instructions
          for <strong>${customer.paymentMethod ?? "your selected method"}</strong> and shipping
          updates as soon as your gear is on its way.
        </p>
      </td>
    </tr>

    <!-- Order reference -->
    <tr>
      <td style="padding:0 40px 24px;">
        <table width="100%" cellpadding="12" cellspacing="0"
          style="background:#f7f6f4;border:1px solid #e8e8e5;">
          <tr>
            <td style="font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#888;">
              Order number
            </td>
            <td style="text-align:right;font-size:14px;font-weight:700;font-family:monospace;color:#111;">
              ${orderRef}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Items -->
    <tr>
      <td style="padding:0 40px 24px;">
        <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#333;">
          Items ordered
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${itemRows(items)}
        </table>
      </td>
    </tr>

    <!-- Totals -->
    <tr>
      <td style="padding:0 40px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0"
          style="border-top:2px solid #111;">
          <tr><td style="padding:12px 0 4px;font-size:13px;color:#555;">Subtotal</td>
              <td style="padding:12px 0 4px;text-align:right;font-size:13px;">${fmt(subtotal)}</td></tr>
          <tr><td style="padding:4px 0;font-size:13px;color:#555;">Shipping</td>
              <td style="padding:4px 0;text-align:right;font-size:13px;">${shippingCost === 0 ? "FREE" : fmt(shippingCost)}</td></tr>
          <tr><td style="padding:4px 0;font-size:13px;color:#555;">Tax</td>
              <td style="padding:4px 0;text-align:right;font-size:13px;">${fmt(tax)}</td></tr>
          <tr>
            <td style="padding:12px 0 0;font-size:15px;font-weight:700;border-top:1px solid #e8e8e5;">TOTAL</td>
            <td style="padding:12px 0 0;text-align:right;font-size:15px;font-weight:700;border-top:1px solid #e8e8e5;">${fmt(total)}</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Shipping address -->
    <tr>
      <td style="padding:0 40px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="50%" style="vertical-align:top;padding-right:16px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#333;">
                Ship to
              </p>
              <p style="margin:0;font-size:13px;color:#555;line-height:1.65;">
                ${customer.name ?? `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim()}<br/>
                ${customer.phone ? `📞 ${customer.phone}<br/>` : ""}
                ${shipping.address1}${shipping.address2 ? `<br/>${shipping.address2}` : ""}
                ${shipping.city ? `<br/>${shipping.city}, ${shipping.state} ${shipping.zip}` : ""}
              </p>
            </td>
            <td width="50%" style="vertical-align:top;padding-left:16px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#333;">
                Shipping method
              </p>
              <p style="margin:0;font-size:13px;color:#555;line-height:1.65;">
                ${shipping.method === "express" ? "Express (2–3 business days)" : "Standard (5–7 business days)"}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td style="padding:0 40px 40px;text-align:center;">
        <a href="https://chenegear.com"
          style="display:inline-block;padding:14px 36px;background:#c4ab83;color:#000;
                 font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
                 text-decoration:none;">
          CONTINUE SHOPPING
        </a>
        <p style="margin:20px 0 0;font-size:12px;color:#aaa;line-height:1.6;">
          Questions? Reply to this email or contact us at
          <a href="mailto:chenegears@gmail.com" style="color:#c4ab83;">chenegears@gmail.com</a>
          &nbsp;·&nbsp;
          <a href="https://wa.me/13312241929" style="color:#c4ab83;">WhatsApp</a>
        </p>
        ${customer.paymentMethod ? `
        <p style="margin:12px 0 0;font-size:13px;color:#555;line-height:1.6;">
          Payment instructions for <strong>${customer.paymentMethod}</strong> will be sent in a follow-up email.
        </p>` : ""}
      </td>
    </tr>
  `;

  return base(body);
}

// ── Admin notification email ──────────────────────────────────────────────────

export function buildAdminEmail({ orderRef, customer, shipping, items, subtotal, shippingCost, tax, total }) {
  const body = `
    <!-- Alert banner -->
    <tr>
      <td style="background:#c4ab83;padding:14px 40px;">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#000;">
          🛒 &nbsp;New order received
        </p>
      </td>
    </tr>

    <!-- Order info -->
    <tr>
      <td style="padding:32px 40px 20px;">
        <p style="margin:0 0 4px;font-size:22px;font-weight:700;letter-spacing:.06em;">
          ${orderRef}
        </p>
        <p style="margin:0;font-size:13px;color:#555;">
          Placed on ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
        </p>
      </td>
    </tr>

    <!-- Customer info -->
    <tr>
      <td style="padding:0 40px 24px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#333;">
          Customer
        </p>
        <table cellpadding="0" cellspacing="0">
          <tr><td style="padding:3px 16px 3px 0;font-size:12px;color:#888;min-width:80px;">Name</td>
              <td style="padding:3px 0;font-size:13px;font-weight:600;">${customer.name ?? `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim()}</td></tr>
          <tr><td style="padding:3px 16px 3px 0;font-size:12px;color:#888;">Email</td>
              <td style="padding:3px 0;font-size:13px;">
                <a href="mailto:${customer.email}" style="color:#c4ab83;">${customer.email}</a></td></tr>
          <tr><td style="padding:3px 16px 3px 0;font-size:12px;color:#888;">Phone</td>
              <td style="padding:3px 0;font-size:13px;font-weight:600;">${customer.phone || "<span style='color:#aaa;font-weight:400;'>Not provided</span>"}</td></tr>
          ${customer.paymentMethod ? `<tr><td style="padding:3px 16px 3px 0;font-size:12px;color:#888;">Payment</td>
              <td style="padding:3px 0;font-size:13px;font-weight:600;color:#c4ab83;">${customer.paymentMethod}</td></tr>` : ""}
        </table>
      </td>
    </tr>

    <!-- Items -->
    <tr>
      <td style="padding:0 40px 24px;">
        <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#333;">
          Items (${items.length})
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${itemRows(items)}
        </table>
      </td>
    </tr>

    <!-- Totals -->
    <tr>
      <td style="padding:0 40px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid #111;">
          <tr><td style="padding:10px 0 4px;font-size:13px;color:#555;">Subtotal</td>
              <td style="padding:10px 0 4px;text-align:right;font-size:13px;">${fmt(subtotal)}</td></tr>
          <tr><td style="padding:4px 0;font-size:13px;color:#555;">Shipping</td>
              <td style="padding:4px 0;text-align:right;font-size:13px;">${shippingCost === 0 ? "FREE" : fmt(shippingCost)}</td></tr>
          <tr><td style="padding:4px 0;font-size:13px;color:#555;">Tax</td>
              <td style="padding:4px 0;text-align:right;font-size:13px;">${fmt(tax)}</td></tr>
          <tr>
            <td style="padding:10px 0 0;font-size:15px;font-weight:700;border-top:1px solid #e8e8e5;">TOTAL</td>
            <td style="padding:10px 0 0;text-align:right;font-size:16px;font-weight:700;border-top:1px solid #e8e8e5;color:#c4ab83;">${fmt(total)}</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Shipping address -->
    <tr>
      <td style="padding:0 40px 36px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#333;">
          Ship to
        </p>
        <p style="margin:0;font-size:13px;color:#555;line-height:1.7;">
          ${shipping.address1}${shipping.address2 ? `, ${shipping.address2}` : ""}<br/>
          ${shipping.city}, ${shipping.state} ${shipping.zip}<br/>
          <span style="color:#888;">${shipping.method === "express" ? "Express shipping" : "Standard shipping"}</span>
        </p>
      </td>
    </tr>
  `;

  return base(body);
}

// ── Send helper ───────────────────────────────────────────────────────────────

export async function sendOrderEmails({ customer, shipping, items, subtotal, shippingCost, tax, total }) {
  const orderRef = orderNumber();

  const payload = { orderRef, customer, shipping, items, subtotal, shippingCost, tax, total };

  const customerHtml = buildCustomerEmail(payload);
  const adminHtml    = buildAdminEmail(payload);

  // Send both in parallel
  await Promise.all([
    // Customer confirmation
    transporter.sendMail({
      from: `"Chêne Gear" <${process.env.EMAIL_FROM}>`,
      to:   customer.email,
      subject: `Order confirmed: ${orderRef} — Chêne Gear`,
      html:  customerHtml,
    }),
    // Admin notification
    transporter.sendMail({
      from:    `"Chêne Gear Orders" <${process.env.EMAIL_FROM}>`,
      to:      process.env.ADMIN_EMAIL,
      subject: `New order ${orderRef} from ${customer.firstName} ${customer.lastName} — ${fmt(total)}`,
      html:    adminHtml,
    }),
  ]);

  return orderRef;
}
