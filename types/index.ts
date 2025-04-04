export type Variable = {
    name: string;
    category?: string;
    value: string;
    id: string;
}

export type EditableVariable = Variable & {
    formula: string;
  };