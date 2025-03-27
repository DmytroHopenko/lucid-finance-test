type Variable = {
    name: string;
    category?: string;
    value?: string;
    id: string;
}

type EditableVariable = Variable & {
    isEditing: boolean;
    formula: string;
  };