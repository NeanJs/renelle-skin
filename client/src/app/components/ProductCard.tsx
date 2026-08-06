import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { microStyles } from '@/lib/design-system';

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
      <div className="relative aspect-square overflow-hidden bg-secondary mb-4">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {recommended && (
          <div className="absolute top-3 left-3 bg-foreground text-background px-3 py-1 text-xs uppercase tracking-widest transition-all" style={{ fontSize: microStyles.fontSize, letterSpacing: microStyles.letterSpacing }}>
            Best Seller
          </div>
        )}
      </div>

      {/* Card info */}
      <div>
        <p className={`${microStyles.container} mb-1`} style={{ letterSpacing: microStyles.letterSpacing }}>{tier}</p>
        <p className="text-sm font-medium mb-1 group-hover:underline underline-offset-2 transition-all">{name}</p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">{description}</p>
        <p className="text-sm">${price} <span className="text-muted-foreground text-xs">/month</span></p>
      </div>
    </Link>
  );
}
