import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  LogOut,
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";

import { Button } from "@/app/components/ui/button";

import { getNavigationLines } from "@/app/data/product-lines";

import { microStyles, inlineStyles } from "@/lib/design-system";

import { isAuthenticated, logout } from "@/lib/api/auth";
import { useCartStore } from "@/lib/context/CartContext";
import { useKitsStore } from "@/lib/context/KitContext";
import {
  updateStoreCartItem,
  removeStoreCartItem,
  resetStoreCart,
} from "@/lib/api/store-cart";
import { isExpiredCartError } from "@/lib/helper/storeCartHelper";
import { toast } from "sonner";
import { createCheckoutHandoff } from "@/lib/api/checkout-handoff";
export function Header() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [linesOpen, setLinesOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const cartToken = useCartStore((state) => state.cartToken);
  const setCartToken = useCartStore((state) => state.setCartToken);
  /*
  Navigation
  
  */
  const [processing, setProcessing] = useState(false);
  const authenticated = isAuthenticated();

  /*
  Cart
  
  */

  const items = useCartStore((state) => state.items);

  const removeItem = useCartStore((state) => state.removeItem);

  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const handleRemoveItem = async (
    itemId: string,
    storeItemKey: string | undefined,
  ) => {
    if (!cartToken || !storeItemKey) {
      return;
    }

    try {
      const response = await removeStoreCartItem(cartToken, storeItemKey);

      if (response.cartToken) {
        setCartToken(response.cartToken);
      }

      removeItem(itemId);
    } catch (error) {
      if (isExpiredCartError(error)) {
        await resetStoreCart();

        toast.error("Your cart session expired, so the old cart was cleared.");

        return;
      }

      throw error;
    }
  };
  const handleUpdateQuantity = async (
    itemId: string,
    storeItemKey: string | undefined,
    quantity: number,
  ) => {
    if (!cartToken || !storeItemKey) {
      return;
    }

    try {
      const response = await updateStoreCartItem(
        cartToken,
        storeItemKey,
        quantity,
      );

      if (response.cartToken) {
        setCartToken(response.cartToken);
      }

      updateQuantity(itemId, quantity);
    } catch (error) {
      if (isExpiredCartError(error)) {
        await resetStoreCart();

        toast.error("Your cart session expired, so the old cart was cleared.");

        return;
      }

      throw error;
    }
  };
  /*
  Logout
  
  */

  const handleLogout = async () => {
    await logout();

    navigate("/login", {
      replace: true,
    });
  };
  const kits = useKitsStore((state) => state.kits);

  const fetchKits = useKitsStore((state) => state.fetchKits);

  useEffect(() => {
    fetchKits();
  }, [fetchKits]);
  /*
  Checkout
  
  */

  const hasSubscription = items.some(
    (item) => item.purchaseType === "subscription",
  );

  const handleCheckout = async () => {
    if (items.length === 0 || !cartToken) {
      return;
    }

    /*
  Subscription Requires Account
  
  */

    if (hasSubscription && !authenticated) {
      setCartOpen(false);

      navigate("/login", {
        state: {
          redirectTo: "/checkout",
          checkoutType: "cart",
        },
      });

      return;
    }

    /*
  Native WooCommerce Checkout Handoff
  
  */

    try {
      setProcessing(true);

      const result = await createCheckoutHandoff(cartToken);

      if (result.cartToken && result.cartToken !== cartToken) {
        setCartToken(result.cartToken);
      }

      setCartOpen(false);

      window.location.assign(result.checkout_url);
    } catch (error: any) {
      if (isExpiredCartError(error)) {
        await resetStoreCart();

        toast.error("Your cart session expired. Please add your items again.");

        return;
      }

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to start checkout",
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* UTILITY BAR */}

      <div className="border-b border-border bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-9 text-xs text-muted-foreground">
            <span className="hidden md:block">
              Free shipping on all Canadian orders
            </span>

            <div className="flex items-center gap-6 ml-auto">
              <Link
                to={authenticated ? "/account" : "/login"}
                className={`${microStyles.container} hover:text-foreground transition-colors`}
              >
                My Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}

      <div className="border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16 gap-8">
            {/* LEFT NAV */}

            <nav className="hidden md:flex items-center gap-8 flex-1">
              {/* OUR LINES */}

              <div
                className="relative"
                onMouseEnter={() => setLinesOpen(true)}
                onMouseLeave={() => setLinesOpen(false)}
              >
                <Link
                  to="/subscriptions"
                  className="flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors uppercase text-xs tracking-widest"
                  style={{
                    letterSpacing: "0.1em",

                    fontSize: "0.72rem",
                  }}
                >
                  Our Lines
                  <ChevronDown
                    className="w-3 h-3 transition-transform"
                    style={{
                      transform: linesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </Link>

                {linesOpen && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white border border-border shadow-md min-w-[280px] py-2">
                      {kits.map((line) => (
                        <Link
                          key={line.id}
                          to={`/subscriptions/${line.id}`}
                          className="flex items-baseline gap-3 px-4 py-2.5 hover:bg-secondary transition-colors group"
                        >
                          <span
                            className="text-xs font-medium text-foreground"
                            style={{
                              fontSize: "0.65rem",

                              letterSpacing: "0.06em",

                              minWidth: "52px",
                            }}
                          >
                            {line.code}
                          </span>

                          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                            {line.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/products"
                className="text-foreground hover:text-muted-foreground transition-colors uppercase text-xs tracking-widest"
                style={{
                  fontSize: "0.72rem",

                  letterSpacing: "0.1em",
                }}
              >
                Shop Products
              </Link>

              <Link
                to="/subscriptions"
                className="text-foreground hover:text-muted-foreground transition-colors uppercase text-xs tracking-widest"
                style={{
                  fontSize: "0.72rem",

                  letterSpacing: "0.1em",
                }}
              >
                How It Works
              </Link>
            </nav>

            {/* CENTER LOGO */}

            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Link
                to="/"
                className="text-xl tracking-tight text-foreground"
                style={inlineStyles.serifFont}
              >
                Renelle Skin
              </Link>
            </div>

            {/* RIGHT ICONS */}

            <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
              {/* ACCOUNT */}

              <Link
                to={authenticated ? "/account" : "/login"}
                className="p-2 hover:opacity-60 transition-opacity"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* CART */}

              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:opacity-60 transition-opacity relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4" />

                {cartCount > 0 && (
                  <span
                    className="
                      absolute
                      top-1
                      right-1
                      min-w-3.5
                      h-3.5
                      px-1
                      bg-foreground
                      text-background
                      rounded-full
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      fontSize: "0.55rem",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* LOGOUT */}

              {authenticated && (
                <button
                  onClick={handleLogout}
                  className="p-2 hover:opacity-60 transition-opacity"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* MOBILE MENU */}

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden ml-auto">
                <button
                  className="p-2 hover:opacity-60 transition-opacity"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-80 bg-white border-r border-border overflow-y-auto"
              >
                <div className="mt-8 flex flex-col gap-8">
                  <Link
                    to="/"
                    className="text-2xl"
                    style={inlineStyles.serifFont}
                    onClick={() => setMobileOpen(false)}
                  >
                    Renelle Skin
                  </Link>

                  <nav className="flex flex-col gap-0">
                    <p
                      className={`${microStyles.container} mb-3`}
                      style={{
                        letterSpacing: microStyles.letterSpacing,
                      }}
                    >
                      Our Lines
                    </p>

                    {kits.map((line) => (
                      <Link
                        key={line.id}
                        to={`/subscriptions/${line.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="py-2.5 border-b border-border last:border-0"
                      >
                        <span
                          className="text-xs font-medium mr-2"
                          style={{
                            fontSize: "0.65rem",

                            letterSpacing: "0.06em",
                          }}
                        >
                          {line.code}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {line.name}
                        </span>
                      </Link>
                    ))}
                  </nav>

                  <nav className="flex flex-col gap-4 border-t border-border pt-4">
                    <Link
                      to="/subscriptions"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
                    >
                      All Lines
                    </Link>

                    <Link
                      to="/products"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Shop Products
                    </Link>

                    <Link
                      to={authenticated ? "/account" : "/login"}
                      onClick={() => setMobileOpen(false)}
                      className="text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
                    >
                      My Account
                    </Link>
                  </nav>

                  <div className="border-t border-border pt-4 flex items-center gap-4">
                    <Link
                      to={authenticated ? "/account" : "/login"}
                      className="p-2 hover:opacity-60 transition-opacity"
                      aria-label="Account"
                    >
                      <User className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => {
                        setMobileOpen(false);

                        setCartOpen(true);
                      }}
                      className="p-2 hover:opacity-60 transition-opacity relative"
                      aria-label="Cart"
                    >
                      <ShoppingCart className="w-5 h-5" />

                      {cartCount > 0 && (
                        <span
                          className="
                            absolute
                            -top-1
                            -right-1
                            min-w-4
                            h-4
                            px-1
                            bg-foreground
                            text-background
                            rounded-full
                            flex
                            items-center
                            justify-center
                          "
                          style={{
                            fontSize: "0.55rem",
                          }}
                        >
                          {cartCount}
                        </span>
                      )}
                    </button>

                    {authenticated && (
                      <button
                        onClick={handleLogout}
                        className="p-2 hover:opacity-60 transition-opacity"
                        aria-label="Logout"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* CART MODAL */}

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent
          side="right"
          className="
            w-full
            sm:max-w-md
            bg-white
            p-0
            flex
            flex-col
          "
        >
          {/* CART HEADER */}

          <div className="border-b border-border p-6 flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">Your Cart</p>

              <p className="text-xs text-muted-foreground mt-1">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          {/* EMPTY CART */}

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <ShoppingCart className="w-8 h-8 mb-4 text-muted-foreground" />

              <h3 className="text-lg mb-2">Your cart is empty</h3>

              <p className="text-sm text-muted-foreground mb-6">
                Add products to your cart to get started.
              </p>

              <Button
                onClick={() => {
                  setCartOpen(false);

                  navigate("/products");
                }}
                className="rounded-none"
              >
                Shop Products
              </Button>
            </div>
          ) : (
            <>
              {/* CART ITEMS */}

              <div className="flex-1 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="
                        flex
                        gap-4
                        p-6
                        border-b
                        border-border
                      "
                  >
                    {/* IMAGE */}

                    <div className="w-20 h-20 bg-secondary flex-shrink-0 overflow-hidden">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* DETAILS */}

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>

                          {(item.size || item.variationName) && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.size || item.variationName}
                            </p>
                          )}

                          <p className="text-xs text-muted-foreground mt-1 capitalize">
                            {item.purchaseType === "subscription"
                              ? "Auto Replenish"
                              : "One Time"}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            handleRemoveItem(item.id, item.storeItemKey)
                          }
                          className="p-1 hover:opacity-60 transition-opacity"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* QUANTITY */}

                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.storeItemKey,
                                item.quantity - 1,
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-secondary"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span className="w-8 text-center text-xs">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.storeItemKey,
                                item.quantity + 1,
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-secondary"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* PRICE */}

                        <p className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Subtotal</span>

                  <span className="font-medium">
                    ${cartTotal.toFixed(2)} CAD
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-6">
                  Shipping and taxes calculated at checkout.
                </p>

                {authenticated ? (
                  <Button
                    onClick={handleCheckout}
                    disabled={processing || items.length === 0}
                  >
                    {processing ? "Redirecting..." : "Checkout"}
                  </Button>
                ) : hasSubscription ? (
                  <Button
                    onClick={() => {
                      setCartOpen(false);

                      navigate("/login", {
                        state: {
                          redirectTo: "/checkout",
                          checkoutType: "cart",
                        },
                      });
                    }}
                    className="w-full rounded-none h-12"
                  >
                    Sign In to Continue
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button
                      disabled={processing || items.length === 0}
                      onClick={handleCheckout}
                      className="w-full rounded-none h-12"
                    >
                      Checkout as Guest
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setCartOpen(false);

                        navigate("/login", {
                          state: {
                            redirectTo: "/checkout",
                            checkoutType: "cart",
                          },
                        });
                      }}
                      className="w-full rounded-none h-12"
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}
