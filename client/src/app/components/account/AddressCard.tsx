import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

import { Edit } from "lucide-react";

import { useState } from "react";
import { AddressDialog } from "./AddressDialog";

interface Props {
  title: string;

  type: "billing" | "shipping";

  address: any;

  refreshCustomer: () => void;
}

export function AddressCard({ title, type, address, refreshCustomer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex justify-between mb-5">
        <h2 className="text-xl">{title}</h2>

        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>

      <div className="text-sm space-y-1">
        <p>
          {address?.first_name} {address?.last_name}
        </p>

        <p>{address?.address_1 || "No address added"}</p>

        <p>
          {address?.city}

          {address?.state && `, ${address.state}`}

          {address?.postcode && ` ${address.postcode}`}
        </p>

        <p>{address?.country}</p>
      </div>

      <AddressDialog
        open={open}
        setOpen={setOpen}
        type={type}
        address={address}
        refreshCustomer={refreshCustomer}
      />
    </Card>
  );
}
