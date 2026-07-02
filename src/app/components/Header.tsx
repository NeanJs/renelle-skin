import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, User, Search, Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";

const lines = [
  { code: "DSMO", name: "Don't Stress Me Out", id: "dsmo" },
  { code: "IDHTFT", name: "I Don't Have Time for This", id: "idhtft" },
  { code: "ITCTC", name: "I'm Too Cute to Crack", id: "itctc" },
  { code: "ELGOM", name: "Experience Looks Good on Me", id: "elgom" },
  { code: "LDIT", name: "Lips Deserve It Too", id: "ldit" },
  { code: "Universal", name: "All Lines Add-On", id: "universal" },
];

export function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [linesOpen, setLinesOpen] = useState(false);

  if (isAdmin) {
    return (
      <header className="border-b bg-white sticky top-0 z-50 border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/admin"
            className="font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Renelle Skin{" "}
            <span
              className="text-xs font-normal text-muted-foreground ml-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Admin
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              View Store
            </Link>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Utility Bar */}
      <div className="border-b border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-9 text-xs text-muted-foreground">
            <span className="hidden md:block">
              Free shipping on all Canadian orders
            </span>
            <div className="flex items-center gap-6 ml-auto">
              <Link
                to="/login"
                className="hover:text-foreground transition-colors uppercase"
                style={{ fontSize: "0.65rem", letterSpacing: "0.08em" }}
              >
                My Account
              </Link>
              <Link
                to="/admin"
                className="hover:text-foreground transition-colors uppercase"
                style={{ fontSize: "0.65rem", letterSpacing: "0.08em" }}
              >
                Professionals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16 gap-8">
            {/* Left Nav */}
            <nav className="hidden md:flex items-center gap-8 flex-1">
              {/* Our Lines with dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setLinesOpen(true)}
                onMouseLeave={() => setLinesOpen(false)}
              >
                <Link
                  to="/subscriptions"
                  className="flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors uppercase"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}
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
                      {lines.map((line) => (
                        <Link
                          key={line.id}
                          to={`/subscriptions/${line.id}`}
                          className="flex items-baseline gap-3 px-4 py-2.5 hover:bg-[#F7F6F4] transition-colors group"
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
                className="text-foreground hover:text-muted-foreground transition-colors uppercase"
                style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}
              >
                Shop Products
              </Link>

              <Link
                to="/subscriptions"
                className="text-foreground hover:text-muted-foreground transition-colors uppercase"
                style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}
              >
                How It Works
              </Link>
            </nav>

            {/* Center Logo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Link
                to="/"
                className="text-xl tracking-tight text-foreground"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                Renelle Skin
              </Link>
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
              <button
                className="p-2 hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <Link
                to="/login"
                className="p-2 hover:opacity-60 transition-opacity"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>
              <button
                className="p-2 hover:opacity-60 transition-opacity relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                <span
                  className="absolute top-1 right-1 w-3.5 h-3.5 bg-foreground text-background rounded-full flex items-center justify-center"
                  style={{ fontSize: "0.55rem" }}
                >
                  0
                </span>
              </button>
            </div>

            {/* Mobile toggle */}
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
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Renelle Skin
                  </Link>

                  <nav className="flex flex-col gap-0">
                    <p
                      className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
                      style={{ letterSpacing: "0.1em", fontSize: "0.65rem" }}
                    >
                      Our Lines
                    </p>
                    {lines.map((line) => (
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
                      className="text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground"
                      style={{ letterSpacing: "0.1em", fontSize: "0.72rem" }}
                    >
                      All Lines
                    </Link>
                    <Link
                      to="/products"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground"
                      style={{ letterSpacing: "0.1em", fontSize: "0.72rem" }}
                    >
                      Shop Products
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground"
                      style={{ letterSpacing: "0.1em", fontSize: "0.72rem" }}
                    >
                      My Account
                    </Link>
                  </nav>

                  <div className="border-t border-border pt-4 flex items-center gap-4">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="p-2 hover:opacity-60"
                    >
                      <User className="w-5 h-5" />
                    </Link>
                    <button className="p-2 hover:opacity-60">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
