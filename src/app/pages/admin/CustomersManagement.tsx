import { AdminHeader } from '@/app/components/admin/AdminHeader';
import { DataTable, Column } from '@/app/components/admin/DataTable';
import { Badge } from '@/app/components/ui/badge';
import { useState } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  subscriptionStatus: 'active' | 'paused' | 'cancelled' | 'none';
  totalOrders: number;
  lifetimeValue: number;
  joinDate: string;
}

export function CustomersManagement() {
  const [customers] = useState<Customer[]>([
    {
      id: 'CUST-001',
      name: 'Emily Brown',
      email: 'emily.brown@example.com',
      subscriptionStatus: 'active',
      totalOrders: 12,
      lifetimeValue: 948,
      joinDate: '2025-11-15',
    },
    {
      id: 'CUST-002',
      name: 'David Lee',
      email: 'david.lee@example.com',
      subscriptionStatus: 'active',
      totalOrders: 8,
      lifetimeValue: 1592,
      joinDate: '2025-12-03',
    },
    {
      id: 'CUST-003',
      name: 'Lisa Garcia',
      email: 'lisa.garcia@example.com',
      subscriptionStatus: 'paused',
      totalOrders: 15,
      lifetimeValue: 1935,
      joinDate: '2025-10-20',
    },
    {
      id: 'CUST-004',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      subscriptionStatus: 'active',
      totalOrders: 5,
      lifetimeValue: 245,
      joinDate: '2026-01-10',
    },
    {
      id: 'CUST-005',
      name: 'Sarah Taylor',
      email: 'sarah.taylor@example.com',
      subscriptionStatus: 'cancelled',
      totalOrders: 18,
      lifetimeValue: 1422,
      joinDate: '2025-09-22',
    },
  ]);

  const columns: Column<Customer>[] = [
    {
      key: 'id',
      header: 'Customer ID',
      render: (customer) => <span className="font-mono text-sm">{customer.id}</span>,
    },
    {
      key: 'name',
      header: 'Name',
      render: (customer) => (
        <div>
          <p className="font-medium">{customer.name}</p>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
        </div>
      ),
    },
    {
      key: 'subscriptionStatus',
      header: 'Subscription',
      render: (customer) => (
        <Badge
          variant={
            customer.subscriptionStatus === 'active'
              ? 'default'
              : customer.subscriptionStatus === 'paused'
              ? 'secondary'
              : customer.subscriptionStatus === 'cancelled'
              ? 'outline'
              : 'outline'
          }
        >
          {customer.subscriptionStatus === 'none'
            ? 'No Subscription'
            : customer.subscriptionStatus.charAt(0).toUpperCase() +
              customer.subscriptionStatus.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'totalOrders',
      header: 'Total Orders',
      align: 'center',
      render: (customer) => <span className="font-medium">{customer.totalOrders}</span>,
    },
    {
      key: 'lifetimeValue',
      header: 'Lifetime Value',
      align: 'right',
      render: (customer) => (
        <span className="font-medium">${customer.lifetimeValue.toLocaleString()}</span>
      ),
    },
    {
      key: 'joinDate',
      header: 'Join Date',
      render: (customer) => (
        <span className="text-sm">
          {new Date(customer.joinDate).toLocaleDateString('en-CA', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Customers" searchPlaceholder="Search customers..." />

      <div className="p-6">
        <DataTable
          columns={columns}
          data={customers}
          keyExtractor={(customer) => customer.id}
          emptyMessage="No customers found."
          actions={
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Customer Directory</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  View and manage customer accounts
                </p>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
