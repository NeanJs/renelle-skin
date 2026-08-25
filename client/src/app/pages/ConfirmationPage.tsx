import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

import {
  Calendar,
  CheckCircle,
  CreditCard,
  LoaderCircle,
  Package,
} from "lucide-react";

import { getOrderConfirmation } from "@/lib/api/orders";
import type { OrderConfirmation } from "../../../../shared/types/orders";
import { resetStoreCart } from "@/lib/api/store-cart";

/*
|--------------------------------------------------------------------------
| Date Helpers
|--------------------------------------------------------------------------
*/

function calculateNextBillingDate(
  createdAt: string | null,
  interval: 4 | 6 | 8 | null,
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

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ConfirmationPage() {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("order_id");
  const orderKey = searchParams.get("key");

  const [order, setOrder] = useState<OrderConfirmation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cartResetStarted = useRef(false);

  /*
  |--------------------------------------------------------------------------
  | Load Order Confirmation
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId || !orderKey) {
        setError("Order confirmation information is missing.");
        setLoading(false);
        return;
      }

      const parsedOrderId = Number(orderId);

      if (!Number.isInteger(parsedOrderId) || parsedOrderId <= 0) {
        setError("The order reference is invalid.");
        setLoading(false);
        return;
      }

      try {
        const result = await getOrderConfirmation(parsedOrderId, orderKey);

        setOrder(result);

        const successfulStatuses = ["processing", "completed", "on-hold"];

        if (
          successfulStatuses.includes(result.status) &&
          !cartResetStarted.current
        ) {
          cartResetStarted.current = true;

          try {
            await resetStoreCart();
          } catch (cartError) {
            console.error("Unable to reset the cart:", cartError);
          }
        }
      } catch (requestError) {
        console.error("Unable to load order confirmation:", requestError);

        setError("We could not verify this order confirmation.");
      } finally {
        setLoading(false);
      }
    };

    void loadOrder();
  }, [orderId, orderKey]);

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <LoaderCircle className="w-8 h-8 animate-spin mx-auto mb-4" />

          <p className="text-neutral-600">Loading your order confirmation...</p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error State
  |--------------------------------------------------------------------------
  */

  if (error || !order) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center px-4">
          <h2 className="text-2xl mb-3">Order not found</h2>

          <p className="text-neutral-600 mb-6">
            {error || "We could not load this order confirmation."}
          </p>

          <Button asChild>
            <Link to="/products">View Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Order Dates And Replenishment
  |--------------------------------------------------------------------------
  */

  const orderDate = order.created_at ? new Date(order.created_at) : null;

  const formattedOrderDate =
    orderDate && !Number.isNaN(orderDate.getTime())
      ? formatDate(orderDate)
      : null;

  const isAutoReplenish = order.purchase_type === "subscription";
  const isGuest = localStorage.getItem("token");
  const nextBillingDate = isAutoReplenish
    ? calculateNextBillingDate(order.created_at, order.replenishment_interval)
    : null;

  return (
    <div className="flex-1 bg-[#F7F6F4] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Confirmation Header */}

          <Card className="p-8 text-center mb-6">
            <div
              className="
                w-16
                h-16
                bg-[#F2F1EF]
                border
                border-border
                flex
                items-center
                justify-center
                mx-auto
                mb-4
              "
            >
              <CheckCircle className="w-8 h-8" />
            </div>

            <h1 className="text-3xl mb-2">Order Confirmed!</h1>

            <p className="text-neutral-600 mb-6">
              Thank you for choosing Renelle Skin.
            </p>

            <div className="bg-[#F7F6F4] p-4 rounded-lg inline-block">
              <p className="text-sm text-neutral-600 mb-1">Renelle Reference</p>

              <p className="text-xl tracking-wide">#{order.id}</p>
            </div>
          </Card>

          {/* Order Summary */}

          <Card className="p-6 mb-6">
            <h2 className="text-xl mb-4">Order Summary</h2>

            <div className="space-y-5">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-16
                        h-20
                        object-cover
                        border
                        border-border
                        rounded-md
                      "
                    />
                  ) : (
                    <div
                      className="
                        w-16
                        h-20
                        border
                        border-border
                        rounded-md
                        flex
                        items-center
                        justify-center
                        bg-[#F7F6F4]
                      "
                    >
                      <Package className="w-5 h-5 text-neutral-500" />
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>

                    <p className="text-sm text-neutral-600 mt-1">
                      Quantity: {item.quantity}
                    </p>

                    {item.purchase_type === "subscription" &&
                      item.replenishment_interval && (
                        <p className="text-sm text-neutral-600 mt-1">
                          Auto-replenishes every {item.replenishment_interval}{" "}
                          weeks
                        </p>
                      )}

                    <p className="text-sm mt-1">
                      ${item.total} {order.currency}
                    </p>
                  </div>
                </div>
              ))}

              {/* Totals */}

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>

                  <span>
                    ${order.subtotal} {order.currency}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>

                  <span>
                    ${order.shipping_total} {order.currency}
                  </span>
                </div>

                {Number(order.discount_total) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Discount</span>

                    <span>
                      -${order.discount_total} {order.currency}
                    </span>
                  </div>
                )}

                {Number(order.tax_total) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>

                    <span>
                      ${order.tax_total} {order.currency}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-lg border-t pt-3">
                  <span>Order Total</span>

                  <span>
                    ${order.total} {order.currency}
                  </span>
                </div>
              </div>

              {/* Payment Method */}

              <div className="flex items-start gap-3 border-t pt-4">
                <CreditCard className="w-5 h-5 mt-0.5 text-neutral-600" />

                <div className="flex-1">
                  <p className="text-sm mb-1">Payment Method</p>

                  <p className="text-neutral-600">
                    {order.payment.method_title || "Payment completed"}
                  </p>
                </div>
              </div>

              {/* Order Date */}

              {formattedOrderDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-0.5 text-neutral-600" />

                  <div className="flex-1">
                    <p className="text-sm mb-1">Order Date</p>

                    <p className="text-neutral-600">{formattedOrderDate}</p>
                  </div>
                </div>
              )}

              {/* Next Billing Date */}

              {nextBillingDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-0.5 text-neutral-600" />

                  <div className="flex-1">
                    <p className="text-sm mb-1">Next Billing Date</p>

                    <p className="text-neutral-600">
                      {formatDate(nextBillingDate)}
                    </p>

                    <p className="text-xs text-neutral-500 mt-1">
                      Auto-replenishes every {order.replenishment_interval}{" "}
                      weeks
                    </p>
                  </div>
                </div>
              )}

              {/* Missing Interval Fallback */}

              {isAutoReplenish && !nextBillingDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-0.5 text-neutral-600" />

                  <div className="flex-1">
                    <p className="text-sm mb-1">Next Billing Date</p>

                    <p className="text-neutral-600">
                      Billing schedule unavailable
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* What Happens Next */}

          <Card className="p-6 mb-6">
            <h2 className="text-xl mb-4">What Happens Next?</h2>

            <ol className="space-y-4">
              <li className="flex gap-3">
                <div
                  className="
                    w-8
                    h-8
                    bg-foreground
                    text-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                    text-sm
                  "
                >
                  1
                </div>

                <div>
                  <p className="mb-1">Confirmation Email</p>

                  <p className="text-sm text-neutral-600">
                    Your order confirmation will be sent to{" "}
                    {order.billing.email}.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <div
                  className="
                    w-8
                    h-8
                    bg-foreground
                    text-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                    text-sm
                  "
                >
                  2
                </div>

                <div>
                  <p className="mb-1">Order Preparation</p>

                  <p className="text-sm text-neutral-600">
                    Your Renelle order will be prepared and shipped within 2 to
                    3 business days.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <div
                  className="
                    w-8
                    h-8
                    bg-foreground
                    text-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                    text-sm
                  "
                >
                  3
                </div>

                <div>
                  <p className="mb-1">Delivery</p>

                  <p className="text-sm text-neutral-600">
                    Tracking information will be provided when your order ships.
                  </p>
                </div>
              </li>

              {nextBillingDate && (
                <li className="flex gap-3">
                  <div
                    className="
                      w-8
                      h-8
                      bg-foreground
                      text-white
                      rounded-full
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                      text-sm
                    "
                  >
                    4
                  </div>

                  <div>
                    <p className="mb-1">Next Replenishment</p>

                    <p className="text-sm text-neutral-600">
                      Your next order is scheduled for{" "}
                      {formatDate(nextBillingDate)}.
                    </p>
                  </div>
                </li>
              )}
            </ol>
          </Card>

          {/* Actions */}

          <div className="flex flex-col sm:flex-row gap-4">
            {isGuest ? (
              <Button asChild className="flex-1">
                <Link to={`/confirmation?order_id=${order.id}&key=${orderKey}`}>
                  View Order
                </Link>
              </Button>
            ) : (
              <Button asChild className="flex-1">
                <Link to="/account">View My Account</Link>
              </Button>
            )}

            <Button asChild variant="outline" className="flex-1">
              <Link to="/">Return Home</Link>
            </Button>
          </div>

          {/* Support */}

          <Card
            className="
              p-6
              mt-6
              bg-[#F7F6F4]
              border-neutral-200
            "
          >
            <p className="text-sm text-neutral-600 text-center">
              Questions about your order?{" "}
              <a
                href="mailto:support@renelleskin.ca"
                className="text-neutral-900 underline"
              >
                Contact support
              </a>{" "}
              or visit your{" "}
              <Link to="/account" className="text-neutral-900 underline">
                account dashboard
              </Link>
              .
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
