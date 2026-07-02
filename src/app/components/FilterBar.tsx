import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Button } from '@/app/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterBarProps {
  onSortChange: (value: string) => void;
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

export interface FilterState {
  priceRange?: string;
  tier?: string;
}

export function FilterBar({ onSortChange, onFilterChange, activeFilters }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = activeFilters.priceRange || activeFilters.tier;

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="border-border hover:bg-secondary"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 bg-foreground text-background text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {Object.keys(activeFilters).length}
            </span>
          )}
        </Button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-600">Sort by:</span>
          <Select onValueChange={onSortChange} defaultValue="recommended">
            <SelectTrigger className="w-44 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="border border-border p-6 bg-white animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold">Filter Kits</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm hover:bg-secondary"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-3 block">Price Range</label>
              <Select
                value={activeFilters.priceRange || 'all'}
                onValueChange={(value) =>
                  onFilterChange({
                    ...activeFilters,
                    priceRange: value === 'all' ? undefined : value,
                  })
                }
              >
                <SelectTrigger className="border-border">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-150">$100 - $150</SelectItem>
                  <SelectItem value="150+">$150+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tier */}
            <div>
              <label className="text-sm font-medium mb-3 block">Subscription Tier</label>
              <Select
                value={activeFilters.tier || 'all'}
                onValueChange={(value) =>
                  onFilterChange({
                    ...activeFilters,
                    tier: value === 'all' ? undefined : value,
                  })
                }
              >
                <SelectTrigger className="border-border">
                  <SelectValue placeholder="All Tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="Starter">Starter</SelectItem>
                  <SelectItem value="Essential">Essential</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Count */}
            <div>
              <label className="text-sm font-medium mb-3 block">Products Included</label>
              <Select defaultValue="all">
                <SelectTrigger className="border-border">
                  <SelectValue placeholder="Any Amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Amount</SelectItem>
                  <SelectItem value="1-3">1-3 Products</SelectItem>
                  <SelectItem value="4-6">4-6 Products</SelectItem>
                  <SelectItem value="7+">7+ Products</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-neutral-600">Active filters:</span>
          {activeFilters.priceRange && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                onFilterChange({ ...activeFilters, priceRange: undefined })
              }
              className="h-7 text-xs bg-secondary hover:bg-secondary/80"
            >
              {activeFilters.priceRange === '0-50'
                ? 'Under $50'
                : activeFilters.priceRange === '50-100'
                ? '$50-$100'
                : activeFilters.priceRange === '100-150'
                ? '$100-$150'
                : '$150+'}
              <X className="w-3 h-3 ml-1.5" />
            </Button>
          )}
          {activeFilters.tier && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onFilterChange({ ...activeFilters, tier: undefined })}
              className="h-7 text-xs bg-secondary hover:bg-secondary/80"
            >
              {activeFilters.tier}
              <X className="w-3 h-3 ml-1.5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
