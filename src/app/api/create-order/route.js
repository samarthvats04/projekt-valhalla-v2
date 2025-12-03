import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RZP_KEY,   // public key
      key_secret: process.env.RZP_SECRET        // private key
    });

    const body = await req.json();
    const amount = body.amount || 99900; // default ₹999

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    return Response.json(order);
  } 
  catch (err) {
    console.error("Order create error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
