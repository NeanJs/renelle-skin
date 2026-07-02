import { useState } from 'react';
import { AdminHeader } from '@/app/components/admin/AdminHeader';
import { StatCard } from '@/app/components/admin/StatCard';
import {
  DollarSign,
  RefreshCcw,
  ShoppingCart,
  XCircle,
  Server,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { getBrandConfig } from '@/app/config/brand';

export function DashboardOverview() {
  const brandConfig = getBrandConfig();
  const [loading] = useState(false);

  // Mock data
  const stats = {
    revenue: 98340,
    revenueChange: '+18.2%',
    subscriptions: 1247,
    subscriptionsChange: '+12.4%',
    ordersToday: 34,
    failedPayments: 3,
    posStatus: 'Connected',
  };

  const recentActivity = [
    {
      id: '1',
      type: 'order',
      message: 'New order #DL-12345 from John Doe',
      time: '2 min ago',
      status: 'success',
    },
    {
      id: '2',
      type: 'payment',
      message: 'Payment failed for subscription SUB-54320',
      time: '15 min ago',
      status: 'error',
    },
    {
      id: '3',
      type: 'subscription',
      message: 'New subscription: Essential Kit',
      time: '32 min ago',
      status: 'success',
    },
    {
      id: '4',
      type: 'inventory',
      message: 'Low stock alert: Retinol Serum',
      time: '1 hour ago',
      status: 'warning',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Dashboard" searchPlaceholder="Search orders, customers..." />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Monthly Revenue"
            value={`$${(stats.revenue / 1000).toFixed(1)}k`}
            icon={DollarSign}
            iconColor="text-green-600"
            change={{
              value: stats.revenueChange,
              type: 'increase',
            }}
            loading={loading}
          />
          <StatCard
            title="Active Subscriptions"
            value={stats.subscriptions.toLocaleString()}
            icon={RefreshCcw}
            iconColor="text-blue-600"
            change={{
              value: stats.subscriptionsChange,
              type: 'increase',
            }}
            loading={loading}
          />
          <StatCard
            title="Orders Today"
            value={stats.ordersToday}
            icon={ShoppingCart}
            iconColor="text-purple-600"
            description="Last updated: just now"
            loading={loading}
          />
          <StatCard
            title="Failed Payments"
            value={stats.failedPayments}
            icon={XCircle}
            iconColor="text-red-600"
            description="Requires attention"
            loading={loading}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success'
                        ? 'bg-green-500'
                        : activity.status === 'error'
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">POS Integration</p>
                    <p className="text-xs text-muted-foreground">Last sync: 5 min ago</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-600">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Payment Gateway</p>
                    <p className="text-xs text-muted-foreground">All systems operational</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-600">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Analytics</p>
                    <p className="text-xs text-muted-foreground">Tracking enabled</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-600">
                  Active
                </Badge>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6" size="sm">
              View System Settings
            </Button>
          </Card>
        </div>

        {/* Quick Stats Table */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Top Selling Kits (This Month)</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kit Name</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead className="text-right">Subscriptions</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Essential Kit</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Tier 2</Badge>
                  </TableCell>
                  <TableCell className="text-right">487</TableCell>
                  <TableCell className="text-right">$38,473</TableCell>
                  <TableCell className="text-right text-green-600">+12.4%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Premium Kit</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Tier 4</Badge>
                  </TableCell>
                  <TableCell className="text-right">312</TableCell>
                  <TableCell className="text-right">$62,088</TableCell>
                  <TableCell className="text-right text-green-600">+18.7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Advanced Kit</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Tier 3</Badge>
                  </TableCell>
                  <TableCell className="text-right">289</TableCell>
                  <TableCell className="text-right">$37,281</TableCell>
                  <TableCell className="text-right text-green-600">+8.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Starter Kit</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Tier 1</Badge>
                  </TableCell>
                  <TableCell className="text-right">159</TableCell>
                  <TableCell className="text-right">$7,791</TableCell>
                  <TableCell className="text-right text-yellow-600">+2.1%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
