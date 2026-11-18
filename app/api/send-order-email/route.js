import { NextResponse } from "next/server";
import { sendOrderEmails } from "@/lib/mailer";

export async function POST(request) {
  try {
    const body = await request.json();

    const { customer, shipping, items, subtotal, shippingCost, tax, total } = body;

    // Basic validation
    if (!customer?.email) {
      return NextResponse.json({ error: "Customer email is required." }, { status: 400 });
    }
    if (!items?.length) {
      return NextResponse.json({ error: "No items in order." }, { status: 400 });
    }

    const orderRef = await sendOrderEmails({
      customer,
      shipping,
      items,
      subtotal:     parseFloat(subtotal)     || 0,
      shippingCost: parseFloat(shippingCost) || 0,
      tax:          parseFloat(tax)          || 0,
      total:        parseFloat(total)        || 0,
    });

    return NextResponse.json({ success: true, orderRef });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Check server logs." },
      { status: 500 }
    );
  }
}
