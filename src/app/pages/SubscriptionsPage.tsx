import { Link } from 'react-router-dom';
import { useState } from 'react';
import { subscriptionKits } from '@/app/data/subscription-kits';
import { Button } from '@/app/components/ui/button';
import { Check } from 'lucide-react';
import { ProductCard } from '@/app/components/ProductCard';
import { FilterBar, FilterState } from '@/app/components/FilterBar';

const kitImages: Record<string, string> = {
  starter: 'https://images.unsplash.com/photo-1652464945507-687e44a1017a?w=800&h=800&fit=crop&auto=format',
  essential: 'https://images.unsplash.com/photo-1617030557822-c8c35f07c60b?w=800&h=800&fit=crop&auto=format',
  advanced: 'https://images.unsplash.com/photo-1677735476292-0fc57ab097b2?w=800&h=800&fit=crop&auto=format',
  premium: 'https://images.unsplash.com/photo-1764694187721-a5035d777fdf?w=800&h=800&fit=crop&auto=format',
};

export function SubscriptionsPage() {
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState<FilterState>({});

  let filteredKits = [...subscriptionKits];

  if (filters.priceRange) {
    filteredKits = filteredKits.filter((kit) => {
      if (filters.priceRange === '0-50') return kit.price < 50;
      if (filters.priceRange === '50-100') return kit.price >= 50 && kit.price < 100;
      if (filters.priceRange === '100-150') return kit.price >= 100 && kit.price < 150;
      if (filters.priceRange === '150+') return kit.price >= 150;
      return true;
    });
  }

  if (filters.tier) {
    filteredKits = filteredKits.filter((kit) => kit.tier === filters.tier);
  }

  if (sortBy === 'price-low') filteredKits.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filteredKits.sort((a, b) => b.price - a.price);
  else if (sortBy === 'name') filteredKits.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === 'recommended') filteredKits.sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));

  return (
    <div className="flex-1 bg-white">

      {/* Page Header */}
      <section className="border-b border-border py-16 md:py-20 bg-[#F7F6F4]">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4" style={{ letterSpacing: '0.16em' }}>Monthly Skincare</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Subscription Kits</h1>
          <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
            Choose the monthly kit that fits your skincare goals. Cancel or upgrade anytime.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-10">
            <FilterBar
              onSortChange={setSortBy}
              onFilterChange={setFilters}
              activeFilters={filters}
            />
          </div>

          {filteredKits.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4 text-sm">No kits match your current filters.</p>
              <Button variant="outline" onClick={() => setFilters({})} className="rounded-none border-foreground text-xs uppercase tracking-widest" style={{ letterSpacing: '0.1em' }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {filteredKits.map((kit) => (
                <ProductCard
                  key={kit.id}
                  id={kit.id}
                  name={kit.name}
                  tier={kit.tier}
                  price={kit.price}
                  description={kit.description}
                  imageUrl={kitImages[kit.id]}
                  recommended={kit.recommended}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-20 border-t border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3" style={{ letterSpacing: '0.16em' }}>Detailed Breakdown</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}>Compare All Kits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subscriptionKits.map((kit) => (
              <div key={kit.id} className="bg-white border border-border p-8 relative">
                {kit.recommended && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-foreground" />
                )}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2" style={{ letterSpacing: '0.1em', fontSize: '0.65rem' }}>{kit.tier}</p>
                    <h3 className="text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{kit.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-semibold">${kit.price}</span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                    {kit.recommended && (
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider" style={{ fontSize: '0.6rem', letterSpacing: '0.08em' }}>Most Popular</p>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{kit.description}</p>

                <ul className="space-y-2.5 mb-8">
                  {kit.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-foreground" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-8">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3" style={{ letterSpacing: '0.08em', fontSize: '0.65rem' }}>Included Products</p>
                  <div className="space-y-1.5">
                    {kit.products.slice(0, 5).map((product, i) => (
                      <p key={i} className="text-xs text-muted-foreground">
                        — {product.name} <span className="text-muted-foreground/60">({product.size})</span>
                      </p>
                    ))}
                    {kit.products.length > 5 && (
                      <p className="text-xs text-muted-foreground italic">+ {kit.products.length - 5} more products</p>
                    )}
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full h-11 rounded-none text-xs uppercase tracking-widest bg-foreground text-background hover:bg-foreground/85"
                  style={{ letterSpacing: '0.1em' }}
                >
                  <Link to={`/subscriptions/${kit.id}`}>View Details</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Made in Canada', sub: 'Premium formulations crafted locally' },
              { label: 'Secure Payments', sub: 'Bank-level encryption on all transactions' },
              { label: 'Free Shipping', sub: 'Delivered to your door every month' },
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
