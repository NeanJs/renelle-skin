import { useState } from "react";

import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

import { CreditCard, Edit, User, Loader2 } from "lucide-react";

import { toast } from "sonner";

import { updateCustomer } from "@/lib/api/auth";

import { AddressCard } from "@/app/components/account/AddressCard";

interface Props {
  customer: any;

  refreshCustomer: () => void;
}

export function ProfileTab({ customer, refreshCustomer }: Props) {
  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    first_name: customer?.first_name || "",
    last_name: customer?.last_name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
  });

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await updateCustomer({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
      });

      if (!res.success) {
        toast.error("Failed to update profile");

        return;
      }

      await refreshCustomer();

      toast.success("Profile updated");

      setEditing(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* GENERAL INFORMATION */}

      <Card className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <User className="w-5 h-5 text-muted-foreground mt-1" />

            <div className="w-full">
              <h2 className="text-xl mb-4">General Information</h2>

              {!editing ? (
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Name:</span>{" "}
                    {customer.first_name} {customer.last_name}
                  </p>

                  <p>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {customer.email}
                  </p>

                  <p>
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    {customer.phone || "Not added"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>First Name</Label>

                    <Input
                      value={form.first_name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label>Last Name</Label>

                    <Input
                      value={form.last_name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label>Email</Label>

                    <Input
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label>Phone</Label>

                    <Input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {!editing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>

              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* BILLING */}

      <AddressCard
        title="Billing Information"
        type="billing"
        address={customer.billing}
        refreshCustomer={refreshCustomer}
      />

      {/* SHIPPING */}

      <AddressCard
        title="Shipping Information"
        type="shipping"
        address={customer.shipping}
        refreshCustomer={refreshCustomer}
      />

      {/* PAYMENT */}

      <Card className="p-6">
        <div className="flex gap-4 items-center">
          <CreditCard className="w-8 h-8 text-muted-foreground" />

          <div>
            <h2 className="text-xl">Payment Method</h2>

            <p className="text-sm text-muted-foreground mt-2">
              Payment details are securely managed through WooPayments.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
