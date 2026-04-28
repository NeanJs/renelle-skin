import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { subscriptionKits } from '../../app/data/subscription-kits';
import { Button } from '../../app/components/ui/button';
import { Card } from '../../app/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../app/components/ui/accordion';
import { Check, Package, Truck, CreditCard, Calendar, Shield, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../../app/components/figma/ImageWithFallback';
import { ProductSample } from '../../app/components/ProductSample';
import { LoadingSpinner } from '../../app/components/Loading';

// Kit images
const kitImages: Record<string, string> = {
  starter: 'https://images.unsplash.com/photo-1652464945507-687e44a1017a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNsZWFuc2VyJTIwYm90dGxlJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2OTk2ODE3MXww&ixlib=rb-4.1.0&q=80&w=1080',
  essential: 'https://images.unsplash.com/photo-1617030557822-c8c35f07c60b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3RzJTIwbmV1dHJhbCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY5OTY4MTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  advanced: 'https://images.unsplash.com/photo-1677735476292-0fc57ab097b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ1bSUyMGRyb3BwZXIlMjBib3R0bGUlMjBtaW5pbWFsJTIwd2hpdGV8ZW58MXx8fHwxNzY5OTY4MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  premium: 'https://images.unsplash.com/photo-1764694187721-a5035d777fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZSUyMGJvdHRsZSUyMHN0dWRpb3xlbnwxfHx8fDE3Njk5NjgxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

// Product sample images
const productImages: string[] = [
  'https://images.unsplash.com/photo-1763503836825-97f5450d155a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2lzdHVyaXplciUyMGNyZWFtJTIwamFyJTIwd2hpdGV8ZW58MXx8fHwxNzY5OTY4MjczfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1550572017-4b7a301b9d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwc2VydW0lMjBib3R0bGUlMjBjbGVhcnxlbnwxfHx8fDE3Njk5NjgyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1768725844772-dc834990526f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjB0dWJlJTIwc2tpbmNhcmV8ZW58MXx8fHwxNzY5OTY4Mjc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1765887986673-953fccf56464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b25lciUyMGJvdHRsZSUyMHNraW5jYXJlJTIwbWluaW1hbHxlbnwxfHx8fDE3Njk5NjgyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1655357443031-d5e0354b56e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjBjcmVhbSUyMGNvbnRhaW5lcnxlbnwxfHx8fDE3Njk5NjgyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

export function KitDetailsPage() {
  const { kitId } = useParams();
  const navigate = useNavigate();
  const kit = subscriptionKits.find((k) => k.id === kitId);
  const [billingType, setBillingType] = useState<'subscription' | 'onetime'>('subscription');
  const [isAdding, setIsAdding] = useState(false);

  if (!kit) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-2">Kit Not Found</h2>
          <Button asChild>
            <Link to="/subscriptions">View All Kits</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      navigate('/checkout', { state: { kit } });
    }, 800);
  };

  const oneTimePrice = Math.round(kit.price * 1.15); // 15% markup for one-time

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <section className="bg-white py-6 border-b border-neutral-100">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/subscriptions')}
            className="hover:bg-neutral-100 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Kits
          </Button>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square rounded-lg overflow-hidden bg-neutral-50 mb-4">
                <ImageWithFallback
                  src={kitImages[kit.id]}
                  alt={kit.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[kitImages[kit.id], ...productImages.slice(0, 3)].map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg overflow-hidden bg-neutral-50 cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${kit.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24 self-start">
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-3 font-medium">
                {kit.tier} Tier
              </p>
              <h1 className="text-3xl md:text-4xl mb-4 tracking-tight">{kit.name}</h1>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">{kit.description}</p>

              {/* Pricing Toggle */}
              <div className="mb-8">
                <label className="text-sm font-medium mb-4 block">Purchase Option</label>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setBillingType('subscription')}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      billingType === 'subscription'
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                        Subscription
                      </span>
                      {billingType === 'subscription' && (
                        <Check className="w-4 h-4 text-neutral-900" />
                      )}
                    </div>
                    <div className="text-2xl font-semibold mb-1">${kit.price}</div>
                    <div className="text-xs text-neutral-600">per month</div>
                  </button>

                  <button
                    onClick={() => setBillingType('onetime')}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      billingType === 'onetime'
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                        One-Time
                      </span>
                      {billingType === 'onetime' && (
                        <Check className="w-4 h-4 text-neutral-900" />
                      )}
                    </div>
                    <div className="text-2xl font-semibold mb-1">${oneTimePrice}</div>
                    <div className="text-xs text-neutral-600">single purchase</div>
                  </button>
                </div>
                <p className="text-sm text-neutral-600">
                  {billingType === 'subscription'
                    ? 'Billed monthly. Cancel anytime, no fees.'
                    : 'One-time purchase with no recurring charges.'}
                </p>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full h-14 bg-neutral-900 hover:bg-neutral-800 text-base mb-6"
              >
                {isAdding ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    <span>Adding to Cart...</span>
                  </div>
                ) : (
                  `Subscribe for $${kit.price}/month`
                )}
              </Button>

              {/* Trust Badges */}
              <div className="space-y-3 py-6 border-t border-neutral-100">
                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                  <span className="text-neutral-600">
                    {billingType === 'subscription'
                      ? 'Delivered monthly on the same day'
                      : 'Ships within 2-3 business days'}
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Truck className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                  <span className="text-neutral-600">Free shipping across Canada</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <CreditCard className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                  <span className="text-neutral-600">Secure payment processing</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Shield className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                  <span className="text-neutral-600">Cancel anytime, no commitment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Samples */}
      <section className="py-16 md:py-24 bg-neutral-50 border-y border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl mb-4 tracking-tight">What's Inside Your Kit</h2>
              <p className="text-lg text-neutral-600">
                {kit.products.length} premium products delivered monthly
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {kit.products.map((product, index) => (
                <ProductSample
                  key={index}
                  name={product.name}
                  size={product.size}
                  imageUrl={productImages[index % productImages.length]}
                  included
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details Sections */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Subscription Benefits */}
            <Card className="p-8 md:p-10 border-neutral-100">
              <h2 className="text-2xl mb-6 tracking-tight">Subscription Benefits</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kit.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 text-neutral-900 flex-shrink-0" />
                    <span className="text-neutral-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* FAQ */}
            <Card className="p-8 md:p-10 border-neutral-100">
              <h2 className="text-2xl mb-6 tracking-tight">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="billing">
                  <AccordionTrigger>How does monthly billing work?</AccordionTrigger>
                  <AccordionContent className="text-neutral-600 leading-relaxed">
                    You'll be charged ${kit.price} CAD each month on the same day you
                    subscribe. Your subscription automatically renews unless you cancel.
                    You can view your billing history in your account dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>When will I receive my kit?</AccordionTrigger>
                  <AccordionContent className="text-neutral-600 leading-relaxed">
                    Your first kit ships within 2-3 business days. Subsequent kits ship
                    on the same day each month. All shipments include free tracking and
                    typically arrive within 5-7 business days across Canada.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="cancel">
                  <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
                  <AccordionContent className="text-neutral-600 leading-relaxed">
                    Yes! You can pause or cancel your subscription at any time from your
                    account dashboard. Changes take effect for your next billing cycle.
                    No fees or penalties.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="change">
                  <AccordionTrigger>Can I change my subscription tier?</AccordionTrigger>
                  <AccordionContent className="text-neutral-600 leading-relaxed">
                    Absolutely. You can upgrade or downgrade your subscription tier at
                    any time. The change will be reflected in your next monthly shipment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 md:py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl mb-12 tracking-tight">Why Renelle Skin?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl mb-4">🇨🇦</div>
                <h3 className="text-base font-semibold mb-2">Canadian Brand</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Proudly formulated and shipped from Canada
                </p>
              </div>
              <div>
                <div className="text-3xl mb-4">✨</div>
                <h3 className="text-base font-semibold mb-2">Premium Quality</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Dermatologist-tested, clinically proven formulations
                </p>
              </div>
              <div>
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-base font-semibold mb-2">Secure & Safe</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Bank-level encryption protects your information
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}