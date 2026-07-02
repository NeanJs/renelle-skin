import { NavLink } from 'react-router-dom';
import { cn } from '@/app/components/ui/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  RefreshCcw,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ExternalLink,
} from 'lucide-react';
import { getBrandConfig } from '@/app/config/brand';
import { Button } from '@/app/components/ui/button';

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Subscriptions', href: '/admin/subscriptions', icon: RefreshCcw },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar({ collapsed, onToggleCollapse, onNavigate }: AdminSidebarProps) {
  const brandConfig = getBrandConfig();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-white border-r border-border transition-all duration-300 flex flex-col z-50',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="h-16 border-b border-border flex items-center justify-between px-6">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-semibold">
                {brandConfig.brandName.charAt(0)}
              </span>
            </div>
            <span className="font-semibold text-foreground">{brandConfig.brandName}</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={cn('h-8 w-8 p-0', collapsed && 'mx-auto')}
        >
          <ChevronLeft
            className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                end={item.exact}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                    'hover:bg-secondary hover:text-secondary-foreground',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground',
                    collapsed && 'justify-center'
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* View Store Link */}
        <div className="mt-4 px-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
              'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
              collapsed && 'justify-center'
            )}
          >
            <ExternalLink className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>View Store</span>}
          </a>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <button
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full',
            'hover:bg-destructive/10 hover:text-destructive text-muted-foreground',
            collapsed && 'justify-center'
          )}
          onClick={() => {
            // Handle logout
            window.location.href = '/';
          }}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}