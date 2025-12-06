import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

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
      razorpay_signature,
      user_id,
      program_id 
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

    // Record purchase in Supabase
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