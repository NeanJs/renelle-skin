import { Link } from 'react-router-dom';
import { Button } from '../../app/components/ui/button';
import { Card } from '../../app/components/ui/card';
import { Calendar, Truck, Shield, Check } from 'lucide-react';
import { ImageWithFallback } from '../../app/components/figma/ImageWithFallback';

export function LandingPage() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <h1 className="text-4xl md:text-6xl mb-8 tracking-tight leading-tight">
                Simplified Skincare,
                <br />
                Delivered Monthly
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed">
                Expertly curated skincare kits tailored to your needs.
                Premium Canadian formulations delivered to your door every month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-neutral-900 hover:bg-neutral-800 h-12 px-8 text-base">
                  <Link to="/subscriptions">Subscribe Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-neutral-300 hover:bg-neutral-50">
                  <Link to="/subscriptions">View Kits</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-100 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629732046662-2f03fde8f689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHJvdXRpbmUlMjBwcm9kdWN0cyUyMGxpZmVzdHlsZSUyMGNsZWFufGVufDF8fHx8MTc2OTk2ODM2MXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Renelle Skin Skincare Products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <Card className="p-8 text-center border-neutral-100 hover:shadow-sm transition-shadow">
              <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-7 h-7 text-neutral-700" />
              </div>
              <h3 className="text-base font-semibold mb-3">Monthly Delivery</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Fresh products delivered on your schedule
              </p>
            </Card>
            <Card className="p-8 text-center border-neutral-100 hover:shadow-sm transition-shadow">
              <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-7 h-7 text-neutral-700" />
              </div>
              <h3 className="text-base font-semibold mb-3">Free Shipping</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Complimentary delivery across Canada
              </p>
            </Card>
            <Card className="p-8 text-center border-neutral-100 hover:shadow-sm transition-shadow">
              <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-7 h-7 text-neutral-700" />
              </div>
              <h3 className="text-base font-semibold mb-3">Canadian Made</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Premium formulations crafted in Canada
              </p>
            </Card>
            <Card className="p-8 text-center border-neutral-100 hover:shadow-sm transition-shadow">
              <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-7 h-7 text-neutral-700" />
              </div>
              <h3 className="text-base font-semibold mb-3">Cancel Anytime</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                No commitments, pause or cancel anytime
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscription Overview */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl mb-6 tracking-tight leading-tight">
              Four Tiers, One Goal
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Choose the subscription kit that fits your skincare journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Starter', price: 49, products: '3 products' },
              { name: 'Essential', price: 79, products: '5 products', popular: true },
              { name: 'Advanced', price: 129, products: '7 products' },
              { name: 'Premium', price: 199, products: '10 products' },
            ].map((kit) => (
              <Card
                key={kit.name}
                className={`p-8 relative transition-all hover:shadow-md ${
                  kit.popular ? 'border-2 border-neutral-900 shadow-sm' : 'border-neutral-100'
                }`}
              >
                {kit.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-neutral-900 text-white text-xs font-medium px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-3 font-medium">{kit.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-semibold">${kit.price}</span>
                    <span className="text-neutral-600">/month</span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-8">{kit.products}</p>
                  <Button
                    asChild
                    variant={kit.popular ? 'default' : 'outline'}
                    className={
                      kit.popular
                        ? 'w-full bg-neutral-900 hover:bg-neutral-800 h-11'
                        : 'w-full border-neutral-300 hover:bg-neutral-50 h-11'
                    }
                  >
                    <Link to={`/subscriptions/${kit.name.toLowerCase()}`}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button asChild size="lg" variant="outline" className="h-12 px-8 border-neutral-300 hover:bg-neutral-50">
              <Link to="/subscriptions">Compare All Kits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl mb-6 tracking-tight leading-tight">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Simple, transparent, and designed for your convenience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-semibold">
                1
              </div>
              <h3 className="text-base font-semibold mb-3">Choose Your Kit</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Select from our four subscription tiers based on your skincare needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-semibold">
                2
              </div>
              <h3 className="text-base font-semibold mb-3">Receive Monthly</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Get your curated products delivered every month with free shipping
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-semibold">
                3
              </div>
              <h3 className="text-base font-semibold mb-3">Manage Easily</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Update, pause, or cancel your subscription anytime from your account
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-neutral-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl mb-6 tracking-tight leading-tight">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of Canadians who trust Renelle Skin for their daily skincare routine
          </p>
          <Button asChild size="lg" variant="secondary" className="h-12 px-8 bg-white text-neutral-900 hover:bg-neutral-100">
            <Link to="/subscriptions">Subscribe Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}