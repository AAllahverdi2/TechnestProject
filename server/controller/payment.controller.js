const stripe = require("stripe")(process.env.STRIPE__SECRET__KEY);

const PaymentController = {
    payment: async (req, res) => {
        const { products } = req.body;
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.productName,
                    description: product.productDescription,
                },
                unit_amount: Math.round(product.oneTimePurchase * 100),
            },
            quantity: 1,
        }));


        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: 'http://localhost:3000/dashboard?success=true',
            });
            //   http://localhost:4007/success
            res.status(200).json({ id: session.id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Server error." });
        }
    }

}
module.exports = PaymentController;