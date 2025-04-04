"use client";

import { useVariableStore } from "@/lib/store/variable-store";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/forms/elements/input-field";
import { formulaFieldSchema } from "@/lib/validations";
import { EditableVariable } from "@/types";
import { calculateValue } from "@/lib/utils";

interface FormulaFieldProps {
  id: string;
  formula: string;
  variable: Omit<EditableVariable, "value" | "formula">;
}

// TODO: Implement finally formula field

export const FormulaField = ({ id, formula, variable }: FormulaFieldProps) => {
  const form = useForm<z.infer<typeof formulaFieldSchema>>({
    resolver: zodResolver(formulaFieldSchema),
    defaultValues: {
      formula: formula,
    },
  });
  const { updateActiveVariable } = useVariableStore();

  const onUpdate = (values: z.infer<typeof formulaFieldSchema>) => {

    const calculatedValue = calculateValue(values.formula ?? "");

    const updatedVariable = {
      ...variable,
      value: calculatedValue,
      formula: values.formula ?? "",
    };

    updateActiveVariable(id, updatedVariable);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdate)}>
        <InputField form={form} name="formula" className="!border-0 !shadow-none" onBlur={() => form.handleSubmit(onUpdate)()}/>
      </form>
    </Form>
  );
};
