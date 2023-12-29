import { create, StateCreator } from "zustand";

type FormMethod = {
  handleSubmit: any;
};

interface FormState {
  form: FormMethod | null;
  setSubmit: (submit: any) => void;
}

const store: StateCreator<FormState> = (set) => ({
  form: null,
  setSubmit: (submit) => set((state) => ({ ...state, form: { ...state.form, handleSubmit: submit } })),
});

const useFormStore = create(store);

export default useFormStore;
