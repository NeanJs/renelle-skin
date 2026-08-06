import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Loader2 } from "lucide-react";
import { getOrders } from "@/lib/api/orders";

export function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();

      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 flex justify-center">
        <Loader2 className="animate-spin" />
      </Card>
    );
  }

  if (!orders.length) {
    return (
      <Card className="p-6">
        <h2 className="text-xl mb-2">Order History</h2>

        <p className="text-muted-foreground">
          You haven't placed any orders yet.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl mb-6">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#F7F6F4] rounded-lg"
          >
            <div>
              <p className="mb-1">Order #{order.id}</p>

              <p className="text-sm text-muted-foreground">
                {new Date(order.created_at).toLocaleDateString()}
              </p>

              <p className="text-sm text-muted-foreground capitalize">
                {order.kit?.tier} Kit
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Status</p>

                <Badge className="capitalize">{order.status}</Badge>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>

                <p>
                  ${order.total} {order.currency}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/account/orders/${order.id}`)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
