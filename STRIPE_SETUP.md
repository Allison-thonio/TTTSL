# Stripe Payment Setup

To enable real payments, you need to set up Stripe.

1.  **Sign up** at [dashboard.stripe.com](https://dashboard.stripe.com/register).
2.  **Get your API Keys** from the Developers > API Keys section.
3.  **Create a file** named `.env.local` in the root of your project.
4.  **Add the following content** to `.env.local`, replacing the values with your actual keys:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

5.  **Restart your server** (`npm run dev`) for the changes to take effect.

Once done, the "Credit Card" option in the checkout will redirect to a real Stripe payment page.
