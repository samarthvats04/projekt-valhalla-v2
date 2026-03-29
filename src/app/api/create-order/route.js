import Razorpay from "razorpay";

// Server-side pricing map
const PROGRAM_PRICES = {
  ragnarok: 99900, // ₹999 in paise
};

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RZP_KEY,   // public key
      key_secret: process.env.RZP_SECRET        // private key
    });

    const body = await req.json();
    const { program_id, user_id } = body;
    
    // Look up secure price
    const amount = PROGRAM_PRICES[program_id];
    
    if (!amount) {
      return new Response(JSON.stringify({ error: "Invalid program" }), { status: 400 });
    }
    
    if (!user_id) {
        return new Response(JSON.stringify({ error: "User ID required to secure transaction" }), { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        program_id,
        user_id,
      }
    });

    return Response.json(order);
  } 
  catch (err) {
    console.error("Order create error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
