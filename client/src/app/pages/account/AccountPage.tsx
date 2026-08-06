import { useEffect, useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getCustomer } from "@/lib/api/auth";

import { ProfileTab } from "./components/ProfileTab";
import { OrdersTab } from "./components/OrdersTab";
import SubscriptionTab from "./components/SubscriptionTab";
import { useNavigate } from "react-router-dom";

export function AccountPage() {
  const [customer, setCustomer] = useState<any>(null);
  const navigate = useNavigate();
  const [loadingCustomer, setLoadingCustomer] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    fetchCustomer();
  }, []);
  const fetchCustomer = async () => {
    try {
      setLoadingCustomer(true);

      const res = await getCustomer();

      setCustomer(res);
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");

        toast.error("Session expired. Please login again.");

        return;
      }

      toast.error("Failed to load account");
    } finally {
      setLoadingCustomer(false);
    }
  };

  if (loadingCustomer) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F7F6F4] py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">My Account</h1>

            <p className="text-muted-foreground">
              Manage your profile, subscriptions and orders
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>

              <TabsTrigger value="orders">Order History</TabsTrigger>

              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab customer={customer} refreshCustomer={fetchCustomer} />
            </TabsContent>

            <TabsContent value="orders">
              <OrdersTab />
            </TabsContent>

            <TabsContent value="subscription">
              <SubscriptionTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
