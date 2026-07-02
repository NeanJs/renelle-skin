import { Card } from '@/app/components/ui/card';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Tag } from 'lucide-react';

interface ProductSampleProps {
  name: string;
  size: string;
  imageUrl: string;
  included?: boolean;
}

export function ProductSample({ name, size, imageUrl, included }: ProductSampleProps) {
  return (
    <Card className="overflow-hidden border-neutral-100 hover:shadow-sm transition-shadow">
      <div className="aspect-square bg-neutral-50 relative overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        {included && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-white/95 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              <span>Included in Kit</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-sm font-medium mb-1 line-clamp-1">{name}</h4>
        <p className="text-xs text-neutral-500">{size}</p>
      </div>
    </Card>
  );
}
