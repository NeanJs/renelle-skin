import { useState } from 'react';
import { AdminHeader } from '@/app/components/admin/AdminHeader';
import { DataTable, Column } from '@/app/components/admin/DataTable';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';
import { MoreVertical, ArrowUp, ArrowDown, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Subscription {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  tier: number;
  tierName: string;
  monthlyValue: number;
  status: 'active' | 'paused' | 'cancelled';
  renewalDate: string;
  startDate: string;
  billingCycle: number;
}

export function SubscriptionsManagement() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 'SUB-54321',
      customer: {
        name: 'Emily Brown',
        email: 'emily.brown@example.com',
      },
      tier: 2,
      tierName: 'Essential Kit',
      monthlyValue: 79,
      status: 'active',
      renewalDate: '2026-03-15',
      startDate: '2025-11-15',
      billingCycle: 4,
    },
    {
      id: 'SUB-54320',
      customer: {
        name: 'David Lee',
        email: 'david.lee@example.com',
      },
      tier: 4,
      tierName: 'Premium Kit',
      monthlyValue: 199,
      status: 'active',
      renewalDate: '2026-03-03',
      startDate: '2025-12-03',
      billingCycle: 3,
    },
    {
      id: 'SUB-54319',
      customer: {
        name: 'Lisa Garcia',
        email: 'lisa.garcia@example.com',
      },
      tier: 3,
      tierName: 'Advanced Kit',
      monthlyValue: 129,
      status: 'paused',
      renewalDate: 'Paused',
      startDate: '2025-10-20',
      billingCycle: 5,
    },
    {
      id: 'SUB-54318',
      customer: {
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
      },
      tier: 1,
      tierName: 'Starter Kit',
      monthlyValue: 49,
      status: 'active',
      renewalDate: '2026-03-10',
      startDate: '2026-01-10',
      billingCycle: 2,
    },
    {
      id: 'SUB-54317',
      customer: {
        name: 'Sarah Taylor',
        email: 'sarah.taylor@example.com',
      },
      tier: 2,
      tierName: 'Essential Kit',
      monthlyValue: 79,
      status: 'cancelled',
      renewalDate: 'Cancelled',
      startDate: '2025-09-22',
      billingCycle: 5,
    },
  ]);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  const handleUpgrade = (subscriptionId: string) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === subscriptionId && sub.tier < 4
          ? {
              ...sub,
              tier: sub.tier + 1,
              tierName: getTierName(sub.tier + 1),
              monthlyValue: getTierPrice(sub.tier + 1),
            }
          : sub
      )
    );
    toast.success('Subscription upgraded successfully');
  };

  const handleDowngrade = (subscriptionId: string) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === subscriptionId && sub.tier > 1
          ? {
              ...sub,
              tier: sub.tier - 1,
              tierName: getTierName(sub.tier - 1),
              monthlyValue: getTierPrice(sub.tier - 1),
            }
          : sub
      )
    );
    toast.success('Subscription downgraded successfully');
  };

  const handleCancelConfirm = () => {
    if (selectedSubscription) {
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === selectedSubscription.id
            ? { ...sub, status: 'cancelled', renewalDate: 'Cancelled' }
            : sub
        )
      );
      toast.success('Subscription cancelled successfully');
    }
    setCancelDialogOpen(false);
    setSelectedSubscription(null);
  };

  const getTierName = (tier: number): string => {
    const names = ['Starter Kit', 'Essential Kit', 'Advanced Kit', 'Premium Kit'];
    return names[tier - 1] || 'Unknown';
  };

  const getTierPrice = (tier: number): number => {
    const prices = [49, 79, 129, 199];
    return prices[tier - 1] || 0;
  };

  const columns: Column<Subscription>[] = [
    {
      key: 'id',
      header: 'Subscription ID',
      render: (sub) => <span className="font-mono text-sm font-medium">{sub.id}</span>,
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (sub) => (
        <div>
          <p className="font-medium">{sub.customer.name}</p>
          <p className="text-sm text-muted-foreground">{sub.customer.email}</p>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'Tier',
      render: (sub) => (
        <div>
          <Badge variant="secondary" className="mb-1">
            Tier {sub.tier}
          </Badge>
          <p className="text-sm text-muted-foreground">{sub.tierName}</p>
        </div>
      ),
    },
    {
      key: 'renewalDate',
      header: 'Renewal Date',
      render: (sub) => (
        <span className="text-sm">
          {sub.renewalDate === 'Paused' || sub.renewalDate === 'Cancelled'
            ? sub.renewalDate
            : new Date(sub.renewalDate).toLocaleDateString('en-CA', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (sub) => (
        <Badge
          variant={
            sub.status === 'active'
              ? 'default'
              : sub.status === 'paused'
              ? 'secondary'
              : 'outline'
          }
          className={sub.status === 'cancelled' ? 'border-destructive text-destructive' : ''}
        >
          {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'monthlyValue',
      header: 'Monthly Value',
      align: 'right',
      render: (sub) => <span className="font-medium">${sub.monthlyValue}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (sub) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sub.status === 'active' && sub.tier < 4 && (
              <DropdownMenuItem onClick={() => handleUpgrade(sub.id)}>
                <ArrowUp className="h-4 w-4 mr-2" />
                Upgrade Tier
              </DropdownMenuItem>
            )}
            {sub.status === 'active' && sub.tier > 1 && (
              <DropdownMenuItem onClick={() => handleDowngrade(sub.id)}>
                <ArrowDown className="h-4 w-4 mr-2" />
                Downgrade Tier
              </DropdownMenuItem>
            )}
            {sub.status === 'active' && (
              <DropdownMenuItem
                onClick={() => {
                  setSelectedSubscription(sub);
                  setCancelDialogOpen(true);
                }}
                className="text-destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Subscription
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const activeCount = subscriptions.filter((s) => s.status === 'active').length;
  const totalMRR = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + s.monthlyValue, 0);

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Subscriptions" searchPlaceholder="Search subscriptions..." />

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
            <p className="text-sm text-blue-900/70 mb-1">Active Subscriptions</p>
            <p className="text-3xl font-semibold text-blue-900">{activeCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200">
            <p className="text-sm text-green-900/70 mb-1">Monthly Recurring Revenue</p>
            <p className="text-3xl font-semibold text-green-900">${totalMRR.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200">
            <p className="text-sm text-purple-900/70 mb-1">Average Value</p>
            <p className="text-3xl font-semibold text-purple-900">
              ${activeCount > 0 ? Math.round(totalMRR / activeCount) : 0}
            </p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={subscriptions}
          keyExtractor={(sub) => sub.id}
          emptyMessage="No subscriptions found."
          actions={
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Subscription Management</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage recurring subscriptions and billing
                </p>
              </div>
              <Button variant="outline">Export Data</Button>
            </div>
          }
        />
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this subscription? The customer will retain access
              until the end of their current billing period.
              {selectedSubscription && (
                <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                  <p className="text-sm font-medium text-foreground">
                    {selectedSubscription.customer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedSubscription.tierName}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Active</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelConfirm} className="bg-destructive">
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
