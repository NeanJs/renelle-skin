import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { cn } from '@/app/components/ui/utils';
import { Button } from '@/app/components/ui/button';
import { Menu } from 'lucide-react';

export function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'md:block',
          mobileMenuOpen ? 'block' : 'hidden md:block'
        )}
      >
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <main
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64',
          'pt-16 md:pt-0' // Add padding on mobile for the menu button
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}