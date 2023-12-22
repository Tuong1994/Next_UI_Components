import { StateCreator, create } from "zustand";

interface LayoutState {
  shrinked: boolean;
  onShrinked: () => void;
}

const store: StateCreator<LayoutState> = (set) => ({
  shrinked: false,
  onShrinked: () => set((state) => ({ ...state, shrinked: !state.shrinked })),
});

const useLayoutStore = create(store);

export default useLayoutStore;
