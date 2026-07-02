export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-neutral-300 border-t-neutral-900 rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-200 h-64 w-full rounded-lg mb-4" />
      <div className="bg-neutral-200 h-4 w-3/4 rounded mb-2" />
      <div className="bg-neutral-200 h-4 w-1/2 rounded" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-200 aspect-square rounded-lg mb-4" />
      <div className="bg-neutral-200 h-4 w-3/4 rounded mb-2" />
      <div className="bg-neutral-200 h-3 w-1/2 rounded mb-3" />
      <div className="bg-neutral-200 h-4 w-1/4 rounded" />
    </div>
  );
}
