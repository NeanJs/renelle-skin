import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { cn } from '@/app/components/ui/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  description?: string;
  loading?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = 'text-primary',
  change,
  description,
  loading = false,
}: StatCardProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-secondary rounded-xl" />
            <div className="w-5 h-5 bg-secondary rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-secondary rounded w-24" />
            <div className="h-8 bg-secondary rounded w-32" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', iconColor.replace('text-', 'bg-') + '/10')}>
          <Icon className={cn('w-6 h-6', iconColor)} />
        </div>
        {change && (
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            change.type === 'increase' && 'text-green-600',
            change.type === 'decrease' && 'text-red-600',
            change.type === 'neutral' && 'text-muted-foreground'
          )}>
            {change.type === 'increase' && <TrendingUp className="w-4 h-4" />}
            {change.type === 'decrease' && <TrendingDown className="w-4 h-4" />}
            {change.value}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        )}
      </div>
    </Card>
  );
}
