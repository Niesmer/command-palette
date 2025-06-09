import { create } from "zustand";

interface StoreType  {
    search: string
    setSearch: (search:string) => void;
};

export const useSearchStore = create<StoreType>()((set) => ({
    search: "",
    setSearch: (search: string) => set(() => ({ search: search }))
}))