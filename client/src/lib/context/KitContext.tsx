import { create } from "zustand";

import type { Kit } from "../../../../shared/types/kit";

import { getKits } from "@/lib/api/kits";

interface KitsStore {
  kits: Kit[];

  loading: boolean;

  error: string | null;

  fetchKits: () => Promise<void>;
}

export const useKitsStore = create<KitsStore>((set, get) => ({
  kits: [],

  loading: false,

  error: null,

  fetchKits: async () => {
    /*
      
      | Avoid Refetching If Already Loaded
      
      */

    if (get().kits.length > 0) {
      return;
    }

    try {
      set({
        loading: true,
        error: null,
      });

      const kits = await getKits();

      set({
        kits,
      });
    } catch (error) {
      console.error("KIT FETCH ERROR", error);

      set({
        error: "Failed to load kits",
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
