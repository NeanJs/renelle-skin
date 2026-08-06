import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Loader2,
  Package,
  RefreshCw,
} from "lucide-react";

import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

import { getOrder } from "@/lib/api/orders";

import type { OrderConfirmation } from "../../../../shared/types/orders";

type ReplenishmentInterval = 4 | 6 | 8;

/*
|--------------------------------------------------------------------------
| Date Helpers
|--------------------------------------------------------------------------
*/

function formatDate(value: string | null): string {
  if (!value) {
    return "Unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function calculateNextBillingDate(
  createdAt: string | null,
  interval: ReplenishmentInterval | null,
): Date | null {
  if (!createdAt || !interval) {
    return null;
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setDate(date.getDate() + interval * 7);

  return date;
}

/*
|--------------------------------------------------------------------------
| Display Helpers
|--------------------------------------------------------------------------
*/

function formatPurchaseType(
  purchaseType: "one_time" | "subscription" | string | null | undefined,
): string {
  if (purchaseType === "subscription") {
    return "Auto-Replenish";
  }

  return "One-Time Purchase";
}

function formatTier(tier: string | null | undefined): string | null {
  if (!tier) {
    return null;
  }

  return tier
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";

    case "processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";

    case "on-hold":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";

    case "cancelled":
    case "failed":
    case "refunded":
      return "bg-red-100 text-red-800 hover:bg-red-100";

    default:
      return "";
  }
}

export function OrderDetailsPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderConfirmation | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Fetch Order
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError("");

      const orderId = Number(id);

      if (!id || !Number.isInteger(orderId) || orderId <= 0) {
        setError("The order reference is invalid.");

        setLoading(false);

        return;
      }

      try {
        const data = await getOrder(orderId);

        setOrder(data);
      } catch (requestError) {
        console.error("Failed to fetch order:", requestError);

        setError("We could not load this order.");
      } finally {
        setLoading(false);
      }
    };

    void fetchOrder();
  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-7 h-7 animate-spin mx-auto mb-3" />

          <p className="text-sm text-muted-foreground">
            Loading order details...
          </p>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error State
  |--------------------------------------------------------------------------
  */

  if (error || !order) {
    return (
      <main className="flex-1 container mx-auto px-4 py-12">
        <Card className="max-w-xl mx-auto p-8 text-center">
          <Package className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />

          <h1 className="text-2xl mb-2">Order not found</h1>

          <p className="text-sm text-muted-foreground mb-6">
            {error || "This order could not be found."}
          </p>

          <Button type="button" onClick={() => navigate("/account")}>
            Return to Account
          </Button>
        </Card>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Order Information
  |--------------------------------------------------------------------------
  */

  const isAutoReplenish = order.purchase_type === "subscription";

  const nextBillingDate = isAutoReplenish
    ? calculateNextBillingDate(order.created_at, order.replenishment_interval)
    : null;

  const kitTier = formatTier(order.kit?.tier);

  return (
    <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
      <Button
        type="button"
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/account")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Account
      </Button>

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl mb-2">Order #{order.id}</h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />

            {formatDate(order.created_at)}
          </div>
        </div>

        <Badge
          className={`capitalize w-fit ${getStatusBadgeClass(order.status)}`}
        >
          {order.status.replace(/-/g, " ")}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}

          <Card className="p-6">
            <h2 className="text-xl mb-6">Order Items</h2>

            <div className="space-y-6">
              {order.items.map((item) => {
                const itemPurchaseType =
                  item.purchase_type ?? order.purchase_type;

                const itemInterval =
                  item.replenishment_interval ?? order.replenishment_interval;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="w-20 h-20 bg-[#F7F6F4] border border-border rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium">{item.name}</h3>

                      {kitTier && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {kitTier} Kit
                        </p>
                      )}

                      <p className="text-sm text-muted-foreground mt-1">
                        {formatPurchaseType(itemPurchaseType)}
                      </p>

                      {itemPurchaseType === "subscription" && itemInterval && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Every {itemInterval} weeks
                        </p>
                      )}

                      <p className="text-sm text-muted-foreground mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="whitespace-nowrap">
                      ${item.total} {order.currency}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Auto-Replenishment */}

          {isAutoReplenish && (
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F7F6F4] border border-border flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>

                <div>
                  <h2 className="text-lg mb-1">Auto-Replenishment</h2>

                  {order.replenishment_interval ? (
                    <p className="text-sm text-muted-foreground">
                      This order replenishes every{" "}
                      {order.replenishment_interval} weeks.
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      The replenishment frequency is currently unavailable.
                    </p>
                  )}

                  {nextBillingDate && (
                    <p className="text-sm mt-3">
                      Next billing date:{" "}
                      <span className="font-medium">
                        {nextBillingDate.toLocaleDateString("en-CA", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Addresses */}

          <div className="grid md:grid-cols-2 gap-6">
            <AddressCard
              title="Billing Address"
              address={order.billing}
              showContact
            />

            <AddressCard title="Shipping Address" address={order.shipping} />
          </div>
        </div>

        <div className="space-y-6">
          {/* Summary */}

          <Card className="p-6 h-fit">
            <h2 className="text-xl mb-6">Order Summary</h2>

            <div className="space-y-3">
              <SummaryRow
                label="Subtotal"
                value={order.subtotal}
                currency={order.currency}
              />

              <SummaryRow
                label="Shipping"
                value={order.shipping_total}
                currency={order.currency}
              />

              <SummaryRow
                label="Tax"
                value={order.tax_total}
                currency={order.currency}
              />

              {Number(order.discount_total) > 0 && (
                <SummaryRow
                  label="Discount"
                  value={`-${order.discount_total}`}
                  currency={order.currency}
                />
              )}

              <div className="border-t pt-4 flex justify-between">
                <span>Total</span>

                <span>
                  ${order.total} {order.currency}
                </span>
              </div>
            </div>

            <div className="border-t mt-6 pt-6">
              <p className="text-sm text-muted-foreground">Purchase Type</p>

              <p className="mt-1">{formatPurchaseType(order.purchase_type)}</p>

              {isAutoReplenish && order.replenishment_interval && (
                <p className="text-sm text-muted-foreground mt-1">
                  Every {order.replenishment_interval} weeks
                </p>
              )}
            </div>

            {kitTier && (
              <div className="border-t mt-6 pt-6">
                <p className="text-sm text-muted-foreground">Kit Tier</p>

                <p className="mt-1">{kitTier}</p>
              </div>
            )}
          </Card>

          {/* Payment */}

          <Card className="p-6">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 mt-0.5 text-muted-foreground" />

              <div>
                <h2 className="text-lg mb-1">Payment</h2>

                <p className="text-sm text-muted-foreground">
                  {order.payment.method_title || "Payment completed"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| Address Card
|--------------------------------------------------------------------------
*/

type Address = {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
};

function AddressCard({
  title,
  address,
  showContact = false,
}: {
  title: string;
  address: Address;
  showContact?: boolean;
}) {
  return (
    <Card className="p-6">
      <h2 className="text-lg mb-4">{title}</h2>

      <div className="text-sm text-muted-foreground space-y-1">
        <p>
          {address.first_name} {address.last_name}
        </p>

        {address.company && <p>{address.company}</p>}

        <p>{address.address_1}</p>

        {address.address_2 && <p>{address.address_2}</p>}

        <p>
          {address.city}
          {address.state ? `, ${address.state}` : ""} {address.postcode}
        </p>

        <p>{address.country}</p>

        {showContact && address.email && (
          <p className="pt-2">{address.email}</p>
        )}

        {showContact && address.phone && <p>{address.phone}</p>}
      </div>
    </Card>
  );
}

/*
|--------------------------------------------------------------------------
| Summary Row
|--------------------------------------------------------------------------
*/

function SummaryRow({
  label,
  value,
  currency,
}: {
  label: string;
  value: string | number;
  currency: string;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>

      <span>
        ${value} {currency}
      </span>
    </div>
  );
}
