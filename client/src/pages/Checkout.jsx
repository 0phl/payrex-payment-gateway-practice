import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const PAYREX_PUBLIC_API_KEY = import.meta.env.VITE_PAYREX_PUBLIC_API_KEY || '';

function Checkout() {
  const { items, total, clearCart } = useCart();
  const [payrex, setPayrex] = useState(null);
  const [elements, setElements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [step, setStep] = useState('info');

  const deliveryFee = total >= 1000 ? 0 : 150;
  const grandTotal = total + deliveryFee;

  useEffect(() => {
    if (step === 'payment' && grandTotal > 0) {
      initializePayment();
    }
  }, [step, grandTotal]);

  useEffect(() => {
    checkPaymentIntentStatus();
  }, []);

  async function initializePayment() {
    const { clientSecret } = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: grandTotal * 100 }),
    }).then((r) => r.json());

    const payrexInstance = window.Payrex(PAYREX_PUBLIC_API_KEY);
    setPayrex(payrexInstance);

    const elems = payrexInstance.elements({ clientSecret });
    setElements(elems);

    const paymentElement = elems.create('payment', {
      layout: 'accordion',
    });
    paymentElement.mount('#payment-element');
  }

  async function handlePay() {
    setLoading(true);
    try {
      await payrex.attachPaymentMethod({
        elements,
        options: {
          return_url: window.location.href,
        },
      });
    } catch (error) {
      console.error('Payment error:', error);
    }
    setLoading(false);
  }

  async function checkPaymentIntentStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    if (!clientSecret) return;

    const payrexClient = window.Payrex(PAYREX_PUBLIC_API_KEY);
    const paymentIntent = await payrexClient.getPaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case 'succeeded':
        setStatus('succeeded');
        clearCart();
        break;
      case 'processing':
        setStatus('processing');
        break;
      case 'awaiting_payment_method':
        setStatus('failed');
        break;
      default:
        setStatus('error');
    }
  }

  if (items.length === 0 && !status) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <Link to="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  if (status === 'succeeded') {
    return (
      <div className="checkout-page">
        <div className="success-view">
          <div className="success-icon">✓</div>
          <h1>Payment Successful</h1>
          <p>Thank you for your order. Your flowers will be delivered soon.</p>
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="checkout-page">
        <div className="success-view">
          <div className="processing-spinner"></div>
          <h1>Processing Payment</h1>
          <p>Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="checkout-page">
        <div className="success-view">
          <div className="error-icon">✕</div>
          <h1>Payment Failed</h1>
          <p>Your payment was not successful. Please try again.</p>
          <button onClick={() => { setStatus(null); setStep('info'); }} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form">
            {step === 'info' && (
              <div className="form-section">
                <h2>Delivery Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="John" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" />
                  </div>
                  <div className="form-group full-width">
                    <label>Email</label>
                    <input type="email" placeholder="john@example.com" />
                  </div>
                  <div className="form-group full-width">
                    <label>Phone</label>
                    <input type="tel" placeholder="+63 9XX XXX XXXX" />
                  </div>
                  <div className="form-group full-width">
                    <label>Delivery Address</label>
                    <input type="text" placeholder="123 Flower St, Metro Manila" />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" placeholder="Makati City" />
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input type="text" placeholder="1200" />
                  </div>
                  <div className="form-group full-width">
                    <label>Delivery Notes (Optional)</label>
                    <textarea placeholder="Special instructions for delivery..." rows="3"></textarea>
                  </div>
                </div>
                <button className="continue-btn" onClick={() => setStep('payment')}>
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="form-section">
                <h2>Payment</h2>
                <button className="back-btn" onClick={() => setStep('info')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                  </svg>
                  Back to delivery
                </button>
                <div id="payment-element"></div>
                <button
                  className="pay-btn"
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : `Pay ₱${grandTotal.toLocaleString()}`}
                </button>
              </div>
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item-info">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="order-item-price">
                    ₱{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₱{total.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'Complimentary' : `₱${deliveryFee}`}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₱{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
