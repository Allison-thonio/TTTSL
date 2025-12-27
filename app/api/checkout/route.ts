import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request) {
    const { items } = await req.json()

    if (!items || items.length === 0) {
        return new NextResponse("Product ids are required", { status: 400 })
    }

    const line_items: any[] = []

    items.forEach((item: any) => {
        line_items.push({
            quantity: item.quantity,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: item.name,
                    images: [item.image], // Ensure this is a valid URL in production
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
            },
        })
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=1`,
    })

    return NextResponse.json({ url: session.url }, {
        headers: corsHeaders
    })
}
