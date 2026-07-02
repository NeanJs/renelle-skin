import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import {
  Package,
  CreditCard,
  Calendar,
  Edit,
  Pause,
  XCircle,
  CheckCircle,
} from "lucide-react";

export function AccountPage() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "active" | "paused" | "cancelled"
  >("active");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);

  // Mock data
  const subscription = {
    id: "SUB-45678",
    kit: "Essential Kit",
    tier: "Essential",
    price: 79,
    nextBillingDate: "February 17, 2026",
    startDate: "January 17, 2026",
  };

  const orders = [
    {
      id: "DL-12345",
      date: "January 17, 2026",
      status: "Processing",
      total: 89.27,
    },
  ];

  const handlePause = () => {
    setSubscriptionStatus("paused");
    setShowPauseDialog(false);
  };

  const handleCancel = () => {
    setSubscriptionStatus("cancelled");
    setShowCancelDialog(false);
  };

  const handleResume = () => {
    setSubscriptionStatus("active");
  };

  return (
    <div className="flex-1 bg-[#F7F6F4] py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">My Account</h1>
            <p className="text-muted-foreground">
              Manage your subscription and orders
            </p>
          </div>

          <Tabs defaultValue="subscription" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            {/* Subscription Tab */}
            <TabsContent value="subscription" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl">Active Subscription</h2>
                      <Badge
                        variant={
                          subscriptionStatus === "active"
                            ? "default"
                            : subscriptionStatus === "paused"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {subscriptionStatus === "active" && "Active"}
                        {subscriptionStatus === "paused" && "Paused"}
                        {subscriptionStatus === "cancelled" && "Cancelled"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Subscription ID: {subscription.id}
                    </p>
                  </div>
                  {subscriptionStatus === "active" && (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Change Kit
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Current Kit
                      </p>
                      <p>{subscription.kit}</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.tier} — Essential Kit
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Monthly Cost
                      </p>
                      <p>${(subscription.price * 1.13).toFixed(2)} CAD</p>
                      <p className="text-sm text-muted-foreground">
                        ${subscription.price} + tax
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {subscriptionStatus === "active"
                          ? "Next Billing Date"
                          : "Last Billing Date"}
                      </p>
                      <p>{subscription.nextBillingDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Member Since
                      </p>
                      <p>{subscription.startDate}</p>
                    </div>
                  </div>
                </div>

                {subscriptionStatus === "active" && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                    <Dialog
                      open={showPauseDialog}
                      onOpenChange={setShowPauseDialog}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause Subscription
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Pause Subscription</DialogTitle>
                          <DialogDescription>
                            You can pause your subscription for up to 3 months.
                            You won't be charged during this time.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setShowPauseDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handlePause}>
                            Pause Subscription
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={showCancelDialog}
                      onOpenChange={setShowCancelDialog}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel Subscription
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cancel Subscription</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to cancel your subscription?
                            You'll lose access to member benefits and your
                            monthly deliveries will stop.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setShowCancelDialog(false)}
                          >
                            Keep Subscription
                          </Button>
                          <Button variant="destructive" onClick={handleCancel}>
                            Cancel Subscription
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {subscriptionStatus === "paused" && (
                  <div className="pt-6 border-t">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-yellow-800">
                        Your subscription is currently paused. No charges will
                        be made until you resume.
                      </p>
                    </div>
                    <Button onClick={handleResume}>Resume Subscription</Button>
                  </div>
                )}

                {subscriptionStatus === "cancelled" && (
                  <div className="pt-6 border-t">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-red-800">
                        Your subscription has been cancelled. You can reactivate
                        by subscribing again.
                      </p>
                    </div>
                    <Button
                      asChild
                      className="rounded-none bg-foreground text-background hover:bg-foreground/85"
                    >
                      <Link to="/subscriptions">Explore Our Lines</Link>
                    </Button>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl mb-6">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#F7F6F4] rounded-lg"
                    >
                      <div>
                        <p className="mb-1">Order {order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">
                            Status
                          </p>
                          <Badge variant="secondary">{order.status}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">
                            Total
                          </p>
                          <p>${order.total}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl">Payment Method</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Payment Method</DialogTitle>
                        <DialogDescription>
                          Enter your new card details below
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" maxLength={3} />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#F7F6F4] rounded-lg">
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <p className="mb-1">Visa ending in 1234</p>
                    <p className="text-sm text-muted-foreground">
                      Expires 12/2027
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl mb-6">Billing Address</h2>
                <div className="flex items-start justify-between">
                  <div className="text-sm">
                    <p>John Doe</p>
                    <p className="text-muted-foreground">123 Main Street</p>
                    <p className="text-muted-foreground">Toronto, ON M5H 2N2</p>
                    <p className="text-muted-foreground">Canada</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
