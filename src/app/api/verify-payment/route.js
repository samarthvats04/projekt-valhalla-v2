import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import Razorpay from 'razorpay';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Need service role for inserts
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature
    } = body;

    // Verify signature
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RZP_SECRET)
      .update(text)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return Response.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }

    // Initialize Razorpay to fetch trusted order details
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RZP_KEY,
      key_secret: process.env.RZP_SECRET
    });

    // Fetch the order from Razorpay to get the secure server-generated notes
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const { user_id, program_id } = order.notes || {};

    if (!user_id || !program_id) {
       return Response.json({ success: false, error: "Missing required order metadata for fulfillment" }, { status: 400 });
    }

    // Record purchase in Supabase smoothly
    const { data, error } = await supabase
      .from('program_purchases')
      .insert({
        user_id,
        program_id,
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Verification error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}