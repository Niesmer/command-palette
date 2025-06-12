import { create } from "zustand";

interface StoreType  {
    search: string
    setSearch: (search:string) => void;
    suggestion: string
    setSuggestion: (suggestion: string) => void;
};

export const useSearchStore = create<StoreType>()((set) => ({
    search: "",
    suggestion: "",
    setSearch: (search: string) => set(() => ({ search: search })),
    setSuggestion: (suggestion: string) => set(() => ({ suggestion: suggestion })),
}))