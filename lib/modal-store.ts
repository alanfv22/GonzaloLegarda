import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  defaultEvento: string | null;
  openModal: (evento?: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  defaultEvento: null,
  openModal: (evento) => set({ isOpen: true, defaultEvento: evento ?? null }),
  closeModal: () => set({ isOpen: false, defaultEvento: null }),
}));
