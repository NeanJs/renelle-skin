import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { LandingPage } from "@/app/pages/LandingPage";
import { SubscriptionsPage } from "@/app/pages/SubscriptionsPage";
import { KitDetailsPage } from "@/app/pages/KitDetailsPage";
import { CheckoutPage } from "@/app/pages/CheckoutPage";
import { ConfirmationPage } from "@/app/pages/ConfirmationPage";
import { AccountPage } from "@/app/pages/AccountPage";
import { AuthPage } from "@/app/pages/AuthPage";

import { ProductDetailPage } from "@/app/pages/ProductDetailPage";
import { ProductsPage } from "@/app/pages/ProductsPage";

import { Toaster } from "@/app/components/ui/sonner";
import { ConsultationPage } from "./pages/ConsultationPage";

export default function App() {
  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col bg-background">
              <Header />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route
                  path="/subscriptions/:kitId"
                  element={<KitDetailsPage />}
                />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/consultation" element={<ConsultationPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route
                  path="/product/:lineId/:kitType/:productIndex"
                  element={<ProductDetailPage />}
                />
              </Routes>
              <Footer />
            </div>
          }
        />

        {/* Admin Routes */}
      </Routes>
    </Router>
  );
}
