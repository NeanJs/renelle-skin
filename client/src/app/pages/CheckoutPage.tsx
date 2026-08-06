import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

import { CreditCard, Lock, ShieldCheck, Truck } from "lucide-react";

import { LoadingSpinner } from "@/app/components/Loading";

import {
  labelStyles,
  inlineStyles,
  formLabelStyles,
} from "@/lib/design-system";

import { getCustomer, isAuthenticated } from "@/lib/api/auth";

import { useCartStore } from "@/lib/context/CartContext";

import { toast } from "sonner";

export function CheckoutPage() {
  const location = useLocation();

  const checkoutType = location.state?.checkoutType;

  /*
  Authentication
  
  */

  const authenticated = isAuthenticated();

  /*
  Cart
  
  */

  const cartItems = useCartStore((state) => state.items);

  const cartToken = useCartStore((state) => state.cartToken);

  /*
  State
  
  */

  const [processing, setProcessing] = useState(false);

  const [customerLoading, setCustomerLoading] = useState(authenticated);

  const [billing, setBilling] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "CA",
  });

  const [shipping, setShipping] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "CA",
  });

  /*
  Cart Information
  
  */

  const hasSubscription = useMemo(
    () => cartItems.some((item) => item.purchaseType === "subscription"),
    [cartItems],
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  /*
  Load Customer
  
  */

  useEffect(() => {
    if (!authenticated) {
      setCustomerLoading(false);

      return;
    }

    const loadCustomer = async () => {
      try {
        const customer = await getCustomer();

        setBilling({
          first_name: customer.billing?.first_name ?? customer.first_name ?? "",

          last_name: customer.billing?.last_name ?? customer.last_name ?? "",

          email: customer.billing?.email ?? customer.email ?? "",

          phone: customer.billing?.phone ?? "",

          address_1: customer.billing?.address_1 ?? "",

          address_2: customer.billing?.address_2 ?? "",

          city: customer.billing?.city ?? "",

          state: customer.billing?.state ?? "",

          postcode: customer.billing?.postcode ?? "",

          country: customer.billing?.country ?? "CA",
        });

        setShipping({
          first_name:
            customer.shipping?.first_name ??
            customer.billing?.first_name ??
            customer.first_name ??
            "",

          last_name:
            customer.shipping?.last_name ??
            customer.billing?.last_name ??
            customer.last_name ??
            "",

          address_1:
            customer.shipping?.address_1 ?? customer.billing?.address_1 ?? "",

          address_2:
            customer.shipping?.address_2 ?? customer.billing?.address_2 ?? "",

          city: customer.shipping?.city ?? customer.billing?.city ?? "",

          state: customer.shipping?.state ?? customer.billing?.state ?? "",

          postcode:
            customer.shipping?.postcode ?? customer.billing?.postcode ?? "",

          country:
            customer.shipping?.country ?? customer.billing?.country ?? "CA",
        });
      } catch (error) {
        console.error("CUSTOMER LOAD ERROR", error);

        toast.error("Unable to load customer information");
      } finally {
        setCustomerLoading(false);
      }
    };

    loadCustomer();
  }, [authenticated]);

  /*
  Invalid Checkout
  
  */

  if (checkoutType !== "cart") {
    return <Navigate to="/products" replace />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/products" replace />;
  }

  /*
  Subscription Requires Login
  
  */

  if (hasSubscription && !authenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectTo: "/checkout",

          checkoutType: "cart",
        }}
      />
    );
  }

  /*
  Loading
  
  */

  if (customerLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  /*
  Form Updates
  
  */

  const updateBilling = (field: keyof typeof billing, value: string) => {
    setBilling((previous) => ({
      ...previous,

      [field]: value,
    }));
  };

  const updateShipping = (field: keyof typeof shipping, value: string) => {
    setShipping((previous) => ({
      ...previous,

      [field]: value,
    }));
  };

  /*
  Checkout
  
  */

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!cartToken) {
      toast.error("Cart session is not ready");

      return;
    }

    try {
      setProcessing(true);

      /*
      
      | Billing Address
      
      */

      const checkoutBilling = {
        ...billing,

        first_name: shipping.first_name,

        last_name: shipping.last_name,

        address_1: shipping.address_1,

        address_2: shipping.address_2,

        city: shipping.city,

        state: shipping.state,

        postcode: shipping.postcode,

        country: shipping.country,
      };

      toast.error("Payment form is not connected yet");
    } catch (error) {
      console.error("CHECKOUT ERROR", error);

      toast.error(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex-1 bg-secondary py-14 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* HEADER */}

        <div className="mb-10">
          <p
            className={labelStyles.container}
            style={{
              letterSpacing: labelStyles.letterSpacing,
            }}
          >
            Secure Checkout
          </p>

          <h1 style={inlineStyles.responsiveH3}>Complete Your Order</h1>

          {!authenticated && (
            <p className="text-sm text-muted-foreground mt-3">
              Checking out as a guest.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CHECKOUT FORM */}

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border p-8">
              <h2 className="uppercase tracking-widest text-sm mb-6">
                Contact & Shipping Information
              </h2>

              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* NAME */}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className={formLabelStyles.container}>
                      First Name
                    </Label>

                    <Input
                      value={shipping.first_name}
                      onChange={(event) =>
                        updateShipping("first_name", event.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label className={formLabelStyles.container}>
                      Last Name
                    </Label>

                    <Input
                      value={shipping.last_name}
                      onChange={(event) =>
                        updateShipping("last_name", event.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* EMAIL */}

                <div>
                  <Label className={formLabelStyles.container}>Email</Label>

                  <Input
                    type="email"
                    value={billing.email}
                    onChange={(event) =>
                      updateBilling("email", event.target.value)
                    }
                    disabled={authenticated}
                    required
                  />
                </div>

                {/* PHONE */}

                <div>
                  <Label className={formLabelStyles.container}>Phone</Label>

                  <Input
                    type="tel"
                    value={billing.phone}
                    onChange={(event) =>
                      updateBilling("phone", event.target.value)
                    }
                  />
                </div>

                {/* ADDRESS */}

                <div>
                  <Label className={formLabelStyles.container}>Address</Label>

                  <Input
                    value={shipping.address_1}
                    onChange={(event) =>
                      updateShipping("address_1", event.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label className={formLabelStyles.container}>
                    Address Line 2
                  </Label>

                  <Input
                    value={shipping.address_2}
                    onChange={(event) =>
                      updateShipping("address_2", event.target.value)
                    }
                  />
                </div>

                {/* LOCATION */}

                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    placeholder="City"
                    value={shipping.city}
                    onChange={(event) =>
                      updateShipping("city", event.target.value)
                    }
                    required
                  />

                  <Input
                    placeholder="Province"
                    value={shipping.state}
                    onChange={(event) =>
                      updateShipping("state", event.target.value)
                    }
                    required
                  />

                  <Input
                    placeholder="Postal Code"
                    value={shipping.postcode}
                    onChange={(event) =>
                      updateShipping("postcode", event.target.value)
                    }
                    required
                  />
                </div>
              </form>
            </div>

            {/* PAYMENT */}

            <div className="bg-white border p-8">
              <h2 className="uppercase tracking-widest text-sm mb-6">
                Payment Information
              </h2>

              <div className="flex items-center gap-4">
                <CreditCard />

                <p className="text-sm text-muted-foreground">
                  Secure payment form coming next.
                </p>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}

          <div>
            <div className="bg-white border p-8 sticky top-28">
              <h3 className="uppercase tracking-widest text-xs mb-6">
                Order Summary
              </h3>

              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 border-b pb-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>

                      {(item.size || item.variationName) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.size || item.variationName}
                        </p>
                      )}

                      <p className="text-xs text-muted-foreground mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between pt-2 font-medium">
                  <span>Subtotal</span>

                  <span>${cartTotal.toFixed(2)} CAD</span>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                disabled={processing}
                className="w-full mt-8 h-12 rounded-none"
              >
                {processing ? <LoadingSpinner size="sm" /> : "Complete Order"}
              </Button>

              <div className="space-y-3 mt-6 text-xs text-muted-foreground">
                <div className="flex gap-2">
                  <ShieldCheck size={14} />
                  SSL encrypted checkout
                </div>

                <div className="flex gap-2">
                  <Truck size={14} />
                  Free shipping Canada
                </div>

                <div className="flex gap-2">
                  <Lock size={14} />
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
