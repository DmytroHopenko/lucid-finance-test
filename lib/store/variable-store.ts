import { create } from "zustand";

interface OverlayState {
  open: boolean;
  activeVariables: EditableVariable[];
  variables: Variable[];
  openOverlay: () => void;
  closeOverlay: () => void;
  addActiveVariable: (variable: Variable) => void;
  setVariables: (variables: Variable[]) => void;
  updateActiveVariable: (id: string, updatedVariable: EditableVariable) => void;
  removeActiveVariable: (id: string) => void;
}

export const useVariableStore = create<OverlayState>((set) => ({
  open: false,
  activeVariables: [],
  variables: [],
  openOverlay: () => set({ open: true }),
  closeOverlay: () => set({ open: false }),
  setVariables: (variables) => set({ variables }),
  addActiveVariable: (variable) =>
    set((state) => {
      const updatedVariables = state.variables.filter(
        (v) => v.id !== variable.id
      );
      const updatedActiveVariables = [
        ...state.activeVariables,
        { ...variable, isEditing: false, formula: "" },
      ];
      return {
        activeVariables: updatedActiveVariables,
        variables: updatedVariables,
      };
    }),
  updateActiveVariable: (id, updatedVariable) =>
    set((state) => ({
      activeVariables: state.activeVariables.map((v) =>
        v.id === id ? { ...v, ...updatedVariable } : v
      ),
    })),
  removeActiveVariable: (id) =>
    set((state) => {
      const variableToRemove = state.activeVariables.find((v) => v.id === id);
      if (variableToRemove) {
        const updatedVariables = [...state.variables, variableToRemove];
        const updatedActiveVariables = state.activeVariables.filter(
          (v) => v.id !== id
        );
        return {
          activeVariables: updatedActiveVariables,
          variables: updatedVariables,
        };
      }
      return state;
    }),
}));
