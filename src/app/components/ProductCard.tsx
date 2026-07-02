import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ProductCardProps {
  id: string;
  name: string;
  tier: string;
  price: number;
  description: string;
  imageUrl: string;
  recommended?: boolean;
}

export function ProductCard({ id, name, tier, price, description, imageUrl, recommended }: ProductCardProps) {
  return (
    <Link to={`/subscriptions/${id}`} className="group block">
      {/* Square image */}
      <div className="relative aspect-square overflow-hidden bg-[#F7F6F4] mb-4">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {recommended && (
          <div className="absolute top-3 left-3 bg-foreground text-background px-3 py-1 text-xs uppercase tracking-widest" style={{ fontSize: '0.6rem', letterSpacing: '0.08em' }}>
            Best Seller
          </div>
        )}
      </div>

      {/* Card info */}
      <div>
        <p className="text-muted-foreground mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{tier}</p>
        <p className="text-sm font-medium mb-1 group-hover:underline underline-offset-2 transition-all">{name}</p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">{description}</p>
        <p className="text-sm">${price} <span className="text-muted-foreground text-xs">/month</span></p>
      </div>
    </Link>
  );
}
