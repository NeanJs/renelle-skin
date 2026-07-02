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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/app/components/ui/sheet';
import { MoreVertical, Eye, RefreshCcw, Tag, CheckCircle, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  type: 'subscription' | 'one-time';
  posSync: 'synced' | 'pending' | 'failed';
  labelGenerated: boolean;
  date: string;
  items: string[];
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

export function OrdersManagement() {
  const [orders] = useState<Order[]>([
    {
      id: 'DL-12345',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      amount: 89.27,
      paymentStatus: 'paid',
      type: 'subscription',
      posSync: 'synced',
      labelGenerated: true,
      date: '2026-02-25 10:24 AM',
      items: ['Essential Kit'],
      shippingAddress: {
        street: '123 Main St',
        city: 'Toronto',
        province: 'ON',
        postalCode: 'M5H 2N2',
      },
    },
    {
      id: 'DL-12344',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      },
      amount: 224.87,
      paymentStatus: 'paid',
      type: 'subscription',
      posSync: 'synced',
      labelGenerated: true,
      date: '2026-02-25 09:15 AM',
      items: ['Premium Kit'],
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Vancouver',
        province: 'BC',
        postalCode: 'V6B 1A1',
      },
    },
    {
      id: 'DL-12343',
      customer: {
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
      },
      amount: 55.37,
      paymentStatus: 'paid',
      type: 'one-time',
      posSync: 'pending',
      labelGenerated: false,
      date: '2026-02-25 08:42 AM',
      items: ['Starter Kit'],
      shippingAddress: {
        street: '789 Pine Rd',
        city: 'Montreal',
        province: 'QC',
        postalCode: 'H3A 1A1',
      },
    },
    {
      id: 'DL-12342',
      customer: {
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
      },
      amount: 145.77,
      paymentStatus: 'pending',
      type: 'subscription',
      posSync: 'pending',
      labelGenerated: false,
      date: '2026-02-24 16:33 PM',
      items: ['Advanced Kit'],
      shippingAddress: {
        street: '321 Maple Dr',
        city: 'Calgary',
        province: 'AB',
        postalCode: 'T2P 1A1',
      },
    },
    {
      id: 'DL-12341',
      customer: {
        name: 'David Lee',
        email: 'david.lee@example.com',
      },
      amount: 89.27,
      paymentStatus: 'failed',
      type: 'subscription',
      posSync: 'failed',
      labelGenerated: false,
      date: '2026-02-24 14:20 PM',
      items: ['Essential Kit'],
      shippingAddress: {
        street: '654 Elm St',
        city: 'Ottawa',
        province: 'ON',
        postalCode: 'K1A 0B1',
      },
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleResendToPOS = (orderId: string) => {
    toast.success(`Order ${orderId} resent to POS system`);
  };

  const handleRegenerateLabel = (orderId: string) => {
    toast.success(`Shipping label regenerated for order ${orderId}`);
  };

  const columns: Column<Order>[] = [
    {
      key: 'id',
      header: 'Order ID',
      render: (order) => (
        <span className="font-mono text-sm font-medium">{order.id}</span>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (order) => (
        <div>
          <p className="font-medium">{order.customer.name}</p>
          <p className="text-sm text-muted-foreground">{order.customer.email}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (order) => (
        <span className="font-medium">${order.amount.toFixed(2)}</span>
      ),
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (order) => (
        <Badge
          variant={
            order.paymentStatus === 'paid'
              ? 'default'
              : order.paymentStatus === 'pending'
              ? 'secondary'
              : 'destructive'
          }
          className="gap-1"
        >
          {order.paymentStatus === 'paid' && <CheckCircle className="w-3 h-3" />}
          {order.paymentStatus === 'pending' && <Clock className="w-3 h-3" />}
          {order.paymentStatus === 'failed' && <XCircle className="w-3 h-3" />}
          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (order) => (
        <Badge variant={order.type === 'subscription' ? 'default' : 'outline'}>
          {order.type === 'subscription' ? 'Subscription' : 'One-time'}
        </Badge>
      ),
    },
    {
      key: 'posSync',
      header: 'POS Sync',
      render: (order) => (
        <Badge
          variant={
            order.posSync === 'synced'
              ? 'default'
              : order.posSync === 'pending'
              ? 'secondary'
              : 'destructive'
          }
        >
          {order.posSync.charAt(0).toUpperCase() + order.posSync.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'label',
      header: 'Label',
      align: 'center',
      render: (order) => (
        <div className="flex justify-center">
          {order.labelGenerated ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <XCircle className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (order) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewOrder(order)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            {order.posSync !== 'synced' && (
              <DropdownMenuItem onClick={() => handleResendToPOS(order.id)}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Resend to POS
              </DropdownMenuItem>
            )}
            {!order.labelGenerated && (
              <DropdownMenuItem onClick={() => handleRegenerateLabel(order.id)}>
                <Tag className="h-4 w-4 mr-2" />
                Generate Label
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Orders" searchPlaceholder="Search orders..." />

      <div className="p-6">
        <DataTable
          columns={columns}
          data={orders}
          keyExtractor={(order) => order.id}
          emptyMessage="No orders found."
          actions={
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Order Management</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Track and manage customer orders
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Export Orders</Button>
                <Button variant="outline">Sync All POS</Button>
              </div>
            </div>
          }
        />
      </div>

      {/* Order Details Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedOrder && (
            <>
              <SheetHeader>
                <SheetTitle>Order {selectedOrder.id}</SheetTitle>
                <SheetDescription>
                  Placed on {selectedOrder.date}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Customer Information</h3>
                  <div className="p-4 rounded-lg bg-secondary/30 space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedOrder.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedOrder.customer.email}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Shipping Address</h3>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>
                      {selectedOrder.shippingAddress.city},{' '}
                      {selectedOrder.shippingAddress.province}{' '}
                      {selectedOrder.shippingAddress.postalCode}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Order Items</h3>
                  <div className="p-4 rounded-lg bg-secondary/30 space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Info */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Payment Information</h3>
                  <div className="p-4 rounded-lg bg-secondary/30 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge
                        variant={
                          selectedOrder.paymentStatus === 'paid'
                            ? 'default'
                            : selectedOrder.paymentStatus === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {selectedOrder.paymentStatus.charAt(0).toUpperCase() +
                          selectedOrder.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount</span>
                      <span>${selectedOrder.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* POS Sync Status */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">POS Integration</h3>
                  <div className="p-4 rounded-lg bg-secondary/30 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sync Status</span>
                      <Badge
                        variant={
                          selectedOrder.posSync === 'synced'
                            ? 'default'
                            : selectedOrder.posSync === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {selectedOrder.posSync.charAt(0).toUpperCase() +
                          selectedOrder.posSync.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Shipping Label</span>
                      {selectedOrder.labelGenerated ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    {selectedOrder.posSync !== 'synced' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => handleResendToPOS(selectedOrder.id)}
                      >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Retry POS Sync
                      </Button>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Order Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Order Placed</p>
                        <p className="text-xs text-muted-foreground">{selectedOrder.date}</p>
                      </div>
                    </div>
                    {selectedOrder.paymentStatus === 'paid' && (
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Payment Confirmed</p>
                          <p className="text-xs text-muted-foreground">{selectedOrder.date}</p>
                        </div>
                      </div>
                    )}
                    {selectedOrder.posSync === 'synced' && (
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Synced to POS</p>
                          <p className="text-xs text-muted-foreground">2 minutes later</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
