import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { subscriptionKits } from '@/app/data/subscription-kits';
import { Button } from '@/app/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { Check, Package, Truck, CreditCard, Calendar, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ProductSample } from '@/app/components/ProductSample';
import { LoadingSpinner } from '@/app/components/Loading';
import { getKitImage, getProductImage } from '@/app/config/images';

export function KitDetailsPage() {
  const { kitId } = useParams();
  const navigate = useNavigate();
  const kit = subscriptionKits.find((k) => k.id === kitId);
  const [billingType, setBillingType] = useState<'subscription' | 'onetime'>('subscription');
  const [selectedImg, setSelectedImg] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  if (!kit) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Kit Not Found</h2>
          <Button asChild className="rounded-none bg-foreground text-background hover:bg-foreground/85">
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

  const oneTimePrice = Math.round(kit.price * 1.15);
  const galleryImages = [
    getKitImage(kit.id, 'large'),
    getProductImage(0, 'small'),
    getProductImage(1, 'small'),
    getProductImage(2, 'small'),
  ];

  return (
    <div className="flex-1 bg-white">

      {/* Breadcrumb */}
      <div className="border-b border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6 py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/subscriptions" className="hover:text-foreground transition-colors">Subscription Kits</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{kit.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square overflow-hidden bg-[#F7F6F4] mb-3">
                <ImageWithFallback
                  src={galleryImages[selectedImg]}
                  alt={kit.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`aspect-square overflow-hidden bg-[#F7F6F4] transition-all ${selectedImg === idx ? 'ring-1 ring-foreground' : 'opacity-60 hover:opacity-90'}`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${kit.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-28 self-start">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3" style={{ letterSpacing: '0.14em', fontSize: '0.65rem' }}>
                {kit.tier} Tier
              </p>
              <h1 className="mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>{kit.name}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{kit.description}</p>

              {/* Billing Toggle */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3" style={{ letterSpacing: '0.1em', fontSize: '0.65rem' }}>Purchase Option</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBillingType('subscription')}
                    className={`p-4 border text-left transition-all ${
                      billingType === 'subscription' ? 'border-foreground' : 'border-border hover:border-foreground/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>Subscription</span>
                      {billingType === 'subscription' && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-xl font-semibold mb-0.5">${kit.price}</div>
                    <div className="text-xs text-muted-foreground">per month</div>
                  </button>

                  <button
                    onClick={() => setBillingType('onetime')}
                    className={`p-4 border text-left transition-all ${
                      billingType === 'onetime' ? 'border-foreground' : 'border-border hover:border-foreground/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>One-Time</span>
                      {billingType === 'onetime' && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-xl font-semibold mb-0.5">${oneTimePrice}</div>
                    <div className="text-xs text-muted-foreground">single purchase</div>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {billingType === 'subscription' ? 'Billed monthly. Cancel anytime, no fees.' : 'One-time purchase with no recurring charges.'}
                </p>
              </div>

              {/* CTA */}
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full h-13 rounded-none bg-foreground text-background hover:bg-foreground/85 text-xs uppercase tracking-widest mb-4"
                style={{ letterSpacing: '0.12em', height: '52px' }}
              >
                {isAdding ? (
                  <span className="flex items-center gap-2"><LoadingSpinner size="sm" /> Adding...</span>
                ) : (
                  `Subscribe — $${kit.price}/month`
                )}
              </Button>

              {/* Trust Points */}
              <div className="space-y-3 py-6 border-t border-border">
                {[
                  { icon: Calendar, text: billingType === 'subscription' ? 'Delivered monthly on the same day' : 'Ships within 2–3 business days' },
                  { icon: Truck, text: 'Free shipping across Canada' },
                  { icon: CreditCard, text: 'Secure payment processing' },
                  { icon: Shield, text: 'Cancel anytime, no commitment' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-16 md:py-20 border-t border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3" style={{ letterSpacing: '0.16em' }}>Kit Contents</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>What's Inside Your Kit</h2>
            <p className="text-sm text-muted-foreground mt-3">{kit.products.length} premium products delivered monthly</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {kit.products.map((product, index) => (
              <ProductSample
                key={index}
                name={product.name}
                size={product.size}
                imageUrl={getProductImage(index, 'small')}
                included
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + FAQ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl space-y-12">

          {/* Subscription Benefits */}
          <div className="border border-border p-8 md:p-10">
            <h2 className="mb-8" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>Subscription Benefits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kit.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 text-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="border border-border p-8 md:p-10">
            <h2 className="mb-8" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  value: 'billing',
                  q: 'How does monthly billing work?',
                  a: `You'll be charged $${kit.price} CAD each month on the same day you subscribe. Your subscription automatically renews unless you cancel. View billing history in your account dashboard.`,
                },
                {
                  value: 'shipping',
                  q: 'When will I receive my kit?',
                  a: 'Your first kit ships within 2–3 business days. Subsequent kits ship on the same day each month. All shipments include free tracking and typically arrive within 5–7 business days across Canada.',
                },
                {
                  value: 'cancel',
                  q: 'Can I cancel anytime?',
                  a: 'Yes. Pause or cancel your subscription at any time from your account dashboard. Changes take effect for your next billing cycle. No fees or penalties.',
                },
                {
                  value: 'change',
                  q: 'Can I change my subscription tier?',
                  a: 'Absolutely. Upgrade or downgrade your tier at any time. The change will be reflected in your next monthly shipment.',
                },
              ].map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="text-sm font-medium text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Why Dermera */}
      <section className="py-16 border-t border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="mb-12" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>Why Dermera Labs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Canadian Brand', sub: 'Proudly formulated and shipped from Canada' },
              { label: 'Premium Quality', sub: 'Dermatologist-tested, clinically proven formulations' },
              { label: 'Secure & Safe', sub: 'Bank-level encryption protects your information' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ letterSpacing: '0.1em', fontSize: '0.65rem' }}>{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
