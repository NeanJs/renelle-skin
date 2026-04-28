import { useLocation, Link } from 'react-router-dom';
import { Button } from '../../app/components/ui/button';
import { Card } from '../../app/components/ui/card';
import { CheckCircle, Package, Calendar, CreditCard } from 'lucide-react';

export function ConfirmationPage() {
  const location = useLocation();
  const kit = location.state?.kit;

  if (!kit) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">No order found</h2>
          <Button asChild>
            <Link to="/subscriptions">View Subscriptions</Link>
          </Button>
        </div>
      </div>
    );
  }

  const nextBillingDate = new Date();
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
  const formattedDate = nextBillingDate.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex-1 bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="p-8 text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl mb-2">Subscription Confirmed!</h1>
            <p className="text-neutral-600 mb-6">
              Thank you for subscribing to Renelle Skin
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg inline-block">
              <p className="text-sm text-neutral-600 mb-1">Order Number</p>
              <p className="text-xl tracking-wide">#DL-{Math.floor(Math.random() * 100000)}</p>
            </div>
          </Card>

          {/* Subscription Summary */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl mb-4">Subscription Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 mt-0.5 text-neutral-600" />
                <div className="flex-1">
                  <p className="text-sm mb-1">Subscription Plan</p>
                  <p>{kit.name}</p>
                  <p className="text-sm text-neutral-600">{kit.tier} Tier</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 mt-0.5 text-neutral-600" />
                <div className="flex-1">
                  <p className="text-sm mb-1">Monthly Charge</p>
                  <p>${(kit.price * 1.13).toFixed(2)} CAD</p>
                  <p className="text-sm text-neutral-600">
                    (includes ${(kit.price * 0.13).toFixed(2)} HST)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 mt-0.5 text-neutral-600" />
                <div className="flex-1">
                  <p className="text-sm mb-1">Next Billing Date</p>
                  <p>{formattedDate}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* What Happens Next */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl mb-4">What Happens Next?</h2>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                  1
                </div>
                <div>
                  <p className="mb-1">Confirmation Email</p>
                  <p className="text-sm text-neutral-600">
                    You'll receive an order confirmation email within the next few minutes
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                  2
                </div>
                <div>
                  <p className="mb-1">Kit Preparation</p>
                  <p className="text-sm text-neutral-600">
                    Your first kit will be prepared and shipped within 2-3 business days
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                  3
                </div>
                <div>
                  <p className="mb-1">Delivery</p>
                  <p className="text-sm text-neutral-600">
                    Expect your first kit to arrive within 5-7 business days with free tracking
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                  4
                </div>
                <div>
                  <p className="mb-1">Monthly Renewal</p>
                  <p className="text-sm text-neutral-600">
                    Your subscription automatically renews on {formattedDate}
                  </p>
                </div>
              </li>
            </ol>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1 bg-neutral-900 hover:bg-neutral-800">
              <Link to="/account">View My Account</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>

          {/* Help */}
          <Card className="p-6 mt-6 bg-neutral-50 border-neutral-200">
            <p className="text-sm text-neutral-600 text-center">
              Questions about your subscription?{' '}
              <a href="#" className="text-neutral-900 underline">
                Contact our support team
              </a>{' '}
              or visit your{' '}
              <Link to="/account" className="text-neutral-900 underline">
                account dashboard
              </Link>
              .
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
