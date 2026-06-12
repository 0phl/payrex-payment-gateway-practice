# Bloomfield — Payrex Payment Gateway Sample

A practice project demonstrating Payrex payment gateway integration using React and Node.js. Built as a flower shop e-commerce mockup to test and learn the Payrex Elements API.

> **Note:** This is a learning/practice project, not a production application.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Payment:** Payrex Elements (GCASH, Card, Maya, QRPH)
- **Styling:** Custom CSS

## Project Structure

```
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Cart state management
│   │   ├── data/            # Mock product data
│   │   └── pages/           # Page components
│   └── .env.example
├── server/                  # Express backend
│   ├── index.js
│   └── .env.example
└── package.json             # Root scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- Payrex test API keys ([sign up here](https://dashboard.payrexhq.com/signup))

### Installation

```bash
# Install all dependencies
npm run install:all
```

### Environment Setup

**Server** — create `server/.env`:
```env
PAYREX_SECRET_API_KEY=sk_test_your_secret_key
```

**Client** — create `client/.env`:
```env
VITE_PAYREX_PUBLIC_API_KEY=pk_test_your_public_key
```

### Running

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4242

## Pages

| Page | Description |
|------|-------------|
| Home | Hero with video, featured products, testimonials |
| Shop | Product grid with category filters |
| Product Detail | Full product info with add to cart |
| Cart | Item management, quantity adjustment |
| Checkout | 2-step flow: delivery info → Payrex payment |
| About | Brand story and values |

## Payment Flow

1. User adds items to cart
2. Proceeds to checkout, fills delivery info
3. Clicks "Continue to Payment"
4. Server creates a PaymentIntent via `payrex-node`
5. Payrex Elements renders the payment form
6. User completes payment (GCASH, Card, Maya, or QRPH)
7. Redirects back with payment status

## Testing

Use Payrex test cards:
- **Success:** `4242 4242 4242 4242`
- **Failure:** `4000 0000 0000 0002`

For GCASH/Maya, use the test credentials from Payrex docs.

## Acknowledgments

- [Payrex Documentation](https://docs.payrex.com)
- [Payrex Elements](https://docs.payrex.com/docs/guide/developer_handbook/payments/integrations/elements)
