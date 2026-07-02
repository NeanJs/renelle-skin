import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { CreditCard, Lock, ShieldCheck, Truck } from 'lucide-react';
import { LoadingSpinner } from '@/app/components/Loading';
import { toast } from 'sonner';

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const kit = location.state?.kit;
  const [processing, setProcessing] = useState(false);

  if (!kit) {
    navigate('/subscriptions');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      toast.success('Subscription confirmed!', {
        description: 'Your first kit will ship within 2–3 business days.',
      });
      navigate('/confirmation', { state: { kit } });
    }, 1500);
  };

  return (
    <div className="flex-1 bg-[#F7F6F4] py-14 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3" style={{ letterSpacing: '0.14em' }}>Step 3 of 3</p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form side */}
          <div className="lg:col-span-2 space-y-5">

            {/* Shipping */}
            <div className="bg-white border border-border p-8">
              <h2 className="text-base font-medium mb-6 uppercase tracking-widest" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>Shipping Information</h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>First Name</Label>
                    <Input id="firstName" required className="mt-2 h-11 rounded-none border-border focus:border-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>Last Name</Label>
                    <Input id="lastName" required className="mt-2 h-11 rounded-none border-border focus:border-foreground" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>Email Address</Label>
                  <Input id="email" type="email" required placeholder="you@example.com" className="mt-2 h-11 rounded-none border-border focus:border-foreground" />
                </div>
                <div>
                  <Label htmlFor="address" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>Street Address</Label>
                  <Input id="address" required className="mt-2 h-11 rounded-none border-border focus:border-foreground" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>City</Label>
                    <Input id="city" required className="mt-2 h-11 rounded-none border-border focus:border-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="province" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>Province</Label>
                    <Input id="province" required className="mt-2 h-11 rounded-none border-border focus:border-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="postal" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>Postal Code</Label>
                    <Input id="postal" required className="mt-2 h-11 rounded-none border-border focus:border-foreground" />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment */}
            <div className="bg-white border border-border p-8">
              <h2 className="text-base font-medium mb-6 uppercase tracking-widest" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>Payment Information</h2>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="cardNumber" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>Card Number</Label>
                  <div className="relative mt-2">
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-11 rounded-none border-border focus:border-foreground pl-10" />
                    <CreditCard className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>Expiry</Label>
                    <Input id="expiry" placeholder="MM / YY" className="mt-2 h-11 rounded-none border-border focus:border-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-xs uppercase tracking-wider text-muted-foreground" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>CVV</Label>
                    <Input id="cvv" placeholder="123" className="mt-2 h-11 rounded-none border-border focus:border-foreground" />
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[#F7F6F4] border border-border">
                  <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Your payment information is encrypted and secure. We never store your full card details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border p-8 sticky top-28">
              <h3 className="text-xs uppercase tracking-widest mb-6" style={{ letterSpacing: '0.12em', fontSize: '0.65rem' }}>Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-sm font-medium mb-0.5">{kit.name}</p>
                  <p className="text-xs text-muted-foreground">{kit.tier} Tier</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly subscription</span>
                  <span>${kit.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="text-xs uppercase tracking-widest" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>Total Today</span>
                <div className="text-right">
                  <p className="text-2xl font-semibold">${kit.price}</p>
                  <p className="text-xs text-muted-foreground">CAD / month</p>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                disabled={processing}
                className="w-full h-12 rounded-none bg-foreground text-background hover:bg-foreground/85 text-xs uppercase tracking-widest mb-6"
                style={{ letterSpacing: '0.1em' }}
              >
                {processing ? (
                  <span className="flex items-center gap-2"><LoadingSpinner size="sm" /> Processing...</span>
                ) : 'Complete Subscription'}
              </Button>

              <div className="space-y-3">
                {[
                  { icon: ShieldCheck, text: 'SSL encrypted checkout' },
                  { icon: Truck, text: 'Free shipping to Canada' },
                  { icon: Lock, text: 'Cancel anytime, no fees' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <item.icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
