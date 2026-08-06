import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

import {
  Calendar,
  CreditCard,
  Loader2,
  Package,
  Pause,
  Play,
  RefreshCw,
  X,
} from "lucide-react";

import {
  getSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
} from "@/lib/api/subscription";

type SubscriptionStatus = "active" | "paused" | "cancelled";

type ReplenishmentInterval = 4 | 6 | 8;

interface Subscription {
  id: string;

  order_id: number;

  kit_id: number | null;
  product_id?: number | null;
  variation_id?: number | null;

  tier: string | null;

  purchase_type: "subscription" | "one_time";

  status: SubscriptionStatus;

  replenishment_interval: ReplenishmentInterval | null;

  started_at: string | null;
  next_billing_date: string | null;

  paused_at: string | null;
  resumed_at: string | null;
  cancelled_at: string | null;
}

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

/*
|--------------------------------------------------------------------------
| Status Helpers
|--------------------------------------------------------------------------
*/

function getStatusBadgeVariant(
  status: SubscriptionStatus,
): "default" | "secondary" | "destructive" {
  if (status === "active") {
    return "default";
  }

  if (status === "cancelled") {
    return "destructive";
  }

  return "secondary";
}

function formatTier(tier: string | null): string | null {
  if (!tier) {
    return null;
  }

  return tier
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function SubscriptionTab() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState<
    "pause" | "resume" | "cancel" | null
  >(null);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load Subscription
  |--------------------------------------------------------------------------
  */

  const loadSubscription = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSubscription();

      setSubscription(data.subscription ?? null);
    } catch (requestError) {
      console.error("Failed to load subscription:", requestError);

      setError("We could not load your subscription.");

      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSubscription();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Pause
  |--------------------------------------------------------------------------
  */

  const handlePause = async () => {
    try {
      setActionLoading("pause");

      const data = await pauseSubscription();

      setSubscription(data.subscription);

      toast.success("Your auto-replenishment has been paused.");
    } catch (requestError) {
      console.error("Failed to pause subscription:", requestError);

      toast.error("Unable to pause your auto-replenishment.");
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Resume
  |--------------------------------------------------------------------------
  */

  const handleResume = async () => {
    try {
      setActionLoading("resume");

      const data = await resumeSubscription();

      setSubscription(data.subscription);

      toast.success("Your auto-replenishment has been resumed.");
    } catch (requestError) {
      console.error("Failed to resume subscription:", requestError);

      toast.error("Unable to resume your auto-replenishment.");
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Cancel
  |--------------------------------------------------------------------------
  */

  const handleCancel = async () => {
    try {
      setActionLoading("cancel");

      const data = await cancelSubscription();

      setSubscription(data.subscription);

      toast.success("Your auto-replenishment has been cancelled.");
    } catch (requestError) {
      console.error("Failed to cancel subscription:", requestError);

      toast.error("Unable to cancel your auto-replenishment.");
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin" />

          <p className="text-muted-foreground">Loading auto-replenishment...</p>
        </div>
      </Card>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error State
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <Card className="p-6">
        <h2 className="text-xl mb-2">Auto-Replenishment</h2>

        <p className="text-muted-foreground mb-4">{error}</p>

        <Button
          type="button"
          variant="outline"
          onClick={() => void loadSubscription()}
        >
          Try Again
        </Button>
      </Card>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | No Subscription
  |--------------------------------------------------------------------------
  */

  if (!subscription) {
    return (
      <Card className="p-6">
        <h2 className="text-xl mb-2">Auto-Replenishment</h2>

        <p className="text-muted-foreground">
          You do not have an active auto-replenishment plan yet.
        </p>

        <Button asChild className="mt-4">
          <Link to="/subscriptions">Browse Kits</Link>
        </Button>
      </Card>
    );
  }

  const tierLabel = formatTier(subscription.tier);

  const interval = subscription.replenishment_interval;

  const isActive = subscription.status === "active";

  const isPaused = subscription.status === "paused";

  const isCancelled = subscription.status === "cancelled";

  return (
    <div className="space-y-6">
      {/* Subscription Overview */}

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h2 className="text-xl">Your Auto-Replenishment</h2>

            <p className="text-sm text-muted-foreground mt-1">
              Manage your Renelle skincare delivery schedule.
            </p>
          </div>

          <Badge
            variant={getStatusBadgeVariant(subscription.status)}
            className="capitalize w-fit"
          >
            {subscription.status}
          </Badge>
        </div>

        <div className="mt-6 space-y-5">
          {/* Product or Kit */}

          <div className="flex gap-3">
            <Package className="w-5 h-5 mt-0.5 text-muted-foreground" />

            <div>
              <p className="text-sm text-muted-foreground">Plan</p>

              <p className="font-medium">
                {subscription.kit_id
                  ? tierLabel
                    ? `${tierLabel} Kit`
                    : "Renelle Kit"
                  : "Renelle Product"}
              </p>
            </div>
          </div>

          {/* Billing Cycle */}

          <div className="flex gap-3">
            <RefreshCw className="w-5 h-5 mt-0.5 text-muted-foreground" />

            <div>
              <p className="text-sm text-muted-foreground">
                Replenishment Schedule
              </p>

              <p>
                {interval ? `Every ${interval} weeks` : "Schedule unavailable"}
              </p>
            </div>
          </div>

          {/* Started */}

          <div className="flex gap-3">
            <Calendar className="w-5 h-5 mt-0.5 text-muted-foreground" />

            <div>
              <p className="text-sm text-muted-foreground">Started</p>

              <p>{formatDate(subscription.started_at)}</p>
            </div>
          </div>

          {/* Next Billing */}

          {!isCancelled && (
            <div className="flex gap-3">
              <CreditCard className="w-5 h-5 mt-0.5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Next Billing Date
                </p>

                {isPaused ? (
                  <p>Paused until resumed</p>
                ) : (
                  <p>{formatDate(subscription.next_billing_date)}</p>
                )}
              </div>
            </div>
          )}

          {/* Paused Date */}

          {isPaused && subscription.paused_at && (
            <div className="flex gap-3">
              <Pause className="w-5 h-5 mt-0.5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">Paused On</p>

                <p>{formatDate(subscription.paused_at)}</p>
              </div>
            </div>
          )}

          {/* Cancelled Date */}

          {isCancelled && subscription.cancelled_at && (
            <div className="flex gap-3">
              <X className="w-5 h-5 mt-0.5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">Cancelled On</p>

                <p>{formatDate(subscription.cancelled_at)}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Subscription Actions */}

      {!isCancelled && (
        <Card className="p-6">
          <h3 className="mb-2">Auto-Replenishment Actions</h3>

          <p className="text-sm text-muted-foreground mb-4">
            Pause, resume, or cancel your recurring skincare delivery.
          </p>

          <div className="flex flex-wrap gap-3">
            {isActive && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePause}
                disabled={actionLoading !== null}
              >
                {actionLoading === "pause" ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  <Pause className="mr-2 w-4 h-4" />
                )}
                Pause
              </Button>
            )}

            {isPaused && (
              <Button
                type="button"
                onClick={handleResume}
                disabled={actionLoading !== null}
              >
                {actionLoading === "resume" ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  <Play className="mr-2 w-4 h-4" />
                )}
                Resume
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={actionLoading !== null}
            >
              {actionLoading === "cancel" ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <X className="mr-2 w-4 h-4" />
              )}
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Cancelled State */}

      {isCancelled && (
        <Card className="p-6">
          <h3 className="mb-2">Auto-Replenishment Cancelled</h3>

          <p className="text-sm text-muted-foreground">
            This plan will not generate any future orders or charges.
          </p>

          <Button asChild className="mt-4">
            <Link to="/subscriptions">Start a New Plan</Link>
          </Button>
        </Card>
      )}
    </div>
  );
}

export default SubscriptionTab;
