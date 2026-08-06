import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";

import { Input } from "@/app/components/ui/input";

import { Label } from "@/app/components/ui/label";

import { Button } from "@/app/components/ui/button";

import { updateCustomer } from "@/lib/api/auth";

import { toast } from "sonner";

interface Props {
  open: boolean;

  setOpen: (value: boolean) => void;

  type: "billing" | "shipping";

  address: any;

  refreshCustomer: () => void;
}

export function AddressDialog({
  open,
  setOpen,
  type,
  address,
  refreshCustomer,
}: Props) {
  const [form, setForm] = useState({
    first_name: address?.first_name || "",

    last_name: address?.last_name || "",

    address_1: address?.address_1 || "",

    address_2: address?.address_2 || "",

    city: address?.city || "",

    state: address?.state || "",

    postcode: address?.postcode || "",

    country: address?.country || "",
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateCustomer({
        [type]: form,
      });

      await refreshCustomer();

      toast.success("Address updated");

      setOpen(false);
    } catch (error) {
      toast.error("Failed to update address");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {type} information</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {Object.keys(form).map((field) => (
            <div key={field}>
              <Label>{field.replace("_", " ")}</Label>

              <Input
                value={(form as any)[field]}
                onChange={(e) =>
                  setForm({
                    ...form,

                    [field]: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
