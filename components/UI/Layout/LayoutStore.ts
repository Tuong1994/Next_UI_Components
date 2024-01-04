import { StateCreator, create } from "zustand";

interface LayoutState {
  shrinked: boolean;
  resizeContent: boolean;
  onShrinked: () => void;
  onResizeContent: () => void;
}

const store: StateCreator<LayoutState> = (set) => ({
  shrinked: false,
  resizeContent: false,
  onShrinked: () => set((state) => ({ ...state, shrinked: !state.shrinked })),
  onResizeContent: () => set((state) => ({ ...state, resizeContent: true })),
});

const useLayoutStore = create(store);

export default useLayoutStore;
